var mysql=require('mysql');
var md5=require('md5');
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime=require('mime-types');




exports.logout=function (req,res) {
    var session=req.session;
    session.destroy();
    var answer = "loggedOut";
    json_responses = {statusCode: 205, "answer": answer, "username": req.session.username}
    res.json(json_responses);
};

exports.checklogin=function (req,res) {
    var answer;
    var session=req.session;
    if (session.uid) {
        username:req.session.username;
        console.log(username);
        answer = "loggedIn";
        json_responses = {statusCode: 205, "answer": answer, "username": req.session.username}
        res.json(json_responses);
    }
    else{
        answer = "loggedOut";
        json_responses = {statusCode: 206, "answer": answer, "username": "undefined"}
        res.json(json_responses);
    }
}
exports.login=function (req,res) {
    var flag=false;
    var answer="";
    var username = req.body.username;
    var password=req.body.password;
    var session = req.session;


    if(!(username==null) && !(username==""))
    {
        if(!(password==null) && !(password==""))
        {
                password = md5(password);

                var con = mysql.createConnection({
                    host: "localhost",
                    user: "root",
                    password: "1111",
                    database: "freelancer"
                });


                con.connect(function (err) {
                    var flag = false;
                    if (err)
                        throw err;
                    var json_responses;
                    var sql = "Select * from users where email = ? and password = ?";
                    //var records =[username,password];
                    con.query(sql, [username, password], function (err, result, fields) {
                        if (err)
                            throw err;
                        if (result.length >= 1) {
                            session.username = username;
                            session.uid=result[0].user_id;
                            console.log("Session initialized"+req.session.uid);
                            answer = "loggedIn";
                            let url = '/Users/sunillalwani/WebstormProjects/freelanceroldnode/public/myProfile.jpg';
                            var inStr = fs.createReadStream(url);
                            var dest='/Users/sunillalwani/WebstormProjects/freelanceroldnode/public/images/myProfile.jpg';
                            var outStr = fs.createWriteStream(dest);

                            inStr.pipe(outStr);

                            json_responses = {statusCode: 205, "answer": answer,"username":req.session.username, result:result[0], file:dest};
                            res.json(json_responses);
                        }
                        else {
                            answer = "Please Enter Correct Username and Password";
                            json_responses = {"statusCode": 401,"answer":answer};
                            res.json(json_responses);
                        }
                    });

                });


        }
        else
        {
            answer="Please provide password";
            res.json({"answer":answer});
        }
    }
    else
    {
        answer="Please provide email";
        res.json({"answer":answer});
    }

};


exports.allProjects=function (req,res) {

    var user_id=req.body.user_id;
    var name=req.body.name;
                var con = mysql.createConnection({
                    host: "localhost",
                    user: "root",
                    password: "1111",
                    database: "freelancer"
                });


                con.connect(function (err) {

                    if (err)
                        throw err;
                    var json_responses;
                    var sql = "Select * from projects where status='Not Hired' and user_id not in(?)" ;
                    //var records =[username,password];
                    con.query(sql,[user_id], function (err, result, fields) {
                        if (err)
                            throw err;
                        if (result.length >= 1) {
                            console.log("Project initialized"+result[0]);
                            json_responses = {result: result};
                            res.json(json_responses);
                        }
                        else {
                            json_responses = {result: "No Result"};
                            res.json(json_responses);
                        }
                    });

                });


};

exports.getSelectedProject=function (req,res) {

    var project_id = req.body.projectId;

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1111",
        database: "freelancer"
    });


    con.connect(function (err) {
        var flag = false;
        if (err)
            throw err;
        var json_responses;
        var sql = "Select * from projects where project_id = ?";
        //var records =[username,password];
        con.query(sql, [project_id], function (err, result, fields) {
            if (err)
                throw err;
            if (result.length >= 1) {
                json_responses = {result: result};
                res.json(json_responses);
            }
            else {
                json_responses = {result: "No Result"};
                res.json(json_responses);
            }
        });

    });


};

