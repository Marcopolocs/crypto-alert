import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Comment } from '../shared/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsStorageService {
  commentsSubject$ = new BehaviorSubject<Comment[]>([]);
  constructor(private http: HttpClient) {}

  fetchComments(): void {
    this.http
      .get<any>(
        `https://crypt-alert-portfolio-project-default-rtdb.europe-west1.firebasedatabase.app/commentPosts.json`
      )
      .pipe(
        map((responseData) => {
          console.log(responseData);
          const newCommentArray: Comment[] = [];
          if (responseData) {
            for (const [key, value] of Object.entries(responseData)) {
              newCommentArray.push({
                ...responseData[key],
                firebaseId: key,
                date: this.dateFormatting(responseData[key].timestamp),
                editDate: responseData[key].editTimestamp
                  ? this.dateFormatting(responseData[key].editTimestamp)
                  : responseData[key].editTimestamp,
              });
            }
          }
          return newCommentArray ? newCommentArray : [];
        }),
        tap((comments) => {
          this.commentsSubject$.next(comments);
        })
      )
      .subscribe();
  }

  postComment(newComment: Comment): void {
    this.http
      .post(
        'https://crypt-alert-portfolio-project-default-rtdb.europe-west1.firebasedatabase.app/commentPosts.json',
        newComment
      )
      .subscribe((data) => {
        const addFirebaseIdToCommentObject = {
          ...newComment,
          firebaseId: Object.values(data)[0],
        };
        const retrieveItemsFromSubject: Comment[] =
          this.commentsSubject$.getValue();
        retrieveItemsFromSubject.push(addFirebaseIdToCommentObject);
        this.commentsSubject$.next(retrieveItemsFromSubject);
      });
  }

  updateComment(firebaseId: string, newComment: Comment): void {
    this.http
      .put(
        `https://crypt-alert-portfolio-project-default-rtdb.europe-west1.firebasedatabase.app/commentPosts/${firebaseId}.json`,
        newComment
      )
      .subscribe();
  }

  deleteComment(firebaseId: string): void {
    this.http
      .delete(
        `https://crypt-alert-portfolio-project-default-rtdb.europe-west1.firebasedatabase.app/commentPosts/${firebaseId}.json`
      )
      .subscribe();
  }

  dateFormatting(date: number): string {
    const newDate = Date.now();
    const result = Math.round(Math.abs(newDate - date) / (1000 * 60 * 60 * 24));

    if (result === 0) return 'Today';
    if (result === 1) return 'Yesterday';
    if (result <= 7) return `${result} days ago`;

    return new Date(date).toLocaleString();
  }
}

// get(url: string, params: string): Observable<any> => {
//   return this.httpClient.get(url, params);
// }
// put(url: string, body: Object): Observable<any> => {
//   return this.httpClient.get(url, body);
// }
// delete(url: string, params: string): Observable<any> => {
//   return this.httpClient.get(url, params);
// }
// post(url: string, body: Object): Observable<any> => {
//   return this.httpClient.get(url, body);
// }
