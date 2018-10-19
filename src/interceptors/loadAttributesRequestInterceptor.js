module.exports = {
    async process(handlerInput) {
        const persistentAttributes = await handlerInput.attributesManager.getPersistentAttributes();
        const sessionAttributes = await handlerInput.attributesManager.getSessionAttributes();

        // Check if user is invoking the skill the first time and initialize preset values
        if (Object.keys(persistentAttributes).length === 0) {
            handlerInput.attributesManager.setPersistentAttributes({
                state                  : 'INIT'
            });
        }
        if (Object.keys(sessionAttributes).length === 0) {
            handlerInput.attributesManager.setSessionAttributes({
                alreadySuggestedCuisines            : [],
                alreadySuggestedRestaurants         : [],
                lastSuggestedCuisine                : '',
                lastSuggestedRestaurant             : ''
            });
        }
    },
}