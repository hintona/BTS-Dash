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
      'div.tweet{ width: 100%; border: 3px solid #fbc02d; text-align: left;  padding-left: 15px; padding-top: 10px; border-radius: 5px; height: fit-content; margin-bottom: 50px;}' +
      'img.profile {border: 1px solid black; border-radius: 50%;}' +
      'p.text, div.text {color:black;}' +
      'p.text:hover{text-decoration: underline}'+
      'div.text:hover{text-decoration: underline}'+
      'div.time-stamp{color:black; padding-top:10px;}'+
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
    // If the tweet is a retweet
    if(data.retweeted_status != undefined){
        if(data.retweeted_status.entities.media != undefined){
            tweetRef = data.retweeted_status.entities.media[0].expanded_url;
            tagRef.innerHTML += '<div class="tweet">' +
            //Adds profile pic, twitter name and handle
                '<a href="https://www.twitter.com/' + data.user.screen_name + '" target="_blank" rel="noopener noreferrer">' +
                    '<p class="text">' + '<img src=' + data.user.profile_image_url_https + ' class="profile" alt="'+ 
                    data.user.screen_name +' profile">  ' + data.user.name + '  @' + data.user.screen_name + ' </p>' +
                //Adds text from tweet
                '</a>'+ 
                '<div class="text">' + 'RT from @' + data.retweeted_status.user.screen_name + ':<br />' + 
                    '<a href="' + tweetRef + '" target="_blank" rel="noopener noreferrer">' +
                        '<p class="text">' + data.retweeted_status.text + '</p>' +
                    '</a>'+
                '</div>' +
                //'<img src=' + data.entities.media[0].media_url + ' alt="text"  style="height:100px">' +
                '<div class="time-stamp">' + "Created at: " + data.created_at + 
                '</div>' + 
            '</div>';
        }
        else if(data.retweeted_status.entities.urls[0] != undefined){
            tweetRef = data.retweeted_status.entities.urls[0].expanded_url;
            tagRef.innerHTML += '<div class="tweet">' +
                //Adds profile pic, twitter name and handle
                '<a href="https://www.twitter.com/' + data.user.screen_name + '" target="_blank" rel="noopener noreferrer">' +
                    '<p class="text">' + '<img src=' + data.user.profile_image_url_https + ' class="profile" alt="'+ 
                    data.user.screen_name +' profile">  ' + data.user.name + '  @' + data.user.screen_name + 
                    '</p>' +
                '</a>' +
                //Adds text from tweet
                '<div class="text">' + 'RT from @' + data.retweeted_status.user.screen_name + ':<br />' +
                    '<a href="' + tweetRef + '" target="_blank" rel="noopener noreferrer">' +
                        '<p class="text">' + data.retweeted_status.text + '</p>' +
                    '</a>'+
                '</div>' +
                '<div class="time-stamp">' + "Created at: " + data.created_at +
                '</div>' +
            '</div>';
        }
    }
    // If not, it's an original tweet
    else{
        if(data.entities.media != undefined){
            tweetRef = data.entities.media[0].expanded_url;
            tagRef.innerHTML += '<div class="tweet">' +
                //Adds profile pic, twitter name and handle
                '<a href="https://www.twitter.com/' + data.user.screen_name + '" target="_blank" rel="noopener noreferrer">' +
                    '<p class="text">' + '<img src=' + data.user.profile_image_url_https + ' class="profile" alt="'+ data.user.screen_name +' profile">  ' + data.user.name + '  @' + data.user.screen_name + ' </p>' +
                '</a>'+
                //Adds text from tweet
                '<a href="' + tweetRef + '" target="_blank" rel="noopener noreferrer">' + 
                    '<div class="text">' + data.text + '</div>' +
                '</a>'+
                '<div class="time-stamp">' + "Created at: " + data.created_at + '</div>'+
            '</div>';
        }
        else if(data.entities.urls[0] != undefined){
            tweetRef = data.entities.urls[0].expanded_url;
            tagRef.innerHTML += '<div class="tweet">' +
                //Adds profile pic, twitter name and handle
                '<a href="https://www.twitter.com/' + data.user.screen_name + '" target="_blank" rel="noopener noreferrer">' +
                    '<p class="text">' + '<img src=' + data.user.profile_image_url_https + ' class="profile" alt="'+ data.user.screen_name +' profile">  ' + data.user.name + '  @' + data.user.screen_name + ' </p>' +
                '</a>'+
                //Adds text from tweet
                '<a href="' + tweetRef + '" target="_blank" rel="noopener noreferrer">' + 
                    '<div class="text">' + data.text + '</div>' +
                '</a>'+
                '<div class="time-stamp">' + "Created at: " + data.created_at + '</div>'+
            '</div>';
        }
    }
}