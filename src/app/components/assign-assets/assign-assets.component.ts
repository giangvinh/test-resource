import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-assign-assets',
  templateUrl: './assign-assets.component.html',
  styleUrls: ['./assign-assets.component.scss']
})
export class AssignAssetsComponent implements OnInit {
  cvtds = new FormControl();

  cvtdList: string[] = [
    'Nguyễn Văn A',
    'Lê Văn B',
    'Nguyễn Hữu C',
    'Trần Văn Chánh'
  ];
  constructor() {}

  ngOnInit() {}
}
