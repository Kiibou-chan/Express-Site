const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const EventRow = require('./EventRow');
const Event = require('./Event');

let db;
let dbService = require('../../services/DatabaseService');
dbService.getDatabase('calendar', (calDB) => {
    db = calDB;
});

const events = 'events';

router.get('/', (req, res, next) => {
    db.collection(events).find().sort({
        time: 1
    }).toArray((err, results) => {
        res.render('calendar/list', {
            events: results
        });
    });
});

router.route('/create')
    .get((req, res, next) => {
        res.render('calendar/create', {
            event: new Event(null, 'create', {})
        });
    })
    .post((req, res, next) => {
        db.collection(events).insertOne(req.body, (err, result) => {
            if (err) return console.log(err);
            res.redirect('/calendar');
        });
    });

router.route('/details/:id')
    .get((req, res, next) => {
        let id = req.params.id;
        db.collection(events).find({
            _id: new mongo.ObjectID(id)
        }).next((err, doc) => {
            if (err) return console.log(err);
            res.render('calendar/details', {
                event: new Event(id, 'details', doc)
            });
        });
    });

router.route('/edit/:id')
    .get((req, res, next) => {
        let id = req.params.id;
        db.collection(events).find({
            _id: new mongo.ObjectID(id)
        }).next((err, doc) => {
            if (err) return console.log(err);
            res.render('calendar/edit', {
                event: new Event(id, 'edit', doc)
            });
        });
    })
    .post((req, res, next) => {
        let id = req.params.id;

        let values = {};

        for (const key in req.body) {
            const element = req.body[key];
            values.key = element;
        }

        db.collection(events).findOneAndUpdate({
                _id: new mongo.ObjectID(id)
            }, {
                $set: values
            }, {
                upsert: false
            },
            (err, result) => {
                if (err) return console.log(err);
                res.redirect('/calendar');
            }
        );
    });

router.route('/delete/:id')
    .get((req, res, next) => {
        let id = req.params.id;
        db.collection(events).find({
            _id: new mongo.ObjectID(id)
        }).next((err, doc) => {
            if (err) return console.log(err);

            res.render('calendar/delete', {
                event: new Event(id, 'delete', doc)
            });
        });
    })
    .post((req, res, next) => {
        let id = req.params.id;
        db.collection(events).findOneAndDelete({
            _id: new mongo.ObjectID(id)
        }, (err, result) => {
            if (err) return res.send(500, err);

            res.redirect('/calendar');
        });
    });

module.exports = router;