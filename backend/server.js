// api back
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 4201
// const router = express.Router(); // router ou api
const api = express.Router();

// Import du module jobs
let data = require('./jobs');
// console.log('jobs : ', data.jobs); //toute la liste des jobs
// console.log('jobs : ', Object.values(data.jobs)[0]);
// console.log('jobs : ', Object.values(data.jobs)[1]);

let initalJobs = data.jobs;
let addedJobs = [];

const getAllJobs = () => {
  return [...addedJobs, ... initalJobs];
}

app.use(express.json())
app.use(bodyParser.json());

// midleware pout connecter fron et back
// gérer les autorisations CORS (Cross-Origin Resource Sharing) dans votre application web
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/api', api);  // localhost:4201/api/jobs
// Si on utilise Route et Controllers Remplacez cette ligne => app.use('/api', api);
// app.use("/jobs", jobsRoutes);
// Par cela si vous utilisez 'api' comme un router => app.use("/api/jobs", jobsRoutes);


api.get('/jobs', (req, res) => {
  // res.json({ success: true, message: 'hello vde' });
  // res.json(data.jobs)
  res.json(getAllJobs())
});

api.post('/jobs', (req, res) => {
  console.log("**************************************");
  const job = req.body; // body middleware bodyParser
  addedJobs = [job, ...addedJobs];
  // console.log('nb total de job : ', addedJobs.length);
  console.log('nb total de job : ', getAllJobs().length);
  res.json(job);
});


app.listen(port, () => {
  console.log(`"connected!" => listening on port => ${port}`);
})