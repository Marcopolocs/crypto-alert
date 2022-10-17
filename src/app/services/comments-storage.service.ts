import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Comment } from '../shared/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsStorageService {
  readonly FB_URL_COMMENTS_LIST =
    'https://crypt-alert-portfolio-project-default-rtdb.europe-west1.firebasedatabase.app/commentPosts';

  commentsSubject$ = new BehaviorSubject<Comment[]>([]);
  constructor(private http: HttpClient) {}

  fetchComments(): void {
    this.http
      .get<any>(`${this.FB_URL_COMMENTS_LIST}.json`)
      .pipe(
        map((responseData) => this.updateFetchedCommentList(responseData)),
        tap((comments) => {
          this.commentsSubject$.next(comments);
        })
      )
      .subscribe();
  }

  updateFetchedCommentList(respData: any): Comment[] {
    const newCommentArray: Comment[] = [];
    if (respData) {
      for (const [key, value] of Object.entries(respData)) {
        newCommentArray.push({
          ...respData[key],
          firebaseId: key,
          date: this.dateFormatting(respData[key].timestamp),
          editDate: respData[key].editTimestamp
            ? this.dateFormatting(respData[key].editTimestamp)
            : respData[key].editTimestamp,
        });
      }
    }
    return newCommentArray;
  }

  postComment(newComment: Comment): void {
    this.http
      .post<{ name: string }>(`${this.FB_URL_COMMENTS_LIST}.json`, newComment)
      .subscribe((data) => this.updateLocalIdWithFirebaseId(newComment, data));
  }

  // Add Firebase key on POST REQUEST so user can delete their
  // comment immediately without needing to refresh page
  updateLocalIdWithFirebaseId(newComment: Comment, data: { name: string }) {
    const addFirebaseIdToCommentObject = {
      ...newComment,
      firebaseId: Object.values(data)[0],
    };
    const retrieveItemsFromSubject: Comment[] =
      this.commentsSubject$.getValue();
    retrieveItemsFromSubject.push(addFirebaseIdToCommentObject);
    this.commentsSubject$.next(retrieveItemsFromSubject);
  }

  updateComment(firebaseId: string, newComment: Comment): void {
    this.http
      .put(`${this.FB_URL_COMMENTS_LIST}/${firebaseId}.json`, newComment)
      .subscribe();
  }

  deleteComment(firebaseId: string): void {
    this.http
      .delete(`${this.FB_URL_COMMENTS_LIST}/${firebaseId}.json`)
      .subscribe();
  }

  private dateFormatting(date: number): string {
    const newDate = Date.now();
    const result = Math.round(Math.abs(newDate - date) / (1000 * 60 * 60 * 24));

    if (result === 0) return 'Today';
    if (result === 1) return 'Yesterday';
    if (result <= 7) return `${result} days ago`;

    return new Date(date).toLocaleString();
  }
}
