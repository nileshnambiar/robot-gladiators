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

var startGame = function() {
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

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

            // if we're not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length - 1) {
                // ask if the player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // if yes, take them to the store() function
                if(storeConfirm) {
                shop();
                }
            }
        }   else {
                window.alert('You have lost your robot in battle! Game Over!');
                break;
        }
    }

    // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame()
};

// function to end the entire game
var endGame = function () {
    // if player is still alive, player wins!
    if (playerHealth > 0) {
        wndow.alert ("Great job, you've survived the game! You have a score of " + playerMoney + ".");
    }
    else {
        window.alert("You've lost your robot in battle.")
    }
    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if(playAgainConfirm) {
        // restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }

};

var shop = function() {
    // ask the player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    switch (shopOptionPrompt) {
        case "REFILL": //new case
        case "refill":
            if (playerMoney >= 7) {
                window.alert("refilling player's health by 20 for 7 dollars.");

                //increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!")
            }
            break;
        case "UPGRADE": //new case
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                // increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have anough money!")
            }
            break;
        case "LEAVE": //new case
        case "leave":
            window.alert("Leaving the Store");

            //do nothing so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");

            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
    console.log("entered the shop")
}

//start the game when the page loads
startGame();