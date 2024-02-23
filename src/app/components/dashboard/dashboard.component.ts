import { Component } from '@angular/core';
import { DataService } from '../data.service';

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private service: DataService) {}

  private data: any;

  public ngOnInit() {
    this.service.getData()
      .subscribe((result) => {
        this.data = result;
        this.init();
      });
  }

  private init(): void {
    if (typeof (google) !== 'undefined') {
      google.charts.load('current', { 'packages': ['corechart'] });
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.exibirGraficos());
      }, 1000);
    }
  }

  exibirGraficos(): void {
    this.viewPieChart();
    this.view3dPieChart();
    this.viewBarChart();
    this.viewLineChart();
    this.viewColumnChart();
    this.viewDonutChart();
  }

  private viewPieChart(): void {
    const el = document.getElementById('pie_chart');
    const chart = new google.visualization.PieChart(el);

    chart.draw(this.getDataTable(), this.getOptions());
  }


  private view3dPieChart(): void {
    const el = document.getElementById('3d_pie_chart');
    const chart = new google.visualization.PieChart(el);
    const opcoes = this.getOptions();

    opcoes['is3D'] = true;
    chart.draw(this.getDataTable(), opcoes);
  }

  private viewDonutChart(): void {
    const el = document.getElementById('donut_chart');
    const chart = new google.visualization.PieChart(el);
    const opcoes = this.getOptions();

    opcoes['pieHole'] = 0.4;
    chart.draw(this.getDataTable(), opcoes);
  }

  private viewBarChart(): void {
    const el = document.getElementById('bar_chart');
    const chart = new google.visualization.BarChart(el);

    chart.draw(this.getDataTable(), this.getOptions());
  }

  private viewLineChart(): void {
    const el = document.getElementById('line_chart');
    const chart = new google.visualization.LineChart(el);

    chart.draw(this.getDataTable(), this.getOptions());
  }

  private viewColumnChart(): void {
    const el = document.getElementById('column_chart');
    const chart = new google.visualization.ColumnChart(el);

    chart.draw(this.getDataTable(), this.getOptions());
  }

  private getDataTable(): any {
    const data = new google.visualization.DataTable();

    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Quantidade');
    data.addRows(this.data);

    return data;
  }

  private getOptions(): any {
    return {
      'title': 'Quantidade de cadastros primeiro semestre',
      'width': 400,
      'height': 300
    };
  }
}
