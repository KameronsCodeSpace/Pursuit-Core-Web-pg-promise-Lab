const express = require('express');
const pgp = require('pg-promise')(); //returns a function thats invoked
const connectionString = "postgres://localhost:5432/facebook_db" //URL where postgress is running
const db = pgp(connectionString); //connected db instance

const router = express.Router();

router.get('/', async (req, res) => {
    // // ES5 method of dealing with promises
    // db.any('SELECT * FROM users WHERE id = 5')
    //   .then((rows) => {
    //       console.log(rows)
    //       res.json(rows)
    //   })
    //   .catch((error) => {
    //       console.log(error)
    //   })

      //ES6 method async-await with try-catch
    try{
        let users = await db.any("SELECT * FROM users")
        res.json({
            payload: users,
            message: "Success. Retrived all users"
        });
    } catch(error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong!"
        })
        console.log(error)
    }
})

router.post('/register', async (req, res) => {
    //firstname, lastname, age
    console.log(req.body)

    try {
        let insertQuery = `INSERT INTO users(firstname, lastname, age)
        VALUES($1, $2, $3)`

        await db.none(insertQuery, [req.body.firstname, req.body.lastname, req.body.age])
            
    res.json({
        payload: req.body,
        message: 'User registered'
    })
    } catch (error) {
            
    res.json({
        message: "Error. Something went wrong!"
    })

    }

})

module.exports = router;