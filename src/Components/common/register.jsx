import React from 'react';
import Form from "./form";
import Joi from "joi-browser";

class Register extends Form {
    state = {
        data: {username: '', password: '', name: ''},
        errors: {}
    }

    schema = {
        username: Joi.string().email().required().label('Username'),
        name: Joi.string().required().min(5).label('Name'),
        password: Joi.string().required().label('Password')
    };


    doSubmit = () => {
        //call server
        console.log('Registered');
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.renderInput('username', 'Username')}
                {this.renderInput('password', 'Password', 'password')}
                {this.renderInput('name', 'Name')}
                {this.renderButton('Register')}
            </form>
        );
    }
}

export default Register;