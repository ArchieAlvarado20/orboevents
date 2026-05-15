const adminMiddleware = async (req, res, next) => {
  try {
    const allowedRoles = ["super", "admin"];

    if (!req.user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    if (!allowedRoles.includes(req.user.role?.accessLevel)) {
      return res.status(403).json({
        message: "Admin only",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = adminMiddleware;
