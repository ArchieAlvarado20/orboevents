const Event = require("../models/Event");
const Category = require("../models/Category");
const Reservation = require("../models/Reservation");

const getDashboardOverview = async (req, res) => {
  try {
    // =========================
    // DATE SETUP
    // =========================
    const now = new Date();

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // =========================
    // EVENT COUNTS
    // =========================
    const [
      totalEvents,
      publishedEvents,
      pendingEvents,
      cancelledEvents,
      completedEvents,
      monthlyEvents,
      upcomingEvents,
    ] = await Promise.all([
      Event.countDocuments(),

      Event.countDocuments({
        status: "published",
      }),

      Event.countDocuments({
        status: "pending",
      }),

      Event.countDocuments({
        status: "cancelled",
      }),

      Event.countDocuments({
        status: "completed",
      }),

      Event.countDocuments({
        createdAt: {
          $gte: startOfMonth,
        },
      }),

      Event.countDocuments({
        startDate: {
          $gte: now,
        },
      }),
    ]);

    // =========================
    // MONTHLY EVENT GROWTH
    // =========================
    const eventGrowth = await Event.aggregate([
      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
          },

          total: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    // =========================
    // CATEGORY ANALYTICS
    // =========================
    const categoryStats = await Event.aggregate([
      {
        $group: {
          _id: "$category",

          totalEvents: {
            $sum: 1,
          },
        },
      },

      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "category",
        },
      },

      {
        $unwind: "$category",
      },

      {
        $project: {
          _id: 1,
          totalEvents: 1,
          name: "$category.name",
        },
      },

      {
        $sort: {
          totalEvents: -1,
        },
      },
    ]);

    // =========================
    // RECENT EVENTS
    // =========================
    const recentEvents = await Event.find()
      .sort({
        createdAt: -1,
      })
      .limit(5)
      .populate("category")
      .populate("eventType");

    // =========================
    // UPCOMING EVENTS
    // =========================
    const upcomingEventList = await Event.find({
      startDate: {
        $gte: now,
      },
    })
      .sort({
        startDate: 1,
      })
      .limit(5)
      .populate("category");

    // =========================
    // RESPONSE
    // =========================
    res.status(200).json({
      overview: {
        totalEvents,
        publishedEvents,
        pendingEvents,
        cancelledEvents,
        completedEvents,
        monthlyEvents,
        upcomingEvents,
      },

      charts: {
        eventGrowth,
      },

      categoryStats,

      recentEvents,

      upcomingEventList,
    });
  } catch (err) {
    console.error("EVENT DASHBOARD ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

const getReservationDashboard = async (req, res) => {
  try {
    // =========================
    // DATE SETUP
    // =========================
    const now = new Date();

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // =========================
    // OVERVIEW COUNTS
    // =========================
    const [
      totalReservations,
      pendingReservations,
      confirmedReservations,
      cancelledReservations,
      expiredReservations,
      failedReservations,
      monthlyReservations,
    ] = await Promise.all([
      Reservation.countDocuments(),

      Reservation.countDocuments({
        status: "pending",
      }),

      Reservation.countDocuments({
        status: "confirmed",
      }),

      Reservation.countDocuments({
        status: "cancelled",
      }),

      Reservation.countDocuments({
        status: "expired",
      }),

      Reservation.countDocuments({
        status: "failed",
      }),

      Reservation.countDocuments({
        createdAt: {
          $gte: startOfMonth,
        },
      }),
    ]);

    // =========================
    // MONTHLY RESERVATION GROWTH
    // =========================
    const reservationGrowth = await Reservation.aggregate([
      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
          },

          total: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    // =========================
    // STATUS ANALYTICS
    // =========================
    const reservationStatusStats = await Reservation.aggregate([
      {
        $group: {
          _id: "$status",

          total: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          total: -1,
        },
      },
    ]);

    // =========================
    // TOP EVENTS BY RESERVATIONS
    // =========================
    const topEvents = await Reservation.aggregate([
      {
        $group: {
          _id: "$eventId",

          totalReservations: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          totalReservations: -1,
        },
      },

      {
        $limit: 5,
      },

      {
        $lookup: {
          from: "events",
          localField: "_id",
          foreignField: "_id",
          as: "event",
        },
      },

      {
        $unwind: "$event",
      },

      {
        $project: {
          _id: 1,
          totalReservations: 1,
          eventName: "$event.name",
          image: "$event.image",
          status: "$event.status",
        },
      },
    ]);

    // =========================
    // RECENT RESERVATIONS
    // =========================
    const recentReservations = await Reservation.find()
      .sort({
        createdAt: -1,
      })
      .limit(10)
      .populate("eventId")
      .populate("userId");

    // =========================
    // RESPONSE
    // =========================
    res.status(200).json({
      overview: {
        totalReservations,
        pendingReservations,
        confirmedReservations,
        cancelledReservations,
        expiredReservations,
        failedReservations,
        monthlyReservations,
      },

      charts: {
        reservationGrowth,
      },

      reservationStatusStats,

      topEvents,

      recentReservations,
    });
  } catch (err) {
    console.error("RESERVATION DASHBOARD ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getDashboardOverview,
  getReservationDashboard,
};
