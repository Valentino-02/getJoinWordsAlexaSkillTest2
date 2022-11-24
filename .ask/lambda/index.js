const Alexa = require('ask-sdk-core');
const handlers = require('./Logic/handlers/handlers')
const amazonHandlers = require('./Logic/handlers/amazonHandlers')
const interceptors = require('./Logic/interceptors/interceptors')


exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        handlers.GetNombreCompletoIntentHandler,
        handlers.UseServiceIntentHandler,
        amazonHandlers.LaunchRequestHandler,
        amazonHandlers.HelpIntentHandler,
        amazonHandlers.CancelAndStopIntentHandler,
        amazonHandlers.SessionEndedRequestHandler,
        amazonHandlers.IntentReflectorHandler, 
        ) 
    .addRequestInterceptors(
        interceptors.LocalizationInterceptor
    )
    .addErrorHandlers(
        amazonHandlers.ErrorHandler,
        )
    .lambda();
