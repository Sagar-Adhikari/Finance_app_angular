import { GlobalService } from './../../../global.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cooperative-account-info',
  templateUrl: './cooperative-account-info.component.html',
  styleUrls: ['./cooperative-account-info.component.css']
})
export class CooperativeAccountInfoComponent implements OnInit {
 public cooperativeAccountInfoForm:FormGroup;
  constructor(private _formBuilder: FormBuilder,private globalService:GlobalService) { }

  ngOnInit(): void {
    this.cooperativeAccountInfoForm = this._formBuilder.group({
      isMember : ['',],
      orgName : ['',  ],
      orgAddress : ['',  ],
      orgMembershipNumber : ['',],
      isRelMember : ['',],
      relOrgName : ['',],
      relAddress : ['',],
      relMembershipNumber : ['', ],


    });

  }

  isValid(): boolean {
    return false;
  }
  stepperClicked(){
    if(!this.cooperativeAccountInfoForm.valid){
      this.globalService.showMessageError('Error! Invalid Inputs  ')

    }
  }

}
