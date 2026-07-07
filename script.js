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


let setCounts = {};


function loadWorkout() {

    let selected = document.getElementById("splitSelect").value;
    let workout = workouts[selected];

    document.getElementById("dayTitle").textContent = workout.name;

    let html = "";

    workout.exercises.forEach((exercise, index) => {

        setCounts[index] = 1;

        html += `
        <div class="exercise">

            <h3>${exercise}</h3>

            <div id="sets-${index}">
                <div class="set">
                    Set 1:
                    Reps 
                    <input type="number">

                    Weight
                    <input type="number" value="0">

                    lbs
                </div>
            </div>

            <button type="button" onclick="addSet(${index})">
                ➕ Add Set
            </button>

        </div>
        `;
    });

    document.getElementById("workout").innerHTML = html;
}



function addSet(index) {

    if (!setCounts[index]) {
        setCounts[index] = 1;
    }

    setCounts[index]++;

    let number = setCounts[index];

    document.getElementById(`sets-${index}`).insertAdjacentHTML(
        "beforeend",
        `
        <div class="set">
            Set ${number}:
            Reps
            <input type="number">

            Weight
            <input type="number" value="0">

            lbs
        </div>
        `
    );
}



function completeWorkout() {

    let selected = document.getElementById("splitSelect").value;

    localStorage.setItem(
        "lastWorkout",
        JSON.stringify({
            workout: selected,
            date: new Date().toLocaleString()
        })
    );

    alert("Workout saved!");
}



loadWorkout();
