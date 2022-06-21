import axios from "axios"

const apiKey = 'a958b95b3d974489ba1130015222106'
const city = 'Kaliningrad'

// services
const getWeather = async (apiKey, city) => {
    return await axios
        .get(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no`)

}

const weather = getWeather(apiKey, city)

const WIDTH = 600
const HEIGHT = 200
const DPI_WIDTH = WIDTH * 2
const DPI_HEIGHT = HEIGHT * 2

function css(el, styles = {}) {
    Object.assign(el.style, styles)
}

////////////// First example

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



////////////// Second example



weather.then(({data}) => {
    const weatherHoursArr = data.forecast.forecastday[0].hour
    const weatherDay = data.forecast.forecastday[0].day

    const canvas = document.getElementById('secondExample')
    const ctx = canvas.getContext('2d')

    
    canvas.width = DPI_WIDTH
    canvas.height = DPI_HEIGHT
    css(canvas, {
        width: WIDTH + 'px',
        height: HEIGHT + 'px',
    })
    

    const fault = 3
    const maxTempDay = Math.round(weatherDay.maxtemp_c) + fault
    const minTempDay = Math.round(weatherDay.mintemp_c) - fault
    const divideTempDay = maxTempDay - minTempDay


    const amountColumns = weatherHoursArr.length / 4 
    const widthColumn = canvas.width / amountColumns
    const heightRow = canvas.height / divideTempDay

    let pointCoordX = 0

    ctx.fillStyle =  'rgb(154, 160, 166)'
    ctx.font = '16px arial';
    
    // columns 
    for (let i = 0; i < weatherHoursArr.length; i++) {

        if (i % 4 == 0){
            ctx.fillText(`${i}:00`, pointCoordX, canvas.height - 10);
            pointCoordX += widthColumn
        }
    
    }

    weatherHoursArr.map((element, index) => {

        if (index % 4 == 0){
            let temp = Math.round(element.dewpoint_c)

            const x = (widthColumn * (index / 4)) + 10
            const y = temp => (maxTempDay - fault - temp) * heightRow
                
            ctx.strokeStyle = '#ffc500'
            ctx.lineWidth = 1
    
            ctx.fillStyle =  'rgb(154, 160, 166)'
            ctx.fillText(temp, x, y(temp) - 15);

            ctx.beginPath()
            ctx.moveTo(x, y(temp))
            
    
            if (weatherHoursArr[index + 4]){
                temp = Math.round(weatherHoursArr[index + 4].dewpoint_c)

                ctx.lineTo(x + widthColumn, y(temp))

            } else {
                temp = Math.round(weatherHoursArr[weatherHoursArr.length - 1].dewpoint_c)

                ctx.lineTo(x + widthColumn, y(temp))
                
            }

            ctx.lineTo(x + widthColumn, canvas.height - 40)
            ctx.lineTo(x, canvas.height - 40)

            ctx.fillStyle = '#ffc5003b'
            ctx.fill();

            ctx.stroke()
        }
        
       

    })

    
    // logs
    console.log(weatherDay);
    
})