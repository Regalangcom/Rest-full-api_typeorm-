import {NextFunction , Request , Response} from "express"
import { User } from "../entities/User-identity"
import { databaseConnection } from "../database/db"

export const Authorization = (roles : string[]) => {
    return async (req : Request , res: Response , next : NextFunction) : Promise<void> => {
        const Users =  databaseConnection.getRepository(User);
        const user = await Users.findOne({where : { id : req["currentUsers"].id }})
        console.log(user);
        
        if ( !user?.role  || !roles.includes(user.role)) {
             res.status(403).json({msg : "unauthorized"});
             return;
        }
        next();
    }
}
