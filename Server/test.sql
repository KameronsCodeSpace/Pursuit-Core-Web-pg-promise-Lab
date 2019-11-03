            \c facebook_db

                SELECT 
                    posts.body AS User_Post, ARRAY_AGG (users.firstname || ' ' || users.lastname) Users_Who_Liked
                FROM posts, likes
                INNER JOIN users ON users.id = likes.liker_id
                WHERE posts.id = likes.post_id

                GROUP BY 
                    User_Post

                ORDER BY 
                    Users_Who_Liked DESC; 

            -- SELECT 
            -- posts.body AS User_Post, ARRAY_AGG (users.firstname || ' ' || users.lastname) Users_Who_Liked
            -- FROM 
            --     ((users
            -- INNER JOIN likes ON users.userid = likes.liker_id)
            -- INNER JOIN posts ON posts.poster_id = likes.post_id)
            
            -- GROUP BY 
            --     User_Post
            -- ORDER BY 
            --     Users_Who_Liked DESC;

                -- SELECT 
                --     posts.body AS User_Post, ARRAY_AGG (users.firstname || ' ' || users.lastname) Users_Who_Liked
                -- FROM users, likes
                -- INNER JOIN posts ON posts.id = likes.liker_id
                -- GROUP BY 
                --     User_Post
                -- ORDER BY 
                --     Users_Who_Liked DESC;