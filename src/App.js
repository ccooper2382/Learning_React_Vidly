import './App.css';
import {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Movies from "./Components/movies";
import Customers from "./Components/customers";
import NotFound from "./Components/notFound";
import Rentals from "./Components/rentals";
import NavBar from "./Components/navBar";
import MovieForm from "./Components/movieForm";
import LoginForm from "./Components/loginForm";
import Register from "./Components/common/register";


class App extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <main className="container">
                    <Switch>
                        <Route path="/login" component={LoginForm} />
                        <Route path="/movies/:id" component={MovieForm} />
                        <Route path="/movies" component={Movies}/>
                        <Route path="/customers" component={Customers}/>
                        <Route path="/rentals" component={Rentals}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/notFound" component={NotFound}/>
                        <Redirect from="/" exact to="/movies"/>
                        <Redirect to="/not-found"/>
                    </Switch>
                </main>
            </div>
        )

    }
}

export default App;
