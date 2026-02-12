import axios, { formToJSON } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { registerValidator2 } from "../validators/registor.validators2";

function Register() {
  const [formData, setFormdata] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
  });

  const [error,setError] = useState({})
  const inputStyle = "border p-0.5 px-2 border-gray-500 rounded-md";
  
  const navigate = useNavigate()

  const hdlChange = (evt) => {
    const { name, value } = evt.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
    // console.log(name, value);
  };

  const hdlSubmit = async (evt) => {
    evt.preventDefault();
    setError({})
   const result= registerValidator2.safeParse(formData)

   if(!result.success){
    const {fieldErrors} = result.error.flatten()
    console.log(fieldErrors)
    setError(fieldErrors)
    return
   }
  
    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        formData,
      );
      console.log("Register successfully", res.data);
      toast.success("ลงทะเบียนสำเร็จ!!")
      navigate('/post')
      
    } catch (error) {
      console.log("เกิดข้อผิดพลาด");
      toast.error("ลงทะเบียนผิดพลาด")
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <form
        onSubmit={hdlSubmit}
        className="bg-white p-6 rounded-md w-full max-w-md flex flex-col"
      >
        <h2 className="text-center">Create Account</h2>
        <label htmlFor="">username:</label>
        <input
          type="text"
          className={inputStyle}
          name="username"
          placeholder="username"
          onChange={hdlChange}
          value={formData.username}
        ></input>
        {error.username && <p className="text-red-500">{error.username[0]}</p>}

        <label htmlFor="" name="password">
          password:
        </label>
        <input
          type="password"
          className={inputStyle}
          name="password"
          placeholder="password"
          onChange={hdlChange}
          value={formData.password}
        ></input>
        {error.password && <p className="text-red-500">{error.password[0]}</p>}

        <label htmlFor="">email:</label>
        <input
          type="text"
          className={inputStyle}
          name="email"
          placeholder="example@mail.com"
          onChange={hdlChange}
          value={formData.email}
        ></input>
        {error.email && <p className="text-red-500">{error.email[0]}</p>}


        <label htmlFor="">phone:</label>
        <input
          type="text"
          className={inputStyle}
          name="phone"
          placeholder="081-XXXXXXXX"
          onChange={hdlChange}
          value={formData.phone}
        ></input>
          {error.phone && <p className="text-red-500">{error.phone[0]}</p>}

        <button className="bg-amber-300 py-1 mt-3 rounded-2xl cursor-pointer hover:bg-rose-400 transition-all duration-150">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
