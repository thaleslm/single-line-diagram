import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  public form! :FormGroup;
  data : any
  constructor() { 
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
    console.log(this.form.value);
  }

}
