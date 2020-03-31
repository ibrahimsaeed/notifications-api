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