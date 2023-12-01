// api back
// import express from "express"
// import bodyParser from "body-parser"
// import jobsRoutes from "./routes/routes.js"

const express = require('express');
const bodyParser = require('body-parser');

let data = require('./jobs');
// console.log('jobs : ', data.jobs); //toute la liste des jobs
// console.log('jobs : ', Object.values(data.jobs)[0]);
// console.log('jobs : ', Object.values(data.jobs)[1]);

const app = express();

app.use(express.json())
app.use(bodyParser.json());


// const router = express.Router(); // router ou api
const api = express.Router();

api.get('/jobs', (req, res) => {
  // res.json({ success: true, message: 'hello vde' });
  res.json(data.jobs)
});


app.use('/api', api);  // localhost:4201/api/jobs
// app.use("/jobs", jobsRoutes);

const port = 4201

app.listen(port, () => {
  console.log(`listening on port => ${port}`);
})