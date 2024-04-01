import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/shared/service/content.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userList: any;
  driverList: any;

  constructor
  (
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
  }


 



}
