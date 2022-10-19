import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForumRoutingModule } from './forum-routing.module';

import { CommentItemComponent } from './comment-list/comment-item/comment-item.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { ForumContainerComponent } from './forum-container.component';
import { NewCommentComponent } from './new-comment/new-comment.component';

@NgModule({
  declarations: [
    ForumContainerComponent,
    CommentListComponent,
    CommentItemComponent,
    NewCommentComponent,
  ],
  imports: [SharedModule, ReactiveFormsModule, ForumRoutingModule],
})
export class ForumModule {}
