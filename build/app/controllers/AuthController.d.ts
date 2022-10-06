import { Request, Response } from "express";
export declare class AuthController {
    authenticate(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
