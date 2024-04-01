import { Component } from '@angular/core';
import { Router,NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'restaurant';



  constructor( private router: Router,){ }

  ngOnInit(){
    this.router.events.subscribe((defaultpage) => {
      if (defaultpage instanceof NavigationStart) {
        // tslint:disable-next-line: max-line-length
        if (defaultpage.url === '/login') {
          localStorage.removeItem('currentUser');
        }
      }
    });
  }
}
