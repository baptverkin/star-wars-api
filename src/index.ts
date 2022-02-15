import express from "express";
import nunjucks from "nunjucks";
import request from "@fewlines-education/request";

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "njk");

app.get("/", (request, response) => {
  response.render("home");
});

app.use(express.static("public"));

type Film = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: [];
  planets: [];
  starships: [];
  vehicles: [];
  species: [];
  created: string;
  edited: string;
  url: string;
};

type Films = Film[];

app.get("/categories/films", (req, res) => {
  request("https://swapi.dev/api/films", (error, body) => {
    if (error) {
      console.error(error);
    } else {
      const json: Films = JSON.parse(body).results;
      console.log(
        "====",
        json.map((element: Film) => element.title),
      );

      const resultat = json.map((element: Film) => element.title);
      console.log({ resultat });

      res.render("films", { resultat });
    }
  });
});

type People = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: [];
  species: [];
  vehicles: [];
  starships: [];
  created: string;
  edited: string;
  url: string;
};

type arrPeople = People[];

app.get("/categories/people", (req, res) => {
  request("https://swapi.dev/api/people", (error, body) => {
    if (error) {
      console.error(error);
    } else {
      const json: arrPeople = JSON.parse(body).results;
      const resultat = json.map((element) => element.name);
      res.render("people", { resultat });
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
