import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/core/services/api.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  userImages = [
    "https://source.unsplash.com/mens-blue-and-white-button-up-collared-top-DItYlc26zVI",
    "https://source.unsplash.com/man-crossing-both-arms-KIPqvvTOC1s",
    "https://source.unsplash.com/man-standing-near-white-wall-d1UPkiFd04A",
    "https://source.unsplash.com/man-wearing-eyeglasses-K84vnnzxmTQ",
    "https://source.unsplash.com/man-wearing-blue-shirt-J5U-22o1ubw",
    "https://source.unsplash.com/man-in-black-jacket-smiling-a19OVaa2rzA",
    "https://source.unsplash.com/black-haired-man-making-face-sibVwORYqs0",
    "https://source.unsplash.com/man-standing-beside-wall-pAtA8xe_iVM",
    "https://source.unsplash.com/man-in-white-crew-neck-shirt-GRyMXAQdtp8"
  ];

  postsImages = [
    "https://source.unsplash.com/trees-and-green-grass-under-white-clouds-and-blue-sky-during-daytime-JoRoy500nCc",
    "https://source.unsplash.com/landscape-photograph-of-trees-near-sea-qrPqGP-SG8w",
    "https://source.unsplash.com/turned-on-gray-laptop-computer-XJXWbfSo2f0",
    "https://source.unsplash.com/gray-and-black-laptop-computer-on-surface-Im7lZjxeLhg",
    "https://source.unsplash.com/human-hand-holding-plasma-ball-vEE00Hx5d0Q",
    "https://source.unsplash.com/white-robot-near-brown-wall-2EJCSULRwC8",
    "https://source.unsplash.com/gray-satellite-disc-on-field-Wj1D-qiOseE",
    "https://source.unsplash.com/person-holding-smartphone-0VGG7cqTwCo",
    "https://source.unsplash.com/a-macbook-with-lines-of-code-on-its-screen-on-a-busy-desk-m_HRfLhgABo"
  ];

  @Input() post: any;
  @Input() currnetUser: any;
  comments: any[] = [];
  showComments = false;
  randomUserImage = ''
  postImg = ''
  commentSubscribtion : Subscription | undefined;
  loading:boolean = false


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.randomUserImage = this.getRandomUserImage('user')
    this.postImg = this.getRandomUserImage('post')
  }

  loadComments(postId: number): void {
    this.loading = true
    this.commentSubscribtion = this.apiService.getComments(postId).subscribe((comments: any[]) => {
      this.comments = comments;
      this.loading = false
    });
  }

  getRandomUserImage(type:string){
    return type == 'user' ? this.userImages[Math.floor(Math.random() * this.userImages.length)] : this.postsImages[Math.floor(Math.random() * this.postsImages.length)]

  }

  ngOnDestroy(): void {
    this.commentSubscribtion?.unsubscribe()
  }
}
