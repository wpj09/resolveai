import { Request, Response } from "express";
export declare class EntityController {
    index(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    store(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
