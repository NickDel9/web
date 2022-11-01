
const {MongoClient} = require('mongodb')
const client = new MongoClient("mongodb+srv://username:password@cluster/test", {useNewUrlParser: true , useUnifiedTopology: true});
const User = require('./User.js') // gain access to class 'User'

module.exports = {

    getProfile : async function getProfile(req,res){

        client
            .connect()
            .then(() => {
                const collection = client.db("Courses")
                    .collection("User");

                return collection.find({}).toArray()
            })
            .then(result =>{

                var credits = req.params.credits.split('-')
                for (var user of result){
                    if (user.email == credits[0] && user.password == credits[1]){
                    console.log(`user's profile with name : ${user.email} is sending to client`)
                    res.send(JSON.stringify(user))
                    return
                    }
                }
            })  
            .catch( error => {
                console.log(error)
            })
    }

    ,checkLogIn : async function checkLogIn(req, res){

        client
            .connect()
            .then(() => {
                const collection = client.db("Courses")
                    .collection("User");

                return collection.find({}).toArray()
            })
            .then(result =>{
                for (var user of result){
                    if (user.email == req.body.email && user.password == req.body.password){
                        console.log(`user with name : ${req.body.email} and password ${req.body.password} exists.`)
                        res.send('Valid')
                        return
                    }
                }
                console.log(`user with name : ${req.body.email} and password ${req.body.password} NOT exists.`)
                res.send('Invalid')
            })  
            .catch( error => {
                console.log(error)
            })
    }

    ,searchOnDatabase : async function searchOnDatabase(req, res){

        client
            .connect()
            .then(async () =>{
                const collection = client.db("Courses")
                    .collection("User");

                let query = {email: `${req.body.email}`} // check email only
                let options = {
                    projection: {
                        fname: 1,
                        lname: 1,
                        email: 1,
                    }
                }
                return collection.find(query , options).toArray()
            })
            .then( (result) =>{
                console.log(result)
                if (result){
                    if (result.length > 0) // == .find() returns user object with this email
                        res.send("Invalid");
                    else{
                        var user = new User(req.body.fname , 
                            req.body.lname , 
                            req.body.dname ,
                            req.body.tname ,
                            req.body.email ,
                            req.body.password);
                    
                        res.send("Valid");
                        // put user to db
                        updateDatabase(user)
                    }
                    return
                }
                res.send("Invalid");
            })
            .catch( error => {
                console.log(error)
            })
    }
}

async function updateDatabase(user){

    client
        .connect()
        .then(() =>{
            const collection = client.db("Courses")
                .collection("User");
            newUser = {
                fname : `${user.fname}`,
                lname : `${user.lname}`,
                dname : `${user.dname}`,
                tname : `${user.tname}`,
                email : `${user.email}`,
                password : `${user.password}`,
            }

            return collection.insertOne(newUser)
        })
        .then( result => {
            console.log(`new user! ${user.email}`)
        })
        .catch( error => {
            console.log(error)
        })
}

