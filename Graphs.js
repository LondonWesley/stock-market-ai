window.onload = function () {
  var dps1 = [], dps2= [];
  var hersheyStockChart = new CanvasJS.StockChart("hersheyContainer",{
    title:{
      text:"Hershey"
    },
    subtitles: [{
      text:"Simple Moving Average"
    }],
    charts: [{
      axisY: {
        prefix: "$"
      },
      legend: {
        verticalAlign: "top",
        cursor: "pointer",
        itemclick: function (e) {
          if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          } else {
            e.dataSeries.visible = true;
          }
          e.chart.render();
        }
      },
      toolTip: {
        shared: true
      },
      data: [{
        type: "candlestick",
        showInLegend: true,
        name: "Stock Price",
        yValueFormatString: "$#,###.00",
        xValueType: "dateTime",
        dataPoints : dps1
      }],
    }],
    navigator: {
       data: [{
         dataPoints: dps2
       }],
      slider: {
        minimum: new Date(2018, 03, 01),
        maximum: new Date(2021, 03, 07)
      }
    }
  });
  $.getJSON("Hershey.json", function(data) {
    for(var i = 0; i < data.length; i++){
      dps1.push({x: new Date(data[i].date), y: [Number(data[i].open), Number(data[i].high), Number(data[i].low), Number(data[i].close)]});
      dps2.push({x: new Date(data[i].date), y: Number(data[i].close)});
    }
    stockChart.render();
    var sma = calculateSMA(dps1, 7);
    stockChart.charts[0].addTo("data", { type: "line", dataPoints: sma, showInLegend: true, yValueFormatString: "$#,###.00", name: "Simple Moving Average"})
  });
  function calculateSMA(dps, count){
    var avg = function(dps){
      var sum = 0, count = 0, val;
      for (var i = 0; i < dps.length; i++) {
        val = dps[i].y[3]; sum += val; count++;
      }
      return sum / count;
    };
    var result = [], val;
    count = count || 5;
    for (var i=0; i < count; i++)
      result.push({ x: dps[i].x , y: null});
    for (var i=count - 1, len=dps.length; i < len; i++){
      val = avg(dps.slice(i - count + 1, i));
      if (isNaN(val))
        result.push({ x: dps[i].x, y: null});
      else
        result.push({ x: dps[i].x, y: val});
    }
    return result;
  }
  var sherwinStockChart = new CanvasJS.StockChart("sherwinContainer",{
    title:{
      text:"Hershey"
    },
    subtitles: [{
      text:"Simple Moving Average"
    }],
    charts: [{
      axisY: {
        prefix: "$"
      },
      legend: {
        verticalAlign: "top",
        cursor: "pointer",
        itemclick: function (e) {
          if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          } else {
            e.dataSeries.visible = true;
          }
          e.chart.render();
        }
      },
      toolTip: {
        shared: true
      },
      data: [{
        type: "candlestick",
        showInLegend: true,
        name: "Stock Price",
        yValueFormatString: "$#,###.00",
        xValueType: "dateTime",
        dataPoints : dps1
      }],
    }],
    navigator: {
       data: [{
         dataPoints: dps2
       }],
      slider: {
        minimum: new Date(2018, 03, 01),
        maximum: new Date(2021, 03, 07)
      }
    }
  });
  $.getJSON("Hershey.json", function(data) {
    for(var i = 0; i < data.length; i++){
      dps1.push({x: new Date(data[i].date), y: [Number(data[i].open), Number(data[i].high), Number(data[i].low), Number(data[i].close)]});
      dps2.push({x: new Date(data[i].date), y: Number(data[i].close)});
    }
    stockChart.render();
    var sma = calculateSMA(dps1, 7);
    stockChart.charts[0].addTo("data", { type: "line", dataPoints: sma, showInLegend: true, yValueFormatString: "$#,###.00", name: "Simple Moving Average"})
  });
  function calculateSMA(dps, count){
    var avg = function(dps){
      var sum = 0, count = 0, val;
      for (var i = 0; i < dps.length; i++) {
        val = dps[i].y[3]; sum += val; count++;
      }
      return sum / count;
    };
    var result = [], val;
    count = count || 5;
    for (var i=0; i < count; i++)
      result.push({ x: dps[i].x , y: null});
    for (var i=count - 1, len=dps.length; i < len; i++){
      val = avg(dps.slice(i - count + 1, i));
      if (isNaN(val))
        result.push({ x: dps[i].x, y: null});
      else
        result.push({ x: dps[i].x, y: val});
    }
    return result;
  }
}