exports.getListOfAllBids=function (req,res) {

    var project_id = req.body.projectId;
    var json_responses;

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1111",
        database: "freelancer"
    });


    con.connect(function (err) {
        if (err)
            throw err;

        var sql = "Select * from bid inner join users where bid.user_id=users.user_id and users.user_id in (Select user_id from bid where project_id = ?)";
        con.query(sql, [project_id], function (err, result, fields) {
            if (err)
                throw err;
            else
                json_responses = {result: result};
                res.json(json_responses);
        });

    });

};


exports.getListOfAllProjectsBidOn=function (req,res) {

    var user_id = req.body.user_id;

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1111",
        database: "freelancer"
    });


    con.connect(function (err) {
        var flag = false;
        if (err)
            throw err;
        var json_responses;
        var sql = "Select * from projects inner join bid where projects.project_id=bid.project_id and projects.project_id in (Select project_id from bid where user_id = ?) and bid.user_id=?";
        con.query(sql, [user_id,user_id], function (err, result, fields) {
            if (err)
                throw err;
            if (result.length >= 1) {
                json_responses = {result: result};
                res.json(json_responses);
            }
            else {
                json_responses = {result: "No Result"};
                res.json(json_responses);
            }
        });

    });


};


exports.getListOfAllProjectsAsEmployer=function (req,res) {

    var user_id = req.body.user_id;
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1111",
        database: "freelancer"
    });


    con.connect(function (err) {
        var flag = false;
        if (err)
            throw err;
        var json_responses;
        var sql = "Select * from projects where user_id = ?";
        con.query(sql, [user_id], function (err, result, fields) {
            if (err)
                throw err;
            if (result.length >= 1) {
                json_responses = {result: result};
                res.json(json_responses);
            }
            else {
                json_responses = {result: "No Result"};
                res.json(json_responses);
            }
        });

    });


};

exports.postProjects=function (req,res) {

    var name = req.body.name;
    var description = req.body.description;
    var skillsRequired = req.body.skillsRequired;
    var budgetRange = req.body.budgetRange;
    var files = req.body.files;
    var status = req.body.status;
    var estimateProjectCompletionDate = req.body.estimateProjectCompletionDate;
    var convertedDate=new Date(estimateProjectCompletionDate);
    var owner = req.body.owner;
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1111",
        database: "freelancer"
    });

    con.connect(function (err) {
        var flag = false;
        if (err)
            throw err;
        var json_responses;
        var sql = "insert into projects values (0,?,?,?,?,LOAD_FILE('/public/images/myImage.jpg'),?,?,?)";
        con.query(sql, [name,description,skillsRequired,budgetRange,status,convertedDate,owner], function (err, result, fields) {
            if (err)
                throw err;
            else {
                json_responses = {result: "Done and Dusted"};
                res.json(json_responses);
            }
        });

    });
};


exports.makeBid=function (req,res) {

    var userId = req.body.userId;
    var projectId = req.body.projectId;
    var bidValue = req.body.bidValue;
    var days=req.body.days

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1111",
        database: "freelancer"
    });

    con.connect(function (err) {
        var flag = false;
        if (err)
            throw err;
        var json_responses;
        var sql = "insert into bid values (0,?,?,?,?)";
        con.query(sql, [userId,projectId,bidValue,days], function (err, result, fields) {
            if (err)
                throw err;
            else {
                json_responses = {result: "Bid Entered"};
                res.json(json_responses);
            }
        });

    });
};
exports.hireFreelancer=function (req,res) {

    var userId = req.body.user_id;
    var projectId = req.body.project_id;


    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1111",
        database: "freelancer"
    });

    con.connect(function (err) {
        var flag = false;
        if (err)
            throw err;
        var json_responses;
        var sql = "update projects set status='Hired' where project_id=?";
        con.query(sql, [projectId], function (err, result, fields) {
            if (err)
                throw err;
            else {
                json_responses = {result: "Freelancer Hired"};
                res.json(json_responses);
            }
        });

    });
};

exports.download = function(url, dest, cb) {
    var file = fs.createWriteStream(dest);
    var request = http.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close(cb);
        });
    });
};





