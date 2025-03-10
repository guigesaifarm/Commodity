document.addEventListener("DOMContentLoaded", async function () {
    const apiKey = "SUA_API_KEY";  // Pegue uma chave na Alpha Vantage ou outra API
    const commodities = [
        "WHEAT", "CORN", "SOYBEANS", "SUGAR", "COFFEE", 
        "COTTON", "RICE", "PALM OIL", "MILK", "BEEF"
    ];
    
    let labels = [];
    let values = [];

    for (let commodity of commodities) {
        try {
            const response = await fetch(`https://www.alphavantage.co/query?function=${commodity}&apikey=${apiKey}`);
            const data = await response.json();
            
            if (data && data["data"]) {
                labels.push(commodity);
                values.push(parseFloat(data["data"]["price"]));  // Pega o preço atual
            }
        } catch (error) {
            console.error(`Erro ao obter dados de ${commodity}:`, error);
        }
    }

    const ctx = document.getElementById('commoditiesChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Preço em USD',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
