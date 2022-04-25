const { TwitterDatabaseAgent } = require("./TwitterDabataseAgent");
const admin = require('firebase-admin');

class TwitterPuller{
    constructor(){

    }

    async officialTweets(account){
        var url = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name="+ account +"&count=10";
        console.log(url);
        var XMLHttpRequest = require("xhr2");
        var xhr = new XMLHttpRequest();

        xhr.open("GET", url);

        xhr.setRequestHeader("Authorization", "Bearer AAAAAAAAAAAAAAAAAAAAABgqOwEAAAAA1sVy3%2B0UNn2MFXwSm6DDIRXKWjQ%3DyFjSbwaVloahcI7IBzigWYy9iJL8F4JQjmCMcoYdgrcmAr3wz8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                var response = xhr.responseText;
                var formResponse = JSON.parse(response);
                const TD_Agent = new TwitterDatabaseAgent(admin.firestore());
                for(let index = 0; index < 10; index++){
                    //console.log(formResponse[index]);
                    TD_Agent.saveSpecificDocument(formResponse[index], account, index.toString());
                }
                //need to split up and format the response properly
            }};
        
        xhr.send();
    }
}

module.exports = {TwitterPuller};