var express = require('express');
var router = express.Router();

var main_page = require('./main_page');
var firebase = require('firebase');

router.get('/', function(req, res, next) {
    res.render('createquiz');
})

router.post('/newquiz', function(req, res, next) {

  console.log(req.body.title);

  details_dict = {}

  var details = firebase.database().ref('/'+req.body.coursecode+"/quizzes");
  //console.log(req.body.coursecode);
  details.on('value',
  function(snapshot) {
    details_dict = snapshot.val()
    console.log(snapshot.val());
  }
  )
  var noOfQuizzes = Object.keys(details_dict).length;
  var newQuizindex =  noOfQuizzes +1;

  console.log("Number of Quizzes : " + noOfQuizzes);
  console.log("TEST11111: " + req.body["ans5"]);

  for(var x=1;x<=req.body.noques;x++){

    var newQuiz =
      {
        answer : req.body["ans" + x],
        explanation : req.body["exp" + x],
        ques : req.body["question" + x],
        opt1 : req.body["opt1" + x],
        opt2 : req.body["opt2" + x],
        opt3 : req.body["opt3" + x],
        opt4 : req.body["opt4" + x],
        
      }
    console.log("New Quiz ID : " + newQuizindex);
    details.child("Quiz"+(newQuizindex)).child("Question" + x).set(newQuiz);

  }

  var details = firebase.database().ref('/'+req.body.coursecode+"/quizzes/Quiz"+ newQuizindex);
  details.child("Title").set(req.body.title);
 

  /*
  var newQuiz =
  {
    answer : req.body.correctans,
    explanation : req.body.exp,
    ques : req.body.question1,
    opt1 : req.body.option1,
    opt2 : req.body.option2,
    opt3 : req.body.option3,
    opt4 : req.body.option4,
    
  }

  var newQuizindex =  noOfQuizzes +1;
  console.log("New Quiz ID : " + newQuizindex);
  details.child("Quiz"+(newQuizindex)).child("Question1").set(newQuiz);
  // question1 for testing

  var details = firebase.database().ref('/'+req.body.coursecode+"/quizzes/Quiz"+ newQuizindex);
 details.child("Title").set(req.body.title);*/

  //stay on page
  res.redirect('.');

});




module.exports = router;