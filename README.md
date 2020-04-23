# Mohawk Facts Alexa Skill

This repo is about an Alexa skill called Mohawk facts. It can answer various questions about Mohawk college.

## Types of Intents

- This skill has the following intents:
  - General question type:
    - `WhatQuestionIntent` - Any question starts with `What`.
    - `WhereQuestionIntent` - Any question starts with `Where`.
    - `HowQuestionIntent` - Any question starts with `How`.
    - `WhenQuestionIntent` - Any question starts with `When`.
    - `WhoQuestionIntent` - Any question starts with `Who`.
    - `WhyQuestionIntent` - Any question starts with `Why`.
  - Program related question type:
    - `ProgramListIntent` - Return a list of programs contains a certain keyword.
    - `ProgramDetailIntent` - Return a detailed explanation about a certain program.
    - `ProgramOutcomeIntent` - Explain the program outcome.
    - `ProgramIntakeIntent` - State the program intake time.

## File Structure

- `interactionMode` folder
  - `en-CA.json` the exported skill model in `en-CA` language.
- `lambda` folder
  - `index.js` is the entry point of the skill logic.
  - `package.json` stores the skill version, settings, and dependency info.
  - `util.js` utility functions including S3 connection method.
  - `programlist.js` stores the entire list of program names.
  - `programdetails.js` stores the `DETAILS`, `CREDENTIAL`, `LENGTH`, `INTAKE` info of all programs with the program names as key values.
  - `quesitons.js` stores the full list of questions and answers with an designated code as key values.
- `skill.json` the skill setting file.

## Running the Skill

- There are two ways to running the skill, see related docs for more details.
  - Create a skill with `Alexa Skills Kit Developer Console - Alexa-Hosted` and import the files.
  - Clone and deploy the repo with Alexa Skills Kit CLI.

## Adding Data to the Skill

- For general question intents:
  1. In the backend code, add questions and answers in the `questions.js` with an unique question code as its key value.
  2. In the skill model, add the question code and the question body to the corresponding quesiton body slot.
- For program related questions:
  1. Add the program to the `programlist.js`
  2. Add the program details in the `programdetails.js`
  3. In the skill model, add the keywords of the newly added program in the `ProgramKeywords` slot.
  4. Add the new program in the `ProgramNames` slot in skill model.
