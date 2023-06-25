import { RESPONSE_CODES } from '../config/constants.js';
import { verifyToken } from './auth.js';
// import { initLogger, logInfo, logError } from './logger.js';

export const authMiddleWare = async (req, res, next) => {

    try {
        const ignorePaths = ['/api_v_1/register', '/api_v_1/login', '/api_v_1/send_otp'];

        const { method, headers, originalUrl } = req;

        console.log(req.connection.remoteAddress)
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const logObj = {
            ip,
            headers: req.headers,
            method: req.method,
            url: req.originalUrl,
            timestamp: Date.now(),
        };

        // if (method === 'POST') {
        //   logInfo('Activity Log: ', logObj);
        //   // ignoring register URL
        //   return next();
        // }

        const ignoreIndex = ignorePaths.findIndex((item) => item === originalUrl);
        if (ignoreIndex > -1) {
            //   logInfo('Activity Log: ', logObj);
            return next();
        }

        if (!headers.authorization) {
            //   logInfo('Activity Log: ', logObj);
            return res.status(RESPONSE_CODES.UNAUTHORIZED).json({ error: 'Missing auth token' });
        }
        const userInfo = verifyToken(req);
        logObj.user = userInfo
        // logInfo('Activity Log: ', logObj);
        return next();
    } catch (error) {
        // logError('Error in authMiddleware: ', error);
        return res?.status(RESPONSE_CODES.UNAUTHORIZED).json({ error });
    }
};