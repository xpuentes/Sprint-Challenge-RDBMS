const express = require('express');

const db = require('./data/dbHelpers');

const server = express();

server.use(express.json());

server.get('/api/projects', (req, res) => {
  db.getProjects()
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.status(500).json({error: 'The data could not be retrieved!'});
    });
});

server.get('/api/projects/:project_id', (req, res) => {
  const { project_id } = req.params;

  db.getProjectWithActions(project_id)
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.status(500).json({error: 'The data could not be retrieved!'});
    });
});

server.post('/api/projects', (req, res) => {
  const { project_name, description } = req.body;

  if(!project_name || !description){
    res.status(400).json({errorMessage: 'Please provide a description and name for the project'});
  } else {
    db.addProject({ project_name, description })
      .then(projects => {
        res.status(201).json(projects);
      }).catch(err => {
        res.status(500).json({error: 'There was an error while saving to the database.'});
      });
  }
});

server.post('/api/actions/:project_id', (req, res) => {
  const { project_id } = req.params;
  const { description, notes } = req.body;

  if(!description || !notes){
    res.status(400).json({errorMessage: 'Please provide a description and additional notes for the action'});
  } else {
    db.addAction({ project_id, description, notes })
      .then(actions => {
        res.status(201).json(actions);
      }).catch(err => {
        res.status(500).json({error: 'There was an error while saving to the database.'});
      });
  }
});

server.get('/api/actions', (req, res) => {
  db.getActions()
    .then(actions => {
      res.json(actions);
    })
    .catch(err => {
      res.status(500).json({error: 'The data could not be retrieved!'});
    });
});

const port = process.env.PORT || 9090;
server.listen(port, () => console.log(`\nrunning on ${port}\n`));
