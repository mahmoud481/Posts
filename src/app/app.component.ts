import { Subject, Subscription } from 'rxjs';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from './core/services/api.service';
import { CommonService } from './core/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit,OnDestroy{

  loading:boolean = false
  loaderSubscribtion : Subscription | undefined;

  constructor(public apiService:ApiService, private common: CommonService, private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.common.loading.subscribe(res=>{
      this.loading = res
      this.cdr.detectChanges()
    })

    this.apiService.users$ = this.apiService.getUsers()
  }

  ngOnDestroy(): void {
    this.loaderSubscribtion?.unsubscribe()
  }

}
