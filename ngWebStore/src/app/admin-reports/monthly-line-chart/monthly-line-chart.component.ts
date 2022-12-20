import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LocalDataService} from '../../services/local-data.service';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-monthly-line-chart',
  templateUrl: './monthly-line-chart.component.html',
  styleUrls: ['./monthly-line-chart.component.css']
})
export class MonthlyLineChartComponent implements OnInit {

  @Input() chartData;  
  @Input() selectedYear;  

  salesData = [];

  // google-chart-api
  // line chart
  title = "Monthly Sales Data : Year - ";
  lineChart = ChartType.LineChart;
  data: any[] = [];
  columnNames = ['Month', 'Sales'];
  width = 600;
  height = 400;
  lineOptions = {
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
