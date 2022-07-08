import * as UserModel from "../models/user";

const create = async (req: any, res: any) => {
  const result = await UserModel.create(req.body);
  if (result.succes) {
    res.status(201).json(result.data);
  } else {
    res.status(500).json({ error: result.error });
  }
};

const assignPassword = async (req: any, res: any) => {
  const result = UserModel.assingPassword(req.body);
  if (result.succes) {
    res.status(200).json(result);
  } else {
  }
  res.status(500).json({ error: result.error });
};

const validate = async (req: any, res: any) => {
  const result = await UserModel.validate(req.body);
  if (result.succes) {
    if (result.data.isValid) {
      res.status(200).json(result.data);
    } else {
      res.status(403).json({ error: "User not valid" });
    }
  } else {
    res.status(500).json({ error: result.error });
  }
};

export { create, assignPassword, validate };
