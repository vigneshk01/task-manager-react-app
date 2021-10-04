import React,  {Component}  from "react";
import axios from "axios";
import {withRouter} from "react-router";

class ChangeStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task_name: this.props.dataFromParent.task_name,
            status: this.props.dataFromParent.status,
            tasks: [] };
        this.onChangeTaskStatus = this.onChangeTaskStatus.bind(this);
    }

    onChangeTaskStatus() {
        console.log(this.state.status)
        this.setState({status: this.state.status === 'open' ? 'closed' :'open'},function (){
            console.log("new",this.state.status)
            const newTaskStatus = {
                task_name: this.state.task_name,
                status: this.state.status
            };
            axios
                .post(
                    process.env.REACT_APP_SERVER_URL+"tasks/update/" + this.props.dataFromParent._id,newTaskStatus
                ).then((res) => console.log(res.data));

            if (this.props.location.pathname === "/") {
                window.location.reload();
            }// this.props.history.push("/");
        });
    }

    render() {
        return (
            <label>
                <input type="checkbox" checked={this.state.status === "closed"} onChange={this.onChangeTaskStatus}/>
                <span>{this.props.dataFromParent.task_name}</span>
            </label>
        )
    }
}

export default withRouter(ChangeStatus)


