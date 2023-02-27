import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';

import employeeService from "../services/employeeService";
import employee from "../types/employee";

interface RouterProps { // type for `match.params`
    id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

type State = {
    currentemp: employee;
    message: string;
}

export default class Emp extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeIncome = this.onChangeIncome.bind(this);
        this.onChangeids = this.onChangeids.bind(this);
        this.getEmp = this.getEmp.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateEmp = this.updateEmp.bind(this);
        this.deleteEmp = this.deleteEmp.bind(this);

        this.state = {
            currentemp: {
                id: "",
                name: "",
                country: "",
                annualIncome: 0,
                emailIdsList: []
            },
            message: "",
        };
    }

    componentDidMount() {
        this.getEmp(this.props.match.params.id);
    }

    onChangeName(e: ChangeEvent<HTMLInputElement>) {
        const name = e.target.value;

        this.setState(function (prevState) {
            return {
                currentemp: {
                    ...prevState.currentemp,
                    name: name,
                },
            };
        });
    }

    onChangeCountry(e: ChangeEvent<HTMLInputElement>) {
        const Country = e.target.value;

        this.setState((prevState) => ({
            currentemp: {
                ...prevState.currentemp,
                country: Country,
            },
        }));
    }

    onChangeIncome(e: ChangeEvent<HTMLInputElement>) {
        const Income = e.target.value;

        this.setState((prevState) => ({
            currentemp: {
                ...prevState.currentemp,
                annualIncome: Number(Income),
            },
        }));
    }

    onChangeids(e: ChangeEvent<HTMLInputElement>) {
        const ids = e.target.value.split(",");

        this.setState((prevState) => ({
            currentemp: {
                ...prevState.currentemp,
                emailIdsList: ids,
            },
        }));
    }

    getEmp(id: string) {
        employeeService.get(id)
            .then((response: any) => {
                this.setState({
                    currentemp: response.data,
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    updatePublished(status: boolean) {
        const data: employee = {
            id: "",
            name: this.state.currentemp.name,
            country: this.state.currentemp.country,
            annualIncome: this.state.currentemp.annualIncome,
            emailIdsList: this.state.currentemp.emailIdsList
        };

        employeeService.update(data, this.state.currentemp.id)
            .then((response: any) => {
                this.setState((prevState) => ({
                    currentemp: {
                        ...prevState.currentemp,
                        published: status,
                    },
                    message: "The status was updated successfully!"
                }));
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    updateEmp() {
        employeeService.update(
            this.state.currentemp,
            this.state.currentemp.id
        )
            .then((response: any) => {
                console.log(response.data);
                this.setState({
                    message: "The employee was updated successfully!",
                });
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    deleteEmp() {
        employeeService.delete(this.state.currentemp.id)
            .then((response: any) => {
                console.log(response.data);
                this.props.history.push("/Emp");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    render() {
        const { currentemp } = this.state;

        return (
            <div>
                {currentemp ? (
                    <div className="edit-form">
                        <h4>Tutorial</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={currentemp.name}
                                    onChange={this.onChangeName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="country"
                                    value={currentemp.country}
                                    onChange={this.onChangeCountry}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="annualIncome">Annual Income</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="annualIncome"
                                    value={currentemp.annualIncome}
                                    onChange={this.onChangeIncome}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="emailIdsList">Email Ids</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="emailIdsList"
                                    value={currentemp.emailIdsList}
                                    onChange={this.onChangeids}
                                />
                            </div>
                        </form>


                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteEmp}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateEmp}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Tutorial...</p>
                    </div>
                )}
            </div>
        );
    }
}