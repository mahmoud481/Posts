import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { CommonModule } from '@angular/common';
import { PostComponent } from './components/post/post.component';

@NgModule({
  declarations: [
    HomeComponent,
    PostComponent
  ],
  imports: [
    HomeRoutingModule,
    CommonModule
  ],
  providers: [],
})
export class HomeModule { }
