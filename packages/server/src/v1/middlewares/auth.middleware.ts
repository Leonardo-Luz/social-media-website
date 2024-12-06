import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const authantication = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization)
        return res.status(403).json({
            message: 'Acess denied'
        })

    const bearerToken = authorization.split(' ');

    if (bearerToken != undefined)
        if (bearerToken[0] != ('Bearer') || bearerToken[1] == undefined)
            return res.status(401).json({
                message: 'Invalid token'
            });
        else
            jwt.verify(bearerToken[1], process.env.JWT_PASS!, (err, payload) => {
                if (err) {
                    return res.status(403).json({
                        message: 'Access denied'
                    });
                }

                res.locals.payload = payload;

                next();
            })
    else
        return res.status(401).json({
            message: 'Token not provided'
        });
}

// Should implement user.active
// export const actived = async ( req: Request, res: Response, next: NextFunction ) => {
//     const payload = res.locals.payload;
//     if(!payload)
//     {
//         res.status(403).json({ message: 'Access denied'});
//         return;
//     }
//     else if(!payload.active)
//     {
//         res.status(403).json({ message: 'Access denied'});
//         return;
//     }
//     next();    
// }
