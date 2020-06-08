package com.appdynamics.lambda_demo.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.appdynamics.lambda_demo.actions.Action;
import com.appdynamics.lambda_demo.actions.ActionFactory;
import com.appdynamics.lambda_demo.beans.DemoGraph;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@RestController
public class DefaultController {

    public final Logger logger = LoggerFactory.getLogger(DefaultController.class);

    @RequestMapping(value = "/**", produces = { "application/json" })
    public String handle(HttpServletRequest request) {
        Gson gson = new Gson();
        String path = request.getRequestURI();        

        Map<String, Object> path_props = gson.fromJson(gson.toJson(DemoGraph.graph.get(path)), new TypeToken<Map<String, Object>>() {}.getType());
        if (path_props == null) {
            if (!path.equals("/favicon.ico")) {
                logger.info("Using catch-all");
                path_props = gson.fromJson(gson.toJson(DemoGraph.graph.get("*")), new TypeToken<Map<String, Object>>() {}.getType());
            } else {
                Object obj = new Object();
                return gson.toJson(obj);
            }            
        }
        logger.info("Path: " + path);
        Object obj = path_props.get("actions");
        List<Object> actions = gson.fromJson(gson.toJson(obj), new TypeToken<List<Object>>() {}.getType());
        ArrayList<Action> action_list = new ArrayList<>();
        actions.forEach(action -> action_list.add(ActionFactory.GetAction(action)));
        action_list.forEach(action -> action.execute());

        return gson.toJson(actions);
    }

}