import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../post.service';
import { Post } from '../post';
import { AuthService } from '../../core/auth.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Observable<Post[]>;
  authorPost: Post[];
  constructor( private postsService: PostService, public auth: AuthService) { }

  ngOnInit() {
    this.posts = this.postsService.getPosts();
  }
  delete(id: string, imgUrl: string) {
    this.postsService.delete(id, imgUrl);
  }

}
