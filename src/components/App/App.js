import React  from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Auth/Login';
import useToken from './useToken';
import Navbar from "../Layout/Navbar";
import CreateTask from "../Project/CreateTask";
import EditTask from "../Project/EditTask";

function App() {
    const { token, setToken } = useToken();

    if(!token) {
        return <Login setToken={setToken} />
    }

    return (
            <BrowserRouter>
                <div className="App">
                    <Navbar />
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route path='/signIn' component={Login} />
                    <Route path='/create' component={CreateTask} />
                    <Route path='/edit/:id' component={EditTask} />
                </Switch>
                </div>
            </BrowserRouter>
    );
}

export default App;