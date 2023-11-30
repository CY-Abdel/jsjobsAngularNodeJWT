// api back
import express from "express"
import bodyParser from "body-parser"
// import jobsRoutes from "./routes/routes.js"

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json())
app.use(bodyParser.json());

const api = express.Router();

api.get('/jobs', (req, res) => {
  res.json({success: true, message: 'hello vde'});
});


app.use('/api', api);  // localhost:4201/api/jobs
app.use("/jobs", jobsRoutes);

const port = 4201

app.listen(port, () => {
  console.log(`ecouter le port ${port}`);
})