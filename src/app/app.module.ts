import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ClickableModule} from './components/grid/popup-renderer/clickable.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDialogModule, MatToolbarModule, MatButtonModule,
  MatDatepickerModule,MatNativeDateModule,  MatFormFieldModule,MatInputModule, MatSelectModule } from '@angular/material';

import { GridComponent } from './components/grid/grid.component';
import { AppComponent } from './app.component';
import {ClickableParentComponent} from './components/grid/popup-renderer/clickable-parent.component';
import {DisplayDialogComponent} from './components/grid/dialog/display-dialog.component';

// ag-grid
import { AgGridModule }  from "ag-grid-angular";

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    DisplayDialogComponent   
  ],
  entryComponents: [ DisplayDialogComponent],
  imports: [
    BrowserModule,   AgGridModule.withComponents([AppComponent, ClickableParentComponent]),
    FormsModule, ClickableModule,
  MatDatepickerModule, MatNativeDateModule,MatToolbarModule, MatButtonModule,BrowserAnimationsModule, MatInputModule,MatFormFieldModule, MatSelectModule,MatDialogModule
  ],exports: [GridComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
