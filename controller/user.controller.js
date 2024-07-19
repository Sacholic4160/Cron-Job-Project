const pool = require('../index.js')



const createTable = async (req, res) => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        age INTEGER
      );
    `;
    await pool.query(query);

    // Check if table exists
    const checkQuery = `SELECT to_regclass('public.users')`;
    const result = await pool.query(checkQuery);
    console.log(result)
    const tableExists = result.rows[0].to_regclass !== null;
    console.log(tableExists)

    if (tableExists) {
      console.log('Table exists or created successfully');
      return res.status(200).json({ message: 'Table exists or created successfully' });
    } else {
      console.log('Table creation failed');
      return res.status(500).json({ message: 'Table creation failed' });
    }
  } catch (error) {
    console.log('Error while creating the table!', error);
    return res.status(500).json({ message: 'Error while creating the table', error });
  }
};




const createUser = async (req, res) => {
  try {
    const query = `INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *`;
    const values = [req.body.name, req.body.email, req.body.age];
 //   console.log(values)
    const result = await pool.query(query, values);
   // console.log(result);
    return res.status(200).json({ message: 'User created successfully', user: result.rows[0] });
  } catch (error) {
    console.log('Error while creating user', error);
    return res.status(500).json({ message: 'Error while creating user', error });
  }
};

module.exports = { createTable, createUser }