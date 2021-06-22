import React from "react";
import countries from "../data/countries"

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
            age: 13
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
                console.log("callback", this.state.age);
                this.setState({
                    errors: {
                        age: this.state.age > 18 ? false : "Must be more 18"
                    }
                });
            }
        );
        // this.setState((prevState, prevProps) => ({
        //   age: prevState.age + 1
        // }));
        // console.log("incrementAge", this.state.age);
        // this.setState((prevState, prevProps) => ({
        //   age: prevState.age + 1
        // }));
    };

    decrementAge = () => {
        this.setState(
            {
                age: this.state.age - 1
            },
            () => {
                console.log("callback", this.state.age);
                this.setState({
                    errors: {
                        age: this.state.age > 18 ? false : "Must be more 18"
                    }
                });
            }
        );
    };

    render() {
        // console.log(this);
        return (
            <div className="form-container card">
                <form className="form card-body">
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter username"
                            ref={node => (this.username = node)}
                            name="username"
                            value={this.state.username}
                            onChange={this.onChange}
                        />
                        {this.state.errors ?
                            <div className='invalid-feedback'>{this.state.errors.username}</div> : null}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter password"
                            ref={node => (this.password = node)}
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                        {this.state.errors ?
                            <div className='invalid-feedback'>{this.state.errors.password}</div> : null}
                    </div>
                    <div className="form-group">
                        <label>Repeat password</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter repeat password"
                            ref={node => (this.repeatPassword = node)}
                            name="repeatPassword"
                            value={this.state.repeatPassword}
                            onChange={this.onChange}
                        />
                        {this.state.errors ?
                            <div className='invalid-feedback '>{this.state.errors.repeatPassword}</div> : null}
                    </div>
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
