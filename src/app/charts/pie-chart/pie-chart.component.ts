import { Component, Input, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { StatisticsModel } from 'src/app/models/statisticsModel';
import { StatisticsService } from 'src/app/Services/statistics.service';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})

//USERS BY FEEDBACKS
export class PieChartComponent implements OnInit{

  result: StatisticsModel[] = [];
  @Input() data: StatisticsModel[];

  single: any[];
 // view: any[] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  trimLabels: boolean = false;

  view: [number, number] = [1000, 300];


  constructor(public statisticsService: StatisticsService) {

  }

  ngOnInit(): void {
    this.loadData();
  }


  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#00abe7', '#2dc7ff', '#ead2ac', '#eaba6b']
  };

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  public loadData() {
    this.statisticsService.getTop3UsersByFeedbacks().subscribe(data => {
      this.result = data;
    });
  }

}
