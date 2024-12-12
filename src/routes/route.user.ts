import * as express from "express";
import { UserController } from "../controllers/UserControllers";
import { AuthControllers } from "../controllers/AuhControllers";
import { Authorization } from "../middleware/Autho.midlleware";
import { Authentication } from "../middleware/Auth.middleware";

const routes = express.Router();

routes.get(
  "/users",
  Authentication,
  Authorization(["admin"]),
  async (req: express.Request, res: express.Response) => {
    await UserController.getUsers(req, res);
  }
);

routes.post("/signUp", async (req: express.Request, res: express.Response) => {
  await UserController.userSignup(req, res);
});
routes.put(
  "/updateUsers/:id",
  Authentication,
  Authorization(["admin"]),
  async (req: express.Request, res: express.Response) => {
    await UserController.updateUsers(req, res);
  }
);

routes.delete(
  "/delete/:id",
  Authentication,
  Authorization(["admin"]),
  async (req: express.Request, res: express.Response) => {
    await UserController.deleteUsers(req, res);
  }
);
routes.post(
  "/loginUser",
  async (req: express.Request, res: express.Response) => {
    await AuthControllers.Login(req, res);
  }
);

export default routes;
