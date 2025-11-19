import bcrypt from "bcryptjs";             // أو "bcrypt" حسب المكتبة اللي تريدها
import jwt from "jsonwebtoken";
import { nanoid, customAlphabet } from "nanoid";
import userModel from "../../../DB/models/user.model.js"; // أو المسار الصحيح
import { sendEmail } from "../../utils/sendEmail.js";      // أو المسار الصحيح

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    console.log("REGISTER BODY:", req.body); // 👈 تحقق من البيانات

    // التحقق من الحقول المطلوبة
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // التحقق من أن الإيميل غير مسجل مسبقًا
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // تحقق من قيمة salt قبل التشفير
    const saltRounds = parseInt(process.env.salt);
    if (isNaN(saltRounds)) {
      console.error("Invalid salt value:", process.env.salt);
      return res.status(500).json({ message: "Server configuration error" });
    }

    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    // إنشاء المستخدم
    const newUser = await userModel.create({
      userName,
      email,
      password: hashedPassword,
    });

    // إنشاء رمز تأكيد الإيميل
    if (!process.env.confirmEmailToken) {
      console.error("Missing confirmEmailToken env variable");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const token = jwt.sign({ email }, process.env.confirmEmailToken, { expiresIn: "1d" });

    // تحضير إيميل التأكيد
    const html = `
      <div>
        <h2>Welcome ${userName}</h2>
        <a href="${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}">
          Confirm your email
        </a>
      </div>
    `;

    try {
      await sendEmail(email, "Confirm Email", html);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // لا تفشل التسجيل فقط بسبب الإيميل، يمكن التعامل لاحقًا
    }

    return res.status(201).json({ message: "Registration successful", user: newUser });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({
      message: "Server error",
      error: err.message,
      stack: err.stack,
    });
  }
};



export const confirmEmail = async (req,res)=>{
    const {token} = req.params;
    const decoded = jwt.verify(token,process.env.confirmEmailToken);
    await userModel.findOneAndUpdate({email:decoded.email},{confirmEmail:true})
    return res.status(200).json({message:"success"})

}

export const login = async(req,res)=>{

    const {email , password} = req.body;
    const user = await userModel.findOne({email});

    if(!user){
        return res.status(400).json({message:"invalid data"})
    }
    if(!user.confirmEmail){
        return res.status(400).json({message:"confirm your email"})
    }
    if(user.status == 'notActive'){
         return res.status(400).json({message:"your account is blocked"})
    }
    const match = bcrypt.compareSync(password, user.password);
    if(!match){
          return res.status(400).json({message:"invalid data"})
    }
    const token = jwt.sign({id:user._id,userName:user.userName,role:user.role},process.env.loginToken);
    return res.status(200).json({message:"success",token})
}

export const sendCode = async(req,res)=>{

    const {email} = req.body;
const code = customAlphabet('1234567890abcdefghi', 4)();
const user = await userModel.findOneAndUpdate({email},{sendCode:code})
const html = `
<h2>code is ${code}</h2>
`
await sendEmail(email,"code",html);
return res.status(200).json({message:"success"})
}

export const changePassword = async(req,res)=>{

    const{code , email , password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(404).json({message:"not register account"})
}

if(user.sendCode != code){
     return res.status(404).json({message:"invalid code"})
}
const hash = bcrypt.hashSync(password,parseInt(process.env.salt));
user.password = hash;
user.sendCode = null;
await user.save();
 return res.status(200).json({message:"success"})
    }


