import { PersonalInfo } from './personal-info.model';
import { AddressInfoModel } from './address-info.model';
import { NomineeInfo } from './nominee-info.model';
import { FamilyInfo } from './family-info.model';

export class NewMemberView {
 public personalInfo: PersonalInfo;   
 public addressInfo: AddressInfoModel;
 public nomineeInfo: NomineeInfo;
 public familyInfo: FamilyInfo;
}