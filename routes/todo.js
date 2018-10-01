const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const db_url = process.env.DB_URL || 'mongodb://localhost:27017';
const db_name = 'todo-list';

var db;
MongoClient.connect(db_url, {
    useNewUrlParser: true
}, (err, client) => {
    if (err) return console.log(err);
    db = client.db(db_name);
});

router.get('/list', (req, res, next) => {
    db.collection('items').find().sort({
        time: 1
    }).toArray((err, results) => {
        res.render('todo/list', {
            todoList: results
        });
    });
});

router.route('/add')
    .get((req, res, next) => {
        res.render('todo/add');
    })
    .post((req, res, next) => {
        db.collection('items').insertOne(req.body, (err, result) => {
            if (err) return console.log(err);

            console.log('saved to database');
            res.redirect('/todo/list');
        });
    });

router.route('/edit/:id')
    .get((req, res, next) => {
        let id = req.params.id;
        db.collection('items').find({
            _id: new mongo.ObjectID(id)
        }).next((err, doc) => {
            if (err) return console.log(err);
            res.render('todo/edit', {
                item: doc
            });
        });
    })
    .post((req, res, next) => {
        let id = req.params.id;
        db.collection('items').findOneAndUpdate({
                _id: new mongo.ObjectID(id)
            }, {
                $set: {
                    time: req.body.time,
                    item: req.body.item
                }
            }, {
                upsert: false
            },
            (err, result) => {
                if (err) return console.log(err);

                res.redirect('/todo/list');
            }
        );
    });

router.route('/delete/:id')
    .get((req, res, next) => {
        let id = req.params.id;
        db.collection('items').find({
            _id: new mongo.ObjectID(id)
        }).next((err, doc) => {
            if (err) return console.log(err);

            res.render('todo/delete', {
                item: doc
            });
        });
    })
    .post((req, res, next) => {
        let id = req.params.id;
        db.collection('items').findOneAndDelete({
            _id: new mongo.ObjectID(id)
        }, (err, result) => {
            if (err) return res.send(500, err);

            res.redirect('/todo/list');
        });
    });

module.exports = router;