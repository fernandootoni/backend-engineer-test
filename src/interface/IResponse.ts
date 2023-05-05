import { Response } from "express";
import { ICashInteraction } from "./ICashInteraction";

interface IResponse extends Response {
  json(data: { sum: number, message: string } | ICashInteraction): this;
}

export { IResponse }