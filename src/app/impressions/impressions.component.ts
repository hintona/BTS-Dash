import { Component, OnInit } from '@angular/core';
declare const displaySpotifyChart:any;

@Component({
  selector: 'app-impressions',
  templateUrl: './impressions.component.html',
  styleUrls: ['./impressions.component.css']
})
export class ImpressionsComponent implements OnInit {

  constructor() { }

  async ngOnInit(){

    displaySpotifyChart("USSpotify","tracksUS");
    displaySpotifyChart("KRSpotify","tracksKR");
    displaySpotifyChart("JPSpotify","tracksJP");
    displaySpotifyChart("BRSpotify","tracksBR");
    displaySpotifyChart("FRSpotify","tracksFR");
  }

  thisDate:Date  = new Date();
  day:string = String(this.thisDate.getDate()).padStart(2, '0');
  month:string = String(this.thisDate.getMonth() + 1).padStart(2, '0');
  year:string = String(this.thisDate.getFullYear());
  today:string = +this.month+'/'+this.day +'/'+this.year;

}
