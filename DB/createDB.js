var SQL = require('./DB');
const path = require('path');
const csv = require('csvtojson');

const CreateTable = (req,res,next)=> {
    console.log('cre');
    var Q3 = "CREATE TABLE IF NOT EXISTS accountings (id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,email VARCHAR(255),theName VARCHAR(255),theDate DATE,theStore VARCHAR(255), thePayment BIGINT,theType VARCHAR(255),theCategory VARCHAR(255),essential VARCHAR(255), TimeStamp TIMESTAMP)";
    SQL.query(Q3,(err,mySQLres)=>{
        if (err) {
        console.log("error ", err);
            res.status(400).send({message: "error in creating users table"});
            return;
        }
        console.log('created users table table');
        /*res.send("users table created");
        return;*/
    })
    var Q1 = "CREATE TABLE IF NOT EXISTS users (id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,firstName VARCHAR(255),lastName VARCHAR(255),phoneNumber bigint, email VARCHAR(255),password VARCHAR(255), TimeStamp TIMESTAMP)";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating users table"});
            return;
        }
        console.log('created users table table');
        /*res.send("users table created");
        return;*/
    })
    var Q2 = "CREATE TABLE IF NOT EXISTS contactUs (id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,firstName VARCHAR(255),lastName VARCHAR(255), email VARCHAR(255),text VARCHAR(255), TimeStamp TIMESTAMP)";
    SQL.query(Q2,(err,mySQLres)=> {
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating contactUs table"});
            return;
        }
        console.log('created contactUs table table');
    })
    res.send("tables created");
    return;
}

const InsertDataContactUs = (req,res)=>{
    var Q22 = "INSERT INTO contactUs SET ?";
    const csvFilePath= path.join(__dirname,"contactus.csv");
    const now = new Date();
    console.log(csvFilePath);
    console.log(now);
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj)=>{
            console.log(jsonObj); // for learning perpose
            jsonObj.forEach(element => {
                var NewEntry = {
                    "id": element.Id,
                    "firstName": element.FirstName,
                    "lastName": element.LastName,
                    "email": element.Email,
                    "text": element.Text,
                    "TimeStamp": now
                }
                SQL.query(Q22, NewEntry, (err,mysqlres)=>{
                    if (err) {
                        console.log("error in inserting data to contactUs", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });

    res.send("data inserted to contactUs");

};
const InsertDataAccountings = (req,res)=>{
    var Q20 = "INSERT INTO accountings SET ?";
    const csvFilePath= path.join(__dirname,"accountings.csv");
    const now = new Date();
    console.log(csvFilePath);
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj)=>{
            console.log(jsonObj); // for learning perpose
            jsonObj.forEach(element => {
                var NewEntry = {
                    "id": element.Id,
                    "email": element.Email,
                    "theName": element.Name,
                    "theDate": element.Date,
                    "theStore": element.Store,
                    "thePayment": element.Payment,
                    "theType": element.Type,
                    "theCategory": element.Category,
                    "essential": element.Essential,
                    "TimeStamp": now
                }
                SQL.query(Q20, NewEntry, (err,mysqlres)=>{
                    if (err) {
                        console.log("error in inserting data to accountings", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });

    res.send("data inserted to accountings");

};
const InsertDataUsers = (req,res)=>{
    var Q21 = "INSERT INTO users SET ?";
    const csvFilePath= path.join(__dirname,"users.csv");
    const now = new Date();
    console.log(csvFilePath);
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj)=>{
            console.log(jsonObj); // for learning perpose
            console.log(now); // for learning perpose
            jsonObj.forEach(element => {
                var NewEntry1 = {
                    "id": element.Id,
                    "firstName": element.FirstName,
                    "lastName": element.LastName,
                    "phoneNumber": element.PhoneNumber,
                    "email": element.Email,
                    "password": element.Password,
                    "TimeStamp": now
                }
                SQL.query(Q21, NewEntry1, (err,mysqlres)=>{
                    if (err) {
                        console.log("error in inserting data to users", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });

    res.send("data inserted to users");

};

const ShowTableAccountings = (req,res)=>{
    var Q5 = "SELECT * FROM accountings";
    SQL.query(Q5, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table accountings ", err);
            res.send("error in showing table accountings ");
            return;
        }
        console.log("showing table accountings");
        res.send(mySQLres);
        return;
    })
};
const ShowTableUsers = (req,res)=>{
    var Q6 = "SELECT * FROM users";
    SQL.query(Q6, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table users ", err);
            res.send("error in showing table users ");
            return;
        }
        console.log("showing table users");
        res.send(mySQLres);
        return;
    })
};
const ShowTableContactUs = (req,res)=>{
    var Q7 = "SELECT * FROM contactUs";
    SQL.query(Q7, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table contactUs ", err);
            res.send("error in showing table contactUs ");
            return;
        }
        console.log("showing table contactUs");
        res.send(mySQLres);
        return;
    })
};

const DropTable = (req, res,next)=>{
    var Q9 = "DROP TABLE IF EXISTS accountings";
    SQL.query(Q9, (err, mySQLres)=>{
        if (err) {
            console.log("error in dropping table accountings", err);
            res.status(400).send({message: "error in dropping table accountings" + err});
            return;
        }
        console.log("table dropped accountings");
        /*res.send("table dropped accountings");
        return;*/
    })
    var Q10 = "DROP TABLE IF EXISTS users";
    SQL.query(Q10, (err, mySQLres)=>{
        if (err) {
            console.log("error in dropping table users", err);
            res.status(400).send({message: "error in dropping table users" + err});
            return;
        }
        console.log("table dropped users");
        /*res.send("table dropped users");
        return;*/
    })
    var Q11 = "DROP TABLE IF EXISTS contactUs";
    SQL.query(Q11, (err, mySQLres)=>{
        if (err) {
            console.log("error in dropping table contactUs", err);
            res.status(400).send({message: "error om dropping table contactUs" + err});
            return;
        }
        console.log("table dropped");
    })
    res.send("tables dropped");
    return;
}


module.exports = {CreateTable, DropTable,ShowTableAccountings,ShowTableUsers,ShowTableContactUs,InsertDataAccountings,InsertDataUsers,InsertDataContactUs/*, InsertData, ShowTable*/};