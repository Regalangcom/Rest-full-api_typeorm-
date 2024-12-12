import {NextFunction , Request , Response} from "express"


export const errorHandler = (
    error : Error , 
    req : Request , 
    res : Response , 
    next : NextFunction ) :  void => {
    console.log(`Error : ${error.message}`);
    res.status(500).json({msg : "internal server error"})

}
