import cors from 'cors';
import connectDB from '../DB/connection.js';
import authRouter from './modules/auth/auth.router.js';
import phoneRouter from './modules/phone/phone.router.js';
import versionRouter from './modules/version/version.router.js';
import cartRouter from './modules/cart/cart.router.js';
import orderRouter from './modules/order/order,router.js';
import reviewRouter from './modules/review/review.router.js';

const initApp = async(app,express)=>{

    app.use(express.json());
      app.use(cors());
      connectDB();
      app.use("/auth",authRouter);
      app.use("/phone",phoneRouter);
      app.use("/version",versionRouter);
      app.use("/cart",cartRouter);
      app.use("/order",orderRouter)
      app.use("/review",reviewRouter)

    app.get("/",(req,res)=>{

        return res.status(200).json({message:"welcome ..."})
    });


}

export default initApp;
