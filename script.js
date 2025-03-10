document.addEventListener("DOMContentLoaded", async function () {
    const apiKey = "ded33340fee7453:o3iflq121hjaw7k"; // Substitua pela sua API Key da Trading Economics
    const asset = "bitcoin"; // Nome do ativo na API
    const url = `https://api.tradingeconomics.com/markets/${asset}:cur?c=${apiKey}`; // Endpoint correto para criptomoedas

    let price = 0;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data[0] && data[0].Last) {
            price = parseFloat(data[0].Last); // Obtém o preço atual do Bitcoin
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
            labels: ["Bitcoin (BTC/USD)"], // Nome do ativo no eixo X
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
                    beginAtZero: false // O preço do BTC nunca será zero, então começamos do valor mínimo adequado
                }
            }
        }
    });
});
