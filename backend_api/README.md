## NodeJS, Express and MariaDB

### Command
/users/user/:id - GET : Retrive all user information by id
/users/all - GET : Retrive all user information
/users/register - POST : Create new user
/users/login - POST : Login user
/users/:id - PUT : Update user information by id
/users/:id - DELETE : Delete user information by id
/users/resetpassword - PUT : Reset password

### Database
CREATE TABLE `user` (
  `iduser` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `referal_code` varchar(45) NOT NULL,
  `referal_by` varchar(45) NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;