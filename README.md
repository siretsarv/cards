## Installation

```bash
# Install npm packages
$ npm install

# Migarate database
$ sequelize db:migrate
```

## Running the app

```bash
# development
$ npm run docker:dev
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Working with the app

#### Create deck

POST /deck/create

Request:

| Parameter   | Datatype                   | Description                              |
| ----------- | ---------------------------| ---------------------------------------- |
| `type`      | string                     | Deck types (FULL, SHORT)                 |
| `shuffled`  | boolean                    | Deck shuffled or not                     |

Response:

| Parameter   | Datatype                   | Description                              |
| ----------- | ---------------------------| ---------------------------------------- |
| `deckId`    | UUID                       | Possible values (FULL, SHORT) show       |
| `type`      | string                     | Deck types (FULL, SHORT)                 |
| `shuffled`  | boolean                    | Deck shuffled or not                     |
| `remaining` | integer                    | Total cards remaining in deck            |



#### Open a deck

GET /deck/{deckId}

Response:

| Parameter   | Datatype                   | Description                              |
| ----------- | ---------------------------| ---------------------------------------- |
| `deckId`    | UUID                       | Possible values (FULL, SHORT) show       |
| `type`      | string                     | Deck types (FULL, SHORT)                 |
| `shuffled`  | boolean                    | Deck shuffled or not                     |
| `remaining` | integer                    | Total cards remaining in deck            |
| `cards    ` | card object                | All the remaining cards                  |


#### Draw a card

GET /deck/{deckId}

Request:

| Parameter   | Datatype                   | Description                              |
| ----------- | ---------------------------| ---------------------------------------- |
| `draw`      | integer                    | Number how many cards to draw from deck  |

Response:

| Parameter   | Datatype                   | Description                              |
| ----------- | ---------------------------| ---------------------------------------- |
| `cards    ` | card object                | All drawn cards                          |
