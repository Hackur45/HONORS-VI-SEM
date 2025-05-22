const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");
const User = require("../models/User");
require("dotenv").config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}, 10000);

beforeEach(async () => {
  await User.deleteMany({ email: "jestuser@example.com" });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth API Tests", () => {
  it("should send OTP email for registration", async () => {
    const res = await request(app).post("/api/register").send({
      email: "jestuser@example.com",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Verification email sent");
  }, 10000);
});
