const express = require('express');
const pgp = require('pg-promise')();

const connectionString = "postgres://localhost:5432/facebook_db"
const db = pgp(connectionString);

const router = express.Router();

router.get('/', async(req, res) => {
    try{
        let postLikes = await 
        db.any(`
        SELECT 
            posts.body AS User_Post, COUNT(post_id) AS Times_liked
        FROM 
            posts
        JOIN 
            likes ON posts.id = likes.post_id
        GROUP BY 
            posts.id
        ORDER BY 
            times_liked DESC
            `)
        res.json({
            payload: postLikes,
            message: "All likes printed"
        });
    } catch(error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong!"
        })
        console.log(error)
        }
    })

module.exports = router;