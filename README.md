# Notifications-Api
Main Cylcle : Request to send notification → saving to database → push to queue on message broker →  push notifications to customers .

## Installation
clone the repo then run `docker-compose up` 

## Run Tests
run `docker-compose exec app npm test`

## Available APIs
- `GET    /notifications`
- `POST   /notifications/send`

Send Notification To Specific User
```json
{
    "type": "sms",
    "message": "Welcome!",
    "users": [
          {
            "id": "1",
            "name":"testUser",
            "email":"pla@pla.pla",
            "phoneNumber": "1234567890",
            "langauge":"en"
          }
        ]
}
```
Send Notification To Group Of Users
```json
{
    "type": "push",
    "message": "Be Prepared .. Your drop-off station is coming",
    "users": [
          {
            "id": "1",
            "name":"testUser",
            "email":"pla@pla.pla",
            "phoneNumber": "1234567890",
            "langauge":"en"
          },
          {
            "id": "1",
            "name":"testUser",
            "email":"pla@pla.pla",
            "phoneNumber": "1234567890",
            "langauge":"en"
          },
          {
            "id": "1",
            "name":"testUser",
            "email":"pla@pla.pla",
            "phoneNumber": "1234567890",
            "langauge":"en"
          },
        ]
}
```

## Notes
by starting this service it will listen to RabbitMQ and consume queued notifications , 
on send notification it will notify you with pushed notification to queue , 
and re-listen to queued notifications and back with it to you again . 

one last thing , sometimes in first start .. node container exit with code 1 due to waiting rabbitMQ and Mongo containers to start, i think it is need to handled better ,
Run `docker-compose ps` to check node container status , 
Hit `docker-compose up` to start ,
to Close Hit `docker-compose down` . 
