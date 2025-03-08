const express = require('express');
const path = require('path');
const router = express.Router();
const { Book, Usernames, Passwords ,UserInfo, Curruser} = require('../models'); 
const cors = require('cors');
router.use(cors());
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/'));
});
router.post("/addusername", (req, res) => {
    const new_user = new Usernames({
        user: req.body.user,
        name : req.body.name
    });
    new_user.save()
        .then(() => res.send("Username added successfully!!"))
        .catch(err => res.status(400).send("Error in user posting!!" + err));
});
router.post("/addpassword", (req, res) => {
    const new_user_pass = new Passwords({
        password: req.body.password
    });
    new_user_pass.save()
        .then(() => res.send("Password added successfully!!"))
        .catch(err => res.status(400).send("Error in password posting!!" + err));
});
router.post("/addBook", (req, res) => {
    const newBook = new Book({
        title: req.body.title,
        authors: req.body.authors,
        image_link: req.body.image_link,
        desc: req.body.desc,
        stock: req.body.stock,
        rented: req.body.rented
    });
    newBook.save()
        .then(() => res.send("Book added successfully!"))
        .catch(err => res.status(400).send("Error adding book: " + err));
});
router.get("/getthis", (req, res) => {
    Usernames.find({})
        .then(pass => res.json(pass))
        .catch(err => res.status(500).send("Error " + err));
});
router.get("/getPass", (req, res) => {
    Passwords.find({})
        .then(pass => res.json(pass))
        .catch(err => res.status(500).send("Error " + err));
});
router.get("/getBooks", (req, res) => {
    Book.find({})
        .then(books => res.json(books))
        .catch(err => res.status(500).send("Error retrieving books: " + err));
});
router.post("/adduserdata", async (req, res) => {
    try {
        const { curr_user, title, rentDate, dueDate } = req.body;
        let existingUser = await UserInfo.findOne({ curr_user });
        if (existingUser) {
            existingUser.rentedBooks.push({ title, rentDate, dueDate });
            await existingUser.save();
            console.log("User data updated!");
        } else {
            const newuserdata = new UserInfo({
                curr_user,
                rentedBooks: [
                    {
                        title,
                        rentDate,
                        dueDate
                    }
                ]
            });
            await newuserdata.save();
            console.log("Data stored!");
        }
        
        await Book.updateOne({ title }, { $inc: { stock: -1, rented: 1 } });

        res.status(200).send("User data processed successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});


router.put("/upBook/:id", (req, res) => {
    const bookId = req.params.id;
    console.log(`Received request to update book with ID: ${bookId}`);
    console.log(`Request body:`, req.body);
    
    const { stock } = req.body; 

    Book.findByIdAndUpdate(bookId, { stock }, { new: true })
        .then(updatedBook => {
            if (!updatedBook) {
                console.log("Book not found in database.");
                return res.status(404).send("Book not found");
            }
            console.log("Book updated successfully:", updatedBook);
            res.json(updatedBook);
        })
        .catch(err => {
            console.error("Error updating book:", err);
            res.status(500).send("Error updating book: " + err.message);
        });
});
router.delete("/deleteUser/:curr_user", (req, res) => {
    const currUser = req.params.curr_user;
    UserInfo.deleteMany({ curr_user: currUser })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).send("User data not found");
            }
            res.send("User data deleted successfully");
        })
        .catch(err => res.status(500).send("Error deleting user data: " + err));
});
router.get('/getUsersWithRentedBooks', async (req, res) => {
    try {
        const users = await UserInfo.find().populate('rentedBooks'); 
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});
router.delete('/deleteBook/:id', (req, res) => {
    const bookId = req.params.id;
    Book.findByIdAndDelete(bookId)
        .then(() => res.status(200).send('Book deleted'))
        .catch(err => res.status(500).send(err));
});
router.post("/addcurr", (req, res) => {
    const newcurr = new Curruser({ 
        curr_user: req.body.curr_user ,
        curr_name : req.body.curr_name
    });
    newcurr.save()
        .then(() => {
            console.log("Value posted");
            res.status(201).json({ message: "Current user added successfully!" });
        })
        .catch((err) => {
            console.error("Error: " + err);
            res.status(500).json({ error: "An error occurred while adding the current user." });
        });
});
router.get("/getcurr", (req, res) => {
    Curruser.find({})      
    .then(curr_user => res.json(curr_user))
    .catch(err => res.status(500).send("Error retrieving last book: " + err));
});
router.delete("/deleteAllBooks", (req, res) => {
    Book.deleteMany({})
        .then(() => res.send("All books deleted successfully!"))
        .catch(err => res.status(500).send("Error deleting books: " + err));
});
module.exports = router;