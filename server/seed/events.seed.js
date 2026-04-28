const mongoose = require("mongoose");
const Event = require("../models/Event");
const { faker } = require("@faker-js/faker");

mongoose.connect("mongodb://localhost:27017/ticketing_db");

const categories = [
  "Sports & Travel",
  "Sports & Travel",
  "Science & Research",
  "New Years Eve",
  "Industrial Engineering",
  "Holi",
  "Health & Wellness",
  "Garbe",
  "Public Event",
];
const accessLevels = ["vip", "media", "general", "speaker", "staff"];
const statusOptions = ["active", "draft", "completed"];

const dressCodes = [
  "Formal",
  "Smart Casual",
  "Casual",
  "Black Tie",
  "Business",
];

const privilegePool = [
  "red_carpet_entry",
  "front_seating",
  "networking_lounge",
  "media_coverage_zone",
  "backstage_access",
  "press_kit",
  "vip_parking",
  "complimentary_drinks",
  "meet_and_greet",
];

const tagPool = [
  "startup",
  "award",
  "networking",
  "business",
  "tech",
  "music",
  "sports",
  "health",
  "arts",
  "education",
  "food",
  "travel",
  "fashion",
  "gaming",
  "science",
];

// ── helpers ──
const randomItems = (arr, min = 1, max = 3) => {
  const count = faker.number.int({ min, max });
  return faker.helpers.arrayElements(arr, count);
};

const generateTicketTypes = () => {
  const types = [
    {
      name: "General Admission",
      accessLevel: "general",
      price: faker.number.int({ min: 100, max: 500 }),
      quantityTotal: faker.number.int({ min: 200, max: 800 }),
      description: "Standard entry to the event.",
      privileges: ["main_hall_entry"],
      requiresApproval: false,
      color: "#C0C0C0",
    },
    {
      name: "VIP",
      accessLevel: "vip",
      price: faker.number.int({ min: 1000, max: 5000 }),
      quantityTotal: faker.number.int({ min: 50, max: 150 }),
      description: "Exclusive VIP access with premium seating.",
      privileges: randomItems(privilegePool, 2, 4),
      requiresApproval: false,
      color: "#FFD700",
    },
    {
      name: "Media Pass",
      accessLevel: "media",
      price: 0,
      quantityTotal: faker.number.int({ min: 20, max: 60 }),
      description: "For press and media personnel only.",
      privileges: ["media_coverage_zone", "press_kit"],
      requiresApproval: true,
      color: "#FF4500",
    },
  ];

  // randomly return 1–3 ticket types per event
  return faker.helpers.arrayElements(
    types,
    faker.number.int({ min: 1, max: 3 }),
  );
};

const generateZones = (ticketTypes) => {
  const usedAccessLevels = ticketTypes.map((t) => t.accessLevel);

  const allZones = [
    {
      name: "Main Hall",
      description: "Primary venue area.",
      capacity: faker.number.int({ min: 300, max: 800 }),
      allowedTicketTypes: ["general", "vip", "media"],
      currentOccupancy: 0,
    },
    {
      name: "VIP Lounge",
      description: "Exclusive area for VIP guests.",
      capacity: faker.number.int({ min: 50, max: 150 }),
      allowedTicketTypes: ["vip"],
      currentOccupancy: 0,
    },
    {
      name: "Media Zone",
      description: "Designated area for press coverage.",
      capacity: faker.number.int({ min: 20, max: 60 }),
      allowedTicketTypes: ["media", "vip"],
      currentOccupancy: 0,
    },
    {
      name: "Networking Lounge",
      description: "Post-event networking area.",
      capacity: faker.number.int({ min: 80, max: 200 }),
      allowedTicketTypes: ["vip", "speaker"],
      currentOccupancy: 0,
    },
  ];

  // only include zones relevant to the ticket types in this event
  return allZones.filter((zone) =>
    zone.allowedTicketTypes.some((a) => usedAccessLevels.includes(a)),
  );
};

const generateEvents = (count = 10000) => {
  const events = [];

  for (let i = 0; i < count; i++) {
    const ticketTypes = generateTicketTypes();
    const zones = generateZones(ticketTypes);

    const totalCapacity = ticketTypes.reduce(
      (sum, t) => sum + t.quantityTotal,
      0,
    );

    events.push({
      name: faker.company.name(),
      description: faker.lorem.sentences(2),
      category: faker.helpers.arrayElement(categories),
      date: faker.date.future(),
      startTime: faker.helpers.arrayElement([
        "09:00",
        "10:00",
        "14:00",
        "16:00",
        "18:00",
        "19:00",
      ]),
      endTime: faker.helpers.arrayElement([
        "11:00",
        "12:00",
        "16:00",
        "18:00",
        "21:00",
        "22:00",
      ]),
      location: `${faker.location.streetAddress()}, ${faker.location.city()}`,
      capacity: totalCapacity,
      price: faker.number.int({ min: 0, max: 500 }),
      image: "",
      status: faker.helpers.arrayElement(statusOptions),
      organizerName: faker.person.fullName(),
      contactNumber: faker.phone.number("##########"),
      tags: randomItems(tagPool, 2, 5),
      dressCode: faker.helpers.arrayElement(dressCodes),
      requiresApproval: faker.datatype.boolean(),
      ticketTypes,
      zones,
      createdAt: faker.date.recent({ days: 90 }),
    });
  }

  return events;
};

const seedDB = async () => {
  try {
    await Event.deleteMany();
    console.log("🗑️  Cleared existing events");

    const data = generateEvents(10000);
    await Event.insertMany(data);

    console.log("🔥 10,000 events seeded successfully");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedDB();
