import { GlobalService } from './../../../global.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-income-info',
  templateUrl: './income-info.component.html',
  styleUrls: ['./income-info.component.css']
})
export class IncomeInfoComponent implements OnInit {
  public incomeInfoForm:FormGroup;

  constructor(private _formBuilder: FormBuilder,private globalService:GlobalService) { }

  ngOnInit(): void {
    this.incomeInfoForm = new FormBuilder().group({
      yearlyIncome : ['',  ],
      agriculture : ['', ],
      business : ['', ],
      job : ['',  ],
      fJob : ['',  ],
      other : ['', ],



    });

  }

  isValid(): boolean {
    return false;
  }

  stepperClicked(){
    if(!this.incomeInfoForm.valid){
      this.globalService.showMessageError('Error! Invalid Inputs  ')

    }
  }

}
