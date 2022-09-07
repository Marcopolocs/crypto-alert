import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comment } from '../shared/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService implements OnInit {
  commentsSubject$ = new BehaviorSubject<Comment[]>([]);

  // TODO: törölhető, szerintem felesleges
  private comments: Comment[] = [];

  // TODO: nem használatos dolgokat ki lehet törölni
  constructor() {}

  ngOnInit(): void {}

  addComment(newComment: Comment): void {
    this.comments.push(newComment);
    this.commentsSubject$.next(this.comments.slice());
    // this.commentsStorageService.storeComments();
  }

  getComment(): Comment[] {
    return this.commentsSubject$.getValue(); // this.comments.slice();
  }

  setComments(data: Comment[]): void {
    this.comments = data;
    this.commentsSubject$.next(this.comments.slice());
  }

  deleteComment(id: string): void {
    // TODO: ahol ilyen js függvények vannak, mint a filter, find stb., ott írjunk ki interfacet
    const newCommentArray = this.comments.filter((comment: Comment) => comment.id !== id);
    this.comments = newCommentArray;
    this.commentsSubject$.next(this.comments.slice());
    // this.commentsStorageService.storeComments();
  }

  editComment(commentId: string, editedText: string): void {
    const updatedComments = this.comments.map((comment: Comment) => {
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
    // this.commentsStorageService.storeComments();
  }
}
