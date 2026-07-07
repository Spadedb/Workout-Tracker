const workouts = {
    push: {
        name: "Push Day (Chest, Shoulders, Triceps)",
        exercises: [
            "Push-ups",
            "Decline Push-ups (Bench)",
            "Dips",
            "Pike Push-ups",
            "Bench Tricep Dips"
        ]
    },

    pull: {
        name: "Pull Day (Back, Biceps)",
        exercises: [
            "Pull-ups",
            "Chin-ups",
            "Negative Pull-ups",
            "Scapular Pull-ups",
            "Towel Rows"
        ]
    },

    legs: {
        name: "Legs + Core",
        exercises: [
            "Bulgarian Split Squats",
            "Bodyweight Squats",
            "Jump Squats",
            "Walking Lunges",
            "Calf Raises",
            "Planks",
            "Leg Raises"
        ]
    },

    upper: {
        name: "Upper Strength",
        exercises: [
            "Pull-ups",
            "Dips",
            "Push-ups",
            "Pike Push-ups",
            "Hanging Knee Raises"
        ]
    },

    full: {
        name: "Full Body",
        exercises: [
            "Pull-ups",
            "Push-ups",
            "Dips",
            "Squats",
            "Planks"
        ]
    }
};


function loadWorkout() {

    const selected = document.getElementById("splitSelect").value;
    const workout = workouts[selected];

    document.getElementById("dayTitle").innerHTML = workout.name;

    let html = "";

    let saved = JSON.parse(localStorage.getItem("exerciseData")) || {};

    workout.exercises.forEach(exercise => {

        let previous = saved[exercise];

        html += `
        <div class="exercise">
            <strong>${exercise}</strong><br><br>

            ${previous ? 
            `Last time: ${previous.sets} sets × ${previous.reps} reps @ ${previous.weight} lbs`
            :
            "No previous record"
            }

            <br><br>

            Sets:
            <input id="${exercise}-sets" type="number" min="0">

            Reps:
            <input id="${exercise}-reps" type="number" min="0">

            Weight:
            <input id="${exercise}-weight" type="number" min="0" value="0">
            lbs
        </div>
        `;
    });

    document.getElementById("workout").innerHTML = html;
}


function completeWorkout() {

    let saved = JSON.parse(localStorage.getItem("exerciseData")) || {};

    const selected = document.getElementById("splitSelect").value;

    workouts[selected].exercises.forEach(exercise => {

        let sets = document.getElementById(`${exercise}-sets`).value;
        let reps = document.getElementById(`${exercise}-reps`).value;
        let weight = document.getElementById(`${exercise}-weight`).value;

        if (sets && reps) {

            saved[exercise] = {
                sets: sets,
                reps: reps,
                weight: weight
            };

        }

    });

    localStorage.setItem("exerciseData", JSON.stringify(saved));


    let history = JSON.parse(localStorage.getItem("history")) || [];

    history.push({
        date: new Date().toLocaleDateString(),
        workout: workouts[selected].name
    });

    localStorage.setItem("history", JSON.stringify(history));

    displayHistory();

    alert("Workout saved!");
}


function displayHistory() {

    let history = JSON.parse(localStorage.getItem("history")) || [];

    let html = "";

    history.reverse().forEach(item => {

        html += `✅ ${item.date} - ${item.workout}<br>`;

    });

    document.getElementById("history").innerHTML = html;
}


loadWorkout();
displayHistory();
