const copy = {
    noMoreRestaurants: 'Sorry, I have no more suggestions.',
    // TODO: get these from the RD API, but for this prototype they're just hardcoded
    nearbyRestaurants: {
        'Indian': [
            'Chaakoo'
        ],
        'Pizza': [
            'Mozza',
            'Pizza Punks'
        ],
        'Burgers': [
            'Handmade Burger Company'
        ]
    },
    possibleReplies: [
        'Why not go to ::restaurant::?',
        'I hear ::restaurant:: is nice.',
        'Want to try ::restaurant::?'
    ]
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
                sessionAttributes.state === 'CUISINESUGGESTION'
            ) ||
            (
                handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
                (
                    handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent'
                ) &&
                sessionAttributes.state === 'RESTAURANTSUGGESTION'
            )
        );
    },
    handle(handlerInput) {
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(),
            // removes already suggested cuisines from array
            restaurants = copy.nearbyRestaurants[sessionAttributes.lastSuggestedCuisine].filter((el) => !sessionAttributes.alreadySuggestedRestaurants.includes(el));

        if (restaurants.length === 0) {
            // no more cuisines to suggest, error out
            return handlerInput.responseBuilder
                .speak(copy.noMoreRestaurants)
                .withShouldEndSession(true)
                .getResponse();
        }

        // found a restaurant
        let randomRestaurant = restaurants[Math.floor(Math.random() * restaurants.length)],
            randomReply = copy.possibleReplies[Math.floor(Math.random() * copy.possibleReplies.length)],
            message = randomReply.replace("::restaurant::", randomRestaurant);

        // saves suggestion to session storage
        sessionAttributes.lastSuggestedRestaurant = randomRestaurant;
        sessionAttributes.alreadySuggestedRestaurants.push(randomRestaurant);
        sessionAttributes.state = 'RESTAURANTSUGGESTION';

        // respond asking if the user is interested
        return handlerInput.responseBuilder
            .speak(message)
            .reprompt(message)
            .getResponse();
    },
};