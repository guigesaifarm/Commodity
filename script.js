document.addEventListener("DOMContentLoaded", async function () {
    const apiKey = "ded33340fee7453:o3iflq121hjaw7k"; // Substitua pela sua API Key da Trading Economics
    const commodity = "coffee"; // Nome da commodity na API
    const url = `https://api.tradingeconomics.com/markets/${commodity}:com?c=${apiKey}`;

    let price = 0;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data[0] && data[0].Last) {
            price = parseFloat(data[0].Last); // Obtém o preço atual do café
        } else {
            console.error("Erro: Resposta da API não contém dados válidos.");
        }
    } catch (error) {
        console.error(`Erro ao obter dados de ${commodity}:`, error);
    }

    // Criando o gráfico com Chart.js
    const ctx = document.getElementById('commoditiesChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["COFFEE"], // Apenas uma commodity
            datasets: [{
                label: 'Preço em USD',
                data: [price],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
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

