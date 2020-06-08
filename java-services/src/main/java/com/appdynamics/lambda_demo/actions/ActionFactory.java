package com.appdynamics.lambda_demo.actions;

import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ActionFactory {
    
    static final Logger logger = LoggerFactory.getLogger(ActionFactory.class);

    public static Action GetAction(Object obj) {
        Action a = null;
        Gson gson = new Gson();

        Map<String, Object> details = gson.fromJson(gson.toJson(obj), new TypeToken<Map<String, Object>>() {}.getType());
        String name = details.get("name").toString();
        String type = "com.appdynamics.lambda_demo.actions." + details.get("type").toString();
        Map<String, Object> properties = gson.fromJson(gson.toJson(details.get("properties")), new TypeToken<Map<String, Object>>() {}.getType());
        
        try {
            a = (Action) Class.forName(type).getConstructor(String.class, Map.class).newInstance(name, properties);
            logger.info(name + " action: " + gson.toJson(a));
        } catch (Exception e) {
            logger.error("Exception in GetAction", e);
        }

        return a;
    }
}