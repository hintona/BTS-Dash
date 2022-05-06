//Load needed packages
require('dotenv').config();
const fetch = require('node-fetch');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
//const translate = require('translate');

//Import neeeded classes
const {TwitterDatabaseAgent} = require('./TwitterDabataseAgent.js');
const {SpotifyDatabaseAgent} = require('./SpotifyDatabaseAgent.js');
const {getSpotifyClient} = require("./getSpotifyClient.js");
const {SpotifyTopTracks} = require("./SpotifyTopTracks.js");
const {TwitterPuller} = require("./TwitterPuller.js");

//initialize the firebase app
var serviceAccount = require("./bts-dash-firebase-adminsdk-87250-4d1a74a9dc.json");
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
const SpotifyClient = getSpotifyClient();
const TD_Agent = new TwitterDatabaseAgent(admin.firestore());
const SD_Agent = new SpotifyDatabaseAgent(admin.firestore());
const SpotifyTracker = new SpotifyTopTracks(SpotifyClient, SD_Agent);
const TwitterPull = new TwitterPuller();

//The top tracks for each country passed are being stored in appropriate Firestire collections
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

//Pulls the official and trending tweets
exports.getTwitterMainTwts = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    const officialTweets = await TwitterPull.officialTweets();
    const trendingTweets = await TwitterPull.trendingTweets();
    response.end();
  }); 
})

//Pulls the graph data for the last week
exports.getTwitterGraphData = functions.https.onRequest(async (request, response) => {
  cors(request, response, async() => {
    const graphData0 = await TwitterPull.graphTweets(0);
    const graphData1 = await TwitterPull.graphTweets(1);
    const graphData2 = await TwitterPull.graphTweets(2);
    const graphData3 = await TwitterPull.graphTweets(3);
    const graphData4 = await TwitterPull.graphTweets(4);
    const graphData5 = await TwitterPull.graphTweets(5);
    const graphData6 = await TwitterPull.graphTweets(6);
    response.end()
  })
})

//firebase onCall function that gets twitter data from the database and returns it
exports.getDataFromDB = functions.https.onCall(async (data, context) => {
  return TD_Agent.getDocuments(data);
})

exports.getDataFromSpotifyDB = functions.https.onCall(async (data, context) => {
  return SD_Agent.getDocuments(data);
})

//firebase scheduled function for updating twitter feeds
exports.refreshTweets = functions.pubsub.schedule('every 24 hours').timeZone('America/New_York').onRun((context) => {
  const Tweets = 'https://us-central1-bts-dash.cloudfunctions.net/getTwitterMainTwts';
  fetch(Tweets)
  .then((result) => console.log(result));
  return null;
})

//firebase scheduled function for updating twitter graphs, separated from refreshTweets for performance
exports.refreshGraph = functions.pubsub.schedule('every 24 hours').timeZone('America/New_York').onRun((context) => {
  const Graph = 'https://us-central1-bts-dash.cloudfunctions.net/getTwitterGraphData';
  fetch(Graph)
  .then((result) => console.log(result));
  return null;
})

//Scheduled function for updating tracks and audio features
exports.refreshTracks = functions.pubsub.schedule('every 24 hours').timeZone('America/New_York').onRun((context) => {
  const newTracks = 'https://us-central1-bts-dash.cloudfunctions.net/getTopTracks';
  fetch(newTracks)
  .then((result) => console.log(result));

  return null;
})