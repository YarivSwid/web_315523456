const express = require("express");
const app = express();
const path = require('path');
const BodyParser = require('body-parser');
const connection = require('./DB/DB.js');
const bodyParser = require("body-parser");
const csv = require('csvtojson');
const port = 3000;
const CRUD = require('./DB/CRUD');
const cookieParser = require('cookie-parser');
const createDB = require('./DB/createDB');


app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'static')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Create a route for getting all customers
app.post('/SignUp', CRUD.signUpToDB);
app.get('/createTables',createDB.CreateTable );
app.get('/dropTables',createDB.DropTable );
app.get('/showTableAccountings',createDB.ShowTableAccountings);
app.get('/insertAccountings',createDB.InsertDataAccountings);
app.get('/insertUsers',createDB.InsertDataUsers);
app.get('/insertContactUs',createDB.InsertDataContactUs);
app.get('/showTableUsers',createDB.ShowTableUsers );
app.get('/showTableContactUs',createDB.ShowTableContactUs );
app.post('/Login',CRUD.loginToDB);
app.post('/contactUs',CRUD.contactUS );
app.post('/insertAcc',CRUD.insertAcc );


app.get('/signedUp', (req,res)=>{
    let userNameCookie = req.cookies.Signed_user;
    res.render('welcome', {v1: userNameCookie});
});
app.get('/',(req,res)=>{
    res.redirect("/piggyBank")
});

app.get('/SignIn',(req,res)=>{
    res.render('SignIn',{
        v1: "User & Password do not match, please try again :)"
    });
});

app.get('/layout',(req,res)=>{
    res.render('layout');
});
app.get('/aboutUs',(req,res)=>{
    res.render('aboutUs');
});
app.get('/contactUs',(req,res)=>{
    res.render('contactUs');
});
app.get('/signUp',(req,res)=>{
    res.render('signUp');
});
app.get('/piggyBank',(req,res)=>{
    let Signed_user_name = req.cookies.Signed_user_name;
    if(Signed_user_name != undefined) {
        res.render('piggyBank', {
            v1:
                "Hey, " + Signed_user_name + " please click on Login and sign in ! ",
            v2:
                "Hey "+ Signed_user_name +", please insert your email and password:"
        })
    }
    else
        {
        res.render('piggyBank', {
            v1:
                "Welcome to Piggy Bank Accounting, the website which will make your expenses smarter"
        })
    }
});
app.get('/piggyBankSignIn',(req,res)=>{
    let Signed_user_name = req.cookies.Signed_user_name;
    res.render('piggyBank',{
        v1:
            "Hey, "+Signed_user_name+ " please click on Login and sign in ! "
                });
});
app.get('/SignUpFail',(req,res)=>{
    let failedToSignUp = req.cookies.Login_user_email_exists;
    res.render('SignUp',{
        v1:
            "SignUp failed, this email: "+failedToSignUp+ " already exists. Please try another email. "
                });
});

app.get('/piggyAccounting',CRUD.selectAcc);
app.get('/intoTheLogin',(req,res)=>{
    res.redirect("/piggyAccounting")
});


app.listen(port,()=>{
    console.log("server is running on port "+port);
});
