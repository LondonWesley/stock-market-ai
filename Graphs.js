    
    var stockData;
    function CSVToArray( strData, strDelimiter ){
      // Check to see if the delimiter is defined. If not,
      // then default to comma.
      strDelimiter = (strDelimiter || ",");

      // Create a regular expression to parse the CSV values.
      var objPattern = new RegExp(
          (
              // Delimiters.
              "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

              // Quoted fields.
              "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

              // Standard fields.
              "([^\"\\" + strDelimiter + "\\r\\n]*))"
          ),
          "gi"
          );


      // Create an array to hold our data. Give the array
      // a default empty first row.
      var arrData = [[]];

      // Create an array to hold our individual pattern
      // matching groups.
      var arrMatches = null;


      // Keep looping over the regular expression matches
      // until we can no longer find a match.
      while (arrMatches = objPattern.exec( strData )){

          // Get the delimiter that was found.
          var strMatchedDelimiter = arrMatches[ 1 ];

          // Check to see if the given delimiter has a length
          // (is not the start of string) and if it matches
          // field delimiter. If id does not, then we know
          // that this delimiter is a row delimiter.
          if (
              strMatchedDelimiter.length &&
              strMatchedDelimiter !== strDelimiter
              ){

              // Since we have reached a new row of data,
              // add an empty row to our data array.
              arrData.push( [] );

          }

          var strMatchedValue;

          // Now that we have our delimiter out of the way,
          // let's check to see which kind of value we
          // captured (quoted or unquoted).
          if (arrMatches[ 2 ]){

              // We found a quoted value. When we capture
              // this value, unescape any double quotes.
              strMatchedValue = arrMatches[ 2 ].replace(
                  new RegExp( "\"\"", "g" ),
                  "\""
                  );

          } else {

              // We found a non-quoted value.
              strMatchedValue = arrMatches[ 3 ];

          }


          // Now that we have our value string, let's add
          // it to the data array.
          arrData[ arrData.length - 1 ].push( strMatchedValue );
      }

      // Return the parsed data.
      return( arrData );
  }
  $.get("Stocks/COST.csv", function(data) {
    stockData = CSVToArray(data)
  
 });
  //console.log(CSVToArray(stockData, " "))
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
    data: [0,],
  },{
    label: 'Stock Price',
    backgroundColor: 'rgb(25, 99, 252)',
    borderColor: 'rgb(25, 99, 252)',
    data: [
    0,1
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
  $.get("Stocks/COST.csv", function(data) {
    stockData = CSVToArray(data)
 });
  //mychart
  const newDataset = {
    label: 'updated data test',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data:stockData,
  };
  for(let i = 0; i < chartList.length;i++){
    
    chartList[i].data.datasets.pop();
    chartList[i].data.datasets.push(newDataset)
    chartList[i].update()
  }
  console.log("graph update call")

  
}

setInterval(updateGraphs, 6000);
