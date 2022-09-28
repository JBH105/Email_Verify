const default_fields = {
  active: { type: Number, default: 1 },
  fixed: { type: Number, default: 0 },
  removed: { type: Number, default: 0 },
  create_at: { type: Date, default: Date.now },
  create_by: String,
  create_role: String,
  update_log: Object,
};
module.exports = default_fields;
