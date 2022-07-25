# About

This application is developed to save credit card details and get all credit card details.
Application is developed and tested on `node v16.14.2`.

## Installation

Clone this repo and run following commands for installation.
```
cd credit_card
```
```
npm install
```

## Usage

* Use following commands to run application.
```
npm run start
```
* Import postman collection(`credit_card.postman_collection`) and run APIs in it.

* To save credit card details, use below `POST` request.
```
localhost:3000/cards/add
```

* To get current SCAMscore and check Trend for the given domain, use below `GET` request.
```
localhost:3000/cards/getall
```


