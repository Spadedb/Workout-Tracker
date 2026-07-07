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

let setCounts = {};


function loadWorkout() {

    const selected = document.getElementById("splitSelect").value;
    const workout = workouts[selected];

    // clear old workout data
    document.getElementById("workout").innerHTML = "";

    document.getElementById("dayTitle").innerHTML = workout.name;

    setCounts = {};

    let saved = JSON.parse(localStorage.getItem("exerciseData")) || {};

    let html = "";

    workout.exercises.forEach(exercise => {

        setCounts[exercise] = 1;

        let previous = saved[exercise];

        html += `
        <div class="exercise">

        <strong>${exercise}</strong><br><br>

        ${previous ? 
        "Last time:<br>" + previous.sets.map((set,index)=>
        `Set ${index+1}: ${set.reps} reps @ ${set.weight} lbs`
        ).join("<br>")
        :
        "No previous record"
        }

        <br><br>

        <div id="${exercise}-sets">

        Set 1:
        Reps <input id="${exercise}-reps-1" type="number">
        Weight <input id="${exercise}-weight-1" type="number" value="0">
        lbs

        </div>

        <button onclick="addSet('${exercise}')">
        ➕ Add Set
        </button>

        </div>
        `;
    });

    document.getElementById("workout").innerHTML = html;
}


function addSet(exercise){

    setCounts[exercise]++;

    let number = setCounts[exercise];

    document.getElementById(`${exercise}-sets`).innerHTML += `

    <br>

    Set ${number}:
    Reps <input id="${exercise}-reps-${number}" type="number">
    Weight <input id="${exercise}-weight-${number}" type="number" value="0">
    lbs

    `;
}


function completeWorkout(){

    let saved = JSON.parse(localStorage.getItem("exerciseData")) || {};

    Object.keys(setCounts).forEach(exercise=>{

        let sets=[];

        for(let i=1;i<=setCounts[exercise];i++){

            let reps=document.getElementById(`${exercise}-reps-${i}`).value;
            let weight=document.getElementById(`${exercise}-weight-${i}`).value;

            if(reps){
                sets.push({
                    reps: reps,
                    weight: weight
                });
            }
        }

        if(sets.length){
            saved[exercise]={sets:sets};
        }

    });

    localStorage.setItem("exerciseData",JSON.stringify(saved));

    alert("Workout saved!");
}


loadWorkout();
