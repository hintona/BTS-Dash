import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TwitterLrComponent } from './twitter-data/twitter-lr/twitter-lr.component';
import { SpotifyRegionComponent } from './spotify-data/spotify-region/spotify-region.component';
import { OfficialTweetsComponent } from './social-feeds/official-tweets/official-tweets.component';
import { TrendingTweetsComponent } from './social-feeds/trending-tweets/trending-tweets.component';
import { DataDropdownComponent } from './data-dropdown/data-dropdown.component';
import { TwitterDataPgComponent } from './twitter-data/twitter-data-pg/twitter-data-pg.component'
import { SpotifyDataPgComponent } from './spotify-data/spotify-data-pg/spotify-data-pg.component';
import { InstagramDataPgComponent } from './instagram-data/instagram-data-pg/instagram-data-pg.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TwitterLrComponent,
    SpotifyRegionComponent,
    OfficialTweetsComponent,
    TrendingTweetsComponent,
    DataDropdownComponent,
    TwitterDataPgComponent,
    SpotifyDataPgComponent,
    InstagramDataPgComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
