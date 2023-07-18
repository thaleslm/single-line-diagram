import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrototypingComponent } from './components/prototyping/prototyping.component';
import { DragAndDropComponent } from './components/drag-and-drop/drag-and-drop.component';

const routes: Routes = [
  {path: '', component: PrototypingComponent},
  {path: 'ta', component: DragAndDropComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
