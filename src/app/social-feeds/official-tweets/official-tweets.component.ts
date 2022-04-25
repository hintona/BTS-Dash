import { Component, OnInit, AfterViewInit } from '@angular/core';
declare const displayTweets:any;

@Component({
  selector: 'app-official-tweets',
  templateUrl: './official-tweets.component.html',
  styleUrls: ['./official-tweets.component.css']
})
export class OfficialTweetsComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
    displayTweets("tweets", "bts_bighit");
    displayTweets("tweets", "BTS_twt");
  }

  ngAfterViewInit() {
    let ngJs: any;
    const ngFjs = document.getElementsByTagName('script')[0];
    console.log("No element");
    ngJs = document.createElement('script');
    ngJs.id = 'twitter-wjs';
    ngJs.src = 'https://platform.twitter.com/widgets.js';
    ngFjs.parentNode!.insertBefore(ngJs, ngFjs);
  }

  thisDate:Date  = new Date();
  day:string = String(this.thisDate.getDate()).padStart(2, '0');
  month:string = String(this.thisDate.getMonth() + 1).padStart(2, '0');
  year:string = String(this.thisDate.getFullYear());
  today:string = +this.month+'/'+this.day +'/'+this.year;

}
