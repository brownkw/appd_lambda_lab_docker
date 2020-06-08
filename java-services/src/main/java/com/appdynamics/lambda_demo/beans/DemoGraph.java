package com.appdynamics.lambda_demo.beans;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public final class DemoGraph implements ApplicationRunner {

    public final Logger logger = LoggerFactory.getLogger(DemoGraph.class);

    public static Map<String, Object> graph;

    @Value("${demo.graph.path}")
    private String graph_path;

    @Override
    public void run(ApplicationArguments args) throws Exception {        
        Gson gson = new Gson();
        String json = readGraphFile();   
        
        String tier_name = "core-services";
        if (System.getenv("APPDYNAMICS_AGENT_TIER_NAME") != null) {
            tier_name = System.getenv("APPDYNAMICS_AGENT_TIER_NAME");
        }

        Map<String, Object> fullGraph = gson.fromJson(json, new TypeToken<Map<String, Object>>() {}.getType());   
        Map<String, Object> tierGraph = gson.fromJson(gson.toJson(fullGraph.get(tier_name)), new TypeToken<Map<String, Object>>() {}.getType());
        DemoGraph.graph = gson.fromJson(gson.toJson(tierGraph.get("paths")), new TypeToken<Map<String, Object>>() {}.getType());
        DemoGraph.graph.forEach((x, y) -> logger.info("Path: " + x + " , Data : " + gson.toJson(y)));
    }    

    private String readGraphFile() {
        String retval = "";
        try {                        

            logger.info("Reading graph from " + graph_path);

            // File f = new File(DemoGraph.class.getClassLoader().getResource(graph_path).getFile());            
            FileInputStream fis = new FileInputStream(graph_path);
            BufferedReader br = new BufferedReader(new InputStreamReader(fis));
            StringBuilder sb = new StringBuilder();
            String line = "";
            while ((line = br.readLine()) != null) {
                sb.append(line);
                sb.append(System.lineSeparator());
            }
            br.close();
            retval = sb.toString();
            
        } catch (IOException e) {
            logger.error("IOException", e);
        } catch (Exception e2) {
            logger.error("Exception", e2);
        }
        return retval;
    }
}