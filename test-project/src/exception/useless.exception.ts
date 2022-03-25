import { HttpException, HttpStatus } from "@nestjs/common";

class UselessException extends HttpException{
    constructor(){
        super('This is an example of a useless exception filter', HttpStatus.OK)
    }
}

export default UselessException