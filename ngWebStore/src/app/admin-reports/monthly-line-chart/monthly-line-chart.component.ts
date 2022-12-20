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
export class MonthlyLineChartComponent implements OnInit, OnChanges {

  @Input() chartData;  
  @Input() selectedYear;  
  @Input() selectedOption; // Month, Quarter

  salesData = [];

  // google-chart-api
  // line chart
  title = "Monthly Sales Data : Year - ";
  lineChart = ChartType.LineChart;
  data: any[] = [];
  columnNames = ['Month', 'Sales'];
  width = 600;
  height = 400;
  chartOptions = {
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

  ngOnChanges() { 
    console.log('monthly-line chart,,, update child now,,,');
    console.log(this.chartData, this.selectedYear, this.selectedOption);

    this.setColumnNames();
    this.setChartOptions();
    this.setTitle();
    this.setChartDataForSales(this.chartData);   
  }   

  ngOnInit(): void {
    this.setColumnNames();
    this.setChartOptions();
    this.setTitle();
    this.setChartDataForSales(this.chartData);   
  }

  setChartDataForSales(data) {
    var myData = [];

    if (this.selectedOption == 'Month') {
      for (var i = 0; i <= 11; i++) {
        var myDataPart = [];
        myDataPart.push(data.months[i]);
        myDataPart.push(data.sales[i]);
        myData.push(myDataPart);
      }
      this.salesData = [...myData];
    }
    else {
      for (var i = 0; i <= 3; i++) {
        var myDataPart = [];
        myDataPart.push(data.quarters[i]);
        myDataPart.push(data.sales[i]);
        myData.push(myDataPart);
      }
      this.salesData = [...myData];
    }
  }

  setColumnNames() {
    this.columnNames = [];
    if(this.selectedOption=='Month')
      this.columnNames = ['Month', 'Sales'];
    else
      this.columnNames = ['Quarter', 'Sales'];
  }

  setChartOptions() {
    if (this.selectedOption == 'Month') {
      this.chartOptions.hAxis.title = 'Month';
    }
    else {
      this.chartOptions.hAxis.title = 'Quarter';
    }
  }

  setTitle() {
    if (this.selectedOption == 'Month') {
      this.title = 'Monthly Sales Data : Year - ';
    }
    else {
      this.title = 'Quarterly Sales Data : Year - ';
    }
  }
}
