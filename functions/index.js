//Load needed packages
require('dotenv').config();
const fetch = require('node-fetch');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
//const translate = require('translate');

//Import neeeded classes
const { initializeApp } = require('firebase-admin/app');
const {TwitterDatabaseAgent} = require('./TwitterDabataseAgent.js');
const {SpotifyDatabaseAgent} = require('./SpotifyDatabaseAgent.js');
const {TwitterAPIAgent} = require("./TwitterAPIAgent.js");
const {TweetUpdater} = require("./TweetUpdater.js");
const {getTwitterClient} = require("./getTwitterClient.js");
const {getSpotifyClient} = require("./getSpotifyClient.js");
const {SpotifyTopTracks} = require("./SpotifyTopTracks.js");
const {TwitterPuller} = require("./TwitterPuller.js");

//initialize the firebase app
var serviceAccount = require("./bts-dash-firebase-adminsdk-87250-4d1a74a9dc.json");
const { app } = require('firebase-admin');
const Twitter = require('twitter');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  apiKey: "AIzaSyA_FYrLL7otV1QgH43iQ38AAHc5uw8sVw4",
  authDomain: "bts-dash.firebaseapp.com",
  databaseURL: "https://bts-dash-default-rtdb.firebaseio.com",
  projectId: "bts-dash",
  storageBucket: "bts-dash.appspot.com",
  messagingSenderId: "722872659222",
  appId: "1:722872659222:web:111a219f870fe0e28b3437",
  measurementId: "G-NPL92HGSKT"
});


//Instantiate needed classes
const client = getTwitterClient();
const SpotifyClient = getSpotifyClient();
const TD_Agent = new TwitterDatabaseAgent(admin.firestore());
const SD_Agent = new SpotifyDatabaseAgent(admin.firestore());
const TAPI_Agent = new TwitterAPIAgent(client);
const tweetHandler = new TweetUpdater(TD_Agent, TAPI_Agent);
const SpotifyTracker = new SpotifyTopTracks(SpotifyClient, SD_Agent);
const TwitterPull = new TwitterPuller();

//The top tracks for each country passed are being stored in appropriate Firestire collections
//Also, the audio features for Dynamite are also being taken here
//@VT_VACKINTOSH
exports.getTopTracks = functions.https.onRequest((request, response) =>{
  cors(request, response, async () => {
  SpotifyTracker.getTracks('US');
  SpotifyTracker.getTracks('BR');
  SpotifyTracker.getTracks('FR');
  SpotifyTracker.getTracks('KR');
  SpotifyTracker.getTracks('JP');
  response.end()
  })
  
})

//KD
exports.updateActivityData = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    let responseData = [];
    let dateRange = 7;
    let url = 'search/tweets';
    let params;
    let currDate = new Date();
    let presentDate;
    let prevDate;
    let sinceDate;
    let date;
    for (let index = 0; index<dateRange; index++){
      presentDate = new Date(currDate.getTime() - (index * 24 * 60 * 60 * 1000));
      prevDate = new Date(currDate.getTime() - ((index+1) * 24 * 60 * 60 * 1000));
      date = presentDate.getFullYear() + "-" + (presentDate.getMonth()+1) + "-" + presentDate.getDate();
      sinceDate = prevDate.getFullYear() + "-" + (prevDate.getMonth()+1) + "-" + prevDate.getDate();
      params = {q:"#bts", count:10, result_type:"popular", since:sinceDate, until:date};
      await tweetHandler.updateTweets(url, params, date, response)
      .then(data => {
        responseData.push(data);
      });
    }
    TD_Agent.deleteDocuments(sinceDate);
    response.status(200).send(responseData);
  });
});

//KD
//firebase request function to update tweets that will be displayed on the main page
exports.updateMainTweets = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    let url = 'statuses/user_timeline';
    let params = {screen_name:"bts_bighit", count:10};
    await tweetHandler.updateTweets(url, params, "tweets", response)
    .then(data => {
      response.status(200).send(data);
    });
  });
});

//KD
//firebase request function to update tweets that will be displayed on user page
exports.updateTrendingTweets = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    let url = 'search/tweets';
    let params = {q:"#bts", count:10, response_type:"popular"};
    tweetHandler.updateTweets(url, params, "#bts", response)
    .then(data => {
      response.status(200).send(data);
    });
  });
});

exports.getTwitterMainTwts = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    const officialBTS = await TwitterPull.officialTweets();
    const officialBighits = await TwitterPull.officialTweets();
    const trendingTweets = await TwitterPull.trendingTweets();
    response.end();
  }); 
})

//KD
//firebase onCall function that gets twitter data from the database and returns it
exports.getDataFromDB = functions.https.onCall(async (data, context) => {
  return TD_Agent.getDocuments(data);
})

exports.getDataFromSpotifyDB = functions.https.onCall(async (data, context) => {
  return SD_Agent.getDocuments(data);
})

//KD
//firebase scheduled function for updating main and user page tweets
exports.refreshTweets = functions.pubsub.schedule('every 24 hours').timeZone('America/New_York').onRun((context) => {
  //const mainTweets = 'https://us-central1-bts-dash.cloudfunctions.net/updateMainTweets';
  //const trendingTweets = 'https://us-central1-bts-dash.cloudfunctions.net/updateTrendingTweets';
  //const activityData = 'https://us-central1-bts-dash.cloudfunctions.net/updateActivityData';
  const Tweets = 'https://us-central1-bts-dash.cloudfunctions.net/getTwitterMainTwts';
  fetch(Tweets)
  .then((result) => console.log(result));
  //fetch(mainTweets)
  //.then((result) => console.log(result));
  //fetch(trendingTweets)
  //.then((result) => console.log(result));
  //fetch(activityData)
  //.then((result) => console.log(result));
  return null;
})
//@VT_VACKINTOSH
//Scheduled function for updating tracks and audio features
exports.refreshTracks = functions.pubsub.schedule('every 24 hours').timeZone('America/New_York').onRun((context) => {
  const newTracks = 'https://us-central1-bts-dash.cloudfunctions.net/getTopTracks';
  fetch(newTracks)
  .then((result) => console.log(result));

  return null;
})