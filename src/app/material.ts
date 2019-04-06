import {MatButtonModule, MatCardModule, MatCheckboxModule, MatSnackBarModule} from '@angular/material';
import {NgModule} from '@angular/core';
@NgModule({

    imports: [
      MatButtonModule,
      MatCardModule, 
      MatCheckboxModule,
      MatSnackBarModule
     // MatSnackBar
    ],
    exports: [
        MatButtonModule, 
        MatCardModule,
        MatCheckboxModule,
        MatSnackBarModule
       // MatSnackBar
      ],
})
  export class MaterialModule { }