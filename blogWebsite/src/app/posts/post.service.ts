import { Injectable } from '@angular/core';
import { AngularFirestore,
         AngularFirestoreCollection,
         AngularFirestoreDocument } from 'angularfire2/firestore';
import { Post } from './post';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase/app';
@Injectable()
export class PostService {
postsCollection: AngularFirestoreCollection<Post>;
postDoc: AngularFirestoreDocument<Post>;
  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
                  this.postsCollection = this.afs.collection('posts', ref =>
                  ref.orderBy('published', 'desc'));
   }

   getPosts() {
    return this.postsCollection.snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
   }

   getPostData(id: string ) {
    this.postDoc = this.getPost(id);
    return this.postDoc.valueChanges();
   }
   getPost(id: string) {
     return this.afs.doc<Post>('posts/' + id);
   }

   create (data: Post) {
    this.postsCollection.add(data);
   }
   delete (id: string, imgUrl: string) {
    const imgRef = firebase.storage().refFromURL(imgUrl);
    imgRef.delete();
    this.getPost(id).delete();
   }
   update (id: string, formData) {
    return this.getPost(id).update(formData);
   }
}
