const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
      type: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      duration: {
        type: Number
      },
      weight: {
        type: Number
      },
      sets: {
        type: Number
      },
      reps: {
        type: Number
      },
      distance: {
        type: Number
      }

      
    }
  ]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;