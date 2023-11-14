window.addEventListener('resize', updateChartLayout);

var names = document.getElementById("names");

function deleteAllLabels() {
    names.innerHTML = "";
}

function addNameLabel(i, name, chartWidthPie) {
    let newPele = document.createElement("p");
    newPele.id = i + "-named";
    newPele.textContent = name;
    newPele.style.display = "flex";
    newPele.style.position = "absolute";
    newPele.style.fontSize = "14px"
    if(chartWidthPie > 800 && chartWidthPie <= 1080) {
        if (i%2 == 0) {
            newPele.style.top = 1280+i*(145) + "px";
            newPele.style.left = 8 + "%";
        }
        else {
            newPele.style.top = 1280+(i-1)*(145) + "px";
            newPele.style.left = 82 + "%";
        }
    }
    else if(chartWidthPie > 500 && chartWidthPie <= 800) {
        if (i%2 == 0) {
            newPele.style.top = 1320+i*(145) + "px";
            newPele.style.left = 2 + "%";
        }
        else {
            newPele.style.top = 1320+(i-1)*(145) + "px";
            newPele.style.left = 86 + "%";
        }

    }
    else if (chartWidthPie <= 500){
        newPele.style.top = 1350+i*(145) + "px";
        newPele.style.left = 4 + "%";
    }
    else {
        if (i%2 == 0) {
            newPele.style.top = 1280+i*(145) + "px";
            newPele.style.left = 14 + "%";
        }
        else {
            newPele.style.top = 1280+(i-1)*(145) + "px";
            newPele.style.left = 79 + "%";
        }
    }
    

    
    names.appendChild(newPele);
}

function changeVals(alignment) {
    for (let i = 0; i < dataBar.length; i++) {
        dataBar[i].orientation = alignment;
        xCpy = dataBar[i].x.slice();
        dataBar[i].x = dataBar[i].y.slice();
        dataBar[i].y = xCpy.slice();
    }
    return 1;
}

var horizontal = 0;
var vertical = 0;

function setHVvalues() {
    if (document.getElementById('grades-chartbar').offsetWidth > 500) {
        vertical = 1;
        for (let i = 0; i < dataBar.length; i++) {
            dataBar[i].orientation = "v";
        }
        
    }
    
    else {
        horizontal = 1;
        changeVals("h");
    }
}


function updateChartLayout() {
    var chartContainer = document.getElementById('grades-chartline');
    var chartContainer2 = document.getElementById('grades-chartbar');
    var chartContainer3 = document.getElementById('grades-chartpie');
    
    var chartWidthLine = chartContainer.offsetWidth;
    var chartWidthBar = chartContainer2.offsetWidth;
    var chartWidthPie = chartContainer3.offsetWidth;
    
    // Update the layout with the new width
    Plotly.relayout('grades-chartline', { width: chartWidthLine });
    if (chartWidthBar <= 500 && horizontal == 0 && vertical == 1) {
        vertical = 0;
        horizontal = changeVals("h");
        Plotly.relayout('grades-chartbar', { 
            xaxis: {
                title: "Počet študentov"
            },
            yaxis: {
                title: "Rok",
            }
        });
    }
    if (chartWidthBar > 500 && vertical == 0 && horizontal == 1) {
        horizontal = 0;
        vertical = changeVals("v");
        Plotly.relayout('grades-chartbar', { 
            xaxis: {
                title: "Rok"
            },
            yaxis: {
                title: "Počet študentov",
            }
        });
    }
    Plotly.relayout('grades-chartbar', { width: chartWidthBar  });

    deleteAllLabels();

    if (chartWidthPie < 500) {
        
        let rw = 0;
        let clmn = 0;
        
        for (let i = 0; i < dataPie.length; i++) {
            dataPie[i].domain["row"] = rw;
            dataPie[i].domain["column"] = clmn;
            rw++;
            addNameLabel(i, dataPie[i].name, chartWidthPie);
        }

        Plotly.relayout('grades-chartpie', 
        { 
            width: chartWidthPie,
            grid: {
                rows: 6, 
                columns: 1
            }
            
        });
    }
    else {
        let rw = 0;
        let clmn = 0;
        for (let i = 0; i < dataPie.length; i++) {
            dataPie[i].domain["row"] = rw;
            dataPie[i].domain["column"] = clmn;

            if (clmn >= 1) {
                rw ++;
                clmn = 0;
            }
            else clmn++;
            addNameLabel(i, dataPie[i].name, chartWidthPie);
        }

        Plotly.relayout('grades-chartpie', 
        { 
            width: chartWidthPie,
            grid: {
                rows: 3, 
                columns: 2
            }
        });
        
    }
}