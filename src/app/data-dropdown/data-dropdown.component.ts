import { Component } from '@angular/core';

@Component({
  selector: 'app-data-dropdown',
  templateUrl: './data-dropdown.component.html',
  styleUrls: ['./data-dropdown.component.css']
})
export class DataDropdownComponent{

  likeshares:boolean;
  followers:boolean;
  impressions:boolean;
  engagement:boolean;

  constructor() {
    this.likeshares = false;
    this.followers = false;
    this.impressions = false;
    this.engagement = false;
   }

   toggle(changed:string){
     if(changed == 'likeshares'){
       if(this.likeshares == true) this.likeshares = false;
       else this.likeshares = true;
       this.followers = false;
       this.impressions = false;
       this.engagement = false;
     }
     if(changed == 'followers'){
      if(this.followers == true) this.followers = false;
      else this.followers = true;
      this.likeshares = false;
      this.impressions = false;
      this.engagement = false;
    }
    if(changed == 'impressions'){
      if(this.impressions == true) this.impressions = false;
      else this.impressions = true;
      this.followers = false;
      this.likeshares = false;
      this.engagement = false;
    }
    if(changed == 'engagement'){
      if(this.engagement == true) this.engagement = false;
      else this.engagement = true;
      this.followers = false;
      this.impressions = false;
      this.likeshares = false;
    }
   }
  
  

}
