import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LocalDataService} from '../../services/local-data.service';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-monthly-bar-chart',
  templateUrl: './monthly-bar-chart.component.html',
  styleUrls: ['./monthly-bar-chart.component.css']
})
export class MonthlyBarChartComponent implements OnInit {

  @Input() chartData;  
  @Input() selectedYear;  

  salesData = [];

  // google-chart-api
  // column chart
  title = "Monthly Sales Data : Year - ";
  columnChart = ChartType.ColumnChart;
  data: any[] = [];
  columnNames = ['Month', 'Sales'];
  width = 600;
  height = 400;
  columnOptions = {
    hAxis: {
      title: 'Month'
    },
    vAxis: {
      title: 'Sales'
    },
  };
 
  constructor(
    public localDataService: LocalDataService,
    public dataService: DataService,
    private router: Router) {  
  }

  ngOnInit(): void {
    this.setChartDataForSales(this.chartData);
  }

  setChartDataForSales(data) {
    var myData = [];
    for (var i = 0; i <= 11; i++){
      var myDataPart = [];
      myDataPart.push(data.months[i]);
      myDataPart.push(data.sales[i]);
      myData.push(myDataPart);
    }
    this.salesData = [...myData];
  }

}
