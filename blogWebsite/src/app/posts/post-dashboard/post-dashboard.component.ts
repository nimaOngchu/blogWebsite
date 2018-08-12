import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { PostService } from '../post.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {
  title: string;
  image: string;
  content: string;

  buttonText = 'Create Post';

  uploadPercentage: Observable<number>;
  downloadURL: Observable<string | null>;

  constructor(
    private auth: AuthService,
    private postService: PostService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {}
  createPpost() {
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.CurrentUserId,
      content: this.content,
      image: this.image,
      title: this.title,
      published: new Date()
    };
    this.postService.create(data);
    this.title = '';
    this.content = '';
    this.buttonText = 'Post Created!';
    setTimeout(() => (this.buttonText = 'Create Post'), 3000);
  }
  uploadImage(event) {
    const file = event.target.files[0];
    const path = `ts/${file.name}`;
    const task = this.storage.upload(path, file);
    this.uploadPercentage = task.percentageChanges();
    task.then(() => {
      const fileRef = this.storage.ref(path);
      const url = fileRef.getDownloadURL().subscribe(imageUrl => {
        this.image = imageUrl;
      });
    });
  }
}