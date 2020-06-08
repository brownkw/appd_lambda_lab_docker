package com.appdynamics.lambda_demo.actions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

public abstract class Action {
    
    String name = "";
    transient Map<String, Object> properties = null;
    String type = "";

    public transient final Logger logger = LoggerFactory.getLogger(Action.class);

    public Action(String name, Map<String, Object> properties) {
        this.name = name;
        this.properties = properties;
    }

    public abstract void execute();

}