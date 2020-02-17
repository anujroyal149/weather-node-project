const weatherForm = document.querySelector('form')
const searchData = document.querySelector('input')
weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    document.getElementById("weather").innerHTML = "<img src=\"/img/wait.gif\" alt=\"Please wait!!!\">"
    const place = searchData.value
    const url = "/weather?address=" + place
    fetch(url).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            document.getElementById("weather").innerHTML = data.error
        }else{
        document.getElementById("weather").innerHTML = data.place + '. ' + data.forecast + data.rain  + " The present temperature is " + data.temperature;
        console.log(data)
        }
    })
})

})


// fetch('http://localhost:3000/weather?address=Porbandar').then((response)=>{
//     response.json().then((data)=>{
//         if (data.error){
//             document.getElementById("weather").innerHTML = data.error
//         }else{
//         document.getElementById("weather").innerHTML = data.place + '. ' + data.forecast + " The present temperature is " + data.temperature;
//         console.log(data)
//         }
//     })
// })