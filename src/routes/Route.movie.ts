import * as express from "express";
import { MovieUsers } from "../controllers/MovieControllers";
import { Authentication } from "../middleware/Auth.middleware";
import { Authorization } from "../middleware/Autho.midlleware";

const route = express.Router();

route.get(
  "/getAllMovies",
  Authentication,
  async (req: express.Request, res: express.Response) => {
    await MovieUsers.getAllMovies(req, res);
  }
);
route.post(
  "/CreateMovies",
  Authentication,
  async (req: express.Request, res: express.Response) => {
    await MovieUsers.createMovies(req, res);
  }
);

route.put(
  "/updateMovie/:id",
  Authentication,
  Authorization(["admin"]),
  async (req: express.Request, res: express.Response) => {
    await MovieUsers.updateMovies(req, res);
  }
);

route.delete(
  "/deleteMovie/:id",
  Authentication,
  Authorization(["admin"]),
  async (req: express.Request, res: express.Response) => {
    await MovieUsers.deleteMovie(req, res);
  }
);

export default route;
