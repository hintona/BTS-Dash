import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EngagementComponent } from './engagement/engagement.component';
import { FollowersComponent } from './followers/followers.component';
import { ImpressionsComponent } from './impressions/impressions.component';
import { LikesharesComponent } from './likeshares/likeshares.component';



const routes: Routes = [
  { path: 'engagement', component: EngagementComponent },
  { path: 'likeshares', component: LikesharesComponent },
  { path: 'impressions', component: ImpressionsComponent },
  { path: 'followers', component: FollowersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
