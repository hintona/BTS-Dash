//This class is for arranging the features from the Spotify top tracks and audio data for the charts to use. 
//@VT_VACKINTOSH
class SpotifyDataPipeline{
    constructor(){
        this.getData = firebase.functions().httpsCallable("getDataFromSpotifyDB");
    }
    async getTableData(name, region){
       
        var tableData = new google.visualization.DataTable();
        tableData.addColumn('string', 'Top Tracks in ' + region);
        
        
            
            await this.getData("tracks" + region).then(result => {
                let graphVariable1 = "";
                
               
                result.data.map(data => {
                    graphVariable1 = data.data[name];
                    
                    
                    tableData.addRows([[graphVariable1]]);
                
                });
                
                
            })
            
        return tableData;
    }

}