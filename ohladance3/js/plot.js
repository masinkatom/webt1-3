const chartline = document.getElementById('grades-chartline');
const chartbar = document.getElementById('grades-chartbar');
const chartpie = document.getElementById('grades-chartpie');

function loadXML() {
    let xmlFile = "../ohladance3/data/z03.xml";
    let req = new XMLHttpRequest();

    req.open("GET", xmlFile, true);
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let unparsedData = studentDetails(this);
            plotLine(parseData(unparsedData, "scatter"));
            plotBar(parseData(unparsedData, "bar"));
            plotPie(parseData(unparsedData, "pie"));
        }
    };
    req.send();
}

function studentDetails(_xml) {
    let xmlDoc = _xml.responseXML;

    let zaznamElements = xmlDoc.getElementsByTagName("zaznam");

    let znamky = [];
    let rok = [];

    for (let i = 0; i < zaznamElements.length; i++) {
        rok[i] = zaznamElements[i].getElementsByTagName("rok")[0].textContent;
        let hodnotenie = zaznamElements[i].getElementsByTagName("hodnotenie")[0];

        znamky[i] = {
            A: hodnotenie.getElementsByTagName('A')[0].textContent,
            B: hodnotenie.getElementsByTagName('B')[0].textContent,
            C: hodnotenie.getElementsByTagName('C')[0].textContent,
            D: hodnotenie.getElementsByTagName('D')[0].textContent,
            E: hodnotenie.getElementsByTagName('E')[0].textContent,
            FX: hodnotenie.getElementsByTagName('FX')[0].textContent,
            FN: hodnotenie.getElementsByTagName('FN')[0].textContent,
        };

    }

    return [rok, znamky];

}

function parseData(unparsedData, type) {
    let years = unparsedData[0];
    let grades = unparsedData[1];

    let acka = {
        x: [],
        y: [],
        name: "A",
        type: type
    };
    let bcka = {
        x: [],
        y: [],
        name: "B",
        type: type
    };
    let ccka = {
        x: [],
        y: [],
        name: "C",
        type: type
    };
    let dcka = {
        x: [],
        y: [],
        name: "D",
        type: type
    };
    let ecka = {
        x: [],
        y: [],
        name: "E",
        type: type
    };
    let fxka = {
        x: [],
        y: [],
        name: "FX",
        type: type
    };
    let fnka = {
        x: [],
        y: [],
        name: "FN",
        type: type
    };


    for (let i = years.length-1; i >= 0; i--) {
        acka.x.push(years[i]);
        acka.y.push(grades[i]["A"]);
        bcka.x.push(years[i]);
        bcka.y.push(grades[i]["B"]);
        ccka.x.push(years[i]);
        ccka.y.push(grades[i]["C"]);
        dcka.x.push(years[i]);
        dcka.y.push(grades[i]["D"]);
        ecka.x.push(years[i]);
        ecka.y.push(grades[i]["E"]);
        fxka.x.push(years[i]);
        fxka.y.push(grades[i]["FX"]);
        fnka.x.push(years[i]);
        fnka.y.push(grades[i]["FN"]);
    }

    return [acka, bcka, ccka, dcka, ecka, fxka, fnka];
}

function plotLine(data) {

    let layout = {
        barmode: 'stack',
        legend: {
            x: 1,
            y: 1,
            orientation: "v",
        },

        xaxis: {
            title: "Rok"
        },
        yaxis: {
            title: "Počet študentov",
        },
        margin: {
            t: 60,
            l: 45,
            r: 60,
            b: 115
        },

        colorway: ['#f3cec9', '#e7a4b6', '#cd7eaf', '#a262a9', '#6f4d96', '#3d3b72', '#182844']
    }

    Plotly.newPlot(chartline, data, layout);
}
var dataBar;
function plotBar(dataIn) {

    dataBar = dataIn.slice();
    let layout = {
        barmode: 'group',
        height: 450,
        legend: {
            x: 1,
            y: 1,
            orientation: "v",
        },
        xaxis: {
            title: "Rok"
        },
        yaxis: {
            title: "Počet študentov",
        },
        margin: {
            t: 60,
            l: 120,
            r: 60,
            b: 115
        },

        colorway: ['#f3cec9', '#e7a4b6', '#cd7eaf', '#a262a9', '#6f4d96', '#3d3b72', '#182844']
    }

    if (chartWidthBar < 500) {
        layout.xaxis.title = "Počet študentov";
        layout.yaxis.title = "Rok";
    }
    setHVvalues();
    Plotly.newPlot(chartbar, dataBar, layout);
}

var dataPie = [];

function plotPie(dataIn) {

    let type = dataIn[0]["type"];

    let rw = 0; let clmn = 0;

    for (let j = 0; j < dataIn[0].x.length; j++) {
        dataPie.push({
            values: [],
            labels: [],
            hoverinfo: 'label+percent',
            name: dataIn[j].x[j],
            type: type,
            hole: .55,
            textposition: "none",
            automargin: true,
            domain: {
                row: rw,
                column: clmn
            }
            
        });

        
        for (let i = 0; i < dataIn.length; i++) {
            dataPie[j].values.push(dataIn[i].y[j]);
            dataPie[j].labels.push(dataIn[i].name);
        }
        
        if (clmn >= 1) {
            rw ++;
            clmn = 0;
        }
        else clmn++;
    }

    let layout = {
        height: 900,
        width: 900,
        margin: {
            t: 20
        },
        showarrow: false,
        y: 1,
        legend: {

            x: 1,
        
            y: 0.9
        },
        grid: {
            rows: rw+1, 
            columns: clmn+1
        },
        colorway: ['#edaaa1', '#e7a4b6', '#cd7eaf', '#a262a9', '#6f4d96', '#3d3b72', '#182844']
    };

    Plotly.newPlot(chartpie, dataPie, layout);
    updateChartLayout();
}



loadXML();
