import User from "../models/user.js";
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs'; // Make sure this is imported
import jwt from 'jsonwebtoken';


export const createUser = async (req, res) => {
    let { fname, lname, email, mobile, password } = req.body;

    try {
        // Check if user already exists with email or mobile
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { email: email },
                    { mobile: mobile }
                ]
            }
        });

        // check if the existing user is available 
        if (existingUser) {
            return res.status(400).json({ error: "Email or mobile already exists." });
        }

        // hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //  saving user
        const user = await User.create({ fname, lname, email, mobile, password: hashedPassword });

        res.status(201).json({
            message: "User saved successfully.",
            data: user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message,
            msg: "Something went wrong while saving the user."
        });
    }
};

export const loginUser = async (req, res) => {
    const { emailormobile, password } = req.body;

    if (!emailormobile || !password) {
        return res.status(400).json({
            message: "Email or mobile and password are required."
        });
    }

    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: emailormobile },
                    { mobile: emailormobile }
                ]
            }
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or mobile number."
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign({ id: user.id }, 'restaurant_management', { expiresIn: '1h' });


        // Optionally update token in DB
        await User.update({ token }, { where: { id: user.id } });


        res.status(200).json({
            message: "Login successful",
            data: {
                id: user.id,
                fname: user.fname,
                lname: user.lname,
                mobile: user.mobile,
                email: user.email,
                token
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong.",
            error: error.message
        });
    }
};

export const profileDetail = async (req, res) => {
    try {
        const userId = req.user.id; // ✅ assuming you're using JWT auth middleware

        const user = await User.findOne({
            where: { id: userId }
        });

        if (!user) {
            return res.status(400).json({
                statusCode: 400,
                message: "User is not found"
            });
        }

        const { password, createdAt, updatedAt, token, ...userData } = user.dataValues;

        return res.status(200).json({
            message: 'OK',
            statusCode: 200,
            data: userData
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong, please try again.",
            error: error.message
        });
    }
};

export const logoutUser = async (req, res) => {
    try {
        const userId = req.user.id // Match token payload
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        user.token = '';
        await user.save();

        return res.status(200).json({
            message: "Logout Successful"
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message,
            message: "Something went wrong, Please try again"
        });
    }
};
