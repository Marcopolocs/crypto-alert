import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Comment } from '../shared/comment.interface';
import { CommentsService } from './comments.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsStorageService {
  comments$ = this.http
    .get<Comment[]>(
      'https://crypt-alert-portfolio-project-default-rtdb.europe-west1.firebasedatabase.app/commentPosts.json'
    )
    .pipe(
      map((responseData) => {
        const newCommentArray: Comment[] = [];
        if (responseData) {
          for (const item of responseData) {
            const newComment: Comment = {
              ...item,
              date: this.dateFormatting(item.timestamp),
              editDate: item.editTimestamp
                ? this.dateFormatting(item.editTimestamp)
                : item.editDate,
            };
            newCommentArray.push(newComment);
          }
        }

        return newCommentArray ? newCommentArray : [];
      }),
      tap((comments) => {
        this.commentsService.setComments(comments);
      })
    )
    .subscribe();

  constructor(
    private http: HttpClient,
    private commentsService: CommentsService
  ) {}

  storeComments(): void {
    const commentArray: Comment[] = this.commentsService.getComment();
    this.http
      .put(
        'https://crypt-alert-portfolio-project-default-rtdb.europe-west1.firebasedatabase.app/commentPosts.json',
        commentArray
      )
      .subscribe();
  }

  dateFormatting(date: string): string {
    const newDate = Date.now();
    const result = Math.round(
      Math.abs(newDate - +date) / (1000 * 60 * 60 * 24)
    );

    if (result === 0) return 'Today';
    if (result === 1) return 'Yesterday';
    if (result <= 7) return `${result} days ago`;

    return date.toLocaleString();
  }
}
