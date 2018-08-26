import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { PostService } from '../post.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
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
  filePath: string;
  uploadPercentage: Observable<number>;
  downloadURL: Observable<string | null>;

  constructor(
    private auth: AuthService,
    private postService: PostService,
    private storage: AngularFireStorage,
    private route: Router
  ) {}

  ngOnInit() {}
  createPpost() {
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.CurrentUserId,
      content: this.content,
      image: this.image,
      title: this.title,
      imagePath: this.filePath,
      published: new Date()
    };
    this.postService.create(data);
    this.title = '';
    this.content = '';

    this.buttonText = 'Post Created!';
    setTimeout(() => (this.buttonText = 'Create Post'), 3000);
    this.route.navigateByUrl('');
  }
  uploadImage(event) {
    const file = event.target.files[0];
    this.filePath = `posts/${new Date() + file.name}`;
    const task = this.storage.upload(this.filePath, file);
    this.uploadPercentage = task.percentageChanges();
    task.then(() => {
      const fileRef = this.storage.ref(this.filePath);
      fileRef.getDownloadURL().subscribe(imageUrl => {
        this.image = imageUrl;
      });
    });
  }
}
