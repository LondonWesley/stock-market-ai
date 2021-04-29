//used to hold AJAX requests for csv files
var stockData = {
  COST:[],
  HSY:[],
  CTRX:[],
  SHW:[],
}


//used to split the 2d array parsed
    function getColumn(arr, index){
      var newArray = [];
      for(var i = 0; i < arr.length; i++){
        newArray.push(arr[i][index])
      }
      return newArray;
    }
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
  
class StockChart {
  constructor(code) {
    this.codename = code;
    this.graph;
    this.createChart();
    this.xData = [];
    this.yData = [];
    this.displayMode = 0;
  }
  createChart(){
    var data = {
      labels: this.xData,
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

    this.graph = new Chart(
      document.getElementById(this.codename),
      config
    );
  }
  update(){
    

    $.get("Stocks/COST.csv", function(data) {
      var parsedData = CSVToArray(data);
      yTemp = getColumn(parsedData,1)
      xTemp = getColumn(parsedData,0)
      xTemp.splice(0,1)
      
      this.yData = yTemp;
      this.xData = xTemp;
      console.log(this.yData)
      console.log(this.xData)
      //console.log(stockData)
      //stockData.splice(0,100)
   });
    //mychart
    this.yData = yTemp;
    this.xData = xTemp;
    console.log("actual")
      console.log(this.yData)
      console.log(this.xData)
    let newDataset = {
      label: 'updated data test',
      backgroundColor: 'rgb(25, 99, 252)',
      borderColor: 'rgb(25, 99, 252)',
      data:this.yData,
    };
    this.graph.data.datasets.pop();
    this.graph.data.labels = this.xData; 
    this.graph.data.datasets.push(newDataset)
  }
}
  //console.log(CSVToArray(stockData, " "))
// const labels = [];


// var data = {
//   labels: labels,
//   datasets: [{
//     label: 'Predicted  price',
//     backgroundColor: 'rgb(255, 99, 132)',
//     borderColor: 'rgb(255, 99, 132)',
//     data: [0,],
//   },{
//     label: 'Stock Price',
//     backgroundColor: 'rgb(25, 99, 252)',
//     borderColor: 'rgb(25, 99, 252)',
//     data: [
//     0,1
//       ],
//   }
// ]

// };

// var config = {
//   type: 'line',
//   data,
//   options: {}
// };


// var hersheyChart = new Chart(
//   document.getElementById('HSY'),
//   config
// );
// var sherwinChart = new Chart(
//   document.getElementById('SHW'),
//   config
// );
// var citrixChart = new Chart(
//   document.getElementById('CTXS'),
//   config
// );

var hersheyChart = new StockChart("HSY");
var sherwinChart = new StockChart("SHW");
var costcoChart = new StockChart("COST");
var citrixChart = new StockChart("CTXS");

chartList = [costcoChart,hersheyChart,citrixChart,sherwinChart];

function updateGraphs(){
  for(let i = 0; i < chartList.length;i++){
    chartList[i].update()
  }
  //console.log(stockData)
  console.log("graph update call") 
}

setInterval(updateGraphs, 2000);
