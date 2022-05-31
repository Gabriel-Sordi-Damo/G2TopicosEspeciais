import Geocoder from "react-native-geocoding";

//Chave específica por projeto
Geocoder.init("AIzaSyBTyWJsc67NR8R5l6lFXP9p_syfG6NY22Y")


export const searchByAddress = (endereco) => {

    return new Promise((resolve, reject) => {

        Geocoder.from(endereco)
            .then(result => {
                var location = result.results[0].geometry.location //devolve lat e lng
                console.log(location)
                resolve(location)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
    })

}

