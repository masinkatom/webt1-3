// var source = new EventSource("https://old.iolab.sk/evaluation/sse/sse.php");
// source.onmessage = function (event) {
//   document.getElementById("result").innerHTML += event.data + "<br>";
// };

document.getElementById("stop-button").addEventListener("click", stopGenerating);
document.getElementById("checkboxSin").addEventListener("change", showGraph);
document.getElementById("checkboxCos").addEventListener("change", showGraph);
document.getElementById("slider-sin").addEventListener("change", changeAmpSin);
document.getElementById("slider-cos").addEventListener("change", changeAmpCos);

let plotData1 = {
	x: [],
	y: [],
	mode: 'lines',
	name: 'sínus',
	visible: true,
	line: {
		color: 'rgb(77, 36, 212)'
	}
};

let plotData2 = {
	x: [],
	y: [],
	mode: 'lines',
	name: 'kosínus',
	visible: true,
	line: {
		color: 'rgb(36, 212, 124)'
	}
};
var dataSinCos = [plotData1, plotData2];

var layout = {
	title: 'Real-Time Line Graph',
	xaxis: { title: '---X---' },
	yaxis: { title: '---Y---' }
};

document.getElementById("checkboxSin").checked = true;
document.getElementById("checkboxCos").checked = true;

Plotly.newPlot('sin-cos-graph', dataSinCos, layout);

var eventSource = new EventSource('https://old.iolab.sk/evaluation/sse/sse.php');
eventSource.onmessage = function (event) {
	var newData = JSON.parse(event.data);

	Plotly.extendTraces('sin-cos-graph', {
		x: [[newData.x], [newData.x]],
		y: [[newData.y1], [newData.y2]]
	}, [0, 1]);
};


function stopGenerating() {
	if (eventSource) {
		eventSource.close();
	}
	this.innerHTML = "Zastavené genrovanie";
	let sliders = document.querySelector(".sliders");
	sliders.style.display = "flex";
}

function showGraph() {
	let checkboxSin = document.getElementById("checkboxSin").checked;
	let checkboxCos = document.getElementById("checkboxCos").checked;
    let visibleArray = [checkboxSin, checkboxCos]; // Array indicating the visibility of each trace
    Plotly.update('sin-cos-graph', {visible: visibleArray});
}

function changeYVals(graph, amplitude) {
	if (graph == "sin") {
		for (let i = 0; i < dataSinCos[0].y.length; i++) {
			dataSinCos[0].y[i] *= amplitude; 
		}
	}
	else {
		for (let i = 0; i < dataSinCos[1].y.length; i++) {
			dataSinCos[1].y[i] *= amplitude; 
		}
	}
	
}

function changeAmpSin() {
	console.log("sin" + this.inputTypeRange.value);
	changeYVals("sin", this.inputTypeRange.value);
	//Plotly.update('sin-cos-graph', {y: [dataSinCos[0].y]}, [0]);
	Plotly.purge('sin-cos-graph');
	Plotly.react('sin-cos-graph', dataSinCos, layout);
}

function changeAmpCos() {
	console.log("cos" + this.inputTypeRange.value);
	changeYVals("cos", this.inputTypeRange.value);
	//Plotly.update('sin-cos-graph', {y: [dataSinCos[1].y]}, [1]);
	Plotly.purge('sin-cos-graph');
	Plotly.react('sin-cos-graph', dataSinCos, layout);
}