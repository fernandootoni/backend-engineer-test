import { NextFunction, Request, Response } from "express"

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  if(!req.headers.id) {
    return res.status(400).json({ message: "Please enter the user id" })
  }

  next()
}

export { verifyUser }