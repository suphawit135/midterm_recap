import { z } from "zod";

export const registerValidator2 = z.object({
    username: z.string().min(4, "ใส่อย่างน้อย 4 ตัว"),
    password: z.string().min(6, "โปรดใส่รหัสผ่านอย่างน้อย 6ตัว"),
    email: z.email("ใส่ Email"),
    phone: z.string().regex(/^[0-9]{10}$/, "เบอร์โทรศัพท์ต้อง 10 หลัก"),
})

