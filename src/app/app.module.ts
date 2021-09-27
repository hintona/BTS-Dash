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
import { OfficialTweetsComponent } from './social-feeds/official-tweets/official-tweets.component';
import { TrendingTweetsComponent } from './social-feeds/trending-tweets/trending-tweets.component';
import { DataDropdownComponent } from './data-dropdown/data-dropdown.component';
import { LikesharesComponent } from './likeshares/likeshares.component';
import { FollowersComponent } from './followers/followers.component';
import { ImpressionsComponent } from './impressions/impressions.component';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { HomePageComponent } from './home-page/home-page.component';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    OfficialTweetsComponent,
    TrendingTweetsComponent,
    DataDropdownComponent,
    LikesharesComponent,
    FollowersComponent,
    ImpressionsComponent,
    FaqPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
