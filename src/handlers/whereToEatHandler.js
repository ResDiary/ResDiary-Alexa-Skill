const copy = {
    noMoreCusines: 'Sorry, I have no more suggestions.',
    // TODO: get these from the RD API, but for this prototype they're just hardcoded
    allCuisines: [
        'Indian',
        'Pizza',
        'Burgers'
    ],
    possibleReplies: [
        'Would you like ::cuisine::?',
        'Fancy ::cuisine::?',
        'How about ::cuisine::?',
        'Do you feel like ::cuisine::?'
    ]
}

module.exports = {
    async canHandle(handlerInput) {
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        return (
            (
                handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
                (
                    handlerInput.requestEnvelope.request.intent.name === 'WhereToEat'
                )
            ) ||
            (
                handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
                (
                    handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent'
                ) &&
                sessionAttributes.lastSuggestedCuisine !== '' &&
                !sessionAttributes.lastSuggestedRestaurant
            )
        );
    },
    handle(handlerInput) {
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(),
            // removes already suggested cuisines from array
            cuisines = copy.allCuisines.filter((el) => !sessionAttributes.alreadySuggestedCuisines.includes(el));

        if (cuisines.length === 0) {
            // no more cuisines to suggest, error out
            return handlerInput.responseBuilder
                .speak(copy.noMoreCusines)
                .withShouldEndSession(true)
                .getResponse();
        }

        // found a cuisine
        let randomCuisine = cuisines[Math.floor(Math.random() * cuisines.length)],
            randomReply = copy.possibleReplies[Math.floor(Math.random() * copy.possibleReplies.length)],
            message = randomReply.replace("::cuisine::", randomCuisine);

        // saves suggestion to session storage
        sessionAttributes.lastSuggestedRestaurant = ''; // set to empty string so restaurantSuggestion isn't triggered with a "no" response
        sessionAttributes.alreadySuggestedRestaurants = [];
        sessionAttributes.lastSuggestedCuisine = randomCuisine;
        sessionAttributes.alreadySuggestedCuisines.push(randomCuisine);

        // respond asking if the user is interested
        return handlerInput.responseBuilder
            .speak(message)
            .reprompt(message)
            .getResponse();
    },
};