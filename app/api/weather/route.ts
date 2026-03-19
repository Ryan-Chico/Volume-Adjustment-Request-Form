// import { NextResponse } from "next/server";

// // This function runs when someone visits /api/weather with GET method
// export async function GET(request: Request) {
// try{
//     const {searchParams} = new URL(request.url);
//     const city = searchParams.get("city");

//     if(!city){
//         return NextResponse.json({
//             status: false,
//             message: "City is required."

//         },
//         {
//             status:400
//         }
//     )
        
//     }
//     const apiKey = process.env.OPENWEATHER_API_KEY;

//     if (!apiKey) {
//         return NextResponse.json({
//             status: false,
//             message: "Missing api key."
//         },
//             {
//                 status: 400
//             }
//         )
//     }

//     const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)

//     if(!res.ok){
//         return NextResponse.json({
//             status: false,
//             message: "Failed to fetch data"
//         },{
//             status: res.status
//         })
//     }
//      const data = await res.json();
    
//      return NextResponse.json({
//         success: true, 
//         city: data.name,
//         country: data.sys.country,
//         temperature: data.main.temp,
//         feelsLike: data.main.feels_like,
//         humidity: data.main.humidity,
//         weather: data.weather[0].main,
//          description: data.weather[0].description,
//          windSpeed: data.wind.speed,
//      })
   

    
// }   
// catch (error) {
//     return NextResponse.json({
//         message: error
//     },{
//         status: 500
//     })
// }
// }