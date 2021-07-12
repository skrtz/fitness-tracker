const db = require("../models");

module.exports = function (app) {
    //Get (get) last workout -- grab all workouts, api.js only displays last one on line 11    
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({}).then(data => res.json(data))
            .catch(error => {
                console.log("error", error)
                res.json(error);
            })
    });

    //Add (put) an exercise -- grab id from req, and update with req.body, 
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

    //Post (create) a workout
    app.post("/api/workouts", (req, res) => {
        db.Workout.create({}).then(data => res.json(data))
            .catch(error => {
                console.log("error", error);
                res.json(error);
            })
    });

    //Get (get) workouts in range -- find all workout data?
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({}).then(data => 
            res.json(data))
            .catch(error => {
                console.log("error", error)
                res.json(error);
            })
    });
}
