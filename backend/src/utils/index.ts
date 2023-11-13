import config from "config";
import { Request, Response, NextFunction } from "express";
const logHttpRequest = (req: Request, res: Response, next: NextFunction) => {
  const logMessage = {
    [new Date().toISOString()]: {
      method: req.method,
      url: `${config.baseRoute}${req.url}`,
    },
  };
  console.log(logMessage);
  next();
};

export default { logHttpRequest };
