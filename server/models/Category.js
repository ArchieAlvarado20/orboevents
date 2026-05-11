const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },

    description: String,

    icon: String, // optional (for UI)

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Category", categorySchema);
