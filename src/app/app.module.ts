import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrototypingComponent } from './components/prototyping/prototyping.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectComponent } from './components/modal/select/select.component';

@NgModule({
  declarations: [
    AppComponent,
    PrototypingComponent,
    SelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
