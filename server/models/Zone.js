const zoneSchema = new mongoose.Schema({
  name: String, // "Red Carpet Area", "Main Hall", "Networking Lounge"
  description: String,
  capacity: Number,

  // ✦ NEW — which ticket types can enter this zone
  allowedTicketTypes: [String], // e.g. ["vip", "media"]
  currentOccupancy: { type: Number, default: 0 },
});
