import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../post.service';
import { Post } from '../post';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Observable<Post[]>;
  constructor( private postsService: PostService) { }

  ngOnInit() {
    this.posts = this.postsService.getPosts();
    console.log(this);
  }
  delete(id: string) {
    this.postsService.delete(id);
  }

}
