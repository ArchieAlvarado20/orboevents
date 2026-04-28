const Event = require("../models/Event");

const getEvents = async (req, res) => {
  try {
    const { category, search, page = 1, status, tags, location } = req.query;

    const limit = 6;
    const skip = (page - 1) * limit;

    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (location) filter.location = { $regex: location, $options: "i" };
    if (tags) filter.tags = { $in: tags.split(",") }; // ?tags=startup,award

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

module.exports = { getEvents };
