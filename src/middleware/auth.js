import jwt from 'jsonwebtoken';
import userModel from '../../DB/models/user.model.js';

export const auth = (accessRoles = []) => {
    return async (req, res, next) => {
        try {
            const { token } = req.headers;
            if (!token) {
                return res.status(401).json({ message: "No token provided" });
            }

            const decoded = jwt.verify(token, process.env.loginToken);
            if (!decoded?.id) {
                return res.status(401).json({ message: "Invalid token" });
            }

            const user = await userModel.findById(decoded.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (!accessRoles.includes(user.role)) {
                return res.status(403).json({ message: "Forbidden" });
            }

            req.id = decoded.id;
            next();
        } catch (error) {
            return res.status(500).json({ message: "Auth error", error: error.message });
        }
    };
};
