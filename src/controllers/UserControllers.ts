import { Request, Response } from "express";
import { databaseConnection } from "../database/db";
import { encrypt } from "../helper/Helper";
import { payload } from "../dto/user.dto";
import { User } from "../entities/User-identity";
import { Cache } from "../helper/Helper";

export class UserController {
  static async userSignup(req: Request, res: Response) {
    const { username, email, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }
    const encryptPassword = await encrypt.encryptPassword(password);

    const Register = databaseConnection.getRepository(User);
    const emailExist = await Register.findOne({ where: { email } });

    if (emailExist) {
      return res.status(400).json({ msg: "Email is already registered" });
    }

    const users = new User();
    (users.username = username),
      (users.email = email),
      (users.password = encryptPassword),
      (users.role = role);

    await Register.save(users);

    const userDataSend = new payload();
    userDataSend.username = users.username;
    userDataSend.email = users.email;
    userDataSend.role = users.role;

    const token = encrypt.generatorToken({ id: users.id });

    return res
      .status(200)
      .json({ message: "User created successfully", token, userDataSend });
  }

  static async getUsers(req: Request, res: Response) {
    const data = Cache.get("data");
    console.log("Cache size : ", Cache.size);

    if (data) {
      console.log("saving in server Cache", data);
      return res.status(200).json({ data });
    } else {
      console.log("saving from db");
      const getRepositoryUser = databaseConnection.getRepository(User);
      const users = await getRepositoryUser.find();

      // update Cache
      Cache.set("data", users);
      return res.status(200).json({ msg: "get all data users", data: users });
    }
  }
  static async updateUsers(req: Request, res: Response) {
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    const userRepository = databaseConnection.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const hashedPassword = await encrypt.encryptPassword(password);

    user.username = username;
    user.email = email;
    user.password = hashedPassword;
    user.role = role;

    await userRepository.save(user);

    return res
      .status(200)
      .json({ msg: "User updated successfully", data: user });
  }

  static async deleteUsers(req: Request, res: Response) {
    const { id } = req.params;
    const getDataUsers = databaseConnection.getRepository(User);
    const findId = await getDataUsers.findOne({ where: { id } });

    if (!findId) {
      return res.status(404).json({ msg: "User not found" });
    }
    await getDataUsers.remove(findId);
    res.status(200).json({ msg: "User deleted successfully" });
  }
}
