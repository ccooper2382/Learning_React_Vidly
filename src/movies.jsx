import React, {Component} from "react";
import {getMovies} from "./services/fakeMovieService";

class Movies extends Component {
    state = {
        movies: getMovies()
    };

    render() {
        return (

                <div className="stock-container">
                    {this.state.movies.map((data, key) => {
                        return (
                            <div key={key}>
                                {data.title +
                                " , " +
                                data.genre.name +
                                " ," +
                                data.numberInStock +
                                ", " +
                                data.dailyRentalRate}
                            </div>
                        );
                    })}
                </div>

        );
};
    }

export default Movies;