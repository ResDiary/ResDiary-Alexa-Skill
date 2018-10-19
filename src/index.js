'use strict'

// Include the Alexa Library.
const Alexa = require('ask-sdk');

// handlers
const launchRequestHandler             = require('./handlers/launchRequestHandler');
const helpHandler                      = require('./handlers/helpHandler');
const unhandledHandler                 = require('./handlers/unhandledHandler');
const whereToEatHandler                = require('./handlers/whereToEatHandler');
const restaurantSuggestionHandler      = require('./handlers/restaurantSuggestionHandler');
const endHandler                       = require('./handlers/endHandler');

// interceptors
const loadAttributesRequestInterceptor = require('./interceptors/loadAttributesRequestInterceptor');
const savePersistentAttributesResponseInterceptor = require('./interceptors/savePersistentAttributesResponseInterceptor');

const skillBuilder = Alexa.SkillBuilders.standard();
exports.handler = skillBuilder
        .addRequestHandlers(
            launchRequestHandler,
            helpHandler,
            whereToEatHandler,
            restaurantSuggestionHandler,
            endHandler
        )
        .addRequestInterceptors(loadAttributesRequestInterceptor)
        .addResponseInterceptors(savePersistentAttributesResponseInterceptor)
        .addErrorHandlers(unhandledHandler)
        .withAutoCreateTable(true)
        .withTableName(process.env.DYNAMO_TABLE_NAME)
        .lambda();