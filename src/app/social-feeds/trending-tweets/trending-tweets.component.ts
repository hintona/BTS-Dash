import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
declare const displayTweets:any;

@Component({
  selector: 'app-trending-tweets',
  templateUrl: './trending-tweets.component.html',
  styleUrls: ['./trending-tweets.component.css']
})
export class TrendingTweetsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    displayTweets("trendingTweets", "#bts");
  }

  thisDate:Date  = new Date();
  day:string = String(this.thisDate.getDate()).padStart(2, '0');
  month:string = String(this.thisDate.getMonth() + 1).padStart(2, '0');
  year:string = String(this.thisDate.getFullYear());
  today:string = this.day +'/'+this.month+'/'+this.year;
}
