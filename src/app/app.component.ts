import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bts-dash';

  expanded: boolean;
  
  constructor(){
    this.expanded = false;
  }

  toggleClosed() {
    const counter = 0;
    if(this.expanded){
      this.expanded = false;
    }
    else if(!this.expanded){
      this.expanded = true;
    }
    console.log(this.expanded);
    console.log(counter);
  }
}
