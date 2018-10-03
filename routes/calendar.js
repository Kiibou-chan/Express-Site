const express = require('express');
const router = express.Router();
const mongo = require('mongodb');

let db;
let dbService = require('../services/DatabaseService');
dbService.getDatabase('calendar', (calDB) => {
    db = calDB;
});

const events = 'events';

router.get('/', (req, res, next) => {
    console.log(db);
    db.collection(events).find().sort({
        time: 1
    }).toArray((err, results) => {
        res.render('calendar/list', {
            calendarList: results
        });
    });
});

router.route('/add')
    .get((req, res, next) => {
        res.render('calendar/add');
    })
    .post((req, res, next) => {
        db.collection(events).insertOne(req.body, (err, result) => {
            if (err) return console.log(err);
            res.redirect('/calendar/list');
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
                event: doc
            });
        });
    })
    .post((req, res, next) => {
        let id = req.params.id;
        db.collection(events).findOneAndUpdate({
                _id: new mongo.ObjectID(id)
            }, {
                $set: {
                    time: req.body.time,
                    event: req.body.event
                }
            }, {
                upsert: false
            },
            (err, result) => {
                if (err) return console.log(err);

                res.redirect('/calendar/list');
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
                event: doc
            });
        });
    })
    .post((req, res, next) => {
        let id = req.params.id;
        db.collection(events).findOneAndDelete({
            _id: new mongo.ObjectID(id)
        }, (err, result) => {
            if (err) return res.send(500, err);

            res.redirect('/calendar/list');
        });
    });

module.exports = router;