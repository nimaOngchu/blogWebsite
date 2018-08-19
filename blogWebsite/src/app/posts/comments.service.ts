import { Injectable } from '@angular/core';
import { AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument } from 'angularfire2/firestore';
  import { AngularFireStorage } from 'angularfire2/storage';
import { Comment } from './comment';
import * as firebase from 'firebase/app';
@Injectable()
export class CommentsService {
commentsCollection: AngularFirestoreCollection<Comment>;
  commentDoc: AngularFirestoreDocument<Comment>;

  constructor( private afs: AngularFirestore, private storage: AngularFireStorage ) {
this.commentsCollection = this.afs.collection('comments');
   }

   getComments(postId: string) {
    const ref = firebase.firestore().collection('comments' );
    const query = ref.orderBy('date', 'asc').where('postId', '==', postId);
   return query;
  }

create (data: any) {
  this.commentsCollection.add(data);
 }
}
