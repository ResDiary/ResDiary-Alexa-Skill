
const copy = {
    welcomeMessage: 'Welcome to <phoneme alphabet="ipa" ph="resˈdaɪəri">ResDiary</phoneme>. What would you like to do?',
    welcomeReprompt: 'I can help you decide where to eat. Say "help" for other options. What would you like to do?'
};

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    async handle(handlerInput) {
        let attributes = await handlerInput.attributesManager.getPersistentAttributes();

        return handlerInput.responseBuilder
            .speak(copy.welcomeMessage)
            .reprompt(copy.welcomeReprompt)
            .getResponse();
    }
};