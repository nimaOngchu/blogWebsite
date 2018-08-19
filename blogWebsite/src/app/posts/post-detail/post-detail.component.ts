import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post';
import { AuthService } from '../../core/auth.service';
import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post;
  postId: string;
  allowEdit = false;
  buttonText = 'Save Post';
  comment: string;
  displayComment = [];
  author: string;
  authorImage: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    public auth: AuthService,
    public commentsService: CommentsService
  ) {
  }

  ngOnInit() {
    this.getPost();
    this.getComments();
  }

  getPost() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.postId = id;
    return this.postService
      .getPostData(id)
      .subscribe(data => (this.post = data));

  }
  editPost() {
    this.allowEdit = true;
  }
  deletePost(id: string, image: string) {
  }
// post a comment
  postComment() {
    if (!this.auth.Authenticated) {
      this.author = 'Guest';
      // tslint:disable-next-line:max-line-length
      this.authorImage = 'https://firebasestorage.googleapis.com/v0/b/blogapp-8f766.appspot.com/o/posts%2Fanonymous.jpg?alt=media&token=da95f9d1-cb0b-4c5f-a929-3b37486d3244';
    } else {
      this.author = this.auth.authState.displayName || this.auth.authState.email;
      this.authorImage = this.auth.authState.photoURL;
    }
    const data = {
      author: this.author,
      content: this.comment,
      date: new Date(),
       postId: this.postId,
       authorImage: this.authorImage
    };
    this.commentsService.create(data);
    this.comment = '';
  }

  // clears the comment section when cancel button is clicked
  cancelComment() {
    this.comment = '';
  }

  // get comments
  getComments() {
 this.commentsService.getComments(this.postId).onSnapshot(
      snapshot => {
        const changes = snapshot.docChanges();
        changes.forEach( result => {
          this.displayComment.push(result.doc.data());


        });
      }
    );
      }

}
