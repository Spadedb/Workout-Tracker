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

    workout.exercises.forEach(exercise => {
        html += `
        <div class="exercise">
            <strong>${exercise}</strong><br>
            Sets:
            <input type="number" min="0">
            Reps:
            <input type="number" min="0">
        </div>`;
    });

    document.getElementById("workout").innerHTML = html;
}


function completeWorkout() {

    let history = JSON.parse(localStorage.getItem("history")) || [];

    let today = new Date().toLocaleDateString();

    history.push(today);

    localStorage.setItem("history", JSON.stringify(history));

    displayHistory();

    alert("Workout completed!");
}


function displayHistory() {

    let history = JSON.parse(localStorage.getItem("history")) || [];

    let html = "";

    history.reverse().forEach(date => {
        html += "✅ " + date + "<br>";
    });

    document.getElementById("history").innerHTML = html;
}


loadWorkout();
displayHistory();
