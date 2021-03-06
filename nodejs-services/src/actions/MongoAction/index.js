const Action = require('../action');
const MongoClient = require('mongodb').MongoClient;
const faker = require('faker');

class MongoAction extends Action {
    constructor(name, props) {
        super(name, props);
        this.type = "MongoAction";
    }

    async execute() {
        var m = this;
        m.logger.log('info', "Executing " + m.type);

        var conn; 
        try {
            conn = await MongoClient.connect("mongodb://" + m.props.connectionString);
            var db = conn.db(m.props.database);
            if (m.props.action.toUpperCase() == "INSERT") {
                m.logger.log('info', 'Inserting document...');
                var doc = faker.helpers.userCard();
                try {
                    var r = db.collection(m.props.collection).insertOne(doc);
                    m.logger.log('debug', JSON.stringify(r));
                } catch (e) {
                    m.logger.log('error', JSON.stringify(e));
                }
            }
            if (conn != null) {
                conn.close();
            }
        } catch (e) {  
            if (conn != null) {
                conn.close();
            }          
            m.logger.log('error', e);
        }

        // MongoClient.connect("mongodb://" + m.props.connectionString).then(function(conn) {
        //     const db = conn.db(m.props.database);
        //     if (m.props.action.toUpperCase() === "INSERT") {
        //         m.logger.log('info', 'Inserting document');
        //         var doc = faker.helpers.userCard();
        //         db.collection(m.props.collection).insertOne(doc).then(function(r) {
        //             m.logger.log('debug', JSON.stringify(r));
        //             conn.close();
        //         }).catch(function(err) {
        //             m.logger.log('error', JSON.stringify(err));
        //             conn.close();
        //         });
        //     }
        // }).catch(function(err) {
        //     m.logger.log('error', err);
        // });       

    }
}

module.exports = MongoAction;