const { TwitterDatabaseAgent } = require("./TwitterDabataseAgent");
const admin = require('firebase-admin');
const fetch = require("node-fetch")

class TwitterPuller{
    constructor(){

    }

    async officialTweets(account){
        var url = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name="+ account +"&count=10";

        const response = fetch(url, {
            headers: {
                Authorization: "Bearer AAAAAAAAAAAAAAAAAAAAABgqOwEAAAAA1sVy3%2B0UNn2MFXwSm6DDIRXKWjQ%3DyFjSbwaVloahcI7IBzigWYy9iJL8F4JQjmCMcoYdgrcmAr3wz8"
            }
        })
        .then((response) => response.json())
        .then((response) => {
            const TD_Agent = new TwitterDatabaseAgent(admin.firestore());
                for(let index = 0; index < 10; index++){
                    //console.log(response[index]);
                    TD_Agent.saveSpecificDocument(response[index], account, index.toString());
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
                    TD_Agent.saveSpecificDocument(response["statuses"][1], "#bts", index.toString());
                }
        })
    }

}

module.exports = {TwitterPuller};