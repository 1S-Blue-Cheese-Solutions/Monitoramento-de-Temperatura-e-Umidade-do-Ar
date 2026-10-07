const labels = [
  "21:11",
  "22:11",
  "23:11",
  "00:11",
  "01:11",
  "02:11",
  "03:11",
  "04:11",
  "05:11",
  "06:11",
  "07:11",
  "08:11",
  "09:11",
  "10:11",
  "11:11",
  "12:11",
  "13:11",
  "14:11",
  "15:11",
  "16:11",
  "17:11",
  "18:11",
  "19:11",
  "20:11",
];

const temperaturas = [
  9.4, 9.8, 9.2, 10.1, 10.6, 10.4, 10.9, 11.2, 10.8, 11.1, 10.9, 11.3, 10.7,
  10.2, 10.5, 9.8, 9.1, 9.7, 8.8, 8.6, 8.9, 8.5, 8.7, 8.9,
];

const umidades = [
  91.0, 91.8, 91.2, 92.8, 93.1, 92.5, 93.4, 94.2, 94.5, 95.3, 95.8, 95.2, 96.1,
  95.4, 96.4, 95.9, 95.3, 95.7, 94.9, 95.2, 86.2, 86.7, 94.8, 92.7,
];

const faixaTemperatura = {
  min: 8,
  max: 12,
};

const faixaUmidade = {
  min: 90,
  max: 98,
};

/* PLUGIN PARA DESENHAR A FAIXA IDEAL */

const faixaIdealPlugin = {
  id: "faixaIdeal",

  beforeDraw(chart, args, options) {
    const { ctx, chartArea, scales } = chart;

    if (!chartArea) {
      return;
    }

    const y = scales.y;

    const min = options.min;
    const max = options.max;

    const yTop = y.getPixelForValue(max);
    const yBottom = y.getPixelForValue(min);

    ctx.save();

    ctx.fillStyle = "rgba(45, 130, 85, 0.10)";

    ctx.fillRect(
      chartArea.left,
      yTop,
      chartArea.right - chartArea.left,
      yBottom - yTop,
    );

    ctx.restore();
  },
};

/* GRÁFICO DE TEMPERATURA */

new Chart(document.getElementById("temperaturaChart"), {
  type: "line",

  data: {
    labels: labels,

    datasets: [
      {
        label: "Temperatura",
        data: temperaturas,

        borderColor: "#16467e",

        borderWidth: 2,

        pointRadius: 0,

        pointHoverRadius: 4,

        tension: 0.35,

        fill: false,
      },
    ],
  },

  plugins: [faixaIdealPlugin],

  options: {
    responsive: true,

    maintainAspectRatio: false,

    interaction: {
      intersect: false,
      mode: "index",
    },

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor: "#18314d",

        titleFont: {
          size: 11,
        },

        bodyFont: {
          size: 11,
        },

        padding: 9,

        callbacks: {
          label: function (context) {
            return ` ${context.raw.toFixed(1)} °C`;
          },
        },
      },

      faixaIdeal: {
        min: faixaTemperatura.min,
        max: faixaTemperatura.max,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#7890a6",
          font: {
            size: 8,
          },

          maxTicksLimit: 8,
        },

        border: {
          display: false,
        },
      },

      y: {
        min: 8,

        max: 13,

        ticks: {
          stepSize: 0.5,

          color: "#7890a6",

          font: {
            size: 8,
          },

          callback: function (value) {
            return value + "°";
          },
        },

        grid: {
          color: "#edf0f2",
        },

        border: {
          display: false,
        },
      },
    },
  },
});

/* GRÁFICO DE UMIDADE */

new Chart(document.getElementById("umidadeChart"), {
  type: "line",

  data: {
    labels: labels,

    datasets: [
      {
        label: "Umidade",
        data: umidades,

        borderColor: "#29979a",

        borderWidth: 2,

        pointRadius: 0,

        pointHoverRadius: 4,

        tension: 0.35,

        fill: false,
      },
    ],
  },

  plugins: [faixaIdealPlugin],

  options: {
    responsive: true,

    maintainAspectRatio: false,

    interaction: {
      intersect: false,
      mode: "index",
    },

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor: "#18314d",

        callbacks: {
          label: function (context) {
            return ` ${context.raw.toFixed(1)}%`;
          },
        },
      },

      faixaIdeal: {
        min: faixaUmidade.min,
        max: faixaUmidade.max,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#7890a6",
          font: {
            size: 8,
          },

          maxTicksLimit: 8,
        },

        border: {
          display: false,
        },
      },

      y: {
        min: 84,

        max: 98,

        ticks: {
          stepSize: 2,

          color: "#7890a6",

          font: {
            size: 8,
          },

          callback: function (value) {
            return value + "%";
          },
        },

        grid: {
          color: "#edf0f2",
        },

        border: {
          display: false,
        },
      },
    },
  },
});

/* CONFORMIDADE POR CÂMARA */

new Chart(document.getElementById("conformidadeChart"), {
  type: "bar",

  data: {
    labels: ["Câmara 1", "Câmara 2", "Câmara 3"],

    datasets: [
      {
        label: "Temperatura",

        data: [94, 93, 93],

        backgroundColor: "#173f73",

        borderRadius: 2,

        barThickness: 21,
      },

      {
        label: "Umidade",

        data: [93, 93, 93],

        backgroundColor: "#29999b",

        borderRadius: 2,

        barThickness: 21,
      },
    ],
  },

  options: {
    responsive: true,

    maintainAspectRatio: false,

    indexAxis: "y",

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            return ` ${context.raw}%`;
          },
        },
      },
    },

    scales: {
      x: {
        min: 0,

        max: 100,

        ticks: {
          stepSize: 25,

          color: "#7890a6",

          font: {
            size: 8,
          },

          callback: function (value) {
            return value + "%";
          },
        },

        grid: {
          color: "#edf0f2",
        },

        border: {
          display: false,
        },
      },

      y: {
        ticks: {
          color: "#657c94",

          font: {
            size: 9,
          },
        },

        grid: {
          display: false,
        },

        border: {
          display: false,
        },
      },
    },
  },
});

document.getElementById("camaraSelect").addEventListener("change", function () {
  console.log("Câmara selecionada:", this.value);
});

document
  .getElementById("periodoSelect")
  .addEventListener("change", function () {
    console.log("Período selecionado:", this.value);
  });

document
  .querySelector(".dashboard-sair")
  .addEventListener("click", function () {
    window.location.href = "index.html";
  });
