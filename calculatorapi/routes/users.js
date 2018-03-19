var express = require('express');
var router = express.Router();


var users = [
    {
        username: "Mike",
        password: "mike123"
    },
    {
        username: "Tom",
        password: "tom123"
    },
    {
        username: "John",
        password: "john123"
    },
    {
        username: "Mac",
        password: "mac123"
    }
];

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/doLogin', function (req, res, next) {

    var input1 = req.body.input1;
    var input2 = req.body.input2;
    var operation=req.body.operation;
    var answer=req.body.answer;



    if(isNaN(Number(input1)) || isNaN(Number(input2)) || input1=="" || input2=="")
    {
        answer="Please provide all inputs correctly";

    }
    else
    {
        if(operation=="+")
        {
            answer=Number(input1)+Number(input2);
        }
        else if(operation=="-"){
            answer=Number(input1)-Number(input2);
        }
        else if(operation=="*"){
            answer=Number(input1)*Number(input2);
        }
        else if(operation=="/"){
            if((input1=="0" || input1=="-0") && (input2=="0" || input2=="-0"))
            {
                answer="Not Defined";
            }
            else
            {
                answer=Number(input1)/Number(input2);
            }

        }
        else if(operation===undefined){
            answer=Number(input1)+operation+Number(input2);
        }
        else {
            answer="Please provide Operation";
        }

    }
    res.json({"answer":answer});

});

module.exports = router;
