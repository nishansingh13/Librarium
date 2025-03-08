const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://nishan_singh137:LibrariumNMLI@cluster-1.alej6.mongodb.net/books");

const bookSchema = new mongoose.Schema({
    title: String,
    authors: String,
    image_link: String,
    desc: String,
    stock: Number,
    rented: Number
});

const userdata = new mongoose.Schema({
    curr_user: String,
    rentedBooks: [
        {
            title: String,
            rentDate: String,
            dueDate: String
        }
    ]
});
const dueNearUserSchema = new  mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    bookTitle: {
        type: String,
        required: true
    }
});





const usernamesdata = new mongoose.Schema({
    user: String,
});

const curruser =  new mongoose.Schema({
    curr_user : String,
});



const pass = new mongoose.Schema({
    password: String
});

const Book = mongoose.model("books_main", bookSchema);
const UserInfo = mongoose.model("UsersRentInfo", userdata);
const Usernames = mongoose.model("user_names", usernamesdata);
const Passwords = mongoose.model("passwords", pass);
const Curruser = mongoose.model("curr_user",curruser);
const DueNearUser = mongoose.model('DueNearUser', dueNearUserSchema);
module.exports = {
    Book,
    UserInfo,
    Usernames,
    Passwords,
    Curruser,
    DueNearUser
};
