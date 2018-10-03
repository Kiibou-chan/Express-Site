const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const db_url = process.env.DB_URL || 'mongodb://localhost:27017';
const db_name = 'calendar';

let callbacks = [];

MongoClient.connect(db_url, {
    useNewUrlParser: true
}, (err, client) => {
    if (err) return console.log(err);
    for (let i = 0; i < callbacks.length; i++) {
        cb = callbacks[i];
        let db = client.db(cb.database);

        callbacks[i].callback(db);
    }
});

module.exports.getDatabase = (database, callback) => {
    callbacks.push(new DBCallback(database, callback));
}

class DBCallback {
    constructor(database, callback) {
        this.database = database;
        this.callback = callback;
    }
}