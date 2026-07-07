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

    const selected = document.getElementById("splitSelect").value;
    const workout = workouts[selected];

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
                    <input type="number" class="reps">

                    Weight
                    <input type="number" class="weight" value="0">
                    lbs
                </div>
            </div>

            <button type="button" class="addSetButton" data-index="${index}">
                ➕ Add Set
            </button>

        </div>
        `;
    });

    document.getElementById("workout").innerHTML = html;
}



document.addEventListener("click", function(e){

    if(e.target.matches(".addSetButton")){

        console.log("Add Set clicked");

        const index = e.target.dataset.index;

        setCounts[index] = (setCounts[index] || 1) + 1;

        const number = setCounts[index];

        document
        .getElementById(`sets-${index}`)
        .insertAdjacentHTML(
            "beforeend",
            `
            <div class="set">
                Set ${number}:
                Reps
                <input type="number" class="reps">

                Weight
                <input type="number" class="weight" value="0">
                lbs
            </div>
            `
        );
    }

});



function completeWorkout(){

    console.log("Workout completed");

    localStorage.setItem(
        "lastWorkout",
        JSON.stringify({
            date: new Date().toLocaleString(),
            workout: document.getElementById("splitSelect").value
        })
    );

    alert("Workout saved!");
}



window.onload = function(){
    loadWorkout();
};
