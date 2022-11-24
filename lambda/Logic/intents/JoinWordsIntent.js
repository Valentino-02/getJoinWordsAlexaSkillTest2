const axios = require('axios')

const urlEndPoint = 'http://209.105.239.29:9797/ApiConcatena/Concatenar/Concatena'

const getJoinWords = async (firstName, lastName, secondLastName) => {
    let reqObject = {
        "Nombre": firstName,
        "Apellido1": lastName,
        "Apellido2": secondLastName, 
    }
    let res = await axios.post(urlEndPoint, reqObject)
    if (res.status !== 200) {return 'error en el servicio'}
    return res.data
}

exports.getJoinWords = getJoinWords
