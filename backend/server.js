// api back
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 4201

// const router = express.Router(); // router ou api
const api = express.Router();
const auth = express.Router();

let users = [
  { id: 1, email: 'juba@vde.fr', name: 'admin', password: 'juba', role: 'admin' },
  { id: 2, email: 'user@vde.fr', name: 'user', password: 'user', role: 'user' }
];
// const fakeUser = { id: 1, email: 'juba@vde.fr', name:'juba', password: 'juba' };
// const fakeUser = { email: 'juba@vde.fr', password: 'juba' };

const secretKey = "9UbmJJMlKa1tH36Bpc8ZG8wfPC2Yv68hA5m5zPdW9CHDdx99EKlu6RjbHsrPevD1";
const jwt = require('jsonwebtoken');


// Import du module jobs
let data = require('./jobs');
// console.log('jobs : ', data.jobs); //toute la liste des jobs
// console.log('jobs : ', Object.values(data.jobs)[0]);
// console.log('jobs : ', Object.values(data.jobs)[1]);

let initalJobs = data.jobs;
let addedJobs = [];


const getAllJobs = () => {
  return [...addedJobs, ...initalJobs];
}

app.use(express.json())
app.use(bodyParser.json());

// midleware pout connecter fron et back
// gérer les autorisations CORS (Cross-Origin Resource Sharing) dans votre application web
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});


app.use('/api', api);  // localhost:4201/api/jobs
app.use('/auth', auth);  // localhost:4201/auth/login
// Si on utilise Route et Controllers Remplacez cette ligne => app.use('/api', api);
// app.use("/jobs", jobsRoutes);
// Par cela si vous utilisez 'api' comme un router => app.use("/api/jobs", jobsRoutes);

// middleware pour renforcer la sécurité coté backend (pas de securité frontend toujours en backend)
const checkUserToken = (req, res, next) => {
  // Authorization : "Bearer azaeazeazeazeazeazeazeazeazeazeaze";
  if (req.header('authorization')) {
    return res.status(401).json({ success: false, message: "Header authorization manquant" });
  }

  const tonkenParts = req.header('authorizaztion').split(' ');
  let token = tonkenParts[1];
  const decodedToken = jwt.verify(token, secretKey);
  console.log('decodedToken ', decodedToken);
  next();
};

auth.post('/login', (req, res) => {
  console.log('req.body : ', req.body);
  if (req.body) {
    const email = req.body.email.toLowerCase();
    const password = req.body.password.toLowerCase();
    const index = users.findIndex(user => user.email === email);

    if (index > -1 && users[index].password === password) {

      let user = users[index];
      let token = '';

      if (user.email === 'juba@vde.fr') {
        token = jwt.sign({ iss: 'http://localhost:4201', email: req.body.email, role: 'admin', name: user.name }, secretKey);
      } else {
        token = jwt.sign({ iss: 'http://localhost:4201', email: req.body.email, role: 'user', name: user.name }, secretKey);
      }

      // res.json({ success: true, data: req.body });
      // iss: 'http://localhost:4201' spécifie que l'émetteur du token est http://localhost:4201. 
      // Cela indique généralement l'URL du service ou de l'application qui a généré le token.
      res.json({ success: true, token: token });
    } else {
      // non autorisé si 401
      res.status(401).json({ success: false, message: "email ou mdp incorrects" });
    }
  } else {
    res.status(500).json({ success: false, message: "données manquantes" });
  }
});


auth.post('/register', (req, res) => {
  // console.log("res.body " , res.body);

  if (req.body) {
    const email = req.body.email.toLocaleLowerCase().trim();
    const password = req.body.password.toLocaleLowerCase().trim();
    // const name = req.body.name.trim();
    // const name = req.body.name.trim();

    // users = [{ id: Date.now(), email: email, name: name, password: password }, ...users];
    users = [{ id: Date.now(), email: email, password: password }, ...users];
    res.json({ success: true, users: users });
  } else {
    res.json({ success: false, message: 'la création a échoué' });
  }
});

// GET ALL JOBS
api.get('/jobs', checkUserToken, (req, res) => {
  // res.json({ success: true, message: 'hello vde' });
  // res.json(data.jobs)
  res.json(getAllJobs())
});

// get jobs par email
api.get('/jobs/:email', (req, res) => {
  const email = req.params.email; // email is a string here

  const jobs = getAllJobs().filter((job) => job.email === email);

  res.json({
    success: true,
    jobs: jobs
  })
});


// get one jobs
api.get('/jobs/:id', (req, res) => {
  let id = req.params.id; // id is a string here
  id = parseInt(id, 10); // cast to id 
  const job = getAllJobs().filter((j) => j.id === id);
  if (job.length === 1) {
    res.json({
      success: true,
      job: job[0]
    })
  } else if (isNaN(id)) {
    res.json({
      success: false,
      message: `le id doit etre un nombre`
    })
  } else {
    res.json({
      success: false,
      message: `pas de job pour ce id : ${id}`
    })
  }
});

// Search Jobs *********
api.get('/search/:term?/:place?', (req, res) => {
  let term = req.params.term
  if (term) {
    term = req.params.term.toLowerCase().trim();
  }

  let place = req.params.place;

  if (term) {
    let jobs = getAllJobs().filter(jb => (jb.description.toLowerCase().includes(term) || jb.title.toLowerCase().includes(term)));

    if (place) {
      place = place.toLowerCase().trim();
      jobs = jobs.filter(jb => (jb.city.toLowerCase().includes(place)));
    }

    if (jobs.length > 0) {
      res.json({ success: true, jobs });
    } else {
      res.json({ message: 'Aucun résultat trouvé !' });
    }
  } else {
    let jobs = getAllJobs();
    res.json({ success: true, jobs });
  }
});

// POST ONE Jobs
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