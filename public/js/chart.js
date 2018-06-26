function drawChart(healthy, unhealthy) {                         
                let data = google.visualization.arrayToDataTable([
                    ['Amount People', 'Healthy'],
                    ['Healthy', healthy],
                    ['Unhealthy', unhealthy],                                   
                ]);
                
                let options = {
                    title: 'Amount Healthy People (BMI)',
                    width: 800,
                    height: 800                    
                }; 
                const chart = new google.visualization.PieChart(document.getElementById('piechart'));                                                         
                chart.draw(data, options);                                                  
} 
window.drawChart = drawChart;


