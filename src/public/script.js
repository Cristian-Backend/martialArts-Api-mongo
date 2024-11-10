const apiUrl = 'https://martialarts-api-mongo.onrender.com/api/martials';

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      // Si la respuesta no es exitosa, arroja un error con el estado
      throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
    }
    return response.json(); // Convertir a JSON si la respuesta es exitosa
  })
  .then(data => {
    console.log('Datos recibidos:', data); // Procesa los datos de la API
  })
  .catch(error => {
    console.error('Error al consumir la API:', error.message); // Imprime el error detallado
  });
