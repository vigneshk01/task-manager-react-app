import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import ChangeStatus from "./ChangeStatus";

export default class TaskList extends Component {
    // This is the constructor that shall store our data retrieved from the database
    constructor(props) {
        super(props);
        this.deleteTask = this.deleteTask.bind(this);
        this.state = {
            tasks: [] };
    }

    Task = (props) => (
        <tr>
            <td><ChangeStatus dataFromParent={props.task}/></td>
            <td>
                <Link to={"/edit/" + props.task._id}>edit</Link> |
                <a href="/" onClick={ () => {props.deleteTask(props.task._id); }}> delete </a>
            </td>
        </tr>
    );


    // This method will get the data from the database.
    componentDidMount() {
        axios
            .get(process.env.REACT_APP_SERVER_URL+"tasks/")
            .then((response) => {
                this.setState({
                    tasks: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // This method will delete a record based on the method
    deleteTask(id) {
        axios.delete(process.env.REACT_APP_SERVER_URL + id).then((response) => {
            console.log(response.data);
        });

        this.setState({
            task: this.state.tasks.filter((el) => el._id !== id),
        });
    }

    // This method will map out the users on the table
    taskList() {
        return this.state.tasks.map((currentTask) => {
            return (
                <this.Task
                    task={currentTask}
                    deleteTask={this.deleteTask}
                    key={currentTask._id}
                />
            );
        });
    }

    // This following section will display the table with the records of individuals.
    render() {
        return (
            <div>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>{this.taskList()}</tbody>
                </table>
            </div>
        );
    }
}
