import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { MemberCategory } from 'src/app/models/membercategory.model';

@Component({
  selector: 'app-member-category-selector',
  templateUrl: './member-category-selector.component.html',
  styleUrls: ['./member-category-selector.component.css']
})
export class MemberCategorySelectorComponent implements OnInit {

  public categories: MemberCategory[];
  public selectedCategory: MemberCategory;
  
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.getMemberCategories().subscribe(ls => {
      this.categories = ls as MemberCategory[];
    });
  }

}
