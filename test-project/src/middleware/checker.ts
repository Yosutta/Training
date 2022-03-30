import { Request, Response, NextFunction } from "express";

function checker(req: Request, res: Response, next: NextFunction){
    console.log(req.url)
    next()
}

export default checker