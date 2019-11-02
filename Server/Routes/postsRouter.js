const express = require('express');
const pgp = require('pg-promise')();

const connectionString = "postgres://localhost:5432/facebook_db"
const db = pgp(connectionString);

const router = express.Router();

router.get('/', async(req,res) => {
    try{
        let posts = await db.any("SELECT * FROM posts")
        res.json({
            payload: posts,
            message: "Printed all posts"
        });
    } catch(error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong!"
        })
        console.log(error)
    }
})

router.get('/:user_id', async (req, res) => {
    //ES6 method async-await with try-catch
  try{
      let user = await db.any(`SELECT * FROM posts WHERE poster_id = 
      (SELECT id FROM users WHERE id = ${req.params.user_id})`)
      
      res.json({
          payload: user,
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
    console.log(req.body)

    try {
        let insertQuery = `INSERT INTO posts(poster_id, body)
        VALUES($1, $2)`
        
        await db.none(insertQuery, [req.body.poster_id, req.body.body])
    
    res.json({
        payload: req.body,
        message: 'Post created'
    })
    } catch (error) {
        console.log(error);
        res.json({
            message: "Error. Something went wrong!"
        })    
    }
})

module.exports = router;