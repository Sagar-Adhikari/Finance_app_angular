import { Component, OnInit } from '@angular/core';
import { Gender } from 'src/app/models/gender.model';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-gender-selector',
  templateUrl: './gender-selector.component.html',
  styleUrls: ['./gender-selector.component.css']
})
export class GenderSelectorComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  genders: Gender[];

  public selectedGender: Gender;

  ngOnInit(): void {
    this.commonService.getGenders().subscribe(ls => {
      this.genders = ls as Gender[];
    });
  }

}
