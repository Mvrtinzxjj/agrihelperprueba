// API Key de OpenWeather
const apiKey = '54fb37f0f575fcc31840ec316bff8962'; // Aquí está tu API Key
const city = 'Chillan,CL'; // Ciudad Chillán, Chile

// Elementos del DOM
const weatherInfo = document.getElementById('weather-info');
const cropList = document.getElementById('crop-list');
const cropForm = document.getElementById('crop-form');
const cropNameInput = document.getElementById('crop-name');
const reminderForm = document.getElementById('reminder-form');
const reminderList = document.getElementById('reminder-list');
const reminderCropInput = document.getElementById('reminder-crop');
const reminderDateInput = document.getElementById('reminder-date');
const mapElement = document.getElementById('mapid');

// Función para obtener el clima
function obtenerClima() {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al obtener datos del clima: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const description = data.weather[0].description;
      
      // Mostrar los datos del clima
      weatherInfo.innerHTML = `
        <p><strong>Temperatura:</strong> ${temp}°C</p>
        <p><strong>Humedad:</strong> ${humidity}%</p>
        <p><strong>Descripción:</strong> ${description}</p>
      `;
    })
    .catch(error => {
      weatherInfo.innerHTML = `<p>No se pudo obtener el clima. Intenta de nuevo más tarde.</p>`;
      console.error('Error obteniendo datos del clima:', error);
    });
}

// Función para agregar cultivos
cropForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const cropName = cropNameInput.value.trim();
  if (cropName) {
    const li = document.createElement('li');
    li.textContent = cropName;
    cropList.appendChild(li);
    cropNameInput.value = ''; // Limpiar el campo
  }
});

// Función para agregar recordatorios de riego
reminderForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const crop = reminderCropInput.value.trim();
  const date = reminderDateInput.value;
  if (crop && date) {
    const li = document.createElement('li');
    li.textContent = `Recordatorio de riego para ${crop} el ${date}`;
    reminderList.appendChild(li);
    reminderCropInput.value = ''; // Limpiar el campo
    reminderDateInput.value = ''; // Limpiar el campo
  }
});

// Inicializar la aplicación
obtenerClima(); // Cargar el clima al inicio

// Inicializar el mapa (coordenadas de Chillán, Chile)
const map = L.map(mapElement).setView(-36.6054, -72.1074, 13); // Coordenadas de Chillán, Chile

// Agregar capa de mapa usando OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Agregar marcador en el mapa (Chillán)
L.marker([-36.6054, -72.1074]).addTo(map)
  .bindPopup("<b>Chillán</b><br>Ubicación de tus cultivos.")
  .openPopup();
