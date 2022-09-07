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

  onDeleteComment(id: string): void {
    this.commentsService.deleteComment(id);
    this.commentsStorageService.storeComments();
  }

  onEditComment(id: string): void {
    this.isEditMode = true;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { edit: id },
    });
  }

  changeText(event: Event): void {
    this.editedText = (event.target as HTMLTextAreaElement).value;
  }

  onCancelEdit(): void {
    this.isEditMode = false;
    this.router.navigate(['community']);
  }

  onSaveEditedComment() {
    if (this.commentObject.text === this.editedText) {
      this.isEditMode = false;
      this.router.navigate(['community']);
      return;
    }
    this.commentsService.editComment(this.commentObject.id, this.editedText);
    this.router.navigate(['community']);
    this.isEditMode = false;
  }
}
