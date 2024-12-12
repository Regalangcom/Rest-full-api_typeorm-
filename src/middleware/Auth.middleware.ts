import { NextFunction , Request , Response } from "express"
import * as jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
dotenv.config()

const { JWT_SECRET } = process.env

export const Authentication = ( req : Request , res: Response , next : NextFunction ): any => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({msg : "unauthorized"}); 
    }
    const token = header.split(" ")[1]

    if (!token) {
       return  res.status(401).json({ msg :"unauthorized"});
    }

    const decode = jwt.verify(token , JWT_SECRET )
    if (!decode) {
       return  res.status(401).json({ msg :"unauthorized"});
    }

    req["currentUsers"] = decode as any
    next()
}

