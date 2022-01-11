import React, {Component} from "react";
import {getMovies} from "./services/fakeMovieService";
import {deleteMovie} from "./services/fakeMovieService";

class Movies extends Component {
    state = {
        movies: getMovies()
    };

    render() {
        return <div>
            <div>{this.state.movies.length === 0 ? <h1>There are no movies</h1> : <h1>There are {this.state.movies.length} movies</h1> }</div>
        <table className="table">
            <thead>
            <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {this.state.movies.map(movie => (
                <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                    <button onClick={() => this.handleDelete(movie) // the arrow function is needed
                        // to let the click event take parameters.
                        }>Delete</button>

                </td>
            </tr>))}

            </tbody>
        </table>
        </div>
    };

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies})
    };
}

export default Movies;