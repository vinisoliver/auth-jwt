Sign Up: 
- Username * (UNIQUE)
- First Name *
- Last Name
- Email *
- Date of Birth *
- Number *
- CEP
- CPF (UNIQUE)
- Password *

Login Up:
- Username | CPF *
- Password *

MySQL Commands:
```sql
  CREATE DATABASE auth_jwt

  CREATE TABLE users (
    username VARCHAR(30) NOT NULL,
    password VARCHAR(35) NOT NULL,
    cep VARCHAR(8),
    cpf VARCHAR(11),
    dateOfBirth DATE NOT NULL,
    email VARCHAR(40) NOT NULL,
    firstName VARCHAR(20) NOT NULL, 
    lastName VARCHAR(40) DEFAULT '', 
    phoneNumber VARCHAR(11) NOT NULL,

    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    id VARCHAR(200) NOT NULL,

    PRIMARY KEY(id)
  )
```