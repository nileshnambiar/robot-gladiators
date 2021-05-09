/* GAME FUNCTIONS */

// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

// function to check if player wants to fight or skip
var fightOrSkip = function() {
    // ask player if they'd like to fight or skip using the fightOrSkip function
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // Conditional Recursive Function Call
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        // use return to call it again and stop the rest of this function from running
        return fightOrSkip();
    }
    
    // convert promptFight to all lowercare so we can check with less options
    promptFight = promptFight.toLowerCase();

    // if player choses to "skip" confirm and then stop the loop
    if (promptFight === "skip") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you want to quit?");

        //if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // Subtract money from playerInfo.money for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);

            // return true if player wants to leave
            return true;
        }
    }
    return false;
};

// fight function (now with parameter for enemy's object holding name, health and attack values)
var fight = function(enemy) {

    // keep track of who goes first
    var isPlayerTurn = true;

    // randomly change turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }
    
    while(playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
            // ask the player if they'd like to fight or skip using the fightOrSkip function
            if (fightOrSkip()) {
                //if true, leave the fight by breaking loop
                break;
            };

            // generate random damage value based on player's attack power 
            var damage = randomNumber(playerInfo.attack-3, playerInfo.attack);

            // Calculate enemy health after attack and record a number greater than zero
            enemy.health = Math.max(0, enemy.health - damage);

            // Log a resulting message to the console so we know that it worked.
            console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining");

            // Check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");

                //award player money for winning
                playerInfo.money = playerInfo.money + 20;
                console.log("playerInfo.money is ", playerInfo.money)

                // leave while loop since enemy is dead.
                break;
            }   else {
                window.alert(enemy.name + " still has " + enemy.health + " health left!");
            }
            // player gets attacked first
        }   else {
                // Generate random damage value based on player's attack power 
                var damage = randomNumber(enemy.attack - 3, enemy.attack);
                
                // Subtract the value of 'enemyAttack' from the value of 'playerInfo.health' and use that result to update the value in the 'playerInfo.health' variable
                playerInfo.health = Math.max(0, playerInfo.health - damage);

                // Log a resulting message to the console so we know that it worked.
                console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining");

                // Check player's health
                if (playerInfo.health <= 0) {
                    
                    window.alert(playerInfo.name + " has died!");

                    // leave the while loop if player is dead
                    break;
                }   else {
                    window.alert(playerInfo.name + " still has " + playerInfo.health + " health left!");
                }
            }
        // switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
    }
};

// function to start a new game
var startGame = function() {
    //reset player stats
    playerInfo.reset();
    // fight each enemy robot by looping over them and fighting them one at a time
    for(var i=0; i<enemyInfo.length; i++) {
        //check player stats
        console.log(playerInfo);

        //if player is still alive, keep fighting
        if (playerInfo.health > 0) {
            //let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i+1) );

            // pick new enemy to fight based on the index of the enemyInfo array
            var pickedEnemyObj = enemyInfo[i];

            // set health for picked enemy
            pickedEnemyObj.health = randomNumber(40, 60);

            fight(pickedEnemyObj);

            // if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask if the player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // if yes, take them to the store() function
                if(storeConfirm) {
                shop();
                }
            }
        }   
        // if player is not alive, break out of the loop and let endGame function run
        else {
                window.alert('You have lost your robot in battle! Game Over!');
                break;
        }
    }

    // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame()
};

// function to end the entire game
var endGame = function () {
    window.alert ("The game has ended. Let's see how you did!");
    //check localStorage for high score, if its not there, use 0
    var highscore = localStorage.getItem("highscore");
    if (highscore === null) {
        highscore = 0;
    }

    //if player has more money that the high score, player has new high score!
    if (playerInfo.money > highscore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        window.alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    }
    else {
        window.alert(playerInfo.name + " did not beat the high score of " + highscore + ". Maybe next time!");
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

// go to shop between battles function
var shop = function() {
    // ask the player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
        );
    // convert answer from prompt to an actual number
    shopOptionPrompt = parseInt(shopOptionPrompt)
    //debugger;
    // use switch case to carry out action
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the Store");
            //do nothing so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

// function to set name
var getPlayerName = function () {
    var name = "";
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }
    console.log("Your Robot's name is " + name);
    return name;
};

/* END GAME FUNCTIONS */ 

/* GAME INFORMATION / VARIABLES */

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }   else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }   else {
            window.alers("You don't have enough money!")
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10,14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10,14)
    }
];

/* END GAME INFORMATION / VARIABLES */

/* RUN GAME */
startGame();