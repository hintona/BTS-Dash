//KD
/**
 * This function will display tweets stored in a firebase collection to an HTML element
 * @param htmlElement The element the tweets will be added to
 * @param collectionName The firebase collection the data will be pulled from
 */
async function displayTweets(htmlElement, collectionName){
    let getTweets = await firebase.functions().httpsCallable("getDataFromDB");
    const section = document.getElementById(htmlElement);
    getTweets(collectionName).then(result => {
        section.innerHTML += '<style>' +
      'div.tweet{ width: 100%; border: 1px solid lightgrey; text-align: left; padding-left: 15px; padding-top: 10px; background: white}' +
      'div.tweet:hover{background:#f2f2f2}' +
      'img.profile {border: 1px solid transparent; border-radius: 50%;}' +
      '.text {color:black; padding-right:10px}' +
      '.name {color:black;}' +
      '.text:hover{text-decoration: underline}'+
      '.name:hover{text-decoration: underline}'+
      '.time-stamp{color:grey;}'+
      '</style>'
        result.data.map(async (data) => {
            formatTweet(data.data, section);
        })
    })
}
/**
 * Given a tweet JSON object this function will format the tweet in a blue container, including the user's profile image, their
 * username, their twitter handle, the text contained in the tweet, and the tweet's time stamp
 * @param data The tweet JSON object
 * @param tagRef A reference to the HTML element the tweet will be formatted in
 */
function formatTweet(data, tagRef){
    let tweetRef;

    let retweetCount;
    let timeStamp = data.created_at;

    if(data.retweeted_status != undefined){
        retweetCount = data.retweeted_status.favorite_count;
        if(data.retweeted_status.entities.media != undefined){
            tweetRef = data.retweeted_status.entities.media[0].expanded_url;
        }
        else if(data.retweeted_status.entities.urls[0] != undefined){
            tweetRef = data.retweeted_status.entities.urls[0].expanded_url;
        }
    }
    else{
        retweetCount = data.favorite_count;
        if(data.entities.media != undefined){
            tweetRef = data.entities.media[0].expanded_url;
        }
        else if(data.entities.urls[0] != undefined){
            tweetRef = data.entities.urls[0].expanded_url;
        }
    }

    tagRef.innerHTML += '<div class="tweet">' +
    //Adds profile pic, twitter name and handle
    '<a href="https://www.twitter.com/' + data.user.screen_name + '" target="_blank" rel="noopener noreferrer">' +
        '<div>' + '<img src=' + data.user.profile_image_url_https + ' class="profile" alt="'+ 
        data.user.screen_name +' profile">  ' + 
        '<span class="name">' + data.user.name + '</span>' +
        '<span class="time-stamp">  @' + data.user.screen_name + ' · ' + timeStamp.substring(4,10) + '</span>' +
        '</div>' +
    '</a>' +

    //Adds text from tweet
    '<a href="' + tweetRef + '" target="_blank" rel="noopener noreferrer">' +
        '<p class="text">' + data.text + '</p>' +
    '</a>'+

    '<span style="text-align:center">'+
        '<div>' + "<img src=../assets/retweet_icon.png>" + data.retweet_count + '<img src=../assets/likes_icon.png style="padding-left:10px">' + retweetCount +
        '</div>'
    '</span>'
    '</div>';
}