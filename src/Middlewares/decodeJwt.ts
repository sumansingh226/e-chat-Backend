import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

// Middleware to decode JWT and check role
export function decodeJwtAndCheckRole(role: string) {
    return function (req: Request, res: Response, next: NextFunction) {
        // Get the JWT from the Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header is missing' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'JWT token is missing' });
        }

        // Secret key used to sign the token
        const secretKey = 'your_secret_key';

        // Decode the JWT
        jwt.verify(token, secretKey, (err: VerifyErrors | null, decoded: any) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid JWT token' });
            }

            if (decoded.role !== role) {
                return res.status(403).json({ message: 'Unauthorized access' });
            }

            req.user = decoded;

            next();
        });
    };
}
