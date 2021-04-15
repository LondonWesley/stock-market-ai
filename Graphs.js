const labels = [
  1,2,3,4,5
];

const data = {
  labels: labels,
  datasets: [{
    label: 'Stonk',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45],
  }]
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