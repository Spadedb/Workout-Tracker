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

    document.getElementById("dayTitle").innerText = workout.name;

    setCounts = {};

    let html = "";

    workout.exercises.forEach((exercise, index) => {

        setCounts[index] = 1;

        html += `
        <div class="exercise">

            <strong>${exercise}</strong>

            <div id="sets-${index}">

                <br>

                Set 1:
                Reps 
                <input id="reps-${index}-1" type="number">

                Weight 
                <input id="weight-${index}-1" type="number" value="0">

                lbs

            </div>

            <button class="addSetButton" data-index="${index}">
                ➕ Add Set
            </button>

        </div>
        `;
    });


    document.getElementById("workout").innerHTML = html;
}



document.addEventListener("click", function(event){

    if(event.target.classList.contains("addSetButton")){

        let index = event.target.dataset.index;

        if(!setCounts[index]){
            setCounts[index] = 1;
        }

        setCounts[index]++;

        let setNumber = setCounts[index];


        document.getElementById(`sets-${index}`).insertAdjacentHTML(
            "beforeend",

            `
            <br>

            Set ${setNumber}:
            Reps 
            <input id="reps-${index}-${setNumber}" type="number">

            Weight 
            <input id="weight-${index}-${setNumber}" type="number" value="0">

            lbs
            `
        );

    }

});



function completeWorkout(){

    alert("Workout saved!");
}



loadWorkout();
