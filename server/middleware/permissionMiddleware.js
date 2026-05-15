const permissionMiddleware = (...requiredPermissions) => {
  return (req, res, next) => {
    const userPermissions = req.user?.role.permissions || [];

    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );

    if (!hasPermission) {
      return res.status(403).json({
        message: "Insufficient Permissions",
      });
    }

    next();
  };
};

module.exports = permissionMiddleware;
