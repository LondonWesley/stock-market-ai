


//readTextFile();

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

var data = {
  labels: labels,
  datasets: [{
    label: 'Predicted  price',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [
      346.16295957950604,
      362.7868850119189,
      365.28597108398526,
      ],
  },{
    label: 'Stock Price',
    backgroundColor: 'rgb(25, 99, 252)',
    borderColor: 'rgb(25, 99, 252)',
    data: [
    365.2099914550781,
    363.1700134277344,
    368.79998779296875,
      ],
  }
]

};

var config = {
  type: 'line',
  data,
  options: {}
};

var costcoChart = new Chart(
  document.getElementById('costco'),
  config
);
var hersheyChart = new Chart(
  document.getElementById('hershey'),
  config
);
var sherwinChart = new Chart(
  document.getElementById('sherwin'),
  config
);
var citrixChart = new Chart(
  document.getElementById('citrix'),
  config
);

chartList = [costcoChart,hersheyChart,citrixChart,sherwinChart];

function updateGraphs(){
  
  //mychart
  for(let i = 0; i < chartList.length;i++){
    chartList[i].data.datasets.pop();
    chartList[i].data.datasets.push(data)
    chartList[i].update()
  }
  console.log("graph update call")

  $.get("Stocks/COST.csv", function(data) {
    console.log("successfully gotten file")
    console.log(data)
  
 });
}

setInterval(updateGraphs, 6000);
