//KD & AH
/**
 * The purpose of this class is to pull data from twitter, which can then be used to create graphs
 */
class TwitterDataPipeline{
    constructor(){
        this.getData = firebase.functions().httpsCallable("getDataFromDB");
    }

    /** 
     * Pulls data from firebase for the past 7 days and returns that data in an array
     * @param key the json field the data will be pulled from
     * @returns Returns an array of the values for the specified key from the last 7 days
     */

    async getRoundedBarChartAxis(key){
        let chartData = [];
        let dateRange = 7;
        let currDate = new Date();
        let presentDate;
        let dateData;
        for(let index = 0; index<dateRange; index++){
            presentDate = new Date(currDate.getTime() - (index * 24 * 60 * 60 * 1000));
            dateData = presentDate.getFullYear() + "-" + (presentDate.getMonth()+1) + "-" + presentDate.getDate();
            await this.getData(dateData).then(result => {
                let graphVariable = 0;
                result.data.map(data => {
                    graphVariable += data.data[key];
                });
                //activity = Math.round(activity/result.data.length);
                chartData.push(graphVariable);
            })
        }
        return chartData;
    }
}

