const axisBtn = document.querySelector('#axis-btn');

// To store the JSON response.
var pollData;
var firstKey,secondKey;

document.addEventListener('DOMContentLoaded', function () {

  // This fetch will just load the page for the first time with default value of age.
  fetch('http://localhost:5000/jsondata')
    .then(response => response.json())
    .then(data => {
      pollData = data['data']
      firstKey=Object.keys(pollData[0])[0];
      secondKey=Object.keys(pollData[0])[1];
      func(pollData,firstKey,secondKey);
    });

  // This function will choose axis.
  axisBtn.onclick = function () {
    var clearOldCanva =document.getElementById('chart').getContext('2d');
    clearOldCanva.clearRect(0, 0, canvas.width, canvas.height);
    const axisValue = document.querySelector('#axis-input').value;
    if (axisValue === Object.keys(pollData[0])[0]) {
      func(pollData,firstKey,secondKey);
    }
    else {
      func(pollData,secondKey,firstKey);
    }
  }
});


function rgbToRgba(rgb, alpha = 1) {
  return `rgba(${rgb.substring(rgb.indexOf('(') + 1, rgb.length - 1).split(',').join()}, ${alpha})`;
}

// This function will make the chart.
function func(pollData,firstKey,secondKey) {

  Chart.defaults.global.defaultFontFamily = '"Comic Sans MS", cursive, sans-serif';
  const ctx = document.getElementById('chart').getContext('2d');
  const pollChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: pollData.map(pollOption => pollOption[firstKey]),
      datasets: [{
        label: '# of People',
        data: pollData.map(pollOption => pollOption[secondKey]),
        backgroundColor: pollData.map(pollOption => rgbToRgba(pollOption.color, 0.75)),
        borderWidth: 3
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      title: {
        display: true,
        text: 'Age on X-axis',
        fontColor: "#333",
        fontSize: 20,
        padding: 20
      },
      legend: {
        display: false,
      }
    }
  })
}
