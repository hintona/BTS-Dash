//@VT_VACKINTOSH
//A class with a method to pull tracks and audio features of tracks from Spotify

// SpotifyTopTracks has an api agent and collections agent
class SpotifyTopTracks{
    constructor(spotifyApi, database){
        this.spotifyApi = spotifyApi;
        this.database = database;
        console.log(this.spotifyApi);
    }
    
  //Get top tracks for selected country, first delete existing tracks in appropriate collection, that add new tracks
  async getTracks(region){
     this.database.deleteDocuments("tracks" + region);
    this.spotifyApi
      .clientCredentialsGrant()
      .then(async (data) => {
        // Set the access token on the API object so that it's used in all future requests
        //console.log(data);
        this.spotifyApi.setAccessToken(data.body.access_token);

        if(region == ''){
          let test = await this.spotifyApi.getArtistTopTracks('3Nrfpe0tUJi4K4DXYWgMUX');
        return test;
        }
        else{
        let test = await this.spotifyApi.getArtistTopTracks('3Nrfpe0tUJi4K4DXYWgMUX', region);
        return test;
        }
      })
      .then((data) =>{
        console.log(data.body);
        
        data.body.tracks.forEach((track, index) =>{
          this.database.saveDocument(track, "tracks" + region);
        });
      })
      .catch(function(err) {
        console.log('Unfortunately, something has gone wrong.', err.message, err);
      });}
}

  module.exports={SpotifyTopTracks};