import { GlobalService } from './../../../global.service';
import { Gender } from './../../../models/gender.model';
import { CommonService } from './../../../core/services/common.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonalInfo } from '../models/personal-info.model';
import { GenderSelectorComponent } from '../../shared/gender-selector/gender-selector.component';
import { ImageUploadComponent } from '../../shared/image-upload/image-upload.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  @ViewChild("gender") genderRef: GenderSelectorComponent;
  @ViewChild("imageUpload") imageUploadRef:ImageUploadComponent;
  @ViewChild("signatureOne") signOneRef:ImageUploadComponent;
  @ViewChild("signatureTwo") signTwoRef:ImageUploadComponent;

  public personalInfo: PersonalInfo;
  public selectedMaritalStatus: string;

  public personalInfoForm: FormGroup;
  genders: Gender[];

  constructor(private _formBuilder: FormBuilder,private commonService:CommonService,private globalService:GlobalService) {
    this.personalInfo = new PersonalInfo();
    this.selectedMaritalStatus = 'single';
  }

  ngOnInit(): void {
    this.commonService.getGenders().subscribe(ls => {
      this.genders = ls as Gender[];
    });
    this.personalInfoForm =  this._formBuilder.group({
    phoneLandline: ['', ],
    phoneMobile: ['', ],
    email: ['',],
    citizenshipNo: [null, ],
    citizenshipIssDt: ['', ],
    citizenshipIssfrom: ['', ],
    memberPhotoBase64: ['',  ],
    memberSignatureOne:['',],
    memberSignatureTwo:['',]

    });

  }

  public isValid(): boolean {
    this.personalInfo=this.personalInfoForm.value;
    this.personalInfo.memberPhotoBase64 =this.imageUploadRef.croppedImage;
    this.personalInfo.memberSignatureOne = this.signOneRef.croppedImage;
    this.personalInfo.memberSignatureTwo = this.signTwoRef.croppedImage;
    return true;
  }

  stepperClicked(){
    if(!this.personalInfoForm.valid){
      this.globalService.showMessageError('Error! Invalid Inputs  ')
    }
  }

}
