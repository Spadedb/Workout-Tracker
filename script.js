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

    const day = document.getElementById("splitSelect").value;
    const workout = workouts[day];

    document.getElementById("dayTitle").innerText = workout.name;

    let saved = JSON.parse(localStorage.getItem("saved_" + day));

    let html = "";


    workout.exercises.forEach((exercise, index) => {

        setCounts[index] = 1;

        let previous = "";

        if (saved && saved.exercises[exercise]) {

            previous = `
            <div class="previous">
                <b>Last workout:</b><br>
                ${
                    saved.exercises[exercise]
                    .map((set, i) =>
                    `Set ${i + 1}: ${set.reps} reps, ${set.weight} lbs`
                    )
                    .join("<br>")
                }
            </div>
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

    showHistory();

}



function addSet(index) {

    setCounts[index]++;

    let number = setCounts[index];


    document.getElementById("sets-" + index)
    .insertAdjacentHTML(
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

    const day = document.getElementById("splitSelect").value;

    const workout = workouts[day];


    let saveData = {

        date: new Date().toLocaleString(),

        exercises: {}

    };



    workout.exercises.forEach((exercise, index) => {


        let sets = [];


        let reps =
        document.querySelectorAll("#sets-" + index + " .reps");


        let weights =
        document.querySelectorAll("#sets-" + index + " .weight");



        for (let i = 0; i < reps.length; i++) {

            sets.push({

                reps: reps[i].value,

                weight: weights[i].value

            });

        }


        saveData.exercises[exercise] = sets;


    });



    localStorage.setItem(
        "saved_" + day,
        JSON.stringify(saveData)
    );


    alert("Workout saved!");


    loadWorkout();

}




function showHistory() {

    const history = document.getElementById("history");

    let text = "";


    for (let day in workouts) {

        let saved =
        JSON.parse(localStorage.getItem("saved_" + day));


        if (saved) {

            text += `
            <p>
            ${workouts[day].name}<br>
            Completed: ${saved.date}
            </p>
            `;

        }

    }


    history.innerHTML = text || "No workouts completed yet.";

}



loadWorkout();
