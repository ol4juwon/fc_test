/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('category', (table) => {
    table.increments('id').primary();
    table.string('name', 40).notNullable();
    table
      .integer('brands_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('brands');
    table
      .timestamp('created_at', { precision: 6, useTz: true })
      .defaultTo(knex.fn.now(6));
    table
      .timestamp('updated_at', { precision: 6, useTz: true })
      .defaultTo(knex.fn.now(6));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('category');
};
