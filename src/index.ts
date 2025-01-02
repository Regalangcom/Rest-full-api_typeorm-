import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";

import { errorHandler } from "./middleware/Error-handler";
import routes from "./routes/route.user";
import "./database/db";
import "reflect-metadata";
import route from "./routes/Route.movie";

const app: Express = express();
const { DB_PORT_SERVER } = process.env;

// implementation middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(routes);
app.use(route);
app.use(errorHandler);

app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

app.listen(DB_PORT_SERVER, () => {
  console.log(`server is running in port 4000 `);
});
