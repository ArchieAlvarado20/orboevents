const Event = require("../models/Event");
const EventType = require("../models/EventType");
const Slot = require("../models/Slot");
const uploadImage = require("../utils/uploadImage");

// ==============================
// CREATE EVENT
// ==============================
const createEvent = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      imageUrl = await uploadImage(req.file);
    }

    const event = await Event.create({
      ...req.body,

      organizer: req.body.organizer ? JSON.parse(req.body.organizer) : {},

      tags: req.body.tags ? JSON.parse(req.body.tags) : [],

      image: imageUrl,
      createdBy: req.user?._id || null,
    });

    return res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
// ==============================
// GET ALL EVENTS
// ==============================
const getEvents = async (req, res) => {
  try {
    const {
      category,
      eventType,
      search,
      page = 1,
      status,
      tags,
      location,
    } = req.query;

    const limit = 12;
    const skip = (page - 1) * limit;

    const filter = {};

    // CATEGORY FILTER
    if (category) {
      filter.category = category;
    }

    // EVENT TYPE FILTER
    if (eventType) {
      filter.eventType = eventType;
    }

    // STATUS FILTER
    filter.status = {
      $nin: ["cancelled", "pending"],
    };

    // LOCATION FILTER
    if (location) {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }

    // TAGS FILTER
    if (tags) {
      filter.tags = {
        $in: tags.split(","),
      };
    }

    // SEARCH
    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
        {
          "organizer.name": {
            $regex: search,
            $options: "i",
          },
        },
        {
          venue: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const events = await Event.find(filter)
      .populate("category")
      .populate("eventType")
      .populate("ticketTypes")
      // .populate("slot")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Event.countDocuments(filter);

    res.status(200).json({
      events,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (err) {
    console.error("GET EVENTS ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

const getAdminEvents = async (req, res) => {
  try {
    const {
      category,
      eventType,
      search,
      page = 1,
      status,
      tags,
      location,
    } = req.query;

    const limit = 12;
    const skip = (page - 1) * limit;

    const filter = {};

    // CATEGORY FILTER
    if (category) {
      filter.category = category;
    }

    // EVENT TYPE FILTER
    if (eventType) {
      filter.eventType = eventType;
    }

    // STATUS FILTER
    filter.status = { $ne: "cancelled" };
    // LOCATION FILTER
    if (location) {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }

    // TAGS FILTER
    if (tags) {
      filter.tags = {
        $in: tags.split(","),
      };
    }

    // SEARCH
    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
        {
          "organizer.name": {
            $regex: search,
            $options: "i",
          },
        },
        {
          venue: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const events = await Event.find(filter)
      .populate("category")
      .populate("eventType")
      .populate("ticketTypes")
      // .populate("slot")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Event.countDocuments(filter);

    res.status(200).json({
      events,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (err) {
    console.error("GET EVENTS ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// ==============================
// GET SINGLE EVENT
// ==============================
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing event id" });
    }

    const event = await Event.findById(id)
      .populate("category")
      .populate("eventType");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.json(event);
  } catch (err) {
    console.error("GET EVENT ERROR:", err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

// ==============================
// UPDATE EVENT
// ==============================
const updateEvent = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      imageUrl = await uploadImage(req.file);
    }

    const updateData = {
      ...req.body,
    };

    // replace image only if uploaded
    if (imageUrl) {
      updateData.image = imageUrl;
    }

    const event = await Event.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.status(200).json({
      message: "Event updated successfully",
      event,
    });
  } catch (err) {
    console.error("UPDATE EVENT ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// ==============================
// DELETE EVENT (SOFT DELETE)
// ==============================
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    event.status = "cancelled";

    await event.save();

    res.status(200).json({
      message: "Event cancelled successfully",
      event,
    });
  } catch (err) {
    console.error("DELETE EVENT ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

const approveEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const approved = await Event.findByIdAndUpdate(
      id,
      {
        status: "published",

        approvedBy: req.user._id,
        approvedAt: new Date(),
      },
      { new: true },
    );

    if (!approved) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json({
      message: "Event approved successfully",
      event: approved,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  approveEvent,
  getAdminEvents,
};
