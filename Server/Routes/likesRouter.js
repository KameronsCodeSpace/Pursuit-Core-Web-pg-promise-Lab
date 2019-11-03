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

    router.get('/userLikes', async(req, res) => {
        try{
            let userLikes = await 
            db.any(`
            SELECT 
                posts.body AS User_Post, ARRAY_AGG (users.firstname || ' ' || users.lastname) Users_Who_Liked
            FROM 
                posts, likes
            INNER JOIN users ON users.id = likes.liker_id
            WHERE 
                posts.id = likes.post_id

            GROUP BY 
                User_Post

            ORDER BY 
                Users_Who_Liked DESC; 
                `)
            res.json({
                payload: userLikes,
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

        router.get('/filteredLikes/:amount', async(req, res) => {
            try{
                let userLikes = await 
                db.any(`
                SELECT 
                    posts.body AS User_Post, COUNT(post_id)
                FROM 
                    posts
                JOIN 
                    likes ON posts.id = likes.post_id
                GROUP BY 
                    posts.id
                HAVING COUNT(post_id) > ${req.params.amount}
                ORDER BY 
                    User_Post DESC
                    `)
                res.json({
                    payload: userLikes,
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