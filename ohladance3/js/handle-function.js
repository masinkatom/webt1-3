window.addEventListener('resize', updateGraphLayout);

function updateGraphLayout() {
    var chartContainer = document.getElementById('sin-cos-graph');
    
    var chartWidthLine = chartContainer.offsetWidth;
    
    // Update the layout with the new width
    Plotly.relayout('sin-cos-graph', { width: chartWidthLine });
}