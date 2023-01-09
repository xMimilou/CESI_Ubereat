## NodeJS, Express and MariaDB

### Command
/user/:id - GET : Retrive all user information by id
/user/all - GET : Retrive all user information
/user/register - POST : Create new user
/user/login - POST : Login user
/user/:id - PUT : Update user information by id
/user/:id - DELETE : Delete user information by id

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
  `referal_by` varchar(45) NOT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;