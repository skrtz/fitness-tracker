// const router = require("express").Router();

// const API = {
//   async getLastWorkout() {
//     let res;
//     try {
//       res = await fetch("/api/workouts");
//     } catch (err) {
//       console.log(err)
//     }
//     const json = await res.json();

//     return json[json.length - 1];
//   },
//   async addExercise(data) {
//     const id = location.search.split("=")[1];

//     const res = await fetch("/api/workouts/" + id, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data)
//     });

//     const json = await res.json();

//     return json;
//   },
//   async createWorkout(data = {}) {
//     const res = await fetch("/api/workouts", {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: { "Content-Type": "application/json" }
//     });

//     const json = await res.json();

//     return json;
//   },

//   async getWorkoutsInRange() {
//     const res = await fetch(`/api/workouts/range`);
//     const json = await res.json();

//     return json;
//   },
// };

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

// module.exports = router;