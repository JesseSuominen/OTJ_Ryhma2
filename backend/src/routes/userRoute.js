var express = require('express');
const sqlite3 = require('sqlite3').verbose();
var userRouter = express.Router();
const bcrypt = require('bcryptjs');
const { v4 } = require('uuid');
const jwt = require('jsonwebtoken')


const path = require('path');
const dbPath = path.resolve(__dirname, '../../database.db');
const db = new sqlite3.Database(dbPath);

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const BAD_REQUEST = 400;
const HTTP_STATUS_NOK = 404;
const INTERNAL_ERROR = 500;

// Returns usernames and ids
// example: GET http://localhost:5000/api/user/usernames
userRouter.get('/usernames', (req, res) => {
  const SQL_SELECT = `
      SELECT    id,
                username
      FROM      user
      ORDER BY  id
    `;
  db.all(SQL_SELECT, (err, rows) => {
    if (err) {
      console.error('Error fetching usernames:', err);
      return res.status(INTERNAL_ERROR).json({ error: 'Something unexpected went wrong' });
    }
    if (!rows || rows.length === 0) {
      return res.status(HTTP_STATUS_NOK).json({ error: 'No users found' });
    }
    res.status(HTTP_STATUS_OK).json(rows.map(row => ({ id: row.id, username: row.username })));
  });
});




// Returns password belonging to the user id
// example: GET http://localhost:5000/api/user/password?id=1
userRouter.get('/password', (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(BAD_REQUEST).json({ error: 'User id parameter is required' });
  }
  const SQL_SELECT = `
      SELECT  password
      FROM    user
      WHERE   id = ?
    `;
  db.get(SQL_SELECT, [id], (err, row) => {
    if (err) {
      console.error('Error fetching password:', err);
      return res.status(INTERNAL_ERROR).json({ error: 'Something unexpected went wrong' });
    }
    if (!row) {
      return res.status(HTTP_STATUS_NOK).json({ error: 'User not found' });
    }
    res.status(HTTP_STATUS_OK).json({ password: row.password });
  });
});


// Inserts user into user table
// username and password can't be null
// example: POST http://localhost:5000/api/user/post
// Content-Type: application/json
// {"username": "added_user", "password": "generic_pw"}

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  const hashPassword = async () => {
    try {
      return await bcrypt.hash(password, 12);
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: "Something went wrong"});
    }
  }
  console.log('uo')
  if (!username || !password) {
    return res.status(BAD_REQUEST).json({ error: 'Username and password are required' });
  }

  try {
    const SQL_SELECT = `
        SELECT    id,
                  username
        FROM      user
        WHERE   username = ?
      `;

    await db.get(SQL_SELECT, [username], async (err, row) => {
      if (err) {
        return res.status(500).json({message: "Something went wrong"})
      } else {

        if(row) {
          if(row.username) {

            return res.status(422).json({message: "user exists"})

          }
        } else {

          let hashedPw = await hashPassword();


          const SQL_INSERT = `
          INSERT INTO user
            (username, password)
          VALUES
            (?, ?)
          `;

          await db.run(SQL_INSERT, [username, hashedPw], function (err) {
            if (err) {
              console.error('Error inserting user:', err);
              return res.status(BAD_REQUEST).json({ error: 'Failed to create user' });
            }
            const id = this.lastID;

            const token = jwt.sign(
                  {
                    username,
                    user_id: id,
                  },
                  process.env.JWT_KEY,
                  { expiresIn: '1h' }
                )

                return res.status(HTTP_STATUS_CREATED).json(
                  {
                    username,
                    token,
                    user_id: id,
                  }
                )
          });
        }


      }
    });

  } catch (err) {
    console.log(err)
    return res.status(500).json({message: "Something went wrong"})
  }

}

userRouter.post('/signup', registerUser);

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const hashPassword = async () => {
    try {
      return await bcrypt.hash(password, 12);
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: "Something went wrong"});
    }
  }
  console.log('uo')
  if (!username || !password) {
    return res.status(BAD_REQUEST).json({ error: 'Username and password are required' });
  }

  try {
    const SQL_SELECT = `
        SELECT    id,
                  username,
                  password
        FROM      user
        WHERE   username = ?
      `;

    await db.get(SQL_SELECT, [username], async (err, row) => {
      if (err) {
        return res.status(500).json({message: "Something went wrong"})
      } else {

        if(row) {
          if(row.username) {


            let isValid = await bcrypt.compare(password, row.password);
            if(!isValid) {
              return res.status(401).json({message: "Invalid password"})
            }
            const token = jwt.sign(
              {
                user_id: row.id,
                username,
              },
              process.env.JWT_KEY,
              { expiresIn: '1h' }
            )

            return res.status(HTTP_STATUS_OK).json(
              {
                username,
                token,
                user_id: row.id,
              }
            )

          }
        } else {
          return res.status(401).json({message: "Invalid username"})
        }


      }
    });

  } catch (err) {
    console.log(err)
    return res.status(500).json({message: "Something went wrong"})
  }

}

userRouter.post('/login', loginUser);

// Update user's password by user's id
// example: PUT http://localhost:5000/api/user/update/1
// Content-Type: application/json
// {"password": "new_password123"}
userRouter.put('/update/:id', (req, res) => {
  const id = req.params.id
  const { password } = req.body

  const SQL_UPDATE = `
    UPDATE  user
    SET     password = ?
    WHERE   id = ?
  `;
  db.run(SQL_UPDATE, [password, id], function (err) {
    if (err) {
      return res.status(BAD_REQUEST).json({ error: 'Failed to update user' });
    }
    if (this.changes === 0) {
      // No rows were affected by the UPDATE operation
      return res.status(HTTP_STATUS_NOK).json({ error: 'User id not found' });
    }
    res.status(HTTP_STATUS_OK).json({ message: 'User updated successfully' });
  });
});

// Delete user
// example: DELETE http://localhost:5000/api/user/delete/1
userRouter.delete('/delete/:id', (req, res) => {
  const id = req.params.id

  const SQL_DELETE = `
    DELETE FROM   user
    WHERE         id = ?
    `
  db.run(SQL_DELETE, [id], function (err) {
    if (err) {
      return res.status(BAD_REQUEST).json({ error: 'Failed to delete user' });
    }
    if (this.changes === 0) {
      return res.status(HTTP_STATUS_NOK).json({ error: 'User id not found' });
    }
    res.status(HTTP_STATUS_OK).json({ message: 'User deleted successfully' });
  });
});

module.exports = userRouter;
