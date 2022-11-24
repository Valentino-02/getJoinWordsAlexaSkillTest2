const Alexa = require('ask-sdk-core');
const JoinWordsIntent = require('../intents/JoinWordsIntent.js')

const getJoinWords = JoinWordsIntent.getJoinWords


const GetNombreCompletoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetNombreCompletoIntent';
    },
    handle(handlerInput) {
        const slots = handlerInput.requestEnvelope.request.intent.slots
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes()
        let nameType = ''
        let name = ''

        const firstName = slots['firstName'] 
        const lastName = slots['lastName']
        const secondLastName = slots['secondLastName']

        if ('value' in firstName) {
            sessionAttributes.firstName = firstName.value
            nameTypeSpeak = requestAttributes.t('Name')
            nameSpeak = firstName.value
        }
        if ('value' in lastName) {
            sessionAttributes.lastName = lastName.value
            nameTypeSpeak =  requestAttributes.t('LastName')
            nameSpeak = lastName.value
        }
        if ('value' in secondLastName) {
            sessionAttributes.secondLastName = secondLastName.value
            nameTypeSpeak =  requestAttributes.t('SecondLastName')
            nameSpeak = secondLastName.value
        }

        const speakOutput =   `${requestAttributes.t('InputResponse')} ${nameType} ${name} .`
        const repromptOutput = requestAttributes.t('GreetingRe')
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse();
    }
};


const UseServiceIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'UseServiceIntent';
    },
    async handle(handlerInput) {
        let speakOutput = ''
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes()
        let firstName = sessionAttributes.firstName
        let lastName = sessionAttributes.lastName
        let secondLastName = sessionAttributes.secondLastName

        if (firstName === '') {
            speakOutput = requestAttributes.t('AskForName')
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();      
        }

        if (lastName === '') {
            speakOutput = requestAttributes.t('AskForLastName')
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();      
        }

        let res = await getJoinWords(firstName, lastName, secondLastName)

        speakOutput = `${requestAttributes.t('YourNameIs')} ${res}.`
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
}; 


module.exports = {
    GetNombreCompletoIntentHandler,
    UseServiceIntentHandler,
}