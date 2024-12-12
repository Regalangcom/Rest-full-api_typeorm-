import { Request, Response } from "express";
import { databaseConnection } from "../database/db";
import { encrypt } from "../helper/Helper";
import { User } from "../entities/User-identity";

export class AuthControllers {
  static async Login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(500).json({ msg: "email and password are required" });
      }

      const userDataToAuth = databaseConnection.getRepository(User);
      const user = await userDataToAuth.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      const comparePassword = await encrypt.comparePassword(
        user?.password,
        password
      );

      if (comparePassword) {
        const dataToken = { id: user.id, email: user.email };
        console.log("data : ", dataToken);
      }
      const token = await encrypt.generatorToken({
        id: user.id,
        email: user.email,
      });

      // res.cookie("token" , token , {
      //     httpOnly: true,
      //     secure: true,
      //     sameSite: "none",
      //     maxAge : 60 * 60 * 24
      //   })

      return res.status(200).json({ msg: "success your login", user, token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
