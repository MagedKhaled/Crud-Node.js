/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  return knex('users').insert([
    {id: 1, name: 'Maged Khaled', email: 'Maged.Khaled@gmail.com'},
    {id: 2, name: 'Ahmed Salama', email: 'AhmedSalama@gmail.com'},
    {id: 3, name: 'Mohamed Ahmed', email: 'Mohamed@gmail.com'}
  ]);
};
