document.addEventListener("DOMContentLoaded", async function () {
    const apiKey = "ded33340fee7453:78hxp3y9yax1d8f"; // Substitua pela sua API Key correta
    const asset = "BTCUSD"; // Identificador do Bitcoin
    const url = `https://api.tradingeconomics.com/markets/ticker/${asset}?c=${apiKey}`;

    let price = 0;

    try {
        const response = await fetch(url);

        // Exibe a resposta completa no console para depuração
        console.log("Resposta da API:", response);

        // Verifica se a resposta está OK (200)
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Dados recebidos:", data); // Exibir no console

        if (data && data.length > 0 && data[0].Last) {
            price = parseFloat(data[0].Last); // Obtém o preço atual do Bitcoin
            console.log(`Preço do Bitcoin (BTC/USD): $${price}`);
        } else {
            console.error("Erro: Resposta da API não contém dados válidos.");
        }
    } catch (error) {
        console.error(`Erro ao obter dados de ${asset}:`, error);
    }

    // Criando o gráfico com Chart.js
    const ctx = document.getElementById('cryptoChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Bitcoin (BTC/USD)"],
            datasets: [{
                label: 'Preço em USD',
                data: [price],
                backgroundColor: 'rgba(255, 206, 86, 0.5)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                    suggestedMin: 40000,
                    ticks: {
                        stepSize: 5000
                    }
                }
            }
        }
    });
});
