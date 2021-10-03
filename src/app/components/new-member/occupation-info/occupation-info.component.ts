import { GlobalService } from './../../../global.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  OccupationEnum } from "./../../../models/enum_collection";
import { OccupationDetail } from "./../models/occupation-detail.model";
import { Component, OnInit } from "@angular/core";
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: "app-occupation-info",
  templateUrl: "./occupation-info.component.html",
  styleUrls: ["./occupation-info.component.css"],
})
export class OccupationInfoComponent implements OnInit {
  public selectedHighpost:boolean=false
  public occupationDetail: OccupationDetail;
  public occupationInfoForm: FormGroup;

  constructor( private _formBuilder: FormBuilder, private globalService:GlobalService  ) {
    this.occupationDetail= new OccupationDetail();

  }

  ngOnInit(): void {
    this.occupationInfoForm = new FormBuilder().group({
      yourOccupation : ['', ],
      panNo : ['',  ],
      yourSpouseOccupation : ['', ],
      otherRelationship : ['',  ],
      otherRelationshipOption : ['', ],
      isHoldingHighPost : ['', ],
      name : ['',  ],
      relationship : ['',  ],
      positioonTitle : ['',  ],

    });

  }

  isValid(): boolean {
    if (this.occupationDetail == null) return false;
    this.occupationDetail=this.occupationInfoForm.value;
    return true;
  }

  changeOtherOccupation(e: MatRadioChange) {
    var enumValue = e.value as OccupationEnum;
    this.occupationDetail.otherOccupation = enumValue;
  }
  changeyourOccupation(e:MatRadioChange){
    var enumValue = e.value as OccupationEnum;
    this.occupationDetail.yourOccupation=enumValue;
  }
  changeSpouseOccupation(e:MatRadioChange){
    var enumValue = e.value as OccupationEnum;
    this.occupationDetail.spouseOccupation=enumValue;
  }
  changeHighPost (e:MatRadioChange){
    this.occupationDetail.isHoldingOtherPost=e.value == "highYes";
  }
  stepperClicked(){
    if(!this.occupationInfoForm.valid){
      this.globalService.showMessageError('Error! Invalid Inputs  ')

    }
  }
}
