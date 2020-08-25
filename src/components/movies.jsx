import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Paginatiion from "./common/pagination";
import { paginate } from "../utils/paginate";
class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
  };

  handleDelete = (movie) => {
    // console.log(movie);
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    return this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: movieCount } = this.state.movies;
    const { pageSize, currentPage, movies:allMovies } = this.state;
    const movies = paginate(allMovies, pageSize, currentPage);

    if (movieCount === 0) return <h4> There are no movies in the database</h4>;
    return (
      <React.Fragment>
        <h4>Showing {movieCount} movies in the database</h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <th scope="row">{movie.title}</th>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    onClick={() => this.handleLike(movie)}
                    liked={movie.liked}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Paginatiion
          itemsCount={movieCount}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </React.Fragment>
    );
  }

  //   movieMessage() {
  //     const msg = 0;
  //     return  movieCount === 0 ? (
  //       <h4>There are no movies to show</h4>
  //     ) : (
  //       msg
  //     );
  //   }
}

export default Movies;
