const { ObjectId } = require('mongodb');

const repository = (db) => {
  const collection = db.collection('movies');

  const getAllMovies = () => new Promise((resolve, reject) => {
    const movies = [];
    const cursor = collection.find({}, { title: 1, id: 1 });
    const addMovie = (movie) => {
      movies.push(movie);
    };
    const sendMovies = (err) => {
      if (err) {
        reject(new Error(`An error occurred fetching all movies, err:${err}`));
      }
      resolve(movies.slice());
    };
    cursor.forEach(addMovie, sendMovies);
  });

  const getMoviePremiers = () => new Promise((resolve, reject) => {
    const movies = [];
    const currentDay = new Date();
    const query = {
      releaseYear: {
        $gt: currentDay.getFullYear() - 1,
        $lte: currentDay.getFullYear(),
      },
      releaseMonth: {
        $gte: currentDay.getMonth() + 1,
        $lte: currentDay.getMonth() + 2,
      },
      releaseDay: {
        $lte: currentDay.getDate(),
      },
    };
    const cursor = collection.find(query);
    const addMovie = (movie) => {
      movies.push(movie);
    };
    const sendMovies = (err) => {
      if (err) {
        reject(new Error(`An error occurred fetching all movies, err:${err}`));
      }
      resolve(movies);
    };
    cursor.forEach(addMovie, sendMovies);
  });

  const getMovieById = id => new Promise((resolve, reject) => {
    const projection = {
      _id: 0, id: 1, title: 1, format: 1,
    };
    const sendMovie = (err, movie) => {
      if (err) {
        reject(new Error(`An error occurred fetching a movie with id: ${id}, err: ${err}`));
      }
      resolve(movie);
    };
    collection.findOne({ _id: ObjectId(id) }, projection, sendMovie);
  });

  const disconnect = () => {
    db.close();
  };

  return {
    getAllMovies,
    getMoviePremiers,
    getMovieById,
    disconnect,
  };
};

module.exports = repository;
