import { MemberService } from 'src/app/core/services/member.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { AppState } from "src/app/state/app.state";
import { Store } from "@ngrx/store";
import { NewParticularComponent } from "../new-particular/new-particular.component";
import { MatDialogRef } from "@angular/material/dialog";
import { GlobalService } from "src/app/global.service";
import { PersonalInfoComponent } from "./personal-info/personal-info.component";
import { AddressInfoComponent } from "./address-info/address-info.component";
import { FamilyInfoComponent } from "./family-info/family-info.component";
import { OccupationInfoComponent } from "./occupation-info/occupation-info.component";
import { CooperativeAccountInfoComponent } from "./cooperative-account-info/cooperative-account-info.component";
import { NomineeInfoComponent } from "./nominee-info/nominee-info.component";
import { IncomeInfoComponent } from "./income-info/income-info.component";
import { TransactionService } from "src/app/core/services/transaction.service";
import { NewMemberView } from "./models/new-member.model";
import { HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-new-member",
  templateUrl: "./new-member.component.html",
  styleUrls: ["./new-member.component.css"],
})
export class NewMemberComponent implements OnInit {
  @ViewChild(PersonalInfoComponent) personalInfoRef: PersonalInfoComponent;
  @ViewChild(AddressInfoComponent) addressInfoRef: AddressInfoComponent;
  @ViewChild(FamilyInfoComponent) familyInfoRef: FamilyInfoComponent;
  @ViewChild(OccupationInfoComponent) occupationalInfoRef: OccupationInfoComponent;
  @ViewChild(CooperativeAccountInfoComponent) coOperativeInfoRef: CooperativeAccountInfoComponent;
  @ViewChild(NomineeInfoComponent) nomineeInfoRef: NomineeInfoComponent;
  @ViewChild(IncomeInfoComponent) incomeInfoRef: IncomeInfoComponent;

  private newMemberModel: NewMemberView;
  public formIindex = 0;

  public memberId:number;

  constructor(
    private globalService: GlobalService,
    public dialogRef: MatDialogRef<NewParticularComponent>,
    private store: Store<AppState>,
    private transactionService: TransactionService,
    private memberService:MemberService
  ) {}

  personalInfoFormGroup: FormGroup;
  familyInfoFormGroup: FormGroup;
  occupationInfoForm: FormGroup;
  cooperativeAccountInfoForm: FormGroup;
  incomeInfoFormGroup: FormGroup;
  nomineeInfoFormGroup: FormGroup;
  addressInfoFormGroup: FormGroup;

  ngOnInit(): void {
    this.memberService.getNewMemberId().subscribe(x=>{
      this.memberId=+x;
    })
    this.newMemberModel = new NewMemberView();
    setTimeout(() => {
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
    if (!this.isValid()) {
      this.hasError = false;
      return;
    }
    this.hasError = false;

    this.personalInfoRef.isValid(); //calling this will set the gender id for now.
    this.nomineeInfoRef.isValid();
    this.familyInfoRef.isValid();
    // this.addressInfoRef.isValid();



    this.newMemberModel.personalInfo = this.personalInfoRef.personalInfo;
    this.newMemberModel.addressInfo = this.addressInfoRef.addressInfoModel;
    this.newMemberModel.nomineeInfo = this.nomineeInfoRef.nomineeInfo;
    this.newMemberModel.familyInfo = this.familyInfoRef.familyInfo;
    console.log("New memberModel:", this.newMemberModel);

    this.transactionService.createNewMember(this.newMemberModel).subscribe(
      (resp: any) => {
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
  }

  isValid(): boolean {

    // console.log(this.personalInfoRef.personalInfo);

    // if (!this.personalInfoRef.isValid()
    //   || !this.addressInfoRef.isValid()
    //   || !this.coOperativeInfoRef.isValid()
    //   || !this.familyInfoRef.isValid()
    //   || !this.occupationalInfoRef.isValid()
    //   || !this.nomineeInfoRef.isValid()
    //   || !this.incomeInfoRef.isValid()) {
    //   return false;
    // }
    return true;
  }

  onSelectionChange(event) {
    this.formIindex = event.selectedIndex;
    if (event.selectedIndex === 6) {
      this.addressInfoRef.stepperClicked();
    }
  }
}
