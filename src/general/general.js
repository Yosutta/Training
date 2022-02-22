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