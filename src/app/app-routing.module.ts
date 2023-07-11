import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrototypingComponent } from './components/prototyping/prototyping.component';

const routes: Routes = [
  {path: '', component: PrototypingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
