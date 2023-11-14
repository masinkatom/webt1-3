// var source = new EventSource("https://old.iolab.sk/evaluation/sse/sse.php");
// source.onmessage = function (event) {
//   document.getElementById("result").innerHTML += event.data + "<br>";
// };

// Create initial empty data for the plot
var plotData = [{
  x: [],
  y: [],
  mode: 'lines',
  name: 'y1'
}, {
  x: [],
  y: [],
  mode: 'lines',
  name: 'y2'
}];

// Layout for the plot
var layout = {
  title: 'Real-Time Line Graph',
  xaxis: { title: 'Time' },
  yaxis: { title: 'Values' }
};

// Create the plot
var plotlyGraph = Plotly.newPlot('sin-cos-graph', plotData, layout);

// EventSource to continuously receive data from the PHP script
var eventSource = new EventSource('https://old.iolab.sk/evaluation/sse/sse.php');
eventSource.onmessage = function (event) {
  var newData = JSON.parse(event.data);

  // Update the plot with new data
  Plotly.extendTraces('sin-cos-graph', {
    x: [[newData.x], [newData.x]],
    y: [[newData.y1], [newData.y2]]
  }, [0, 1]);
};