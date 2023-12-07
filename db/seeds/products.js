/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('products').del()
  await knex('products').insert([
    {id: 1, name: 'N23',cost: 231},
    {id: 2, name: 'b34', cost: 453},
  ]);
};
