const bcrypt = require('bcryptjs');
const db = require('./app/models');
const fs = require('fs').promises;
const { createBooksFromJSON } = require('./app/controllers/book.controller.js');
const { createRoomsFromJSON } = require('./app/controllers/room.controller.js');
const init = async () => {
  // Call the function to load books from JSON and save to the database
  await createBooksFromJSON('test.json');
  // Call the function to load rooms from JSON and save to the database
  await createRoomsFromJSON('test2.json');

  const user = await db.users.findOne({ where: { email: 'admin@vgu.edu.vn' } });
  if (!user) {
    const hashedPassword = bcrypt.hashSync('Password123#', 8);
    await db.users.create({
      username: 'admin',
      email: 'admin@vgu.edu.vn',
      password: hashedPassword,
      role: 'admin',
      fname: 'Benasin',
      lname: 'Tran'
    });
  }
}

init();