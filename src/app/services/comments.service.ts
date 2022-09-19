import { Injectable, OnInit } from '@angular/core';
import { Comment } from '../shared/comment.interface';
import { CommentsStorageService } from './comments-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService implements OnInit {
  constructor(private commentsStorageService: CommentsStorageService) {}

  ngOnInit(): void {}

  addComment(newComment: Comment): void {
    const commentList: Comment[] =
      this.commentsStorageService.commentsSubject$.getValue();
    commentList.push(newComment);
    this.commentsStorageService.commentsSubject$.next(commentList);
  }

  getComment(): Comment[] {
    return this.commentsStorageService.commentsSubject$.getValue();
  }

  setComments(data: Comment[]): void {
    this.commentsStorageService.commentsSubject$.next(data);
  }

  deleteComment(id: string): void {
    const commentList: Comment[] =
      this.commentsStorageService.commentsSubject$.getValue();
    const filteredList = commentList.filter(
      (comment: Comment) => comment.id !== id
    );
    this.commentsStorageService.commentsSubject$.next(filteredList);
  }

  editComment(commentList: Comment[]): void {
    this.commentsStorageService.commentsSubject$.next(commentList);
  }
}
