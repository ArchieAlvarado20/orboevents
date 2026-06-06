const Event = require("../models/Event");

const getEvents = async (req, res) => {
  try {
    const { category, search, page = 1, status, tags, location } = req.query;

    const limit = 12;
    const skip = (page - 1) * limit;

    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (location) filter.location = { $regex: location, $options: "i" };
    if (tags) filter.tags = { $in: tags.split(",") }; // ?tags=startup,award
    if (status) {
      filter.status = status;
    } else {
      filter.status = { $ne: "cancelled" };
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { organizerName: { $regex: search, $options: "i" } },
      ];
    }

    const events = await Event.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Event.countDocuments(filter);

    res.json({
      events,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("ticketTypes");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    console.error("GET EVENT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const foundEvent = await Event.findById(req.params.id);

    if (!foundEvent) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    foundEvent.status = "cancelled";
    await foundEvent.save();

    res.status(200).json({
      message: "Event cancelled successfully",
      event: foundEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = { getEvents, getEventById, deleteEvent };
