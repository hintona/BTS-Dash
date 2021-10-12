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

}
