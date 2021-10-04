const express = require("express");
const recordRoutes = express.Router(); // We use it to define our routes.
const dbo = require("../db/conn"); // This will help us connect to the database
const ObjectId = require("mongodb").ObjectId; // This help convert the id from string to ObjectId for the _id.


// This section will help you get a list of all the records.
recordRoutes.route("/tasks").get(function (req, res) {
    let db_connect = dbo.getDb("task_manager_db");
    db_connect
        .collection("tasks")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you get a single record by id
recordRoutes.route("/tasks/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect
        .collection("tasks")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you delete a record
recordRoutes.route("/tasks/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myQuery = { _id: ObjectId( req.params.id )};
    db_connect.collection("tasks").deleteOne(myQuery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.status(obj);
    });
});

// This section will help you get a record by task name
recordRoutes.route("/tasks/taskName").post(function (req, res) {
    let db_connect = dbo.getDb();
    let myQuery = { task_name: req.body.task_name};
    db_connect
        .collection("tasks")
        .findOne(myQuery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you create a new record.
recordRoutes.route("/tasks/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        task_name: req.body.task_name,
        status: "open",
        create_timestamp: new Date(),
        modified_timestamp: new Date()
    };
    db_connect.collection("tasks").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

// This section will help you update a record by id.
recordRoutes.route("/tasks/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myQuery = { _id: ObjectId( req.params.id )};
    let newValues = {
        $set: {
            task_name: req.body.task_name,
            status: req.body.status,
            modified_timestamp: new Date(),
        },
    };
    db_connect
        .collection("tasks")
        .updateOne(myQuery, newValues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

//This section will help you find a record
recordRoutes.route("/tasks/find").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myQuery = { task_name: req.body.task_name };
    db_connect
        .collection("tasks")
        .findOne(myQuery, function (err, res) {
            if (err) throw err;
            console.log("1 document returned");
            response.json(res);
        });
})

//Mock Login
recordRoutes.route("/login").get(function (req, res) {
    res.send({
        token: 'test123'
    });
});
module.exports = recordRoutes;
