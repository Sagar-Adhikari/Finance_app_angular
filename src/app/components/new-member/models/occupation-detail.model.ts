import { OccupationEnum } from './../../../models/enum_collection';
export class OccupationDetail {
  public yourOccupation: OccupationEnum;
  public panNo: number;
  public spouseOccupation: OccupationEnum;
  public otherRelationship: string;
  public otherOccupation: OccupationEnum
  public isHoldingOtherPost: boolean;
  public name: string;
  public relationship: string;
  public positionTitle: string;
}

