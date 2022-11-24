const axios = require('axios')
const GeneralEnviorment = require('../../Entities/GeneralEnviorment')

const urlEndPoint = GeneralEnviorment.urlEndPoint

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
