
const express = require('express');
const path = require('path');
const { Book, UserInfo, Usernames, Passwords } = require('./models'); 
const app = express();
const port = 5000;


const cors = require('cors');
app.use(cors());


app.get("/api",(req,res)=>{
    res.json({"Users":["User1","User2"]})
})
app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));
app.use('/', require(path.join(__dirname, 'routes/books')));
app.listen(port, () => {
    console.log(`Server running on port localhost:${port}`);
});
