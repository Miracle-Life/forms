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
            agree: true
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

    onSubmit = event => {
        event.preventDefault();
        // console.log("refs", this.username.value, this.password.value);
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
                                Agree
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
