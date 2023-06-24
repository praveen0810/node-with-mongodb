import jwt from 'jsonwebtoken'

/**
 * ? Bearer in header is used as a key for http reqest to access the database
 * @param {*} user 
 * @returns 
 */

const generateToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: '10h' });

}
const refreshToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

}
const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if (verifyToken) {
                return req.user = verifyToken
            }

        }
    } catch (error) {
        throw {
            message: 'Invalid Token'
        }
    }
};

export {
    verifyToken,
    generateToken,
    refreshToken
}