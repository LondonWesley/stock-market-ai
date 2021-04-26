// $(document).ready(function() {
//   $.ajax({
//       type: "GET",
//       headers: {  'Access-Control-Allow-Origin': 'https://drive.google.com/uc?export=download&id=1uz2tlYfTLtRscdnZAtcndCbMilKqY8Iu' },
//       url: "https://drive.google.com/uc?export=download&id=1uz2tlYfTLtRscdnZAtcndCbMilKqY8Iu",
//       dataType: "text/csv",
//       crossDomain: true,
//       success: function(data) {processData(data);}
//    });
// });

// const xhr = new XMLHttpRequest();
// const url = 'https://drive.google.com/uc?export=download&id=1uz2tlYfTLtRscdnZAtcndCbMilKqY8Iu';

// xhr.open('GET', url);
// xhr.onreadystatechange = someHandler;
// xhr.send();


// function processData(allText) {
//   var allTextLines = allText.split(/\r\n|\n/);
//   var headers = allTextLines[0].split(',');
//   var lines = [];

//   for (var i=1; i<allTextLines.length; i++) {
//       var data = allTextLines[i].split('",');
//       if (data.length == headers.length) {

//           var tarr = [];
//           for (var j=0; j<headers.length; j++) {
//               tarr.push(headers[j]+":"+data[j]);
//           }
//           lines.push(tarr);
//       }
//   }
//   alert(lines);
// }

function getDataPointsFromCSV(da){
  console.log("method call!");
}
$.get("stocks/COST.csv", function(data) {
    var chart = new CanvasJS.Chart("costco", {
        title: {
	      text: "Chart from CSV",
        },
        data: [{
	    type: "line",
	    dataPoints: getDataPointsFromCSV(data)
	}]
    });
		
    chart.render();
 
});

const labels = [
"2021-03-04",
"2021-03-05",
"2021-03-08",
"2021-03-09",
"2021-03-10",
"2021-03-11",
"2021-03-12",
"2021-03-15",
"2021-03-16",
"2021-03-17",
"2021-03-18",
"2021-03-19",
"2021-03-22",
"2021-03-23",
"2021-03-24",
"2021-03-25",
"2021-03-26",
"2021-03-29",
"2021-03-30",
"2021-03-31",
"2021-04-01",
"2021-04-05",
"2021-04-06",
"2021-04-07",
"2021-04-08",
"2021-04-09",
"2021-04-12",
"2021-04-13",
"2021-04-14",
"2021-04-15",
];

const data = {
  labels: labels,
  datasets: [{
    label: 'Predicted  price',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [
      333.6475475129096,
      323.3313128858785,
      315.29424353631504,
      318.87295187511023,
      313.72484066793794,
      321.1021476337053,
      330.36874780661543,
      328.0595947165399,
      333.55758407508586,
      329.6290280913388,
      325.9603563147198,
      326.44019182286837,
      323.5712153867419,
      328.4094728679135,
      333.84748660124365,
      342.17442797054315,
      337.7660364786475,
      346.16295957950604,
      351.4010647309239,
      353.53026043893016,
      350.61134499035285,
      352.4906625975742,
      357.44884082275576,
      359.7479878064881,
      360.8176039668737,
      362.7468910929677,
      360.8575978858249,
      362.7868850119189,
      365.28597108398526,
      364.7961599759152,
      ],
  },{
    label: 'Stock Price',
    backgroundColor: 'rgb(25, 99, 252)',
    borderColor: 'rgb(25, 99, 252)',
    data: [
      317.32000732421875,
311.4200134277344,
318.7799987792969,
323.8299865722656,
328.6499938964844,
331.1400146484375,
330.510009765625,
327.25,
329.19000244140625,
322.9800109863281,
328.9100036621094,
334.489990234375,
340.3399963378906,
338.0400085449219,
346.3399963378906,
352.0199890136719,
356.1499938964844,
349.75,
352.4800109863281,
354.94000244140625,
360.82000732421875,
360.1199951171875,
358.80999755859375,
361.2200012207031,
363.2099914550781,
364.80999755859375,
365.2099914550781,
363.1700134277344,
368.79998779296875,
      ],
  }
]

};

const config = {
  type: 'line',
  data,
  options: {}
};

var myChart = new Chart(
  document.getElementById('costco'),
  config
);

