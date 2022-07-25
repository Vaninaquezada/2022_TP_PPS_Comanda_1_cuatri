import {ViewChild, Component, OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { Chart, ChartTypeRegistry, registerables } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-encuenta-grafico-line',
  templateUrl: './encuenta-grafico-line.component.html',
  styleUrls: ['./encuenta-grafico-line.component.scss'],
})
export class EncuentaGraficoLineComponent implements OnInit,AfterViewInit {
  @ViewChild('valueBarsCanvas') valueBarsCanvas;
  valueBarsChart: any;
  chartData = null;
  data = [];
  myChart: Chart;
  text: string;
  titulo= '';
  datacolor = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255,1)',
    'rgba(255, 159, 64, 1)'

  ];
  info: [];
  constructor(private router: Router,  private modal: ModalController
    , private authSvc: AuthService,private navParams: NavParams) {
    Chart.register(...registerables);
   }

  ngOnInit() {

this.titulo= this.navParams.data.preguntaText;

    this.info = this.navParams.data.respuesta;
    console.log('this.info',this.navParams.data.respuesta);
  }
  ngAfterViewInit() {




    this.valueBarsChart = new Chart(this.valueBarsCanvas.nativeElement, {
      type:'polarArea',
      data: {
        labels: [],
        datasets: [{
          label: '',
          data: [],
          backgroundColor: this.datacolor,
          borderColor: [
            'rgba(255, 99, 132, 0)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {

              stepSize: 1,

            },
          }
        },
        plugins: {
          legend: {
            display: false,
          }
        },
      }
    });

    this.getValues();
  }

  addDataToChart(chart, label, data) {
    console.log('chart - ' + data);
    console.log('label - ' + label);

    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      console.log('chartd - ' + data);
      dataset.data.push(data);
      //  chart.data.labels.push('');
      //  dataset.data = data;
    });

    console.log('charti - ' + JSON.stringify(this.valueBarsChart.data));
    chart.update();
  }



    getValues(){

    const distribution = this.info.reduce((acum,cur) => Object.assign(acum,{[cur]: (acum[cur] || 0)+1}),{});
    console.log(JSON.stringify(distribution,null,2));
    Object.entries(distribution).forEach(element => {
      console.log('"fotos ', element);
          console.log('holis - ');

        // this.data.push(element[1]);
          this.addDataToChart(this.valueBarsChart, element[0], element[1]);

      });
    }
  cerrarModal() {

    this.modal.dismiss();

  }

}
