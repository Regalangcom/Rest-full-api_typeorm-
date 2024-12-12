import { Request, Response } from "express";
import { databaseConnection } from "../database/db";
import { movies } from "../dto/user.dto";
import { Movie } from "../entities/Movie-identitiy";
import { Cache } from "../helper/Helper";

export class MovieUsers {
  static async getAllMovies(req: Request, res: Response) {
    const data = Cache.get("data");
    console.log("cache Size: ", Cache.size);
    if (data) {
      console.log("saving data in Server", data);
      return res.status(200).json({ data });
    } else {
      console.log("saving data from db");
      const savingDataInDb = databaseConnection.getRepository(Movie);
      const result = await savingDataInDb.find();
      Cache.set("data", result);
      return res.status(200).json({ msg: "get all data movies", data: result });
    }
  }

  static async createMovies(req: Request, res: Response) {
    const { title, description, director, year, rating, images } = req.body;

    try {
      const createMoviesData = new Movie();

      // useing method setter
      (createMoviesData.title = title),
        (createMoviesData.description = description),
        (createMoviesData.director = director),
        (createMoviesData.year = year),
        (createMoviesData.rating = rating),
        (createMoviesData.images = images);

      const savingMovies = databaseConnection.getRepository(Movie);
      await savingMovies.save(createMoviesData);

      console.log("data", savingMovies);

      // const movieDataSend = new movies();
      // movieDataSend.title = createMoviesData.title;
      // movieDataSend.description = createMoviesData.description;
      // movieDataSend.director = createMoviesData.director;
      // movieDataSend.year = createMoviesData.year;
      // movieDataSend.rating = createMoviesData.rating;
      // movieDataSend.images = createMoviesData.images;

      return res
        .status(200)
        .json({ msg: "movie saved successfully", data: createMoviesData });
    } catch (error) {
      console.log("error", error);
    }
  }

  static async updateMovies(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, director, year, rating, images } = req.body;

    const getDataMoviesInDatabase = databaseConnection.getRepository(Movie);
    try {
      const result = await getDataMoviesInDatabase.findOne({ where: { id } });

      if (!result) {
        return res.status(404).json({ msg: "movie not found" });
      }

      result.title = title;
      result.description = description;
      result.director = director;
      result.year = year;
      result.rating = rating;
      result.images = images;

      await getDataMoviesInDatabase.save(result);

      return res
        .status(200)
        .json({ msg: "update movie successfully", data: result });
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteMovie(req: Request, res: Response) {
    const { id } = req.params;
    const deleteMovies = databaseConnection.getRepository(Movie);

    try {
      const getIdParamsMovie = await deleteMovies.findOne({ where: { id } });

      if (!getIdParamsMovie) {
        return res.status(404).json({ msg: "movie not found" });
      }
      await deleteMovies.remove(getIdParamsMovie);

      return res.status(200).json({ msg: "movie deleted successfully" });
    } catch (error) {
      return res.status(500).json({ msg: "movie deleted fail" });
    }
  }
}
