exports.up = async function (knex) {
    await knex.schema.createTable('trips', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.integer('duration').notNullable();
      table.string('location').notNullable();
      table.string('activityType').notNullable();
      table.decimal('price', 10, 2).notNullable();
      table.integer('availableSlots').notNullable();
      table.date('startDate').notNullable();
      table.date('endDate').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('trips');
  };
  