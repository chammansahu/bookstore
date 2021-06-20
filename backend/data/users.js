import bcrypt from 'bcryptjs'

const users = [
  {
    name: "Agam",
    lname: "Sahu",
    email: "agam@gmail.com",
    mobile: 9087654321,
    password: bcrypt.hashSync("1234", 8),
    isAdmin: true,
  },
  {
    name: "John",
    lname: "Cena",
    email: "john@yahoo.com",
    mobile: 9087654321,
    password: bcrypt.hashSync("1234567", 8),
    isAdmin: false,
  },
];

export default users
