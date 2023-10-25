const db = [
  // {
  //   id: '1234567',
  //   title: 'The Matrix',
  //   year: '1998'
  // },
  // {
  //   id: '1234568',
  //   title: 'The Lord of the rings',
  //   year: '2003'
  // }
]

export const findMovieById = (id) => db.find(d => d.id == id)

export const addMovie = ({title, year}) => {
  const m = {id: new Date().getTime(), title, year}
  db.push(m)
  return m;
}

export const updateMovie = ({id, title, year}) => {
  const idx = db.findIndex(d => d.id == id)
  if (idx != -1) {
    db[idx]['title'] = title;
    db[idx]['year'] = year;
    return db[idx];
  }
  return null;
}

export const getAllMovies = () => db;

export const deleteMovieById = (id) => {
  const idx = db.findIndex(d => d.id == id)
  if (idx == -1) {
    return null;
  }
  const m = db[idx];
  db.splice(idx, 1)
  return m;

}