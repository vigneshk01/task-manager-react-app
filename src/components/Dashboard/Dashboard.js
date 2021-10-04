import React, {Component} from "react";
import SearchTask from "../Project/SearchTasks";
import Overview from "../Project/Overview";
import TaskList from "../Project/TaskList";
import {NavLink} from "react-router-dom";
import "./Dashboard.css";

class Dashboard extends Component {
    render() {
        const { tasks } = this.props;

        return (
            <div className="container">
                <Overview />
                <div className="row">
                    <div className="col s2 m5"><h4>Tasks</h4></div>
                    <div className="col s2 m4"><SearchTask /></div>
                    <div className="col s2 m3"><NavLink to='/create' className="btn btn-primary">New Task</NavLink></div>
                </div>
                <div className="card cardst">
                    <div className="col s12 m6">
                        <TaskList tasks={tasks}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default (Dashboard)