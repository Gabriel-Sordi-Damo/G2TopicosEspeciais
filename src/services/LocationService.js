import Geocoder from "react-native-geocoding";

//Chave específica por projeto
Geocoder.init("AIzaSyCFk6wJ332LlmOHGdLHRaWEONNyFzFhH-Y")


export const searchByAddress = (endereco) => {

    return new Promise((resolve, reject) => {

        Geocoder.from(endereco)
            .then(result => {
                var location = result.results[0].geometry.location //devolve lat e lng
                //console.log(location)
                resolve(location)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
    })

}

