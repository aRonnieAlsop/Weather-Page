const express = require('express')
const axios = require('axios')

const app = express()
const port = 3000

app.use(express.static('images'))

const apiKey = '7bec9469719264cf3799372fd301ae17'
const city = 'Reno'

app.get('/', (req, res) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  
    axios.get(apiUrl)
      .then(response => {
        const weatherData = response.data;
        const temperature = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        
        const weatherCondition = weatherData.weather[0].main
        console.log("Weather Condition:", weatherCondition)
    
        const weatherImageMapping = {
            'Clear': 'clear_sky.jpg',
            'Snow': 'reno_snow.jpg',
            'Clouds': 'cloudy.jpg',
            'Rain': 'rain.jpg',
            'Description': 'default.jpg'
        }

        const imageFilename = weatherImageMapping[weatherCondition] || 'default.jpg'

        const weatherInfo = `Weather in ${city}:<br>Temperature: ${temperature}°C<br>Description: ${description}`
  
        res.send(`
        <html>
            <body>
                <div id="weather-icon">
                    <img src="${imageFilename}" alt="Reno Weather Image">
                </div>
                    ${weatherInfo}
            </body>
        </html>
        `)
      })
      .catch(error => {
        res.send(`Error fetching weather data: ${error}`)
      })
  })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

