import React, {Component} from "react";
import axios from "axios";

class CreateTask extends Component {

    constructor(props) {
        super(props);
        this.onChangeTaskName = this.onChangeTaskName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            task_name: ""
        };
    };

    onChangeTaskName(e) {
        this.setState({
            task_name: e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const newTask = {
            task_name: this.state.task_name,
        };

        axios
            .post(process.env.REACT_APP_SERVER_URL+"tasks/add", newTask)
            .then((res) => console.log(res.data));

        this.setState({
            task_name: ""
        });
        this.props.history.push("/");
    }

    render() {
        return(
            <div className='container'>
                <h4>New Task</h4>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Task Name </label>
                        <input type="text" className="form-control" value={this.state.task_name} onChange={this.onChangeTaskName} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create task" className="btn btn-primary"  />
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateTask