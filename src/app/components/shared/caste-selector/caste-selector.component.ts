import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-caste-selector',
  templateUrl: './caste-selector.component.html',
  styleUrls: ['./caste-selector.component.css']
})
export class CasteSelectorComponent implements OnInit {

  public casts: String[];

  public selectedCaste: String;

  constructor(private reportService: CommonService) { }

  ngOnInit(): void {
    this.reportService.getCastes().subscribe(cAll => {
      this.casts = cAll as String[];
    });
  }

}
