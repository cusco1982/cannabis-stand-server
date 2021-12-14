const express = require("express");
const bodyParser = require("body-parser");
const admin = require('firebase-admin');


const dotenv = require("dotenv");
dotenv.config();

var app = express();
var PORT = process.env.PORT || 3000;


//app.use(express.static(process.cwd() + "public"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var serviceAccount =
{
  "type": process.env.type,
  "project_id": process.env.project_id,
  "private_key_id": process.env.private_key_id,
  "private_key": process.env.private_key.replace(/\\n/g, '\n'),
  "client_email": process.env.client_email,
  "client_id": process.env.client_id,
  "auth_uri": process.env.auth_uri,
  "token_uri": process.env.token_uri,
  "auth_provider_x509_cert_url": process.env.auth_provider,
  "client_x509_cert_url": process.env.client
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cannabisstand-dfdcb-default-rtdb.firebaseio.com"
});

const database = admin.database();

let before24Hour = new Date().getTime() - (24 * 3600 * 1000);
let before30Day = new Date().getTime() - (24 * 30 * 3600 * 1000);

app.get("/7alltimetop10", function (req, res) {

  database.ref('7dayscore').orderByChild("score").limitToLast(10).once('value', async function (snapshot) {
    const top10obj = snapshot.val();
    const userObjsArray = [];
    const finalArr = []


    for (const userObjs in top10obj) {
      const userObj = top10obj[userObjs]
      userObjsArray.push(userObj);
    }
    userObjsArray.sort(function (a, b) { return b.score - a.score })

    // await userObjsArray.forEach((user, index) => {
    //     database.ref('users').child(user.userKey).once("value", function (snapshot) {
    //         console.log(snapshot.val());
    //     })
    // })

    for (let i = 0; i < userObjsArray.length; i++) {
      const userkey = userObjsArray[i].userKey
      const scores = userObjsArray[i].score
      await database.ref('users').child(userkey).once("value", function (snapshot) {
        const top10userObj = snapshot.val();
        finalArr.push(
          {
            username: top10userObj.username,
            score: scores,
            insta: top10userObj.instagram,
            facebook: top10userObj.facebook,
            twitter: top10userObj.twitter
          }
        );
      });
    }
    return res.send(finalArr);
  });
});
app.get("/14alltimetop10", function (req, res) {
  database.ref('14dayscore').orderByChild("score").limitToLast(10).once('value', async function (snapshot) {
    const top10obj = snapshot.val();
    const userObjsArray = [];
    const finalArr = []

    for (const userObjs in top10obj) {
      const userObj = top10obj[userObjs]
      userObjsArray.push(userObj);
    }
    userObjsArray.sort(function (a, b) { return b.score - a.score })

    for (let i = 0; i < userObjsArray.length; i++) {
      const userkey = userObjsArray[i].userKey
      const scores = userObjsArray[i].score
      await database.ref('users').child(userkey).once("value", function (snapshot) {
        const top10userObj = snapshot.val();
        finalArr.push(
          {
            username: top10userObj.username,
            score: scores,
            insta: top10userObj.instagram,
            facebook: top10userObj.facebook,
            twitter: top10userObj.twitter
          }
        );
      });
    }
    return res.send(finalArr);
  });
});
app.get("/30alltimetop10", function (req, res) {
  database.ref('30dayscore').orderByChild("score").limitToLast(10).once('value', async function (snapshot) {
    const top10obj = snapshot.val();
    const userObjsArray = [];
    const finalArr = []

    for (const userObjs in top10obj) {
      const userObj = top10obj[userObjs]
      userObjsArray.push(userObj);
    }
    userObjsArray.sort(function (a, b) { return b.score - a.score })

    for (let i = 0; i < userObjsArray.length; i++) {
      const userkey = userObjsArray[i].userKey
      const scores = userObjsArray[i].score
      await database.ref('users').child(userkey).once("value", function (snapshot) {
        const top10userObj = snapshot.val();
        finalArr.push(
          {
            username: top10userObj.username,
            score: scores,
            insta: top10userObj.instagram,
            facebook: top10userObj.facebook,
            twitter: top10userObj.twitter
          }
        );
      });
    }
    return res.send(finalArr);
  });
});

