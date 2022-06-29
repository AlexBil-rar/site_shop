import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const generateToken = (id) => {
    return jwt.sign({ id }, 'jwt-secret-key', {
        expiresIn: '24h'
    });
};

export default generateToken;