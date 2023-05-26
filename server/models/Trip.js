// Trip.js

const { Schema, model } = require('mongoose');

const tripSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    activityType: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availableSlots: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Trip = model('Trip', tripSchema);

module.exports = Trip;
