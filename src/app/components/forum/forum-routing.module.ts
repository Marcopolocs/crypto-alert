import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForumContainerComponent } from './forum-container.component';

const forumRoutes: Routes = [
  {
    path: 'community',
    component: ForumContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(forumRoutes)],
  exports: [RouterModule],
})
export class ForumRoutingModule {}
