const { TwitterDatabaseAgent } = require("./TwitterDabataseAgent");
const admin = require('firebase-admin');
const fetch = require("node-fetch")

class TwitterPuller{
    constructor(){

    }

    async officialTweets(){
        var url = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=BTS_twt&count=5";
        var url2 = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=bts_bighit&count=5";

        const response = fetch(url, {
            headers: {
                Authorization: "Bearer AAAAAAAAAAAAAAAAAAAAABgqOwEAAAAA1sVy3%2B0UNn2MFXwSm6DDIRXKWjQ%3DyFjSbwaVloahcI7IBzigWYy9iJL8F4JQjmCMcoYdgrcmAr3wz8"
            }
        })
        .then((response) => response.json())
        .then((response) => {
            const TD_Agent = new TwitterDatabaseAgent(admin.firestore());
                for(let index = 0; index < 5; index++){
                    //console.log(response[index]);
                    TD_Agent.saveSpecificDocument(response[index], "tweets", index.toString());
                }
        })

        const response2 = fetch(url2, {
            headers: {
                Authorization: "Bearer AAAAAAAAAAAAAAAAAAAAABgqOwEAAAAA1sVy3%2B0UNn2MFXwSm6DDIRXKWjQ%3DyFjSbwaVloahcI7IBzigWYy9iJL8F4JQjmCMcoYdgrcmAr3wz8"
            }
        })
        .then((response) => response.json())
        .then((response) => {
            const TD_Agent = new TwitterDatabaseAgent(admin.firestore());
                for(let index = 0; index < 5; index++){
                    //console.log(response[index]);
                    TD_Agent.saveSpecificDocument(response[index], "tweets", (index+5).toString());
                }
        })
    }

    async trendingTweets(){
        var url = "https://api.twitter.com/1.1/search/tweets.json?q=bts&result_type=popular&count=10";

        const response = fetch(url, {
            headers: {
                Authorization: "Bearer AAAAAAAAAAAAAAAAAAAAABgqOwEAAAAA1sVy3%2B0UNn2MFXwSm6DDIRXKWjQ%3DyFjSbwaVloahcI7IBzigWYy9iJL8F4JQjmCMcoYdgrcmAr3wz8"
            }
        })
        .then((response) => response.json())
        .then((response) => {
            const TD_Agent = new TwitterDatabaseAgent(admin.firestore());
                for(let index = 0; index < 10; index++){
                    TD_Agent.saveSpecificDocument(response["statuses"][index], "#bts", index.toString());
                }
        })
    }

    async graphTweets(index){
        const TD_Agent = new TwitterDatabaseAgent(admin.firestore());
        let presentDate;
        let prevDate;
        let sinceDate;
        let date;
        let currDate = new Date();
        let baseURL = "https://api.twitter.com/1.1/search/tweets.json?q=bts&result_type=popular&count=10";
        presentDate = new Date(currDate.getTime() - (index * 24 * 60 * 60 * 1000));
        prevDate = new Date(currDate.getTime() - ((index+1) * 24 * 60 * 60 * 1000));
        date = presentDate.getFullYear() + "-" + (presentDate.getMonth()+1) + "-" + presentDate.getDate();
        sinceDate = prevDate.getFullYear() + "-" + (prevDate.getMonth()+1) + "-" + prevDate.getDate();
        let url = baseURL + "&since=" + sinceDate + "&until=" + date
        const response = fetch(url, {
            headers: {
                Authorization: "Bearer AAAAAAAAAAAAAAAAAAAAABgqOwEAAAAA1sVy3%2B0UNn2MFXwSm6DDIRXKWjQ%3DyFjSbwaVloahcI7IBzigWYy9iJL8F4JQjmCMcoYdgrcmAr3wz8"
            }
        })
        .then((response) => response.json())
        .then((response) => {
                for(let i = 0; i < 10; i++){
                    TD_Agent.saveSpecificDocument(response["statuses"][i], date.toString(), i.toString());
                }
        })
        TD_Agent.deleteDocuments(sinceDate);
    }

}

module.exports = {TwitterPuller};