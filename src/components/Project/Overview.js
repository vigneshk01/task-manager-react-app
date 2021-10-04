import React,  {Component}  from "react";
import {Chart} from "react-google-charts";
import axios from "axios";
import "./Overview.css";

class Overview extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
        };
    }

    componentDidMount() {
        axios
            .get(process.env.REACT_APP_SERVER_URL+"tasks/")
            .then((response) => {
                this.setState({ tasks: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    validateStatus() {
        let data = this.state.tasks
        let totalCount = data.length
        const completedTask = data.filter(value => value.status === 'closed')
        const completedCount= completedTask.length
        const pendingCount = totalCount - completedCount
        return ( [completedCount,pendingCount, totalCount])
    }

    latestTasks() {
        let data = this.state.tasks
        const sortedActivities = data.slice().sort(function compare(a,b) {
            const dateA = new Date(a.modified_timestamp);
            const dateB = new Date(b.modified_timestamp);
            return dateB - dateA;
        });
        const newData = sortedActivities.slice(0,3).map((dt) => {const { task_name} = dt; return {task_name};})
        const rows = [];
        newData.map((a) => rows.push(a.task_name));
        return (rows)
    }

    render() {
        return (
            <div className="row flex-container">
                <div className="col m4">
                    <div className="card cardst task-summary">
                        <div className="card-content grey-text text-darken-3">
                            <span className="card-title black-text big text-darken-4">Tasks Completed</span>
                            <div><span className="blue-text bigger">{this.validateStatus()[0]}</span>
                                <span className="black-text ">/{this.validateStatus()[2]}</span></div>
                        </div>
                    </div>
                </div>
                <div className="col m4">
                    <div className="card cardst task-summary">
                        <div className="card-content  grey-text text-darken-3">
                            <span className="card-title black-text big text-darken-4">Latest Created Tasks</span>
                            {this.latestTasks().map((val,idx) => (<li key={idx}>{val}</li>))}
                        </div>
                    </div>
                </div>
                <div className="col m4">
                    <div className="card cardst task-summary">
                        <Chart className="" style={{padding: '5px'}}
                               chartType="PieChart"
                               loader={<div>Loading Chart</div>}
                               data={[ ['Activity', 'Count'],['Pending', this.validateStatus()[1]], ['Completed', this.validateStatus()[0]] ]}
                               options={{ legend: 'label', pieSliceText: 'none', pieStartAngle: 100, height:'135' }}
                               rootProps={{ 'data-testid': '4' }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Overview
