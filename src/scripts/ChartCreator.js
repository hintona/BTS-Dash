//KD
google.charts.load('current', {'packages':['corechart'], mapsApiKey:'AIzaSyDrHYlzfwsY3rznx9e6UA6CB4WpqrK1ELY'});
//google.charts.setOnLoadCallback(function(){drawChart});

/**
 * This class creates different types of charts by using the google charts package
 */
class ChartCreator{
    async createComboChart(chartData, htmlElement, options){
        var processedData = google.visualization.arrayToDataTable(chartData);
        var comboChart = new google.visualization.ComboChart(document.getElementById(htmlElement));
        comboChart.draw(processedData, options);
    }

    async createBarChart(chartData, htmlElement, options){
        var processedData = google.visualization.arrayToDataTable(chartData);
        var barChart = new google.visualization.BarChart(document.getElementById(htmlElement));
        barChart.draw(processedData, options);
    }
}