import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentsStorageService } from 'src/app/services/comments-storage.service';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/shared/comment.interface';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css'],
})
export class NewCommentComponent implements OnInit {
  newCommentForm!: FormGroup;

  constructor(
    private commentsService: CommentsService,
    private commentsStorageService: CommentsStorageService
  ) {}
  ngOnInit(): void {
    this.newCommentForm = new FormGroup({
      text: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }

  onCreateComment() {
    const newComment: Comment = {
      id: Math.random().toString(16),
      text: this.newCommentForm.get('text')?.value,
      timestamp: Date.now().toString(),
    };
    this.commentsService.addComment(newComment);
    this.commentsStorageService.storeComments();
    this.newCommentForm.reset();
  }
}
