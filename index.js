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
    
    pool.query( `SELECT text FROM text WHERE id = (SELECT rev_text_id FROM revisions WHERE id = (SELECT page_latest FROM pages WHERE lower(page_title) = lower('${req.params.pageTitle}')));`,
        
        (err, result) => {
            if(err) {
                return console.error('Error executing query', err.stack)
            }
            res.status(200).json(result.rows)  
        })
}


app.get('/:pageTitle', getArticle);

app.listen(process.env.PORT || 3002, () => {
    console.log(`App running on port ${process.env.PORT || 3002}.`)
});