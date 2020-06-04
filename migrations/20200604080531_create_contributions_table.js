
exports.up = function(knex) {
    return knex.schema
    .createTable('contributions', function(table) {
        table.increments('contribution_id');
        table.integer('amount');
        table.string('type', 225);
        table.integer('driver_id').unsigned().notNullable();;
        table.datetime('contribution_created_at').defaultTo(knex.fn.now());
        table.datetime('contribution_updated_at');
        table.foreign('driver_id').references('driver_id').inTable('drivers')
        
    })
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTable('contributions');
  };
  