import { GlobalService } from './../../../global.service';
import { FamilyInfo } from './../models/family-info.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-family-info',
  templateUrl: './family-info.component.html',
  styleUrls: ['./family-info.component.css']
})
export class FamilyInfoComponent implements OnInit {
  public familyInfo:FamilyInfo;

  public familyInfoForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,private globalService:GlobalService) {
    this.familyInfo = new FamilyInfo();
  }

  ngOnInit(): void {
    this.familyInfoForm = this._formBuilder.group({
      grandFatherFullName : ['',],
      motherFullName : ['', ],
      spouseFullName : ['', ],
      sonFullName : ['',  ],
      daughterInLawFullName : ['',  ],
      fatherInLawFullName : ['', ],
      motherInLawFullName : ['',  ],
    });
  }

  isValid(): boolean {
    this.familyInfo=this.familyInfoForm.value;
    return true;

  }
  stepperClicked(){
    if(!this.familyInfoForm.valid){
      this.globalService.showMessageError('Error! Invalid Inputs  ')

    }
  }

}
