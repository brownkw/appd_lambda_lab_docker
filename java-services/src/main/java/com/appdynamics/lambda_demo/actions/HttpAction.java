package com.appdynamics.lambda_demo.actions;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

public final class HttpAction extends Action {    

    private HttpActionProperties props;

    public HttpAction(final String name, final Map<String, Object> properties) {
        super(name, properties);  
        this.type = "HttpAction";
        Gson gson = new Gson();
        this.props = gson.fromJson(gson.toJson(this.properties), HttpActionProperties.class);   
        
        logger.info("HttpActionProperties for " + this.name + ": " + gson.toJson(this.props));
    }

    @Override
    public void execute() {                        
        logger.info("Executing HttpAction");
        try {            
            String retval = WebConnect.makeWebRequest(this.props);
            logger.debug(retval);

        } catch (JsonSyntaxException e) {
            e.printStackTrace();
        }        
    }
    
    /**
     * HttpActionProperties
     */
    public class HttpActionProperties {

        private String requestMethod;
        private String url;

        /**
         * Gets the request method for the Http Action to take
         * @return The request method
         */
        public String getRequestMethod() {
            return requestMethod;
        }

        /**
         * Sets the request method for the Http Action to take
         * @param requestMethod The request method (GET, POST, PUT, DELETE)
         */
        public void setRequestMethod(String requestMethod) {
            this.requestMethod = requestMethod;
        }

        /**
         * Gets the Url for the Http Action
         * @return The Url
         */
        public String getUrl() {
            return url;
        }

        /**
         * Sets the Url for the Http Action
         * @param url The Url
         */
        public void setUrl(String url) {
            this.url = url;
        }

    }

    /**
     * WebConnect
     */
    static class WebConnect {

        static final Logger logger = LoggerFactory.getLogger(WebConnect.class);

        /**
         * Makes an Http Web Request
         * @param props Http Web Request Properties
         * @return Output from the web request
         */
        public static String makeWebRequest(HttpActionProperties props) {

            try {
                URL url = new URL(props.getUrl());
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod(props.getRequestMethod());

                // TODO: add support for request headers and parameters                

                connection.connect();

                BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String line;
                StringBuffer buf = new StringBuffer();

                while ((line = in.readLine()) != null) {
                    buf.append(line);
                }

                in.close();
                connection.disconnect();

                return buf.toString();
            } catch (Exception e) {                
                logger.error("Exception from makeWebRequest", e);
                return "";
            }
        }
    }

}