 document.addEventListener("DOMContentLoaded", async function () {
    const apiKey = "9IZ2GEIJ61BKPZ1D.";  // Substitua pela sua chave obtida no site da Alpha Vantage
    const commodity = { symbol: "COFFEE", market: "NYBOT" };  // Apenas COFFEE

    let price = 0; // Variável para armazenar o preço

    try {
        const url = `https://www.alphavantage.co/query?function=COMMODITY_EXCHANGE_RATE&from_symbol=${commodity.symbol}&to_market=${commodity.market}&apikey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data && data["Realtime Commodity Exchange Rate"]) {
            price = parseFloat(data["Realtime Commodity Exchange Rate"]["5. Exchange Rate"]); // Obtém o preço
        }
    } catch (error) {
        console.error(`Erro ao obter dados de ${commodity.symbol}:`, error);
    }

    const ctx = document.getElementById('commoditiesChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [commodity.symbol],  // Apenas COFFEE no eixo X
            datasets: [{
                label: 'Preço em USD',
                data: [price],  // Apenas um valor no eixo Y
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
