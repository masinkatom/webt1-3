const chart = document.getElementById('plotly');

const data = [{
    x: [1, 2, 3, 4, 5],

    y: [1, 2, 4, 8, 16]
}];

const layout = {
    title: "Graf Kotolňa",
    xaxis: {
        title: "Pocet piv"
    },
    yaxis: {
        title: "caw"
    },
    margin: { 
        t: 0 
    }
}

Plotly.newPlot(chart, data, layout);