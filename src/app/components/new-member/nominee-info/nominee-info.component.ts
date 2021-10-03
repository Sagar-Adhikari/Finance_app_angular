import { GlobalService } from './../../../global.service';
import { ImageUploadComponent } from './../../shared/image-upload/image-upload.component';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NomineeInfo } from "./../models/nominee-info.model";
import { MatRadioChange } from '@angular/material/radio';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: "app-nominee-info",
  templateUrl: "./nominee-info.component.html",
  styleUrls: ["./nominee-info.component.css"],
})
export class NomineeInfoComponent implements OnInit {
  @ViewChild("imageUpload") imageUploadRef:ImageUploadComponent;
  public nomineeInfo:NomineeInfo;
  public nomineeInfoForm:FormGroup;

  constructor(private _formBuilder: FormBuilder,private globalService:GlobalService) {
    this.nomineeInfo = new NomineeInfo();
  }

  ngOnInit(): void {
    this.nomineeInfoForm = this._formBuilder.group({
      citizenshipNo : [null,  ],
      citizenshipIssuedDate : ['', ],
      citizenshipIssuedFrom : ['', ],
      address : ['',  ],
      nomineePhotoBase64: ['',],
    });

  }

  isValid(): boolean {
    this.nomineeInfo = this.nomineeInfoForm.value;
    this.nomineeInfo.nomineePhotoBase64=this.imageUploadRef.croppedImage;
    return true;
  }

  stepperClicked(){
    if(!this.nomineeInfoForm.valid){
      this.globalService.showMessageError('Error! Invalid Inputs  ')
    }
  }

}
