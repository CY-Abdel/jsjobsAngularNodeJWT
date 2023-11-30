import express from "express"

// const router = express.Router();
const api = express.Router();

api.get('/jobs', (req, res) => {
  res.json({success: true, message: 'hello vde'});
});

app.use('/api', api);