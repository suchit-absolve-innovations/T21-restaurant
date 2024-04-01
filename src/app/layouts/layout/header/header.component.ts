import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() collapseSideNav = new EventEmitter();
  show!: boolean | false;
  constructor(private auth: AuthService, public router: Router,) { }
    sideNav() {
    this.show = !this.show;
    this.collapseSideNav.emit(this.show);
  }

  ngOnInit(): void {
  }

    /* log-out */
  logouts() {
    this.router.navigateByUrl('/login');
  }

}


