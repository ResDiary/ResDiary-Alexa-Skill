const copy = {
    enjoyMeal: 'Hope you enjoy your meal.'
}

module.exports = {
    async canHandle(handlerInput) {
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        return (
            (
                handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
                (
                    handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent'
                ) &&
                sessionAttributes.lastSuggestedRestaurant !== ''
            )
        );
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(copy.enjoyMeal)
            .withShouldEndSession(true)
            .getResponse();
    },
};