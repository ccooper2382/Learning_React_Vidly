import React, {Component} from "react";


import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import MoviesTable from "./moviesTable";
import {getMovies} from "../services/fakeMovieService";
import {paginate} from "../utils/paginate";
import {getGenres} from "../services/fakeGenreService";
import _ from 'lodash';


class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        sortColumn: {path: 'title', order: 'asc'}
    };

    componentDidMount() {
        const genres = [{_id: "", name: 'All Genres'}, ...getGenres()]
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

    handleSort = (sortColumn) => {
        this.setState({sortColumn})
    };

    getPagedData = () => {
        const {pageSize,
            currentPage,
            sortColumn,
            movies: allMovies,
            selectedGenre
        } = this.state;
        const filtered = selectedGenre && selectedGenre._id
            ? allMovies.filter(m => m.genre._id === selectedGenre._id)
            : allMovies;
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
        const movies = paginate(sorted, currentPage, pageSize);

        return {totalCount: filtered.length, data: movies};
    }

    render() {
        const {length: count} = this.state.movies;
        const {pageSize, currentPage, sortColumn} = this.state;

const {totalCount, data: movies} = this.getPagedData()
        return <div className="row">
            <div className="col-2">
                <ListGroup items={this.state.genres}
                           selectedItem={this.state.selectedGenre}
                           onItemSelect={this.handleGenreSelect}/>
            </div>
            <div className="col">
                <div>{count === 0 ? <h1>There are no movies</h1>
                    : <h1>There are {totalCount} movies</h1>}</div>

                <MoviesTable movies={movies}
                             sortColumn={sortColumn}
                             onDelete={this.handleDelete}
                             onLike={this.handleLike}
                             onSort={this.handleSort}/>
                <Pagination itemsCount={totalCount}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}/>
            </div>


        </div>
    };


}

export default Movies;