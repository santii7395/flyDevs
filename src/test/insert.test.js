const userController = require('../controllers/user-controller');
require('dotenv').config();
require('../config/mongo');

jest.setTimeout(30000);

test('insert a user returns the new user', () => {
  return userController.create('UserId', 'Nombre', 'Apellido', 27, 'Contraseña').then(user => {
    expect(user).toMatchObject({
      userId: 'UserId',  
      name: 'Nombre',
      lastname: 'Apellido',
      age: 27
    });
  }) 
});
