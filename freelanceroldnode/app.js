var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require('cors');
var mysql=require('mysql');
const fileUpload = require('express-fileupload');
var session = require('client-sessions');
var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var testworld=require('./routes/testworld');
var myjs = require('./routes/myjs');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    cookieName: 'session',
    secret: 'cmpe273_freelancer',
    duration: 60 * 60 * 1000,    //setting the time for active session
    activeDuration: 5 * 60 * 1000,  }));

app.use(cors());
app.use('/', index);
app.use('/users', users);
app.use('/myjs',myjs);
app.use('/login',login.login);
app.use('/logout',login.logout);
app.use('/checklogin',login.checklogin);
app.use('/allProjects',login.allProjects);
app.use('/getSelectedProject',login.getSelectedProject);
app.use('/getListOfAllBids',login.getListOfAllBids);
app.use('/getListOfAllProjectsBidOn',login.getListOfAllProjectsBidOn);
app.use('/getListOfAllProjectsAsEmployer',login.getListOfAllProjectsAsEmployer);
app.use('/makeBid',login.makeBid);
app.use('/hireFreelancer',login.hireFreelancer);
app.use('/mocha',testworld.mochatest);

app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));


app.post('/updateProfile', function(req, res, next) {
    var name;
    var user_id = req.body.user_id;
    var name=req.body.name;
    var email = req.body.email;
    var skills = req.body.skills;
    var phoneNo = req.body.phone_no;
    let profileImage = req.files.file;
    var aboutMe = req.body.about_me;
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1111",
        database: "freelancer"
    });
    profileImage.mv(`${__dirname}/public/${req.body.filename}.jpg`, function(err) {
        if (err) {
            return res.status(500).send(err);
        }});
    con.connect(function (err) {
        var flag = false;
        if (err)
            throw err;
        var json_responses;
        var sql = "update users set profile_image=?, name=?, phone_no=?, about_me=?, skills=? where user_id=?";
        con.query(sql, [profileImage,name,phoneNo,aboutMe,skills,user_id], function (err, result, fields) {
            if (err)
                throw err;
            else {
                json_responses = {result: "Done and Dusted"};
                res.json(json_responses);
            }
        });

    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
