import { Component } from "react";
import employeeService from "../services/employeeService";
import { Link } from "react-router-dom";
import employee from '../types/employee';

type Props = {};

type State = {
    emps: Array<employee> | null,
    currentemp: employee | null,
    currentIndex: number,
};

export default class EmpList extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.retrieveEmp = this.retrieveEmp.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveEmp = this.setActiveEmp.bind(this);

        this.state = {
            emps: null,
            currentemp: null,
            currentIndex: -1,
        };
    }

    componentDidMount() {
        this.retrieveEmp();
    }

    retrieveEmp() {
        employeeService.getAll()
            .then((response: any) => {
                this.setState({
                    emps: response.data
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }


    refreshList() {
        this.retrieveEmp();
        this.setState({
            currentemp: null,
            currentIndex: -1
        });
    }

    setActiveEmp(emp: employee, index: number) {
        this.setState({
            currentemp: emp,
            currentIndex: index
        });
    }

    render() {
        const { emps, currentemp, currentIndex } = this.state;

        return (
            <div>
                <div className="col-md-6">
                    <h4>Employee List</h4>

                    <ul className="list-group">
                        {emps &&
                            emps.map((emp: employee, index: number) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveEmp(emp, index)}
                                    key={index}
                                >
                                    {index + 1} | {emp.name}
                                </li>
                            ))}
                    </ul>

                </div>
                <div className="col-md-6">
                    {currentemp ? (
                        <div>
                            <h4>Employee</h4>
                            <div>
                                <label>
                                    <strong>Id:</strong>
                                </label>{" "}
                                {currentemp.id}
                            </div>
                            <div>
                                <label>
                                    <strong>Name:</strong>
                                </label>{" "}
                                {currentemp.name}
                            </div>
                            <div>
                                <label>
                                    <strong>Country:</strong>
                                </label>{" "}
                                {currentemp.country}
                            </div>
                            <div>
                                <label>
                                    <strong>Annual Income:</strong>
                                </label>{" "}
                                {currentemp.annualIncome}
                            </div>
                            <div>
                                <label>
                                    <strong>Email Ids:</strong>
                                </label>{" "}
                                {currentemp.emailIdsList}
                            </div>

                            <Link
                                to={"/Emp/" + currentemp.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Employee...</p>
                        </div>
                    )}
                </div>
            </div>

        );
    }
}