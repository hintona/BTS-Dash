import { Component, OnInit } from '@angular/core';
declare const ChartCreator:any;
declare const TwitterDataPipeline:any;

@Component({
  selector: 'app-likeshares',
  templateUrl: './likeshares.component.html',
  styleUrls: ['./likeshares.component.css']
})
export class LikesharesComponent implements OnInit {

  constructor() { }

  async ngOnInit(){
    let chartHandler = new ChartCreator();
    let dataPipeline = new TwitterDataPipeline();
    var options = {
      title: 'BTS Fan Twitter Activity',
      colors: ['#ec407a','#00bcd4'],
      vAxis: {title: 'Activity'},
      hAxis: {title: 'Date'},
      seriesType: 'bars',
      series: {5: {type: 'line'}}
    };
    let data = await dataPipeline.getComboChartData("favorite_count", "retweet_count", ["Date", "Likes", "Retweets"]);
    console.log(data);
    chartHandler.createComboChart(data, "activityChart", options);
  }

}
