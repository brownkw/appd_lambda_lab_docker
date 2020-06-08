package com.appdynamics.lambda_demo.actions;

import com.google.gson.Gson;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.github.javafaker.Faker;

import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.Map; 

public final class MongoAction extends Action {

    private MongoActionProperties props;

    @Override
    public void execute() {        
        logger.info("Executing MongoAction");

        if (this.props.getAction().equalsIgnoreCase("Insert")) {
            logger.info("Inserting document");
            InsertDocument();
        }
    }

    public MongoAction(String name, Map<String, Object> properties) {
        super(name, properties);

        this.type = "MongoAction";
        Gson gson = new Gson();
        this.props = gson.fromJson(gson.toJson(this.properties), MongoActionProperties.class);

        logger.info("MongoActionProperties for " + this.name + ": " + gson.toJson(this.props));
    }

    /**
     * MongoActionProperties
     */
    public class MongoActionProperties {
        private String action;
        private String connectionString;
        private String database;
        private String collection;

        public String getAction() {
            return action;
        }

        public void setAction(String action) {
            this.action = action;
        }

        public String getConnectionString() {
            return connectionString;
        }

        public void setConnectionString(String connectionString) {
            this.connectionString = connectionString;
        }

        public String getDatabase() {
            return database;
        }

        public void setDatabase(String database) {
            this.database = database;
        }

        public String getCollection() {
            return collection;
        }

        public void setCollection(String collection) {
            this.collection = collection;
        }

    }

    private void InsertDocument() {
        Faker f = new Faker();

        MongoClient client = new MongoClient(this.props.getConnectionString());
        MongoDatabase db = client.getDatabase(this.props.getDatabase());
        MongoCollection<Document> collection = db.getCollection(this.props.getCollection());
        Document d = new Document("_id", new ObjectId());
        d.append("first_name", f.name().firstName()).append("last_name", f.name().lastName()).append("address", f.address().fullAddress());
        collection.insertOne(d);
        client.close();

    }
}