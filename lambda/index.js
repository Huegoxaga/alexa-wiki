// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const questions = require('./questions');
const programlist = require('./programlist')
const programdetails = require('./programdetails')

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome, please ask me a question.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const WhatQuestionIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'WhatQuestionIntent';
    },
    handle(handlerInput) {
        const { attributesManager, requestEnvelope } = handlerInput;
        const QuestionSlot = Alexa.getSlot(requestEnvelope, 'whatQuestionBody');
        const SlotID = QuestionSlot.resolutions.resolutionsPerAuthority[0].values[0].value.id;
        const speakOutput = questions.WHAT[SlotID].A;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Any other questions?')
            .getResponse();
    }
};
const WhoQuestionIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'WhoQuestionIntent';
    },
    handle(handlerInput) {
        const { attributesManager, requestEnvelope } = handlerInput;
        const QuestionSlot = Alexa.getSlot(requestEnvelope, 'whoQuestionBody');
        const SlotID = QuestionSlot.resolutions.resolutionsPerAuthority[0].values[0].value.id;
        const speakOutput = questions.WHO[SlotID].A;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('What else do you want to know?')
            .getResponse();
    }
};
const WhenQuestionIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'WhenQuestionIntent';
    },
    handle(handlerInput) {
        const { attributesManager, requestEnvelope } = handlerInput;
        const QuestionSlot = Alexa.getSlot(requestEnvelope, 'whenQuestionBody');
        const SlotID = QuestionSlot.resolutions.resolutionsPerAuthority[0].values[0].value.id;
        const speakOutput = questions.WHEN[SlotID].A;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('What else do you want to know?')
            .getResponse();
    }
};
const WhyQuestionIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'WhyQuestionIntent';
    },
    handle(handlerInput) {
        const { attributesManager, requestEnvelope } = handlerInput;
        const QuestionSlot = Alexa.getSlot(requestEnvelope, 'whyQuestionBody');
        const SlotID = QuestionSlot.resolutions.resolutionsPerAuthority[0].values[0].value.id;
        const speakOutput = questions.WHY[SlotID].A;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('What else do you want to know?')
            .getResponse();
    }
};
const WhereQuestionIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'WhereQuestionIntent';
    },
    handle(handlerInput) {
        const { attributesManager, requestEnvelope } = handlerInput;
        const QuestionSlot = Alexa.getSlot(requestEnvelope, 'whereQuestionBody');
        const SlotID = QuestionSlot.resolutions.resolutionsPerAuthority[0].values[0].value.id;
        const speakOutput = questions.WHERE[SlotID].A;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('You can ask me another question.')
            .getResponse();
    }
};
const HowQuestionIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HowQuestionIntent';
    },
    handle(handlerInput) {
        const { attributesManager, requestEnvelope } = handlerInput;
        const QuestionSlot = Alexa.getSlot(requestEnvelope, 'howQuestionBody');
        const SlotID = QuestionSlot.resolutions.resolutionsPerAuthority[0].values[0].value.id;
        const speakOutput = questions.HOW[SlotID].A;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('What else do you want to know?')
            .getResponse();
    }
};
const ProgramListIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ProgramListIntent';
    },
    handle(handlerInput) {
        const { attributesManager, requestEnvelope } = handlerInput;
        const QuestionSlot = Alexa.getSlot(requestEnvelope, 'programKeywords');
        let keyword = QuestionSlot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        keyword = keyword.charAt(0).toUpperCase() + keyword.substring(1);
        selectedlist = programlist.filter(program => program.includes(keyword));
        let output = "We have ";
        if (selectedlist.length > 1) {
          output +=
            selectedlist.length + " prgrams related to " + keyword + ". They are";
          selectedlist.map(program => (output += " " + program + ","));
        } else if(selectedlist.length == 1){
          output +=
            selectedlist.length + " prgrams related to " + keyword + " which is";
          selectedlist.map(program => (output += " " + program + ","));
        } else {
          output = "Error";
        }

        return handlerInput.responseBuilder
            .speak(output)
            .reprompt('What else do you want to know?')
            .getResponse();
    }
};
const ProgramDetailIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ProgramDetailIntent';
    },
    handle(handlerInput) {
        const { attributesManager, requestEnvelope } = handlerInput;
        const QuestionSlot = Alexa.getSlot(requestEnvelope, 'programs');
        let keyword = QuestionSlot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        const output = "In the "+ keyword + " program, you will have the opportunity to " + programdetails[keyword].DETAILS;

        return handlerInput.responseBuilder
            .speak(output)
            .reprompt('What else do you want to know?')
            .getResponse();
    }
};
const ProgramOutcomeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ProgramOutcomeIntent';
    },
    handle(handlerInput) {
        const { attributesManager, requestEnvelope } = handlerInput;
        const QuestionSlot = Alexa.getSlot(requestEnvelope, 'programs');
        let keyword = QuestionSlot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        const output = "you will get a " + programdetails[keyword].CREDENTIAL + " after the completion of the " + keyword + " program in " + programdetails[keyword].LENGTH;

        return handlerInput.responseBuilder
            .speak(output)
            .reprompt('What else do you want to know?')
            .getResponse();
    }
};
const ProgramIntakeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ProgramIntakeIntent';
    },
    handle(handlerInput) {
        const { attributesManager, requestEnvelope } = handlerInput;
        const QuestionSlot = Alexa.getSlot(requestEnvelope, 'programs');
        let keyword = QuestionSlot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        const output = programdetails[keyword].INTAKE;

        return handlerInput.responseBuilder
            .speak(output)
            .reprompt('What else do you want to know?')
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelpIntentHandler,
        WhatQuestionIntentHandler,
        WhenQuestionIntentHandler,
        WhyQuestionIntentHandler,
        WhereQuestionIntentHandler,
        WhoQuestionIntentHandler,
        HowQuestionIntentHandler,
        ProgramListIntentHandler,
        ProgramDetailIntentHandler,
        ProgramOutcomeIntentHandler,
        ProgramIntakeIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
