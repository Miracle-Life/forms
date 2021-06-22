import React from "react";
import countries from "../data/countries"
import {Field} from "./Field";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            repeatPassword: "",
            country: '1',
            gender: "male",
            agree: true,
            avatar: '',
            errors: {
                username: false,
                password: false,
                repeatPassword: false
            },
            age: 17
        };
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onChangeAgreed = (event) => {
        this.setState({
            [event.target.name]: event.target.checked
        })
    }
    onChangeAvatars = (event) => {
        const reader = new FileReader();
        reader.onload = event => {
            this.setState({
                avatar: event.target.result
            })
        };
        reader.readAsDataURL(event.target.files[0]);
        console.log(this.state.avatar)
    }
    onSubmit = event => {
        event.preventDefault();
        const errors = {}
        // console.log("refs", this.username.value, this.password.value);
        if (this.state.username.length <= 5) {
            errors.username = "Must be 5 characters or more";
        }
        if (this.state.password.length <= 3) {
            errors.password = "Required";
        }
        if (this.state.password !== this.state.repeatPassword) {
            errors.repeatPassword = "Must be equal password";
        }
        if (Object.keys(errors).length > 0) {
            this.setState({
                errors: errors
            })
        }
        else {
            this.setState({
                errors: {}
            })
        }
        console.log("submit", this.state);
    };
    getOptionItems = items => {
        return items.map(items => (
            <option
                key={items.id}
                value={items.id}
            >
                {items.name}
            </option>
        ))
    }
    incrementAge = () => {
        this.setState(
            (prevState, prevProps) => ({
                age: prevState.age + 1
            }),
            () => {
                if (this.state.age < 18) {
                    this.setState({
                        errors: {
                            age: "Must be more 18"
                        }
                    });
                }
                else {
                    this.setState({
                        errors: {
                            age: false
                        }
                    });
                }
                console.log("callback", this.state.age);
            }
        );
    };

    decrementAge = () => {
        this.setState(
            {
                age: this.state.age - 1
            },
        );
    };

    render() {
        // console.log(this);
        return (
            <div className="form-container card">
                <form className="form card-body">
                    <Field
                        id="username"
                        labelText="Username"
                        type="text"
                        placeholder="Enter username"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChange}
                        error={this.state.errors.username}
                    />
                    <Field
                        id="password"
                        labelText="Password"
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        error={this.state.errors.password}
                    />
                    <Field
                        id="repeatPassword"
                        labelText="Repeat password"
                        type="password"
                        placeholder="Enter repeat password"
                        name="repeatPassword"
                        value={this.state.repeatPassword}
                        onChange={this.onChange}
                        error={this.state.errors.repeatPassword}
                    />
                    <div className='form-group'>
                        <label htmlFor="country">Country</label>
                        <select
                            className="form-select"
                            value={this.state.country}
                            name="country"
                            onChange={this.onChange}
                        >
                            {this.getOptionItems(countries)}
                        </select>
                    </div>

                    <fieldset className='form-group'>
                        <div>Gender</div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="radio"
                                name='gender'
                                id="male"
                                value='male'
                                defaultChecked
                                onChange={this.onChange}
                            />
                            <label className="form-check-label" htmlFor="male">
                                Male
                            </label>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="radio"
                                name='gender'
                                id="female"
                                value='female'
                                onChange={this.onChange}
                            />
                            <label className="form-check-label" htmlFor="female">
                                Female
                            </label>
                        </div>
                        <div className="form-group">
                            <div className="mb-3">
                                <label htmlFor="avatar" className="form-label">Avatar</label>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                                    onChange={this.onChangeAvatars}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div>
                                <label>Age</label>
                            </div>
                            <div className="btn-group" role="group">
                                <button
                                    className="btn btn-secondary"
                                    type="button"
                                    onClick={this.decrementAge}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter age"
                                    name="age"
                                    value={this.state.age}
                                    onChange={this.onChange}
                                />
                                <button
                                    className="btn btn-secondary"
                                    type="button"
                                    onClick={this.incrementAge}
                                >
                                    +
                                </button>
                            </div>
                            {this.state.errors.age ? (
                                <div className="invalid-feedback">{this.state.errors.age}</div>
                            ) : null}
                        </div>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={this.state.agree}
                                onChange={this.onChangeAgreed}
                                id="agree"
                                name='agree'
                                defaultChecked={this.state.agree}
                            />
                            <label className="form-check-label" htmlFor="agree">
                                Confirm the processing of data
                            </label>
                        </div>
                    </fieldset>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        onClick={this.onSubmit}
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}
