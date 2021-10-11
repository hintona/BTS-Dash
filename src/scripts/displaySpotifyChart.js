//KD
/**
 * This function will display tweets stored in a firebase collection to an HTML element
 * @param htmlElement The element the tweets will be added to
 * @param collectionName The firebase collection the data will be pulled from
 */
async function displaySpotifyChart(htmlElement, collectionName){
    let getSongs = await firebase.functions().httpsCallable("getDataFromDB");
    const section = document.getElementById(htmlElement);
    getSongs(collectionName).then(result => {
        section.innerHTML += '<style>' +
      '.songName{font-family:Camber; padding-top:1px; padding-left: 2px}'
      '</style>'
        result.data.map(async (data) => {
            formatChart(data.data, section);
        })
    })
}
/**
 * Given a tweet JSON object this function will format the tweet in a twitter-like container, including the user's profile image, their
 * username, their twitter handle, the text contained in the tweet, the tweet's time stamp, and the likes/retweets count
 * @param data The tweet JSON object
 * @param tagRef A reference to the HTML element the tweet will be formatted in
 */
function formatChart(data, tagRef){

    tagRef.innerHTML += '<p class="songName">' +
    data.name +
    '</p>';
}