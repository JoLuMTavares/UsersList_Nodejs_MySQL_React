# UsersList_Nodejs_MySQL_React
Small application that shows the list of users stored on the database.

For this project to work, we need to install the necessary modules.

Installation (on Ubuntu)
For MySQL, we need to open the Terminal and run the following command:
  sudo apt-get install mysql-server
  
For Nodejs we need the following command:
  sudo apt-get install -y nodejs
  
For the installation of React, we must use this command:
  sudo npm install -g create-react-app
  
After this, we still need to install other modules. First we have to go to our directory where we want to have our project.
There we must install the "Express" module so Nodejs can work properly. Bellow are the commands we need to use:
  npm init -> To create a package.json file for the application;
  npm install express -> To install Express. We can add the option "--save" to add it to the dependencies list. We can also use the "--no--save" option not to save on the same dependencies list and just make a temporary installation.
  
On the same directory we need to install "axios" - npm install axios - to make requests and get responses from the backend server. 

As this project also deals with Routing, we need to install "react-router-dom", so we can have access to Router, Link and Switch components. The code is: npm i react-router-dom.

For the boostrap effect, we can optionally install it on our directory, or we can give the url of this module:
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
This link must stay on the index.html, located on the public folder.

With all being set, we can try to run the project.
  - First the back end server that must have this command: npm run start-server
  - Then we can run the front end server with the command: npm start.
  
This way, we will be able to see a login screen. To enter, the credentials are:
  - For the username: joao
  - For the password: v16power.
  
This way, we finally have access to the list of stored users on the database. We can create, remove or update an existent user.

  
  
