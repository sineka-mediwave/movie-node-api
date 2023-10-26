const db = [
  {
    id: 1698295003269,
    title: "The Two Throne",
    year: 2004,
  },
  {
    id: 1698295072896,
    title: "game of thrones",
    year: 2018,
  },
  {
    id: 1698295171153,
    title: "avengers",
    year: 2020,
  },
  {
    id: 1698295218008,
    title: "Spider man far away from home",
    year: 2019,
  },
];
export const findMovieById = (id) => db.find((d) => d.id == id);

export const addMovie = ({ title, year }) => {
  const m = { id: new Date().getTime(), title, year };
  db.push(m);
  return m;
};

export const updateMovie = ({ id, title, year }) => {
  const idx = db.findIndex((d) => d.id == id);
  if (idx != -1) {
    db[idx]["title"] = title;
    db[idx]["year"] = year;
    return db[idx];
  }
  return null;
};

export const getAllMovies = () => db;

export const deleteMovieById = (id) => {
  const idx = db.findIndex((d) => d.id == id);
  if (idx == -1) {
    return null;
  }
  const m = db[idx];
  db.splice(idx, 1);
  return m;
};
