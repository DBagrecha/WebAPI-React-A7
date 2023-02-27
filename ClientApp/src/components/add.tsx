import { Component, ChangeEvent } from "react";
import employeeService from "../services/employeeService";
import employee from '../types/employee';

type Props = {};

type State = employee & {
    submitted: boolean
};

export default class AddEmp extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeIncome = this.onChangeIncome.bind(this);
        this.onChangeids = this.onChangeids.bind(this);
        this.saveEmp = this.saveEmp.bind(this);
        this.newEmp = this.newEmp.bind(this);

        this.state = {
            id: null,
            name: "",
            country: "",
            annualIncome: 0,
            emailIdsList: [],
            submitted: false
        };
    }

    onChangeName(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeCountry(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            country: e.target.value
        });
    }

    onChangeIncome(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            annualIncome: Number(e.target.value)
        });
    }

    onChangeids(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            emailIdsList: e.target.value.split(",")
        });
    }

    saveEmp() {
        const data: employee = {
            id: null,
            name: this.state.name,
            country: this.state.country,
            annualIncome: this.state.annualIncome,
            emailIdsList: this.state.emailIdsList
        };
        console.log(data)
        employeeService.create(data)
            .then((response: any) => {
                this.setState({
                    name: response.data.name,
                    country: response.data.country,
                    annualIncome: response.data.annualIncome,
                    emailIdsList: response.data.emailIdsList,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    newEmp() {
        this.setState({
            id: null,
            name: "",
            country: "",
            annualIncome: 0,
            emailIdsList: [],
            submitted: false
        });
    }

    render() {
        const { id, name, country, annualIncome, emailIdsList, submitted } = this.state;

        return (
            <div className="submit-form">
                {submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newEmp}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={name}
                                onChange={this.onChangeName}
                                name="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <input
                                type="text"
                                className="form-control"
                                id="country"
                                required
                                value={country}
                                onChange={this.onChangeCountry}
                                name="country"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="annualIncome">Annual Income</label>
                            <input
                                type="text"
                                className="form-control"
                                id="annualIncome"
                                required
                                value={annualIncome}
                                onChange={this.onChangeIncome}
                                name="annualIncome"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="emailIdsList">Email Ids (comma seperated)</label>
                            <input
                                type="text"
                                className="form-control"
                                id="emailIdsList"
                                required
                                value={emailIdsList}
                                onChange={this.onChangeids}
                                name="emailIdsList"
                            />
                        </div>

                        <button onClick={this.saveEmp} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
