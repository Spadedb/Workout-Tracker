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


let currentExercises = [];


function loadWorkout() {

    const selected = document.getElementById("splitSelect").value;
    const workout = workouts[selected];

    document.getElementById("dayTitle").innerHTML = workout.name;

    currentExercises = workout.exercises;

    let html = "";

    currentExercises.forEach((exercise, index) => {

        html += `
        <div class="exercise">

        <strong>${exercise}</strong>

        <br><br>

        <div id="sets-${index}">

        Set 1:
        Reps <input id="reps-${index}-1" type="number">
        Weight <input id="weight-${index}-1" type="number" value="0">

        </div>

        <button onclick="addSet(${index})">
        ➕ Add Set
        </button>

        </div>
        `;
    });


    document.getElementById("workout").innerHTML = html;
}



let setCounts = {};


function addSet(index){

    if(!setCounts[index]){
        setCounts[index] = 1;
    }

    setCounts[index]++;

    let setNumber = setCounts[index];

    document.getElementById(`sets-${index}`).innerHTML += `

    <br>

    Set ${setNumber}:
    Reps <input id="reps-${index}-${setNumber}" type="number">
    Weight <input id="weight-${index}-${setNumber}" type="number" value="0">

    `;
}



function completeWorkout(){

    let saved = {};

    currentExercises.forEach((exercise,index)=>{

        let sets=[];

        let totalSets = setCounts[index] || 1;


        for(let i=1;i<=totalSets;i++){

            let reps = document.getElementById(`reps-${index}-${i}`).value;
            let weight = document.getElementById(`weight-${index}-${i}`).value;


            if(reps){

                sets.push({
                    reps: reps,
                    weight: weight
                });

            }

        }


        if(sets.length){

            saved[exercise] = sets;

        }

    });


    localStorage.setItem(
        "exerciseData",
        JSON.stringify(saved)
    );


    alert("Workout saved!");
}


loadWorkout();
