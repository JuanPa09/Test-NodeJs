import { ObjectId } from "mongodb";

export default class Info {
  constructor(
    public name: string,
    public phone: number,
    public address: string,
    public department: string,
    public agent: string,
    public concessionaire: string,
    public vehicle: string,
    public id?: ObjectId
  ) {}
}
