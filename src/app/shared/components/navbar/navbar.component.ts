import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  _users: Observable<any> | undefined;

  @Input() set users(data: Observable<any>) {
    this._users = data;
  }

  constructor(private apiService:ApiService) { }

  loadUserPosts(user: any): void {
    this.apiService.posts$ = this.apiService.getPosts(user.id);
    this.apiService.currentUser = user.username
  }

}
