const connection = require('./DB')
var sql = require('./DB');
const path = require('path');
const csv=require('csvtojson');
const cookieParser = require('cookie-parser');

const selectAcc = (req,res)=>{
    const searchUser = req.cookies.Login_user_email;
    // Run query
    const Q1 = "SELECT * FROM accountings WHERE email = ? order by id desc";
    connection.query(Q1, searchUser, (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in signUp: " + err});
            return;
        }
        res.render('piggyAccounting', {
            ResArray: mysqlres
        });
        return;
    });
};


const signUpToDB = (req,res)=>{
    // Validate if body exist
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Pull data from body to JSON
    const newCustomer = {
        "firstName": req.body.firstname,
        "lastName": req.body.lastname,
        "phoneNumber": req.body.phonenumber,
        "email": req.body.email,
        "password": req.body.password,
        "TimeStamp": new Date()
    };
    // Run query
    const Q2 = "SELECT * FROM users WHERE email = ?";
    connection.query(Q2, [req.body.email], (err2, mysqlres2) => {
        if (err2) {
            console.log("error: ", err2);
            res.status(400).send({message: "error in signUp: " + err2});
            return;
        }
        if (mysqlres2.length >= 1) {
            console.log("email already exists.");
            res.redirect('/SignUpFail');
            return;
        } else {
            res.cookie("Signed_user", req.body.email);
            res.cookie("Signed_user_name", req.body.firstname + ' ' + req.body.lastname);
            const Q1 = "insert into users set ?";
            connection.query(Q1, newCustomer, (err, mysqlres) => {
                if (err) {
                    console.log("error: ", err);
                    res.status(400).send({message: "error in signUp: " + err});
                    return;
                }
                console.log("created customer: new user created!");
                res.redirect('/piggyBankSignIn');
                return;
            });
        }
    });
};

const check = (req,res)=> {
    // Validate if body exist
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Pull data from body to JSON
    const newCustomer = {
        "firstName": req.body.firstname,
        "lastName": req.body.lastname,
        "phoneNumber": req.body.phonenumber,
        "email": req.body.email,
        "password": req.body.password,
        "TimeStamp": new Date()
    };
    // Run query
    const Q2 = "select * from users where email = ?";
    connection.query(Q2, req.body.email, (err2, mysqlres2) => {
        if (err2) {
            console.log("error: ", err2);
            res.status(400).send({message: "error in signUp: " + err2});
            return;
        }
        if (mysqlres2.length >= 1) {
            console.log("success in finding the user");
            res.cookie("Login_user_email_exists", req.body.email);
            res.redirect('/SignUpFail');
            return;
        }
    });
}
const loginToDB = (req,res)=>{
    // Validate if body exist
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Pull data from body to JSON
    const customerLogin = {
        "email": req.body.email,
        "password": req.body.password
    };
    // Run query
    const Q4 = "select * from users where email = ? and password = ? ";
    connection.query(Q4,[customerLogin.email, customerLogin.password],(err,mysqlres)=>{
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in signUp: " + err});
            return;
        }
        if(mysqlres.length>=1){
            console.log("success in finding the user");
            res.cookie("Login_user_email", req.body.email);
            res.redirect('/intoTheLogin');
            return;
        }

        res.redirect('/SignIn');
        return;
    });
};

const insertAcc = (req,res)=>{
    // Validate if body exist
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const userEmail = req.cookies.Login_user_email;
    // Pull data from body to JSON
    const customerLogin = {
        "email": userEmail,
        "theName": req.body.Name,
        "theDate": req.body.Date,
        "theStore": req.body.Store,
        "thePayment": req.body.Payment,
        "theType": req.body.Type,
        "theCategory": req.body.Category,
        "essential": req.body.Essential,
        "TimeStamp": new Date()
    };
    // Run query
    const Q4 = "insert into accountings set ?";
    connection.query(Q4,customerLogin,(err,mysqlres)=>{
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in insert to accountings: " + err});
            return;
        }
        console.log("success in inserting the rows");
        res.redirect('/piggyAccounting');
        return;
    });
};

const contactUS = (req,res)=>{
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Pull data from body to JSON
    const Contact = {
        "firstName": req.body.firstname,
        "lastName": req.body.lastname,
        "email": req.body.email,
        "text": req.body.Details,
        "TimeStamp": new Date()
    };
    // Run query
    const Q3 = "insert into contactUs set ?";
    connection.query(Q3,Contact,(err,mysqlres)=>{
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in contact: " + err});
            return;
        }
        console.log("created contact: new contact created");
        res.render('layout', {
            v1:"Your message was created successfully!!"
        });
        return;
    });
};



module.exports = {signUpToDB,insertAcc,selectAcc/*,showAll,createTable*/,contactUS,loginToDB};

/*
CREATE TABLE IF NOT EXISTS `customers` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    firstname varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    phoneNumber bigint NOT NULL,
    email varchar(255) NOT NULL,
    Details varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

/*const showAll = function(req, res){
    const Q2 = "Select * From customers"
    connection.query(Q2,(err,mysqlres)=>{
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in signUp: " + err});
            return;
        }
        console.log("success in selecting all customers");
        res.send(mysqlres);
        return;
    });
}*/
/*const createTable = (req,res)=>{
    const Q5 = "CREATE TABLE IF NOT EXISTS `customers` (\n" +
        "id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,\n" +
        "firstName varchar(255) NOT NULL,\n" +
        "lastName varchar(255) NOT NULL,\n" +
        "phoneNumber varchar(255) NOT NULL,\n" +
        "email varchar(255) NOT NULL,\n" +
        "password varchar(255) NOT NULL\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;";
    connection.query(Q5,(err,mysqlres)=>{
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in signUp: " + err});
            return;
        }
        console.log("success in selecting all customers");
        res.send(mysqlres);
        return;
    });
}*/