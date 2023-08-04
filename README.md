
## Authors
* Name: Anton Nahhas  
* Name: Sameer Jbara 


## How to use this template
This is the template for a project where front-end and back-end are separated.
The front-end is a React application, the back-end is a Java Web application
including a Servlet for REST API endpoints.

### Create a run configuration for the Server
* In IntelliJ, go to Run->Edit Configurations
* Click on the + sign and select Tomcat Server -> Local
* In the Tomcat Server Settings, select your local installation of tomcat (you can download it from https://archive.apache.org/dist/tomcat/tomcat-9/v9.0.45/bin/apache-tomcat-9.0.45.tar.gz)
* In the Deployment tab, select the java-react:war file to deploy (the war file in the target folder of your project), IntelliJ should automatically detect it and display a "Fix" button. Click on it.
* uncheck the "After launch: Open in browser" checkbox (we don't want to open the browser when we run the server, it's a REST API server)
* Click on the OK button


### initializing IntelliJ
In case you get into trouble with IntelliJ, you should close the project,
delete the .idea folder, re-open the project and follow the instructions above to
recreate a run configuration.

###  dependencies
The template depends on:
* your local installation of tomcat, this template uses
  tomcat 9.0.45 that can be downloaded from https://archive.apache.org/dist/tomcat/tomcat-9/v9.0.45/bin/apache-tomcat-9.0.45.tar.gz.
  In order to point to your own installation of tomcat, edit configuration in IntelliJ change the application server.
* your local installation of nodejs, this template is based on nodejs v18.15.0 (npm 9.5.0). You can download it from https://nodejs.org/en/download.
* your local installation of java (select one SDK at: File->Project Structure->Platform SDK). You can add SDK from IntelliJ by cliking on  File->Project Structure->Platform Settings-> +).
  This template is based on version 19, you can also download it from https://jdk.java.net/19/).


## In order to run the project you:
* run the server side; with IntelliJ configuration at the upper right (created above)
* run the client side: open the terminal: `cd react-client`, `npm install`,  run with the command `npm start`

Then browse:
* your react client at http://localhost:3000

