// Dashboard estático: os gráficos usam dados fixos (mockados)

let horarios = ['22:00', '00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

// Temperatura em °C (faixa ideal: 8 a 12)
new Chart(graficoTemperatura, {
  type: 'line',
  data: {
    labels: horarios,
    datasets: [
      { data: Array(12).fill(8), borderWidth: 0, pointRadius: 0 },
      { data: Array(12).fill(12), borderWidth: 0, pointRadius: 0, fill: '-1', backgroundColor: 'rgba(46, 139, 92, 0.1)' },
      { data: [11.0, 11.6, 11.1, 10.6, 10.1, 9.6, 9.3, 9.0, 9.4, 10.1, 10.4, 8.9], borderColor: '#173f73', tension: 0.3 }
    ]
  },
  options: {
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { min: 6, max: 13 } }
  }
});

// Umidade em % (faixa ideal: 90 a 98)
new Chart(graficoUmidade, {
  type: 'line',
  data: {
    labels: horarios,
    datasets: [
      { data: Array(12).fill(90), borderWidth: 0, pointRadius: 0 },
      { data: Array(12).fill(98), borderWidth: 0, pointRadius: 0, fill: '-1', backgroundColor: 'rgba(46, 139, 92, 0.1)' },
      { data: [93.6, 94.4, 95.0, 95.1, 95.0, 94.9, 95.0, 94.4, 94.3, 93.8, 89.0, 92.7], borderColor: '#209598', tension: 0.3 }
    ]
  },
  options: {
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { min: 80, max: 100 } }
  }
});

// Conformidade por câmara (% do tempo dentro da faixa)
new Chart(graficoConformidade, {
  type: 'bar',
  data: {
    labels: ['Câmara 1', 'Câmara 2', 'Câmara 3'],
    datasets: [
      { label: 'Temperatura', data: [95, 94, 94], backgroundColor: '#173f73' },
      { label: 'Umidade', data: [94, 94, 94], backgroundColor: '#29999b' }
    ]
  },
  options: {
    indexAxis: 'y',
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { min: 0, max: 100 } }
  }
});
