exports.up = async function (knex) {
    await knex.schema.createTable('bookings', (table) => {
      table.increments('id').primary();
      table.integer('userId').unsigned().references('users.id').onDelete('CASCADE');
      table.integer('tripId').unsigned().references('trips.id').onDelete('CASCADE');
      table.date('startDate').notNullable();
      table.date('endDate').notNullable();
      table.string('transportation').notNullable();
      table.string('accommodations').notNullable();
      table.specificType('additionalServices', 'text[]');
      table.decimal('totalPrice', 10, 2).notNullable();
      table.enum('status', ['pending', 'confirmed', 'cancelled']).defaultTo('pending');
      table.timestamps(true, true);
    });
  };
  
  exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('bookings');
  };
  