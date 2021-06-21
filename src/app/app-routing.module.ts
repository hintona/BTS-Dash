import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstagramDataPgComponent } from './instagram-data/instagram-data-pg/instagram-data-pg.component';
import { SpotifyDataPgComponent } from './spotify-data/spotify-data-pg/spotify-data-pg.component';
import { TwitterDataPgComponent } from './twitter-data/twitter-data-pg/twitter-data-pg.component';

const routes: Routes = [
  { path: 'twitter', component: TwitterDataPgComponent },
  { path: 'spotify', component: SpotifyDataPgComponent },
  { path: 'insta', component: InstagramDataPgComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
