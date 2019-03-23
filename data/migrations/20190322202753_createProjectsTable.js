
exports.up = function(knex, Promise) {
  return knex.schema.createTable('projects', tbl => {
    tbl.increments();

    tbl.string('project_name', 128)
       .notNullable();

    tbl.string('description')
       .notNullable();

    tbl.boolean('complete')
       .defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('projects');
};
