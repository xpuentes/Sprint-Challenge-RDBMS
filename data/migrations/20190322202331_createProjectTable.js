
exports.up = function(knex, Promise) {
  return knex.schema.createTable('project', tbl => {
    tbl.increments();

    tbl.string('project_name', 128)
       .notNullable()
       .unique();

    tbl.string('description')
       .notNullable();

    tbl.boolean('complete');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('project');
};
