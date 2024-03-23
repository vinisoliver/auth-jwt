User: 
- Username
- First Name
- Last Name
- Email
- Date of Birth
- Number
- CEP
- CPF
- Password

MySQL Commands:
```sql
  CREATE DATABASE auth_jwt

  CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL DEFAULT '',
    password VARCHAR(35) NOT NULL DEFAULT '',
    PRIMARY KEY(id)
  )
```