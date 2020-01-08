const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');
const { pool } = require('./queries');


app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(cors());

const getArticle = (req, res) => {
    
    pool.query( 'SELECT text FROM text WHERE id = (SELECT rev_text_id FROM revisions WHERE id = (SELECT page_latest FROM pages WHERE lower(page_title) = lower($1)));', [req.params.pageTitle],
        
        (err, result) => {
            if(err) {
                return console.error('Error executing query', err.stack)
            }
            res.status(200).json(result.rows[0])  
         })
}

const createArticle = (req, res) => {
    const { pageTitle, text } = req.body;

    
}

const editArticle = (req, res) => {
    const { pageTitle, text } = req.body;

    (async () => {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const pageRes = await client.query('SELECT id FROM pages WHERE page_title = $1', [pageTitle]);
            const pageID = pageRes.rows[0].id;
            
            const textRes = await client.query('INSERT INTO text (text) VALUES ($1) RETURNING id', [text]);
            const textID = textRes.rows[0].id;

            const insertRevValues = [pageID, textID];
            const revRes = await client.query('INSERT INTO revision (rev_page, rev_text_id) VALUES ($1, $2) RETURNING id', insertRevValues);
            const revID = revRes.rows[0].id;
            const updateRevValues = [revID, pageID];

            await client.query('UPDATE pages SET page_latest = $1 WHERE id = $2', [updateRevValues]);
            await client.query('COMMIT');

        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        }
        finally {
            client.release();
            res.status(201).send(`Article '${pageTitle}' successfully edited`);
        }


    })().catch(err => console.error('Error executing query', err.stack))

    
}


app.get('/:pageTitle', getArticle);

app.listen(process.env.PORT || 3002, () => {
    console.log(`App running on port ${process.env.PORT || 3002}.`)
});