app.get("/7dailytop10", function (req, res) {
  database.ref().child('7dayscore').orderByChild('dateAdded').startAt(before24Hour).once('value', async function (snapshot) {
    const top10obj = snapshot.val();
    const userObjsArray = [];
    const finalArr = []

    for (const userObjs in top10obj) {
      const userObj = top10obj[userObjs]
      userObjsArray.push(userObj);
    }
    userObjsArray.sort(function (a, b) { return b.score - a.score })

    for (let i = 0; i < userObjsArray.length; i++) {
      const userkey = userObjsArray[i].userKey
      const scores = userObjsArray[i].score
      await database.ref('users').child(userkey).once("value", function (snapshot) {
        const top10userObj = snapshot.val();
        finalArr.push(
          {
            username: top10userObj.username,
            score: scores,
            insta: top10userObj.instagram,
            facebook: top10userObj.facebook,
            twitter: top10userObj.twitter
          }
        );
      });
    }
    const newArr = finalArr.slice(0,10);
    return res.send(newArr);
  });
});
app.get("/14dailytop10", function (req, res) {
  database.ref().child('14dayscore').orderByChild('dateAdded').startAt(before24Hour).once('value', async function (snapshot) {
    const top10obj = snapshot.val();
    const userObjsArray = [];
    const finalArr = []

    for (const userObjs in top10obj) {
      const userObj = top10obj[userObjs]
      userObjsArray.push(userObj);
    }
    userObjsArray.sort(function (a, b) { return b.score - a.score })

    for (let i = 0; i < userObjsArray.length; i++) {
      const userkey = userObjsArray[i].userKey
      const scores = userObjsArray[i].score
      await database.ref('users').child(userkey).once("value", function (snapshot) {
        const top10userObj = snapshot.val();
        finalArr.push(
          {
            username: top10userObj.username,
            score: scores,
            insta: top10userObj.instagram,
            facebook: top10userObj.facebook,
            twitter: top10userObj.twitter
          }
        );
      });
    }
    const newArr = finalArr.slice(0,10);
    return res.send(newArr);
  });
});
app.get("/30dailytop10", function (req, res) {
  database.ref().child('30dayscore').orderByChild('dateAdded').startAt(before24Hour).once('value', async function (snapshot) {
    const top10obj = snapshot.val();
    const userObjsArray = [];
    const finalArr = []

    for (const userObjs in top10obj) {
      const userObj = top10obj[userObjs]
      userObjsArray.push(userObj);
    }
    userObjsArray.sort(function (a, b) { return b.score - a.score })

    for (let i = 0; i < userObjsArray.length; i++) {
      const userkey = userObjsArray[i].userKey
      const scores = userObjsArray[i].score
      await database.ref('users').child(userkey).once("value", function (snapshot) {
        const top10userObj = snapshot.val();
        finalArr.push(
          {
            username: top10userObj.username,
            score: scores,
            insta: top10userObj.instagram,
            facebook: top10userObj.facebook,
            twitter: top10userObj.twitter
          }
        );
      });
    }
    const newArr = finalArr.slice(0,10);
    return res.send(newArr);
  });
});

app.get("/7monthlytop10", function (req, res) {
  database.ref().child('7dayscore').orderByChild('dateAdded').startAt(before30Day).once('value', async function (snapshot) {
    const top10obj = snapshot.val();
    const userObjsArray = [];
    const finalArr = []

    for (const userObjs in top10obj) {
      const userObj = top10obj[userObjs]
      userObjsArray.push(userObj);
    }
    userObjsArray.sort(function (a, b) { return b.score - a.score })

    for (let i = 0; i < userObjsArray.length; i++) {
      const userkey = userObjsArray[i].userKey
      const scores = userObjsArray[i].score
      await database.ref('users').child(userkey).once("value", function (snapshot) {
        const top10userObj = snapshot.val();
        finalArr.push(
          {
            username: top10userObj.username,
            score: scores,
            insta: top10userObj.instagram,
            facebook: top10userObj.facebook,
            twitter: top10userObj.twitter
          }
        );
      });
    }
    const newArr = finalArr.slice(0,10);
    return res.send(newArr);
  });
});
app.get("/14monthlytop10", function (req, res) {
  database.ref().child('14dayscore').orderByChild('dateAdded').startAt(before30Day).once('value', async function (snapshot) {
    const top10obj = snapshot.val();
    const userObjsArray = [];
    const finalArr = []

    for (const userObjs in top10obj) {
      const userObj = top10obj[userObjs]
      userObjsArray.push(userObj);
    }
    userObjsArray.sort(function (a, b) { return b.score - a.score })

    for (let i = 0; i < userObjsArray.length; i++) {
      const userkey = userObjsArray[i].userKey
      const scores = userObjsArray[i].score
      await database.ref('users').child(userkey).once("value", function (snapshot) {
        const top10userObj = snapshot.val();
        finalArr.push(
          {
            username: top10userObj.username,
            score: scores,
            insta: top10userObj.instagram,
            facebook: top10userObj.facebook,
            twitter: top10userObj.twitter
          }
        );
      });
    }
    const newArr = finalArr.slice(0,10);
    return res.send(newArr);
  });
});
app.get("/30monthlytop10", function (req, res) {
  database.ref().child('30dayscore').orderByChild('dateAdded').startAt(before30Day).once('value', async function (snapshot) {
    const top10obj = snapshot.val();
    const userObjsArray = [];
    const finalArr = []

    for (const userObjs in top10obj) {
      const userObj = top10obj[userObjs]
      userObjsArray.push(userObj);
    }
    userObjsArray.sort(function (a, b) { return b.score - a.score })

    for (let i = 0; i < userObjsArray.length; i++) {
      const userkey = userObjsArray[i].userKey
      const scores = userObjsArray[i].score
      await database.ref('users').child(userkey).once("value", function (snapshot) {
        const top10userObj = snapshot.val();
        finalArr.push(
          {
            username: top10userObj.username,
            score: scores,
            insta: top10userObj.instagram,
            facebook: top10userObj.facebook,
            twitter: top10userObj.twitter
          }
        );
      });
    }
    const newArr = finalArr.slice(0,10);
    return res.send(newArr);
  });
});


app.post('/userpost', async (request, response) => {
  const dateAdded = admin.database.ServerValue.TIMESTAMP;
  // console.log(request.body);
  const newUser = {
    dateAdded,
    instagram: request.body.instagram,
    twitter: request.body.twitter,
    facebook: request.body.facebook,
    phone: request.body.phone,
    email: request.body.email,
    username: request.body.username
  };

  const userKey = await database.ref('users').push(newUser).getKey()

  const user7dayscore = {
    userKey,
    score: request.body.userScore,
    dateAdded,
    totalIncome: request.body.totalIncome,
    totalExpenses: request.body.totalExpenses
  }


  if (request.body.duration === 7) {
    await database.ref('7dayscore').push(user7dayscore)
  } else if (request.body.duration === 14) {
    await database.ref('14dayscore').push(user7dayscore)
  } else if (request.body.duration === 30) {
    await database.ref('30dayscore').push(user7dayscore)
  } else {
    console.log('database push error')
  }


  return response.json({
    status: 'success'
  })
})


//routes
require("./routes/html-routes.js")(app);


app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});