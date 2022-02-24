## Express - Routing
Routing refers to how the Express application do when a specific URI is given.
Routing is defined by using Express application METHOD. 

Express supports multiple HTTP routing method, the most common ones are:
    - app.get() to handle HTTP GET requests
    - app.post() to handle HTTP POST requests
There are also other [app.METHOD](https://expressjs.com/en/4x/api.html#app.METHOD) that can help with routing 
You could also use app.all() to handle all HTTP methods 
#### * app.use() is for specifying middleware usage

These routing methods also has callback function, these callback function gets executed when a HTTP method request matches with a specific route in the system.
Routing methods can also have multiple callback function. For every executed callback function, a next() command must be called so it can hand off control to the next callback.

[Route methods](#route-methods)
[Route paths](#route-paths)
[Route parameters](#route-parameters)
[Route handlers](#route-handlers)
[Response methods](#response-methods)
[app.route()](#approute)


<br>

### Route methods

A simple route method that returns a "Hello world" response when a HTTP GET request /hello
```js
const express = require('express')
const app = express() // Assigning Express instance

app.get('/hello', (req, res) => { // Defines a GET method handler that listens for '/hello'
    res.send(`Hello world`) // Responses with a simple string
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})
```

The response we will get in browser or postman when accessing the URI http://localhost:3000/hello
`Hello world`

<br>
<br>

A special routing method is app.all(). This method can be used to load a middleware for all HTTP request methods.
An example for when to use app.all()

```js
const express = require('express')
const app = express()

app.all('/secret', (req, res, next) => { // Defines a route handler for all methods that listens for '/secret'
    console.log('Requesting a secret message from the server')
    next() // Handoff control to the next function
})

app.get('/secret', (req, res) => { // Defines a HTTP GET method handler that listens for '/secret'
    res.send('The secret is ....')
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})
```

The response we will get in browser or postman when accessing the URI http://localhost:3000/hello
`The secret is ....`
and in the CLI 
```sh
Requesting a secret message from the server
```

<br>

### Route paths

Route paths in combination with route methods will define the final endpoints for every request. 
The route paths can be strings, string patterns or regular expressions. 
<br>

The route path for root '/' can be written
```js
app.get('/', (req,res)=>{
    res.send('Welcome to Kyanon')
})
```
<br>


The hyphen (-) and the dot (.) are interpreted as a string based paths
The route path that match '/hydra-nopy' can be written
```js
app.get('/hydra-nopy', (req,res)=>{
    res.send('Welcome to Hydra-NoPy')
})
```
<br>

If for some cases, a path has $ symbol. It can be escaped within ([ and ]).
For example, a path string requested at `/data/$book`, would be defined as `/data/([$])book`
<br>

The characters ?, +, * and () can define a substring patterns.
The route path that matches abcd or acd
```js
app.get('/ab?cd', (req,res)=>{
    res.send(`'?' substring pattern example`)
})
```
The route path that matches xyz, xyyz, xyyyz and so on
```js
app.get('/xy+z', (req,res)=>{
    res.send(`'+' substring pattern example`)
})
```
The route path that matches any of the following and so on:
techabcstack, tech1234stack, techNodeJSstack, techPythonstack,etc.
```js
app.get('/tech*stack', (req,res)=>{
    res.send(`'*' substring pattern example`)
})
```
The route path that matches abcde, abe
```js
app.get('/ab(cd)?e', (req,res)=>{
    res.send(`'()' substring pattern example`)
})
```
We can set a path that will matches if is contains the substring inside it.
Example: If we want to set path that matches expressjs, nestjs, jseasy, etc.
```js
app.get(/js/, (req,res)=>{
    res.send(`'/js/' substring pattern example`)
})
```
Or a path that only matches bootstrapcss, bulmacss, materialcss but not cssw3school, csstutorial.
```js
app.get(/.*css$/, (req,res)=>{
    res.send(`'/css$/' substring pattern example`)
})
```
<br>

### Route parameters
Combining : in the route path can help captures value with each specific position.
The value captures from the route path can then be accessed through the `req.params()' method
Example: 
```js
app.get('/prodcuct/:productid', (req, res) => { 
    const params = req.params // The value of the URL can be captures by using req.params
    res.send(params)
})
```
Requested URL: http://localhost:3000/product/023123
Response: `{"productid":"023123"}`
#### The name of route parameter can only be made of words characters ([A-Z,a-z,0-9_])


Since hyphen (-) and dot (.) are interpreted literally, they can be used directly in the route path.
```sh
Route path: /user/:userid-:squadname
Requested URL: http:localhost:3000/user/1234-Artemis
req.params: {"userid" : 1234, "squadname": "Artemis"}
```
```sh
Route path: /animaru/:name.:species
Requested URL: http:localhost:3000/animaru/Scottish%20Fold.Cat
req.params: {"name" : "Scottish Fold", "species": "Cat"}
```
<br>

### Route handlers
A route can be provided with multiple callback function, which will make them behave like a middleware.
These callback functions can utilize the next() to skip any remaining route callbacks, 
this way you can set a conditional statement on a route then pass it to the next route if there is no reason to continue with the current route.

Example 1:
```js
app.get('/request', (req,res,next)=>{
    console.log('This is the first call back function')
    next() // Hand off control to the next function
}, (req,res)=>{
    console.log('This is the request')
})
```

Example 2:
```js
const checkBoolean1 = (req,res,next)=>{
    a = 10
    if(a>5){
        console.log("TRUE")
    }
    next()
}

const checkBoolean2 = (req, res, next) => {
    b = 1
    if (b > 5) {
        console.log('FALSE')
    }
    next()
}

app.get('/boolean', [checkBoolean1, checkBoolean2] , (req,res)=>{
    res.send('Comparing value!')
})
```

We can also combine the indepedent function in ex1 and array of function:
```js
const firstCallBack = (req,res,next)=>{
    console.log('This is the first callback')
    next()
}

const secondCallBack = (req, res, next) => {
    console.log('This is the second callback')
    next()
}

app.get('/callback', [firstCallBack, secondCallBack] , (req,res,next)=>{
    console.log('This is the third callback')
    next()
},(req,res)=>{
    res.send('This is the final callback')
})
```

### Response methods
These are the response methods that can be send to the client, terminate a request-response cycle. 
If none of the method are called from a route handle, the client request will be left hanging. 

| Method | Description |
|-----------|:-----------:|
| res.download() | Prompt a file to be downloaded | 
| res.end() | End a process | 
| res.json() | Send a JSON response | 
| res.jsonp() | Send a JSON response with JSON support | 
| res.redirect() | Redirect a request | 
| res.render() | Render a view page | 
| res.send() | Send a response of various type | 
| res.sendFile() | Send a file | 
| res.sendStatus() | Send a response status code and respresent it in the response body | 
<br>

### app.route()
You can change multiple method together with app.route()
app.route is an instance express.Router()
```js
app.route('/user')
    .get((req,res)=>{
        console.log('Create your account')
    })
    .post((req,res)=>{
        console.log('Your account has been created')
    })
    .put((req,res)=>{
        console.log('Editting your account')
    })
```
<br>
