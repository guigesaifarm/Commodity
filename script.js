document.addEventListener("DOMContentLoaded", async function () {
    const apiKey = "9IZ2GEIJ61BKPZ1D";  // Substitua pela sua chave obtida no site da Alpha Vantage
    const commodities = [
        { symbol: "WHEAT", market: "CME" },  
        { symbol: "CORN", market: "CME" },  
        { symbol: "SOYBEANS", market: "CME" },
        { symbol: "SUGAR", market: "NYBOT" },  
        { symbol: "COFFEE", market: "NYBOT" },
        { symbol: "COTTON", market: "NYBOT" },  
        { symbol: "RICE", market: "CME" },  
        { symbol: "PALM OIL", market: "MYX" },
        { symbol: "MILK", market: "CME" },  
        { symbol: "BEEF", market: "CME" }
    ];
    
    let labels = [];
    let values = [];

    for (let item of commodities) {
        try {
            const url = `https://www.alphavantage.co/query?function=COMMODITY_EXCHANGE_RATE&from_symbol=${item.symbol}&to_market=${item.market}&apikey=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            
            if (data && data["Realtime Commodity Exchange Rate"]) {
                labels.push(item.symbol);
                values.push(parseFloat(data["Realtime Commodity Exchange Rate"]["5. Exchange Rate"])); // Obtém o preço
            }
        } catch (error) {
            console.error(`Erro ao obter dados de ${item.symbol}:`, error);
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
