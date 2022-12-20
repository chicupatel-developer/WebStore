import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LocalDataService} from '../../services/local-data.service';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, OnChanges {

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
    else if (this.selectedOption == 'Discount-Trend') {
      console.log(data);
      data.forEach(d => {
        var myDataPart = [];
        myDataPart.push(d.discountPercentage);
        myDataPart.push(d.sales);
        myData.push(myDataPart);
      });
      this.salesData = [...myData];
      console.log(this.salesData);
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
    else if (this.selectedOption == 'Discount-Trend')
      this.columnNames = ['Discount %', 'Sales'];
    else
      this.columnNames = ['Quarter', 'Sales'];
  }

  setChartOptions() {
    if (this.selectedOption == 'Month') {
      this.chartOptions.hAxis.title = 'Month';
    }
    else if (this.selectedOption == 'Discount-Trend') {
      this.chartOptions.hAxis.title = 'Discount %';
    }
    else {
      this.chartOptions.hAxis.title = 'Quarter';
    }
  }

  setTitle() {
    if (this.selectedOption == 'Month') {
      this.title = 'Monthly Sales Data : Year - ';
    }
    else if (this.selectedOption == 'Discount-Trend') {
      this.title = 'Discount Trend Data';
    }
    else {
      this.title = 'Quarterly Sales Data : Year - ';
    }
  }
}
