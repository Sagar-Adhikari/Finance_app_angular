import { PersonalInfo } from './../models/personal-info.model';
import { Gender } from 'src/app/models/gender.model';
import { CommonService } from 'src/app/core/services/common.service';
import { NewParticularComponent } from './../../new-particular/new-particular.component';
import { NewMemberView } from 'src/app/components/new-member/models/new-member.model';
import { FamilyInfoComponent } from './../family-info/family-info.component';
import { AddressInfoComponent } from './../address-info/address-info.component';
import { PersonalInfoComponent } from './../personal-info/personal-info.component';
import { MemberService } from 'src/app/core/services/member.service';
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AppState } from "src/app/state/app.state";
import { Store } from "@ngrx/store";
import { MatDialogRef } from "@angular/material/dialog";
import { GlobalService } from "src/app/global.service";
import { TransactionService } from "src/app/core/services/transaction.service";
import { HttpErrorResponse } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators, } from "@angular/forms";
import { OccupationInfoComponent } from '../occupation-info/occupation-info.component';
import { CooperativeAccountInfoComponent } from '../cooperative-account-info/cooperative-account-info.component';
import { NomineeInfoComponent } from '../nominee-info/nominee-info.component';
import { IncomeInfoComponent } from '../income-info/income-info.component';

@Component({
  selector: 'app-add-new-member',
  templateUrl: './add-new-member.component.html',
  styleUrls: ['./add-new-member.component.css']
})
export class AddNewMemberComponent implements OnInit {
  @ViewChild(PersonalInfoComponent) personalInfoRef: PersonalInfoComponent;
  @ViewChild(AddressInfoComponent) addressInfoRef: AddressInfoComponent;
  @ViewChild(FamilyInfoComponent) familyInfoRef: FamilyInfoComponent;
  @ViewChild(OccupationInfoComponent) occupationalInfoRef: OccupationInfoComponent;
  @ViewChild(CooperativeAccountInfoComponent) coOperativeInfoRef: CooperativeAccountInfoComponent;
  @ViewChild(NomineeInfoComponent) nomineeInfoRef: NomineeInfoComponent;
  @ViewChild(IncomeInfoComponent) incomeInfoRef: IncomeInfoComponent;


  public personalInfo: PersonalInfo;
  private newMemberModel: NewMemberView;
  public formIindex = 0;

  public memberId:number;

  requiredForm: FormGroup;
  isNonLinear = false;
  isNonEditable = false;

  genders: Gender[];
  stepperChecked:boolean=false;

  constructor(
    private globalService: GlobalService,
    private commonService:CommonService,
    public dialogRef: MatDialogRef<NewParticularComponent>,
    private store: Store<AppState>,
    private transactionService: TransactionService,
    private memberService:MemberService,
    private _formBuilder: FormBuilder,
    private el: ElementRef
  ) {
    this.personalInfo = new PersonalInfo();

  }

  personalInfoFormGroup: FormGroup;
  familyInfoFormGroup: FormGroup;
  occupationInfoForm: FormGroup;
  cooperativeAccountInfoForm: FormGroup;
  incomeInfoFormGroup: FormGroup;
  nomineeInfoFormGroup: FormGroup;
  addressInfoFormGroup: FormGroup;

  ngOnInit(): void {
    this.commonService.getGenders().subscribe(ls => {
      this.genders = ls as Gender[];
    });
    this.requiredForm = this._formBuilder.group({
          firstName : ['', Validators.compose([Validators.required,Validators.compose([Validators.maxLength(20)])])],
          middleName: ['', ],
          lastName: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
          nameInDevnagari:['',],
          gendId: [null, Validators.compose([Validators.required, ])],
          dobAD: ['', ],
          dobBS: [''],
          nationality: ['',  ],
          fatherFullName:['',Validators.required],
          grandFatherFullName:['', ],
          motherFullName:['', ],
          spouseFullName:['', ],
          isNominee:[false, ],
          fullName:['',Validators.required],
          relation:['',Validators.required],
          currCountry:['',Validators.required],
          currProvince:['', Validators.required],
          currDistrict:['',Validators.required ],
          currVdcMunci:['',Validators.required ],
          currWardNum:[0,Validators.required, ] ,
          currTole:['',Validators.required ],

    });

    this.memberService.getNewMemberId().subscribe(x=>{
      this.memberId=+x;
    })
    this.newMemberModel = new NewMemberView();
    setTimeout(() => {
      this.setValueOfFormControls();
      this.personalInfoFormGroup = this.personalInfoRef.personalInfoForm;
      this.familyInfoFormGroup = this.familyInfoRef.familyInfoForm;
      this.occupationInfoForm = this.occupationalInfoRef.occupationInfoForm;
      this.cooperativeAccountInfoForm = this.coOperativeInfoRef.cooperativeAccountInfoForm;
      this.incomeInfoFormGroup = this.incomeInfoRef.incomeInfoForm;
      this.nomineeInfoFormGroup = this.nomineeInfoRef.nomineeInfoForm;
      this.addressInfoFormGroup = this.addressInfoRef.addressInfoForm;
    }, 3000);
  }

  hasError: boolean = true;

  cancel() {
    this.dialogRef.close("cancel");
  }

