var express = require("express")
/*
    express is an NPM module used to handle http routing
    You can install it by running the command ">> npm install express --save" (don't type >>)
    which will add it to the node_modules directory and save it in package.json as a dependency
*/

var app = express()
//next, create the app from the express class in the express module

app.get("/", function (req, res) {
    /*
        This is a http route. Specifically, since it is a route for "/", it is the default, homepage route
        This type of request is known as a get request, which is typically used to fetch informations
        the function parameters req and res refer to the http request and response
    */
    res.sendFile(__dirname + "/app.html")
    //send app.html from the server to be rendered by the cliend
})

//database stuff:
var mongoose = require("mongoose")
//the mongoose module makes it much easier to interface with MongoDB, which will be our database to store messages
mongoose.connect("mongodb://dev:12345@ds123381.mlab.com:23381/barely_competent2")
//This connects to a database hosted on mLab.com. You'll want to save this address as an environment variable in production

var messageSchema = new mongoose.Schema({
    /*
        MongoDB is what's known as a noSQL database, so schemas are not necessary.
        Still, it is helpful to define the parameters for this document collection in the database
    */
    text: String,
    created: {type: Date, default: Date.now}
})

var Message = mongoose.model("Message", messageSchema)
//register the model

app.get("/get_messages", function (req, res) {
    /*
        Since we are using vue.js as a front end framework,
        we are just going to use our app as an api to send data vue's controllers
    */
    Message.find({}, function (err, messages) {
        /*
            This will find all instances of the message collection and return them as an array
            which we specify as "messages" in the callback function
        */
        if (err) {
            console.log(err)
        } else {
            res.json(messages)
            /*
                We'll use JSON as an interface for sending and recieving data
                Vue will take this JSON object and apply it
            */
        }
    })
})

var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
/*
    body parser is an npm module used to help with input to the server
    It is typically used to handle information send inside of a form
    However, we will parse JSON objects that come in with it
*/

/*
    This type of request is a post request.Typically, it is used
    to send information to the server
*/
app.post("/post_message", function (req, res) {
    console.log("incoming message:", req.body)
    //The incoming message can be accessed inside of req.body, which is parsed JSON
    
    Message.create(req.body, function (err, newMessage) {
        /*
            this will create a new message in the database
            Since we're using mongoDB, the JSON coming in doesn't necessarily
            have to be the schema we defined earlier.
            It will just take the parameters that are in both and build from there
        */
        if (err) {
            console.log(err)
        } else {
            res.json(newMessage)
        }
    })
})

/*
    A put request is typically used in modifying items
    You'll also notice the :id parameter. This allows us to
    have a route that is unique to a particular document in the database
*/
app.put("/update_message/:id", function (req, res) {
    //the name after the ":" can be anything
    Message.findById(req.params.id, function (err, message) {
        //the id can be acced through req.params
        if (err) {
            console.log(err)
        } else {
            message.text = req.body.text
            message.save();
            res.json(message)
            /*
                An alternative to having to manually save is to use Mongoose's
                findByIdAndUpdate(id, body, callback) to update the database
            */
        }
    })
})

app.delete("/delete_message/:id", function (req, res) {
    Message.findByIdAndRemove(req.params.id, function (err) {
        //This function will find an element in the database with that id and delete it
        if (err) {
            console.log(err)
        } else {
            res.end()
        }
    })
})

app.listen(process.env.PORT, process.env.IP, function () {
    /*
        if running this locally, change "process.env.PORT" to 3000 and get rid of process.env.IP
        then go to http://localhost:3000 in your browser to see the running app
    */
    console.log("serving on port", process.env.PORT)
})

//then, start your app with the command ">> node app.js"