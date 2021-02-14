const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');
const { pool } = require('./queries');
const path = require('path');
const enforce = require('express-sslify');

if(process.env.NODE_ENV === 'production') {
	app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(cors());

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
}

const getArticle = (req, res) => {

    pool.query('SELECT text FROM text WHERE id = (SELECT rev_text_id FROM revisions WHERE id = (SELECT page_latest FROM pages WHERE lower(page_title) = lower($1)));', [req.params.pageTitle],

        (err, result) => {
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            if (result.rows.length > 0) {
                res.status(200).json(result.rows[0])
            }
            else {
                res.status(200).json({});
            }
        })
}

const putArticle = (req, res) => {
    const pageTitle = req.params.pageTitle;
    pool.query('SELECT id FROM pages WHERE lower(page_title) = lower($1)', [pageTitle],
        (err, result) => {
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            else {
                const isNewArticle = result.rows.length == 0;
                handleArticle(req, res, isNewArticle).catch(err => {
                    console.error('Error executing query', err.stack)
                });
            }

        }
    );
}


async function handleArticle(req, res, isNewArticle) {
    const client = await pool.connect();
    const { text } = req.body;
    const pageTitle = req.params.pageTitle;

    try {
        await client.query('BEGIN');

        const pageQuery = isNewArticle ? 'INSERT INTO pages (page_title) VALUES ($1) RETURNING id' : 'SELECT id FROM pages WHERE lower(page_title) = lower($1)';

        const pageRes = await client.query(pageQuery, [pageTitle]);
        const pageID = pageRes.rows[0].id;

        const textRes = await client.query('INSERT INTO text (text) VALUES ($1) RETURNING id', [text]);
        const textID = textRes.rows[0].id;

        const insertRevValues = [pageID, textID];
        const revRes = await client.query('INSERT INTO revisions (rev_page_id, rev_text_id) VALUES ($1, $2) RETURNING id', insertRevValues);

        const revID = revRes.rows[0].id;
        const search_vector = [
            String(pageTitle),
            String(text)
        ];
        const updateRevValues = [revID, search_vector, pageID];

        await client.query('UPDATE pages SET page_latest = $1, search_vector = to_tsvector($2) WHERE id = $3', updateRevValues);
        await client.query('COMMIT');

        if (isNewArticle) {
            res.status(201).send(`Article '${pageTitle}' successfully created`);
        }
        else {
            res.status(200).send(`Article '${pageTitle}' successfully edited`);
        }

    } catch (err) {
        await client.query('ROLLBACK');
        let errMessage = isNewArticle ? `Failed to create '${pageTitle}'` : `Failed to edit '${pageTitle}'`;
        res.status(400).send(errMessage);
        throw err;
    }
    finally {
        client.release();

    }
}

const searchArticle = (req, res) => {
    const query = req.params.query;
    pool.query('SELECT page_title, text FROM pages JOIN (SELECT revisions.id,text FROM revisions join text ON revisions.rev_text_id = text.id) AS t ON pages.page_latest = t.id WHERE lower(page_title) = lower($1);', [query],
    (err, result) => {
            if (err) {
                return console.error('Error executing query', err.stack);
            }
            else if (result.rows.length == 1) {
                res.status(200).json(result.rows);
            }
            else {
                pool.query('SELECT page_title, text FROM pages JOIN (SELECT revisions.id,text FROM revisions join text ON revisions.rev_text_id = text.id) AS t ON pages.page_latest = t.id WHERE search_vector @@ plainto_tsquery($1);', [query],
                (err, result) => {
                    if (err) {
                        return console.error('Error executing query', err.stack);
                    }
                    else if (result.rows.length > 0) {
                        res.status(200).json(result.rows);
                    }
                    else {
                        res.status(200).json([]);
                    }
                })
            }
    });
}

app.get('/api/article/:pageTitle', getArticle);
app.get('/api/search/:query', searchArticle);
app.put('/api/:pageTitle', putArticle);

if(process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });
}

app.listen(process.env.PORT || 3002, () => {
    console.log(`App running on port ${process.env.PORT || 3002}.`)
});
