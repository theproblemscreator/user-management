import jwt from 'jsonwebtoken';
import User from '../models/user.js'; 

// Function: verifyUser authentication middleware
const verifyUser = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized, please login',
            statusCode: 401
        });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by ID from the decoded token
        const user = await User.findOne({ where: { id: decoded.id } });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid token, please login',
                statusCode: 401
            });
        }

        req.token = token; 
        req.user = user;

        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        
        console.error('JWT Verification Error:', error);

        // Check if the error is related to token verification
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                message: 'Invalid token, please login',
                statusCode: 401
            });
        }

        // Handle other types of errors
        return res.status(500).json({
            message: 'Something went wrong, please try again.',
            statusCode: 500,
            error: error.message // Include the error message for debugging
        });
    }
};

export default verifyUser;
