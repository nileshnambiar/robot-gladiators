var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyNames);
console.log(enemyNames.length);
console.log(enemyNames[0]);
console.log(enemyNames[3]);

// Alert players that they are starting the round
//window.alert("Welcome to Robot Gladiators!");

// create function. enemyName below is the arbitrarily named parameter used by the function.
var fight = function(enemyName) {
    
    while(playerHealth > 0 && enemyHealth > 0) {

        // ask player if they'd like to fight or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // if player choses to "skip" confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you want to quit?");
    
            //if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                // Subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney = ", playerMoney);
                break;
            }
        }

        // remove enemy's health by subtracting the amount sent in playerAttack variable
        enemyHealth = enemyHealth - playerAttack;

        // Log a resulting message to the console so we know that it worked.
        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining");

        // Check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");

            //award player money for winning
            playerMoney = playerMoney + 20;
            console.log("playerMoney is ", playerMoney)

            // leave while loop since enemy is dead.
            break;
        }   else {
            window.alert(enemyName + " still has " + enemyHealth + " health left!");
        }
        // Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the value in the 'playerHealth' variable
        playerHealth = playerHealth - enemyAttack;

        // Log a resulting message to the console so we know that it worked.
        console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining");

        // Check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            // leave the while loop if player is dead
            break;
        }   else {
            window.alert(playerName + " still has " + playerHealth + " health left!");
        }
    }
};

for(var i=0; i<enemyNames.length; i++) {
    //if player is still alive, keep fighting
    if (playerHealth > 0) {
        window.alert("Welcome to Robot Gladiators! Round " + (i+1) );
        var pickedEnemyName = enemyNames[i];
        enemyHealth = 50;
        // use debugger to pause script from running and check what's going on at that moment in the code
        // debugger;
        // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
        fight(pickedEnemyName);
    }   else {
            window.alert('You have lost your robot in battle! Game Over!');
            break;
    }
}