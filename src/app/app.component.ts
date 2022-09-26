import { Component } from '@angular/core';

@Component({
  selector: 'fbc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Melbourne 2022';

  textboxChanged(event: any){
    console.log(event);
    this.title = event.target.value;
  }
}
