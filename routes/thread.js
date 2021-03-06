var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var main_page = require('./main_page');
var db = require('./db');


router.get('/', function(req, res, next) {
    res.render('createthread');
})

router.post('/newthread', function(req, res, next) {
  console.log("Posting into new thread" + req.body.content);
  details_dict = {}
  content = req.body.content.replace(/<[^>]*>?/gm, '');
  
  var details = firebase.database().ref('/'+req.body.coursecode+"/threads");
  //console.log(req.body.coursecode);
  details.once('value',
  function(snapshot) {

    details_dict = snapshot.val()
    console.log(snapshot.val());
    var noOfThreads = Object.keys(details_dict).length

  console.log("Number of Threads : " + noOfThreads);

  var newThreadindex =  noOfThreads +1;
  console.log("New Thread ID : " + newThreadindex);

  var newThreadPost =
  {
    id : "1",
    username : req.body.username,
    content : content,
    dateTime : Date.now(),
    noOfLikes : 0,
    noOfVotes : 0,
    replyTo : " ",
  }

  var details = firebase.database().ref('/'+req.body.coursecode+"/threads");
  details.child(req.body.coursecode+"Thread"+(newThreadindex)).child("Post1").set(newThreadPost);
  // Post 1 cause create thread always is first post
  
  var details = firebase.database().ref('/'+req.body.coursecode+"/threads/"+req.body.coursecode+"Thread"+ newThreadindex);
  details.child("title").set(req.body.title);
  details.child("coursecode").set(req.body.coursecode);
  details.child("dateMod").set(Date.now());
  details.child("id").set(newThreadindex+req.body.coursecode);
  details.child("noOfReplies").set(0);
  details.child("lasteditedby").set(req.body.username);
  details.child("threadowner").set(req.body.username);
  details.child("viewcount").set(0);
  
  }
  )
  
  res.redirect('/main');
});

module.exports = router;

//  EXPORTED METHODS
module.exports.get_thread_size = (t_id) => {
  return get_thread(t_id).length;
};

module.exports.get_thread_replies = (t_id) => {
  return get_thread(t_id);
}

// LOCAL METHODS
function get_all_replies(){
  return replies;
};

function get_thread(t_id){
  reply_list = [];
  get_all_replies().forEach(function(reply){
    if (reply.t_id == t_id) {
      reply_list.push(reply);
    }
  });
  return reply_list;
};

// HARDCODE DATA
var replies = [
  {
    't_id': 1,
    'r_id': 1,
    'user': 'Shan Jing',
    'content': 'I think there is a Neutron Star! I would love to see one! :)',
    'reply_pos': 1
  },
  {
    't_id': 1,
    'r_id': 2,
    'user': 'Darien',
    'content': 'That\'s stupid.',
    'reply_pos': 2
  },
  {
    't_id': 4,
    'r_id': 3,
    'user': 'Shan Jing',
    'content': 'I don\'t know. I only eat Western.',
    'reply_pos': 1
  },
  {
    't_id': 1,
    'r_id': 4,
    'user': 'Shan Jing',
    'content': 'A Blackhole would be even better!',
    'reply_pos': 3
  },
  {
    't_id': 3,
    'r_id': 5,
    'user': 'Zhi Hong',
    'content': 'Type \'npm i -g nodemon\' to install. Then type \'npm install\' to setup dependencies. Finally type \'nodemon\' to run the app.',
    'reply_pos': 1
  },
  {
    't_id': 4,
    'r_id': 6,
    'user': 'Christopher',
    'content': 'Nah. It\'s Curry Chicken Noodle.',
    'reply_pos': 2
  },
  {
    't_id': 1,
    'r_id': 7,
    'user': 'Andrew',
    'content': 'Stop it.',
    'reply_pos': 4
  },
  {
    't_id': 3,
    'r_id': 8,
    'user': 'Shan Jing',
    'content': 'Or just type \'npm start\' also can.',
    'reply_pos': 2
  },
  {
    't_id': 4,
    'r_id': 9,
    'user': 'Zhi Hong',
    'content': 'I thought you liked the Seafood Horfun?',
    'reply_pos': 3
  },
  {
    't_id': 4,
    'r_id': 10,
    'user': 'Christopher',
    'content': 'The standard has dropped.',
    'reply_pos': 4
  },
  {
    't_id': 0,
    'r_id': 0,
    'quote': { 'quote_owner': 'Dev2',
                'quote_content': 'This is interesting...' },
    'username': 'Dev1',
    'content': 'Well Well Well...',
    'reply_pos': 1,
    'noOfVotes': 1
  },
  {
    't_id': 0,
    'r_id': 1,
    'username': 'Dev2',
    'content': 'This is interesting...',
    'reply_pos': 2,
    'noOfVotes': 4
  },
  {
    't_id': 5,
    'r_id': 11,
    'user': 'Qi Yuan',
    'content': 'Do I have to do MDP?',
    'reply_pos': 1
  }
];
