## ExpressJS - General
ExpressJS is a NodeJS web framework that provides a flexible and robust set of features for web and mobile applications.
ExpressJs has a varieties of HTTP utility methods and middleware which can help creating a robust API quick and easy.
NestJS is built based on ExpressJS. 

#### How to install Express: 
- Create a folder and change directory to it
```sh
mkdir myfolder
cd myfolder
```
- Initialize npm and install express
```sh
npm init -y
npm install express
```

#### How to create a project
1. Let's create a test local project to demonstrate
    - Create a new file `general.js`
    - Open `general.js` in an editor
    - Write the following lines to `general.js`
    ```js
    const express = require('express') // Require Express module
    const app = express() // Assign express top-level function
    const port = 3000 // Assign server port

    // Create a default route for every GET request
    app.get('*', (req, res) => {
        // In the callback, there are 2 params {req,res}
        // req are the HTTP request 
        // res are the HTTP response Express app send after receiving a request
        res.send('This is an example')
        // Response with a string 'This is an example'
    })

    // Configurate port which the client sends requests
    app.listen(port, () => {
        // Prints a simple message, if all goes well
        console.log(`Listening on port ${port}`)
    })
    ```
    - Runs the application
    ```sh
    node general.js
    ```
    - Opens the app using postman or your browser, at `http://localhost:3000`  or `http://127.0.0.1:3000`

2. Create a project using express generator
    This command with automatically generates an example structure of express application
    - Create a new folder and change to its directory
    ```sh
    mkdir express-generator
    cd express-generator
    ```
    - Runs in the CLI 
    `npx express-generator`
    - Install libraries
    `npm install`
    - Runs application
    `npm start`
    - Opens the app using postman or your browser, at `http://localhost:3000`  or `http://127.0.0.1:3000`

#### Express basic routing 
Routing is how our express application will responses to a client request, this request can be a URI (or path) with specific HTTP method (such as GET, POST,...etc )

Express routing have the following structure: 
```js
app.METHOD(PATH, HANDLER)
```
Where:
+ app is express instance
+ METHOD is the HTTP request method ()
+ PATH is a path of the server
+ HANDLER is a function executed when the requested route matches

#### Serving static files
In order to serves static files such as CSS, images, media, etc... 
They must be specified with express.static() middleware

For example, to render a page with 'app.css' styles to the front page:
```js
app.use(express.static('highway.jpg'))
```

To serve multiple files, we can serve them as 1 folder:
```js
app.use(express.static('public'))
```