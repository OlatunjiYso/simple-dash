
exports.up = function(knex) {
    return knex.schema
    .createTable('associations', function(table) {
        table.increments('association_id');
        table.string('association_name', 225);
        table.datetime('association_created_at').defaultTo(knex.fn.now());
        table.datetime('association_updated_at');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTable('associations')
  };
  