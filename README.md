# Bulls and Cows: A Memory Game

Welcome to the Bulls and Cows game! This project is a web-based adaptation of the classic memory game where the player must guess the correct digits, with hints provided in the form of bulls and cows.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)


## Authors
* Name: Anton Nahhas  
* Name: Sameer Jbara 

## Technologies Used

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



## Getting Started

1. Clone the repository.
2. Install the necessary dependencies.
3. Start the backend server by running the servlet.
4. Navigate to the frontend directory and run `npm start` to initiate the React app.
5. Visit `http://localhost:3000` in your browser to play the game!

## File Structure

- **ApiServlet.java**: Backend server endpoint for managing high scores. It retrieves and updates scores from a data file and provides this data to the frontend.
- **App.js**: The main frontend controller. This component orchestrates various game elements like the game form, high scores, and user guesses.
- **gameBase.js**: Provides the base design of the game, offering players an overview and instructions.
- **GameForm.js**: The core game logic is here. Players can make guesses and get feedback on how close their guesses are.
- **GuessList.js & TableRow.js**: Together, they display the user's guess history in a structured table format.
- **HandleError.js**: Offers user feedback in the form of error messages.
- **HighScore.js, HighScoreTable.js & HighScoreRow.js**: Handle the display and submission of high scores.




