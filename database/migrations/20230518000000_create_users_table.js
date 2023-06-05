exports.up = async function (knex) {
    await knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.enum('role', ['user', 'admin']).defaultTo('user');
      table.timestamps(true, true);
    });
  };
  
  exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('users');
  };
  