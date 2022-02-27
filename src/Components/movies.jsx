import React, {Component} from "react";

import Like from "./common/like";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import {getMovies} from "../services/fakeMovieService";
import {paginate} from "../utils/paginate";
import {getGenres} from "../services/fakeGenreService";


class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4
    };

    componentDidMount() {
        const genres =[{name: 'All Genres'},...getGenres()]
        this.setState({movies: getMovies(), genres})
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    };

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies})
    };

    handleGenreSelect = (genre) => {
        this.setState({selectedGenre: genre, currentPage: 1});
    };

    handlePageChange = (page) => {
        this.setState({currentPage: page});
    };

    render() {
        const {length: count} = this.state.movies;
        const {pageSize, currentPage, movies: allMovies, selectedGenre} = this.state;

        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
        const movies = paginate(filtered, currentPage, pageSize);
        return <div className="row">
            <div className="col-2">
                <ListGroup items={this.state.genres}
                           selectedItem={this.state.selectedGenre}
                           onItemSelect={this.handleGenreSelect}/>
            </div>
            <div className="col">
                <div>{count === 0 ? <h1>There are no movies</h1>
                    : <h1>There are {filtered.length} movies</h1>}</div>

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
                    {movies.map(movie => (
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td><Like liked={movie.liked} onClick={() => this.handleLike(movie)}/></td>
                            <td>
                                <button onClick={() => this.handleDelete(movie) // the arrow function is needed
                                    // to let the click event take parameters.
                                }>Delete
                                </button>

                            </td>
                        </tr>))}

                    </tbody>
                </table>
                <Pagination itemsCount={filtered.length}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}/>
            </div>


        </div>
    };


}

export default Movies;