var config = module.exports;
var userRoles = config.userRoles = {
  guest: 1,    // ...001
  user: 2,     // ...010
  admin: 4     // ...100
};

config.db = {
  user: 'root',
  password: 'qazx1234',
  name: 'vuedb'
};

config.db.details = {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql'
};

config.keys = {
  secret: 'comahead'
};

config.accessLevels = {
  guest: userRoles.guest | userRoles.user | userRoles.admin,    // ...111
  user: userRoles.user | userRoles.admin,                       // ...110
  admin: userRoles.admin                                        // ...100
};
