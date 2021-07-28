import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { FaqPageComponent } from './faq-page/faq-page.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'faq', component: FaqPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
