import { Component, OnInit } from '@angular/core';
declare const ChartCreator:any;
declare const SpotifyDataPipeline:any;
declare const displaySpotifyChart:any;

@Component({
  selector: 'app-impressions',
  templateUrl: './impressions.component.html',
  styleUrls: ['./impressions.component.css']
})
export class ImpressionsComponent implements OnInit {

  constructor() { }

  async ngOnInit(){
    let chartHandler = new ChartCreator();
    let dataPipeline = new SpotifyDataPipeline();

    displaySpotifyChart("USSpotify","tracksUS");
    //displaySpotifyChart("MYSpotify","tracksMY");
    //displaySpotifyChart("IDSpotify","tracksID");
    //displaySpotifyChart("MXSpotify","tracksMX");
    //displaySpotifyChart("INSpotify","tracksIN");
    displaySpotifyChart("KRSpotify","tracksKR");
    displaySpotifyChart("JPSpotify","tracksJP");
    displaySpotifyChart("BRSpotify","tracksBR");
    //displaySpotifyChart("THSpotify","tracksTH");
    //displaySpotifyChart("PHSpotify","tracksPH");
  }

}
