const express = require('express');
const { MongoClient } = require('mongodb');

// const cs = "mongodb+srv://STRING-URL";
let db;
let books;

async function start() {
    const client = new MongoClient(cs);
    await client.connect();

    db = client.db("test");
    books = db.collection("books");

    console.log("Listening");
    app.listen(3001);
}

const app = express();


//Rickster's CORS middleware handler
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header('Cache-control', `no-store`)
    if (req.method === "OPTIONS") res.sendStatus(200);
    else next();
});
app.use(express.json());    // <==== parse request body as JSON


app.use('/books/:id', async (req, res, next) => {
    try {
        const _id = req.params.id.toString();
        const exists = await books.countDocuments({ id: _id }) > 0;

        if ((req.method === 'PUT' || req.method === 'GET') && !exists) {
            return res.status(404).send(`${_id} not found`);
        }

        if (req.method === 'DELETE' && !exists) {
            return next();
        }

        next();
    } catch (err) {
        console.error(err);
        return res.status(500).send('Failed to check book existence');
    }
});


app.get('/books', async (req, res) => {
    try {
        const query = {};
        if (req.query.avail !== undefined) {
            query.avail = (req.query.avail.toLowerCase() === 'true');
        }
        const projection = { _id: 0, id: 1, title: 1 };
        const booksList = await books.find(query).project(projection).toArray();
        return res.json(booksList);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Failed to retrieve books");
    }
});



app.get('/books/:id', async (req, res) => {
    try {
        const book = await books.findOne({ id: req.params.id });
        if (!book) {
            return res.status(404).send("Book not found");
        }
        return res.json(book);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Failed to retrieve book");
    }
});



app.put('/books/:id', async (req, res) => {
    try {
        const bookId = req.params.id.toString();
        const updateResult = await books.updateOne({ id: bookId }, { $set: req.body });
        if (updateResult.modifiedCount === 0) {
            return res.status(404).send("Book not found");
        }
        return res.status(200).json("Book updated");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Failed to update book");
    }
});




app.delete('/books/:id', async (req, res) => {
    try {
        const book = await books.findOne({ id: req.params.id });
        if (!book) {
            return res.status(404).send("Book not found");
        }
        await books.deleteOne({ id: req.params.id });
        return res.status(200).send("Book deleted");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Failed to delete book");
    }
});




app.post('/books', async (req, res) => {
    const bookId = req.body.id.toString();
    const bookExists = await books.findOne({ id: bookId });

    if (bookExists) {
        return res.status(409).send("A book with the same ID already exists");
    }

    try {
        const result = await books.insertOne(req.body);
        return res.status(201).json(result.ops[0]);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Failed to create book");
    }
});

start()