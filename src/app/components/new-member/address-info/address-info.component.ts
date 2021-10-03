import { GlobalService } from './../../../global.service';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AddressInfoModel   } from '../models/address-info.model';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.css']
})
export class AddressInfoComponent implements OnInit {
  @Output() addressChanged = new EventEmitter<any>();
  constructor(private _formBuilder: FormBuilder,private globalService:GlobalService) { }
  public addressInfoModel: AddressInfoModel;
  addressInfoForm:FormGroup;



  ngOnInit(): void {
    this.addressInfoModel = new AddressInfoModel();
    this.addressInfoForm = this._formBuilder.group({
      permCountry:['', ],
      permProvince : ['',  ],
      permDistrict : ['',  ],
      permVdcMunci : ['',   ],
      permWardNum:['',  ],
      permTole:['',  ]

    });

  }

  changeSameAsCur(e: MatCheckboxChange) {
    if(e.checked==true){
        this.addressChanged.emit( true);
    }else{
      this.addressChanged.emit(false);
    }

  }

  stepperClicked(){
    if(this.addressInfoForm.valid){
    this.addressInfoModel.permanentAddress.country = this.addressInfoForm.controls['permCountry'].value
     this.addressInfoModel.permanentAddress.province = this.addressInfoForm.controls['permProvince'].value
     this.addressInfoModel.permanentAddress.district =  this.addressInfoForm.controls['permDistrict'].value
     this.addressInfoModel.permanentAddress.vdcMunci = this.addressInfoForm.controls['permVdcMunci'].value
     this.addressInfoModel.permanentAddress.wardNum  =  this.addressInfoForm.controls['permWardNum'].value
     this.addressInfoModel.permanentAddress.tole  = this.addressInfoForm.controls['permTole'].value

    }else{
      this.globalService.showMessageError('Error! Invalid Inputs  ');
    }
  }

}
