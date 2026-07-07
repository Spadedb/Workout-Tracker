const workouts = {
    push: {
        name: "Push Day (Chest, Shoulders, Triceps)",
        exercises: [
            "Push-ups",
            "Decline Push-ups",
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

    let selected = document.getElementById("splitSelect").value;

    let workout = workouts[selected];

    document.getElementById("dayTitle").innerText = workout.name;


    let html = "";

    workout.exercises.forEach(function(exercise){

        html += `
        <div class="exercise">
            <strong>${exercise}</strong>
            <br><br>

            Set 1:
            Reps <input type="number">
            Weight <input type="number" value="0">
        </div>
        `;

    });


    document.getElementById("workout").innerHTML = html;
}


loadWorkout();
