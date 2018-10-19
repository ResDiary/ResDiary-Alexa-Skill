
const copy = {
    message: 'You can ask me to help you choose where to eat by saying "Alexa, ask <phoneme alphabet="ipa" ph="resˈdaɪəri">ResDiary</phoneme> where to get food". From there, just answer with yes or no responses to my suggestions. What would you like me to do?',
    reprompt: 'What would you like me to do?'
};

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(copy.message + ' <break time=\"1s\"/> ' + copy.reprompt)
            .reprompt(copy.reprompt)
            .getResponse();
    },
};