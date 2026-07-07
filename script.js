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

    let lastWorkout = JSON.parse(localStorage.getItem(selected));

    let html = "";

    workout.exercises.forEach((exercise, index) => {

        setCounts[index] = 1;

        let previous = "";

        if (lastWorkout && lastWorkout[exercise]) {
            previous = `
            <p class="previous">
            Last time:
            ${lastWorkout[exercise].map((set, i) =>
                `Set ${i + 1}: ${set.reps} reps, ${set.weight} lbs`
            ).join("<br>")}
            </p>
            `;
        }

        html += `
        <div class="exercise">

            <h3>${exercise}</h3>

            ${previous}

            <div id="sets-${index}">
                <div class="set">
                    Set 1:
                    Reps
                    <input class="reps" type="number">

                    Weight
                    <input class="weight" type="number" value="0">

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

    setCounts[index]++;

    let number = setCounts[index];

    document.getElementById(`sets-${index}`).insertAdjacentHTML(
        "beforeend",
        `
        <div class="set">
            Set ${number}:
            Reps
            <input class="reps" type="number">

            Weight
            <input class="weight" type="number" value="0">

            lbs
        </div>
        `
    );
}



function completeWorkout() {

    let selected = document.getElementById("splitSelect").value;
    let workout = workouts[selected];

    let saveData = {};

    workout.exercises.forEach((exercise, index) => {

        let sets = [];

        let container = document.getElementById(`sets-${index}`);

        let reps = container.querySelectorAll(".reps");
        let weights = container.querySelectorAll(".weight");

        for(let i = 0; i < reps.length; i++) {

            sets.push({
                reps: reps[i].value || 0,
                weight: weights[i].value || 0
            });

        }

        saveData[exercise] = sets;

    });


    localStorage.setItem(
        selected,
        JSON.stringify(saveData)
    );


    alert("Workout saved!");

}
loadWorkout();
