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

  getProjectWithActions: async (project_id) => {
    const projects = await db('projects').where({id: project_id}).first();
    const actions = await db('actions').where({project_id: project_id});
    return {...projects, actions: actions};
  }
}
