import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  public form! :FormGroup;
  data : any
  constructor( public dialogRef: MatDialogRef<SelectComponent>) { 
  }
  
  ngOnInit(): void {
    console.log(this.data)
    this.createForm();
  }
  
  createForm(){
    this.form = new FormGroup({
      codId: new FormControl('')
    })
  }
  onSubmit(){
    let b = {
      id : this.data.id,
      buttonType : this.data.buttonType,
      montante : this.data.montante,
      jusante : this.data.jusante,
      idButton : this.data.array[this.data.array.length - 1],
    }
    console.log(this.form.value);
    this.dialogRef.close(b)
  
  }

}
