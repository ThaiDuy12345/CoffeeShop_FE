import { Component } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";

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
export class AdminChartComponent {
  public chartOptions: ChartOptions = {
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "straight"
    },
    toolbar: {
      tools: {
        selection: false
      }
    },
    markers: {
      size: 6,
      hover: {
        size: 10
      }
    },
    tooltip: {
      followCursor: false,
      theme: "dark",
      x: {
        show: false
      },
      marker: {
        show: false
      },
      y: {
        title: {
          formatter: function() {
            return "";
          }
        }
      }
    },
    grid: {
      clipMarkers: false
    },
    xaxis: {
      type: "datetime"
    },
    series: [
      {
        name: "chart1",
        data: this.generateDayWiseTimeSeries(
          new Date("11 Feb 2017").getTime(),
          20,
          {
            min: 10,
            max: 60
          }
        )
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
      tickAmount: 2,
      labels: {
        minWidth: 40
      }
    }
  }
  public generateDayWiseTimeSeries(baseval: number, count: number, yrange: { min: number, max: number }): any[] {
    let i = 0;
    let series = [];
    while (i < count) {
      var x = baseval;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([x, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

  constructor() {
  }
}
