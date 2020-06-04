
exports.up = function(knex) {
    return knex.schema
    .createTable('drivers', function(table) {
        table.increments('driver_id');
        table.string('name', 225);
        table.string('email', 225);
        table.string('password', 225);
        table.integer('association_id').unsigned().notNullable();;
        table.datetime('driver_created_at').defaultTo(knex.fn.now());
        table.datetime('driver_updated_at');
        table.foreign('association_id').references('association_id').inTable('associations')
        
    })
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTable('drivers');
  };
  