document.addEventListener("DOMContentLoaded", async function () {
    const apiKey = "ded33340fee7453:o3iflq121hjaw7k"; // Substitua pela sua API Key correta
    const asset = "bitcoin"; // Nome do ativo na API
    const url = `https://api.tradingeconomics.com/markets/${asset}:cur?c=${apiKey}`;

    let price = 0;

    try {
        const response = await fetch(url);
        
        // Verifica se a resposta está OK (200)
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
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
                    beginAtZero: false, // O eixo Y não começa do zero
                    suggestedMin: 40000, // Sugere que o menor valor seja 40.000
                    ticks: {
                        stepSize: 5000 // Intervalo de 5.000 para melhor visualização
                    }
                }
            }
        }
    });
});
