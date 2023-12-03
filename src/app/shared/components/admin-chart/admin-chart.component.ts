import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";
import { Statistic } from "src/app/core/models/statistic.model";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: any; //ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  grid: any; //ApexGrid;
  colors: any;
  toolbar: any;
};

@Component({
  selector: 'app-admin-chart',
  templateUrl: './admin-chart.component.html',
  styleUrl: './admin-chart.component.scss'
})
export class AdminChartComponent implements OnChanges{
  @Input() statistic: [number, number][] = []
  @Input() typeValue: 'product' | 'ordering' | 'feedback' | 'support' = 'product'
  @Input() typeOption: string = ''
  @Input() chartType: 'stepline' | 'straight' | 'smooth' = 'smooth'
  public chartOptions: ChartOptions = {
    series: [],
    chart: {},
    dataLabels: {},
    markers: {},
    yaxis: {},
    xaxis: {},
    tooltip: {},
    stroke: {},
    grid: {},
    colors: [],
    toolbar: {}
  }
  
  constructor() {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['chartType']) this.chartOptions = this.initChart()
  }

  ngOnInit(): void {
    this.chartOptions = this.initChart()
  }

  initChart(): ChartOptions {
    return {
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: this.chartType
      },
      toolbar: {
        tools: {
          selection: false
        }
      },
      markers: {
        size: 5,
        hover: {
          size: 8
        }
      },
      tooltip: {
        followCursor: true,
        theme: "dark",
        x: {
          show: true,
          format: "dd/MM/yyyy"
        },
        marker: {
          show: false
        },
        y: {
          title: {
            formatter: (name) => {
              return this.typeOption + ":"
            }
          }
        }
      },
      grid: {
        clipMarkers: true
      },
      xaxis: {
        type: "datetime",
        labels: {
          format: 'dd/MM'
        }
      },
      series: [
        {
          name: 'Chart',
          data: this.statistic
        }
      ],
      chart: {
        id: "fb",
        group: "social",
        type: "line",
        height: 300
      },
      colors: ["#33425a"],
      yaxis: {
        tickAmount: 10,
        labels: {
          minWidth: 40
        }
      }
    }
  }
}