  submit() {
    if(this.requiredForm.valid){
      this.setValueOfFormControls();

      this.addressInfoRef.stepperClicked();
      this.newMemberModel.personalInfo = this.personalInfoRef.personalInfo;
      this.newMemberModel.addressInfo = this.addressInfoRef.addressInfoModel;
      this.newMemberModel.nomineeInfo = this.nomineeInfoRef.nomineeInfo;
      this.newMemberModel.familyInfo = this.familyInfoRef.familyInfo;
      console.log("New memberModel:", this.newMemberModel);
      this.transactionService.createNewMember(this.newMemberModel).subscribe(
        (resp: any) => {
         console.log('response',resp);
          var value = resp as number;
          if (value > 0) {
            // this.store.dispatch(TransactionActions.setNewParticulId({ payload: resp }));
            this.globalService.showMessageSuccess(
              "Created new member successfully."
            );
            this.dialogRef.close("saved");
          } else {
            this.globalService.showMessageError("Unable to create new member.");
          }
        },
        (err: HttpErrorResponse) => {
          console.log("error resp from create");
          console.log(err);
          if (err.status == 400) {
            this.globalService.showMessageError("Required fields are missing.");
          } else {
            this.globalService.showMessageError("Unable to create new member.");
          }


        }
      );
    }else{
      this.stepperClicked();
    }

  }

  isValid(): boolean {
    this.requiredForm.valid;
     return true;

  }

  onSelectionChange(event) {
    this.formIindex = event.selectedIndex;
    if (event.selectedIndex ) {
      this.addressInfoRef.stepperClicked();
      this.stepperClicked();
    }
  }

  stepperClicked(){
    this.stepperChecked=true;
     if(!this.requiredForm.valid){
      this.globalService.showMessageError('Error! Invalid Inputs  ');
    }
  }

  setValueOfFormControls(){
    this.isValid();
    this.personalInfoRef.isValid();
    this.familyInfoRef.isValid();
    this.nomineeInfoRef.isValid();
    this.personalInfoRef. personalInfo.firstName = this.requiredForm.controls['firstName'].value;
    this.personalInfoRef. personalInfo.middleName = this.requiredForm.controls['middleName'].value;
    this.personalInfoRef. personalInfo.lastName = this.requiredForm.controls['lastName'].value;
    this.personalInfoRef. personalInfo.nameInDevnagari = this.requiredForm.controls['nameInDevnagari'].value;
    this.personalInfoRef. personalInfo.gendId = this.requiredForm.controls['gendId'].value;
    this.personalInfoRef. personalInfo.dobAD = this.requiredForm.controls['dobAD'].value;
    this.personalInfoRef. personalInfo.dobBS = this.requiredForm.controls['dobBS'].value;
    this.personalInfoRef. personalInfo.nationality = this.requiredForm.controls['nationality'].value;

    this.familyInfoRef.familyInfo.fatherFullName = this.requiredForm.controls['fatherFullName'].value;
    this.familyInfoRef.familyInfo.grandFatherFullName = this.requiredForm.controls['grandFatherFullName'].value;
    this.familyInfoRef.familyInfo.motherFullName = this.requiredForm.controls['motherFullName'].value;
    this.familyInfoRef.familyInfo.spouseFullName = this.requiredForm.controls['spouseFullName'].value;



    this.nomineeInfoRef.nomineeInfo.isNominee = this.requiredForm.controls['isNominee'].value;
    if(this.requiredForm.controls['isNominee'].value =='relMemberYes'){
      this.nomineeInfoRef. nomineeInfo.isNominee =true;
    }
    this.nomineeInfoRef.nomineeInfo.fullName = this.requiredForm.controls['fullName'].value;
    this.nomineeInfoRef.nomineeInfo.relation = this.requiredForm.controls['relation'].value;

    this.addressInfoRef.addressInfoModel.currentAddress.country=this.requiredForm.controls['currCountry'].value;
    this.addressInfoRef.addressInfoModel.currentAddress.province=this.requiredForm.controls['currProvince'].value;
    this.addressInfoRef.addressInfoModel.currentAddress.district=this.requiredForm.controls['currDistrict'].value;
    this.addressInfoRef.addressInfoModel.currentAddress.vdcMunci =this.requiredForm.controls['currVdcMunci'].value;
    this.addressInfoRef.addressInfoModel.currentAddress.wardNum=this.requiredForm.controls['currWardNum'].value;
    this.addressInfoRef.addressInfoModel.currentAddress.tole=this.requiredForm.controls['currTole'].value;




  }

  addressChanged(event){
    console.log('add new mwmber:',event);
    if(event===true){
      this.addressInfoRef.addressInfoForm.controls['permCountry'].setValue( this.requiredForm.controls['currCountry'].value);
      this.addressInfoRef.addressInfoForm.controls['permProvince'].setValue( this.requiredForm.controls['currProvince'].value);
      this.addressInfoRef.addressInfoForm.controls['permDistrict'].setValue( this.requiredForm.controls['currDistrict'].value);
      this.addressInfoRef.addressInfoForm.controls['permVdcMunci'].setValue( this.requiredForm.controls['currVdcMunci'].value);
      this.addressInfoRef.addressInfoForm.controls['permWardNum'].setValue( this.requiredForm.controls['currWardNum'].value);
      this.addressInfoRef.addressInfoForm.controls['permTole'].setValue( this.requiredForm.controls['currTole'].value);


    }else if(event===false){
      this.addressInfoRef.addressInfoForm.controls['permCountry'].setValue( '');
      this.addressInfoRef.addressInfoForm.controls['permProvince'].setValue( '');
      this.addressInfoRef.addressInfoForm.controls['permDistrict'].setValue( '');
      this.addressInfoRef.addressInfoForm.controls['permVdcMunci'].setValue('');
      this.addressInfoRef.addressInfoForm.controls['permWardNum'].setValue( '');
      this.addressInfoRef.addressInfoForm.controls['permTole'].setValue('');

    }

  }


}
