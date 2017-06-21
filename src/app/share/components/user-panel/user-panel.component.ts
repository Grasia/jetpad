import { Component } from '@angular/core';
import { UserService } from '../../../core/services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-panel',
    template: `

      <!-- Logged In user -->
      <div class="clearfix" *ngIf="currentUser && !currentUser.anonymous">
        <ul class="list-inline">
          <li class="dropdown cursor-pointer" dropdown>
            <span class="navbar-brand" dropdown-open>
              <div class="user-info clearfix">
                <div class="header-icon">
                  <app-user-icon [participantSession]="currentUser"></app-user-icon>
                </div>
                <div class="name-icon">{{currentUser.name}}</div>
              </div>
            </span>
            <ul class="dropdown-menu">
              <li><a [routerLink]=" ['./profile'] ">MY PROFILE</a></li>
              <li><a href="javascript:void(0)" (click)="logout()">LOGOUT</a></li>
           </ul>
          </li>
          <li><span class="navbar-brand pipe"></span></li>
        </ul>
      </div>

      <!-- Not Logged In user -->
      <div class="clearfix" *ngIf="!currentUser || currentUser.anonymous">
        <ul class="list-inline">
          <li>
            <a class="navbar-brand" [routerLink]=" ['./authentication'] ">
              <i class="icon icon-lock"></i> Login
            </a>
          </li>
          <li><span class="navbar-brand pipe"></span></li>
          <li>
            <a class="navbar-brand" [routerLink]=" ['./authentication'] ">
              <i class="icon icon-user"></i> Register
            </a>
          </li>
        </ul>
      </div>

    `
  })

export class UserPanelComponent {

  public currentUser: any;

  constructor(private userService: UserService, private router: Router) {
    userService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  public logout() {
    this.userService.logout();
    this.router.navigate(['./']);
  }
}
