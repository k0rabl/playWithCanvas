import axios from "axios"

const apiKey = 'a958b95b3d974489ba1130015222106'
const city = 'Kaliningrad'

// services
const getWeather = async (apiKey, city) => {
    return await axios
        .get(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no`)

}


//control
const weather = getWeather(apiKey, city)

weather.then(({data}) => {
    const hours = data.forecast.forecastday[0].hour

    const canvas = document.getElementById('firstExample')
    const ctx = canvas.getContext('2d')
    ctx.font = '12px serif';
    
    let pointCoordX = 5
    let pointCoordY = 0
    
    // x coords text
    for (let i = 0; i < hours.length; i++) {
        ctx.fillText(`${i}:00`, pointCoordX, canvas.height - 10);
    
        pointCoordX += canvas.width / hours.length 
    }

    // y coords text
    const start = 7
    const end = 14
    for (let i = start; i < end; i++) {
        ctx.fillText(`${i}`, 0, pointCoordY);
    
        pointCoordY += canvas.height / (end - start)
    }

    hours.map((element, index) => {
        // set line stroke and line width
        ctx.strokeStyle = 'green';
        ctx.lineHeight = 1;

        // draw a red line
        ctx.beginPath();
        ctx.moveTo(40 * index, canvas.height - (end -Math.round(element.dewpoint_c)) * 50);
        console.log();
        // 300 - 9 * 7 * 7 

        if (hours[index + 1]){
            ctx.lineTo(40 * index + 40, canvas.height - (end - Math.round(hours[index + 1].dewpoint_c)) * 50);
        }
        ctx.stroke();

    })


    // logs
    console.log(hours);
    
})



