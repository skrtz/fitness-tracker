const db = require("../models");

module.exports = function (app) {
    //Get last workout -- grab all workouts  
    app.get("/api/workouts", (req, res) => {
        db.Workout.aggregate([{
          $addFields: {
            totalDuration: {
              $sum: '$exercises.duration'
            }
          }
        }]).then(data => res.json(data))
            .catch(error => {
                console.log("error", error)
                res.json(error);
            })
    });

    //Add an exercise -- grab id from req, and update with req.body, 
    app.put("/api/workouts/:id", (req, res) => {
        db.Workout.findByIdAndUpdate(
            req.params.id,
            {$push: {exercises: req.body}},
            {new: true}
        ).then(data => res.json(data))
            .catch(error => {
                console.log("error", error)
                res.json(error);
            })
    });

    //Post a workout
    app.post("/api/workouts", (req, res) => {
        db.Workout.create({}).then(data => res.json(data))
            .catch(error => {
                console.log("error", error);
                res.json(error);
            })
    });

    //Get workouts in range -- find all workout data
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.aggregate([{
          $addFields: {
            totalDuration: {
              $sum: '$exercises.duration'
            }
          }
        }]).then(data => 
            res.json(data))
            .catch(error => {
                console.log("error", error)
                res.json(error);
            })
    });
}
