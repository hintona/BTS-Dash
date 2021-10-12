import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
declare const TwitterDataPipeline:any;

@Component({
  selector: 'app-likeshares',
  templateUrl: './likeshares.component.html',
  styleUrls: ['./likeshares.component.css']
})
export class LikesharesComponent implements OnInit {

  constructor() { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels = ['---', '---', '---', '---', '---', '---', '---'];
  public barChartType : ChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [0], label: 'Likes'},
    {data: [0], label: 'Retweets'}
  ];

  async ngOnInit(){
    let dataPipeline = new TwitterDataPipeline();
    let colors: ['#ec407a','#00bcd4']

    var likesData = await dataPipeline.getRoundedBarChartAxis("favorite_count");
    var retweetsData = await dataPipeline.getRoundedBarChartAxis("retweet_count");
    this.refreshData(0, likesData);
    this.refreshData(1, retweetsData);
    this.getDates();
  }

  refreshData(axis:number, newData:number[]){
    this.barChartData[axis].data = newData;
  }

  getDates(){
    let dateRange = 7;
    let currDate = new Date();
    let presentDate;
    let dateData;
    let dates = [];
    for(let index = 0; index<dateRange; index++){
      presentDate = new Date(currDate.getTime() - (index * 24 * 60 * 60 * 1000));
      dateData = presentDate.getFullYear() + "-" + (presentDate.getMonth()+1) + "-" + presentDate.getDate();
      dates.push(dateData);
    }
    this.barChartLabels = dates;
  }
}
