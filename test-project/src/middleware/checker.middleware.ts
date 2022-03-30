import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

@Injectable()
class CheckMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction){
        console.log(req.url)
        next()
    }
}

export default CheckMiddleware