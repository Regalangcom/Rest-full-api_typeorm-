import { DataSource } from "typeorm";
// import { User } from "../entities/User-identity"
import { Movie } from "../entities/Movie-identitiy";
import { User } from "../entities/User-identity";

const { DB_PORT, DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;

export const databaseConnection = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: parseInt(DB_PORT || "3306"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [User],
  synchronize: false,
  logging: true,
});

databaseConnection
  .initialize()
  .then(() => console.log("database connection bro!"))
  .catch((err) => console.log("Failed to connect to the database bro!", err));
