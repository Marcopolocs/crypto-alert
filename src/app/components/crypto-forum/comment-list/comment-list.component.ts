import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentsStorageService } from 'src/app/services/comments-storage.service';
import { Comment } from 'src/app/shared/comment.interface';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
})
export class CommentListComponent implements OnInit {
  comments$!: Observable<Comment[]>;
  constructor(private commentsStorageService: CommentsStorageService) {}

  ngOnInit(): void {
    this.commentsStorageService.fetchComments();
    this.comments$ = this.commentsStorageService.commentsSubject$;
  }
}
