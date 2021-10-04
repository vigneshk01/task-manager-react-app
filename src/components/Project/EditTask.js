import React,  {Component}  from "react";
import axios from "axios";
import { withRouter } from "react-router";

class Edit extends Component {
    // This is the constructor that stores the data.
    constructor(props) {
        super(props);

        this.onChangeTaskName = this.onChangeTaskName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            status: "",
            task_name: "",
            tasks: [],
        };
    }

    // This will get the record based on the id from the database.
    componentDidMount() {
        console.log(this.props)
        axios
            .get(process.env.REACT_APP_SERVER_URL+"tasks/" + this.props.match.params.id)
            .then((response) => {
                this.setState({
                    task_name: response.data.task_name,
                    status: response.data.status
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // These methods will update the state properties.
    onChangeTaskName(e) {
        this.setState({
            task_name: e.target.value,
        });
    }

    // This function will handle the submission.
    onSubmit(e) {
        e.preventDefault();
        const newEditedTask = {
            task_name: this.state.task_name,
            status: this.state.status
        };
        console.log(newEditedTask);

        // This will send a post request to update the data in the database.
        axios
            .post(
                process.env.REACT_APP_SERVER_URL+"tasks/update/" + this.props.match.params.id,
                newEditedTask
            ).then((res) => console.log(res.data));

        this.props.history.push("/");
    }

    // This following section will display the update-form that takes the input from the user to update the data.
    render() {
        return (
            <div>
                <h3 align="center">Update Task</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Task Name: </label>
                        <input type="text"  className="form-control" value={this.state.task_name} onChange={this.onChangeTaskName}   />
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Update Task" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}

// access to the history object's properties and the closest <Route>'s match via the withRouter
export default withRouter(Edit);
