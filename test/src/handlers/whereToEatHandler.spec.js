let chai = require('chai');
chai.use(require('chai-string'));

let should = chai.should();
let assert = chai.assert;

describe("WhereToEatHandler", function() {
    // pre-requisites
    before(() => {
        return new Promise((resolve, reject) => {
            const event = require('../requests/whereToEatRequest.json');
            let lambda = require('../../../src/index');
            lambda.handler(event, null, (error, result) => {
                // console.log('******* RESPONSE *********');
                // console.log(JSON.stringify(result, null, 2));
                // console.log('**************************');
                response = result;
                resolve();
            });
        });
    });

    it('responds with valid response structure ',  () => {

        response.should.have.property("version");
        response.version.should.equal("1.0");
    }),

    it('responds with output speech ', () => {

        response.should.have.property("response");
        let r = response.response;

        r.should.have.property("outputSpeech");
        r.outputSpeech.should.have.property("type");
        r.outputSpeech.type.should.equal('SSML');
        r.outputSpeech.should.have.property("ssml");
        r.outputSpeech.ssml.should.startWith('<speak>');
        r.outputSpeech.ssml.should.endWith('</speak>');

    }),

    it('keeps the session open',  () => {

        let r = response.response;
        r.should.have.property("shouldEndSession");
        r.shouldEndSession.should.be.false;
    });
});

describe("WhereToEatHandlerNoIntent", function() {
    // pre-requisites
    before(() => {
        return new Promise((resolve, reject) => {
            const event = require('../requests/whereToEatNoIntentRequest.json');
            let lambda = require('../../../src/index');
            lambda.handler(event, null, (error, result) => {
                // console.log('******* RESPONSE *********');
                // console.log(JSON.stringify(result, null, 2));
                // console.log('**************************');
                response = result;
                resolve();
            });
        });
    });

    it('responds with valid response structure ',  () => {

        response.should.have.property("version");
        response.version.should.equal("1.0");
    }),

    it('responds with output speech ', () => {

        response.should.have.property("response");
        let r = response.response;

        r.should.have.property("outputSpeech");
        r.outputSpeech.should.have.property("type");
        r.outputSpeech.type.should.equal('SSML');
        r.outputSpeech.should.have.property("ssml");
        r.outputSpeech.ssml.should.startWith('<speak>');
        r.outputSpeech.ssml.should.endWith('</speak>');

    }),

    it('keeps the session open',  () => {

        let r = response.response;
        r.should.have.property("shouldEndSession");
        r.shouldEndSession.should.be.false;
    });
});

describe("WhereToEatAllCuisinesTriedHandler", function() {
    // pre-requisites
    before(() => {
        return new Promise((resolve, reject) => {
            const event = require('../requests/whereToEatAllTriedRequest.json');
            let lambda = require('../../../src/index');
            lambda.handler(event, null, (error, result) => {
                // console.log('******* RESPONSE *********');
                // console.log(JSON.stringify(result, null, 2));
                // console.log('**************************');
                response = result;
                resolve();
            });
        });
    });

    it('responds with valid response structure ',  () => {

        response.should.have.property("version");
        response.version.should.equal("1.0");
    }),

    it('responds with output speech ', () => {

        response.should.have.property("response");
        let r = response.response;

        r.should.have.property("outputSpeech");
        r.outputSpeech.should.have.property("type");
        r.outputSpeech.type.should.equal('SSML');
        r.outputSpeech.should.have.property("ssml");
        r.outputSpeech.ssml.should.startWith('<speak>');
        r.outputSpeech.ssml.should.endWith('</speak>');

    }),

    it('ends the session',  () => {

        let r = response.response;
        r.should.have.property("shouldEndSession");
        r.shouldEndSession.should.be.true;
    });
});