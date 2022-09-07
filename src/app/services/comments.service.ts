import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comment } from '../shared/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService implements OnInit {
  commentsSubject$ = new BehaviorSubject<Comment[]>([]);
  private comments: Comment[] = [];

  constructor() {}

  ngOnInit(): void {}

  addComment(newComment: Comment): void {
    this.comments.push(newComment);
    this.commentsSubject$.next(this.comments.slice());
  }

  getComment(): Comment[] {
    return this.comments.slice();
  }

  setComments(data: Comment[]): void {
    this.comments = data;
    this.commentsSubject$.next(this.comments.slice());
  }

  deleteComment(id: string): void {
    const newCommentArray = this.comments.filter(
      (comment) => comment.id !== id
    );
    this.comments = newCommentArray;
    this.commentsSubject$.next(this.comments.slice());
  }

  editComment(commentId: string, editedText: string): void {
    const updatedComments = this.comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          text: editedText,
          editTimestamp: Date.now().toString(),
          editDate: 'Today',
        };
      }
      return comment;
    });
    this.comments = updatedComments;
    this.commentsSubject$.next(this.comments.slice());
  }
}
