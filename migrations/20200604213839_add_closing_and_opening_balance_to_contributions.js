
exports.up = function(knex) {
  return knex.schema.table('contributions', function(table) {
      table.integer('opening_balance');
      table.integer('closing_balance');
  })
};

exports.down = function(knex) {
  return knex.schema.table('contributions', function() {
      table.dropColumn('opening_balance');
      table.dropColumn('closing_balance');
  })
};
