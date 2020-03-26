const request = require("supertest")
const app = require("../../app");
const notificationsRoutes = require('../routes/notification')
app.use('/notifications', notificationsRoutes)

//Send Noticiation to Specific User
describe("Send Noticiation to Specific User", () => {
  it("should create a new Notifications", async done => {
    const res = await request(app)
      .post("/notifications/send")
      .send({
        type: "sms",
        message: "Welcome!",
        users: [
          {
            id: "1",
            name:"testUser",
            email:"pla@pla.pla",
            phoneNumber: "1234567890",
            langauge:"en"
          }
        ]
      });
    expect(res.statusCode).toEqual(201);
    done();
  });
});

//Send Noticiation to Group of Users
describe("Send Noticiation to Group of Users", () => {
  it("should create a new Notifications for group of users", async done => {
    const res = await request(app)
      .post("/notifications/send")
      .send({
        type: "push",  
        message: "Be Prepared .. Your drop-off station is coming",
        users: [
          {
            id: "1",
            name:"testUser",
            email:"pla@pla.pla",
            phoneNumber: "1234567890",
            langauge:"en"
          },
          {
            id: "1",
            name:"testUser",
            email:"pla@pla.pla",
            phoneNumber: "1234567890",
            langauge:"en"
          },
          {
            id: "1",
            name:"testUser",
            email:"pla@pla.pla",
            phoneNumber: "1234567890",
            langauge:"en"
          }
        ]
      });
    expect(res.statusCode).toEqual(201);
    done();
  });
});

//Get All Notifications
describe("Get Notifications", () => {
    it("should get all Notifications", async done => {
      const res = await request(app)
        .get("/notifications") 
      expect(res.statusCode).toEqual(200);
      done();
    });
  });