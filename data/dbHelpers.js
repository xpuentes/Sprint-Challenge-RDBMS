const db = require('./dbConfig.js');

module.exports = {

  addProject: (newProject) => {
    return db('projects').insert(newProject);
  },

  addAction: (newAction) => {
    return db('actions').insert(newAction);
  },

  getProjects: () => {
    return db('projects');
  },

  getActions: () => {
    return db('actions');
  },

  getProjectWithActions: (project_id) => {
    return db('projects')
            .where('id', project_id)
            .then(actions => {
              return db('actions')
                      .select('*')
                      .where('project_id', project_id);
            });
  }
}
