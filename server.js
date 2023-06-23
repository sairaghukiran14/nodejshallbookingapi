const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());

const allrooms = [
  {
    room_id: "R1234",
    roomname: "ONIT",
    seats_available: 30,
    amenities: ["Plasma Television", "AirConditioner", "Playarea", "Internet"],
    price_perhour: 1900,

    room_bookingdetails: [
      {
        booking_status: "complete",
        cust_name: "John",
        date_booked: new Date("2023-10-01"),
        start_time: "11.15",
        end_time: "14.15",
      },
    ],
  },
  {
    room_id: "R1235",
    roomname: "ONIT2",
    seats_available: 35,
    amenities: ["Projector", "Refrigirator", "Internet", "Pool"],
    price_perhour: 4321,

    room_bookingdetails: [
      {
        booking_status: "complete",
        cust_name: "cat",
        date_booked: new Date("2023-12-01"),
        start_time: "10:20",
        end_time: "11:20",
      },
    ],
  },
];
app.get("/", () => {
  res.send("Welcome to hallapi server");
});
app.post("/createroom", function (req, res) {
  let newroom = {
    room_id: "R" + req.body.room_id,
    room_name: req.body.room_name,
    seats_available: req.body.seats_available,
    amenities: req.body.amenities,
    price_perhour: req.body.price_perhour,
  };
  allrooms.push(newroom);
  res.json(newroom);
});

app.post("/booktheroom", function (req, res) {
  let room_bookingdetails = {
    room_id: req.body.room_id,
    cust_name: req.body.customer_name,
    date_booked: req.body.date,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    booking_status: "Booking complete",
  };
  for (let index in allrooms) {
    if (allrooms[index].room_id == room_bookingdetails.room_id) {
      allrooms[index].room_bookingdetails.forEach((room) => {
        if (
          room.date_booked === room_bookingdetails.date ||
          (room.start_time === room_bookingdetails.start_time &&
            room.end_time === room_bookingdetails.end_time)
        ) {
          res.status(400).send("Please book another slot");
        } else {
          allrooms[index].room_bookingdetails.push(room_bookingdetails);
          res.status(200).send(allrooms);
        }
      });
    } else {
      res.status(400).send("Something is wrong ,check your details");
    }
  }
});

app.get("/allrooms", (req, res) => {
  let listingrooms = [];
  for (let index in allrooms) {
    allrooms[index].room_bookingdetails.forEach((e) => {
      let rooms = {
        room_name: rooms[index].room_name,
        booked_status: e.booking_status,
        bookedBy: e.cust_name,
        date: e.date_booked,
        start_time: e.start_time,
        end_time: e.end_time,
      };
      listingrooms.push(rooms);
    });
  }
  res.send(listingrooms);
});

app.get("/allcustomers", (req, res) => {
  let Listcustomers = [];
  for (let index in allrooms) {
    allrooms[index].room_bookingdetails.forEach((booking) => {
      let customers = {
        cust_name: booking.cust_name,
        room_name: rooms[index].room_name,
        date: booking.date,
        start_time: booking.start_time,
        end_time: booking.end_time,
      };
      Listcustomers.push(customers);
    });
  }
  res.send(Listcustomers);
});

app.listen(3838, () => {
  console.log("Listening to port no 3838");
});
