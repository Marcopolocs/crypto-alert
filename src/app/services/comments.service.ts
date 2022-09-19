import { Injectable, OnInit } from '@angular/core';
import { Comment } from '../shared/comment.interface';
import { CommentsStorageService } from './comments-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService implements OnInit {
  constructor(private commentsStorageService: CommentsStorageService) {}

  ngOnInit(): void {}

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
