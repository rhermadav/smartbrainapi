const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());


const database ={
  users:[
    {
      id:'1',
      name:'john',
      email:'john@gmail.com',
      password:'cookies',
      entries:0,
      joined:new Date()
    },
    {
      id:'2',
      name:'sally',
      email:'sally@gmail.com',
      password:'pawpaw',
      entries:0,
      joined:new Date()
    }
  ]
}

app.get('/',(req,res) =>{
  res.send(database.users);
})
 
app.post('/signin',(req,res) =>{
  if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
    res.json('success');
  } else {
    res.status(400).json('error loging in');
  }
})

app.post('/register', (req,res) =>{
  const {email ,name , password} = req.body;

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      console.log(hash);
        // Store hash in your password DB.
    });
});
  database.users.push({
    id:'3',
    name:name,
    email:email,
    entries:0,
    joined:new Date()
  })
  res.json(database.users[database.users.length-1]);
})

app.get('/profile/s:id',(req,res) =>{
  const {id} = req.params;
  let found = false;
  database.users.forEach( user =>{
    if (user.id === id ){
      found =true;
      res.json(user);
    } 
  })
  if (!found) {
    res.status(404).json('no such user');
  }
})

app.put('/image',(req,res) =>{
  const {id} = req.body;
  let found = false;
  database.users.forEach( user =>{
    if (user.id === id ){
      found = true;
      user.entries++
      res.json(user.entries);
    } 
  })
  if (!found) {
    res.status(404).json('no such user');
  }
})

app.listen(3000, () =>{
  console.log('listening on port 3000');
})