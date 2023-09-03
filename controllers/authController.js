import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
    const { username, password, firstname, lastname } = req.body;
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ username, password: hashedPassword, firstname, lastname });

    try {
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
