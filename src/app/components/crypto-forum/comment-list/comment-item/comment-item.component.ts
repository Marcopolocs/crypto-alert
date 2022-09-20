import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsStorageService } from 'src/app/services/comments-storage.service';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/shared/comment.interface';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css'],
})
export class CommentItemComponent implements OnInit {
  isEditMode: boolean = false;
  @Input() index!: number;
  @Input() commentObject!: Comment;
  editedText = '';

  constructor(
    private commentsService: CommentsService,
    private commentsStorageService: CommentsStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editedText = this.commentObject.text;
  }

  onDeleteComment(commentItem: Comment): void {
    this.commentsService.deleteComment(commentItem.id);
    if (commentItem.firebaseId) {
      this.commentsStorageService.deleteComment(commentItem.firebaseId);
    }
  }

  onEditComment(commentItem: Comment): void {
    this.isEditMode = true;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { edit: commentItem.firebaseId },
    });
  }

  changeText(event: Event): void {
    this.editedText = (event.target as HTMLTextAreaElement).value;
  }

  onCancelEdit(): void {
    this.isEditMode = false;
    this.router.navigate(['community']);
  }

  onSaveEditedComment(): void {
    if (this.commentObject.text === this.editedText) {
      this.isEditMode = false;
      this.router.navigate(['community']);
      return;
    }
    const commentsList: Comment[] =
      this.commentsStorageService.commentsSubject$.getValue();
    const newCommentsList = commentsList.map((comment: Comment) => {
      if (
        comment.firebaseId &&
        comment.firebaseId === this.commentObject.firebaseId
      ) {
        const updateCommentItem = {
          ...comment,
          text: this.editedText,
          editTimestamp: Date.now(),
          editDate: 'Today',
        };
        this.commentsStorageService.updateComment(
          comment.firebaseId,
          updateCommentItem
        );

        return updateCommentItem;
      }
      return comment;
    });
    this.commentsService.editComment(newCommentsList);
    this.router.navigate(['community']);
    this.isEditMode = false;
  }
}
