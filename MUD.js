/* JS file for MUD Game Functions*/


// #### PLAYER ####

var player;

function create_player (name) {
  var a = {
    name: name,
    // Stats
    hp: 10,
    maxhp: 10,
    speed: 10,
    strength: 10,
    intelligence: 10
  };
  player = a;
  return a;
};

function log_player (chara) {
  console.log(chara.name);
  console.log("Stats");
  console.log(chara.hp + "/" + chara.maxhp + 
              " HP SPD: " + chara.speed + 
              " STR: " + chara.strength + 
              " INT: " + chara.intelligence);
  
};

function print_player () {
  document.getElementById("charName").innerHTML = player.name;
  document.getElementById("hp").innerHTML = player.hp;
  document.getElementById("maxhp").innerHTML = player.maxhp;
  document.getElementById("speed").innerHTML = player.speed;
  document.getElementById("strength").innerHTML = player.strength;
  document.getElementById("intelligence").innerHTML = player.intelligence;
  
};

// #### Player Navigation/Commands ###

var commands = ["n", "s", "e", "w",  // Navigation
                "look", "take", "drop", // Interaction
                "help"];

function parse_command (command) {
  /** PURPOSE: grab the text that the player has entered and see
      what commands are being made. Then call the correct function
  
  */
  
  command.trim();
  var commandFound = false;
  var searchResult = -2;
  var i = 0; // Counter for char # of command string
  var j = 0; // Counter for which command in commands array 
  
  /** FIRST VERSION OF FUNCTION
      For loop compares first word of the user input command with 
      the list of legal commands as defined in commands variable.
  
      It compares the first letter of the string to each
      first letter of each command in the commands variable.
        - If they match, a search for the command word is performed,
          if not, the loop continues.
        - The search result only cares if the command word is at the
          front of the string (0), otherwise it is ignored.
        - If search returns a 0, a command was found and the loop
          is broken, anything else, result is reset and the loop 
          continues.
  */
  
  /*for (i = 0; i < commands.length; i++) {
    console.log("Comparing " + command[0] + " with " 
                + commands[i][0]);
    if (command[0] == commands[i][0]) {
      console.log("Match found. Searching for " + commands[i] + 
                  " in " + command);
      searchResult = command.search(commands[i]);
      if (searchResult == 0) {
        console.log("Match found. Breaking loop.");
        commandFound = true;
        break;
      } else {
        console.log("Match not found. Search result reset.");
        searchResult = -2;
      }
    }
    j++;
  }*/
  
  /** SECOND (IMPROVED) VERSION OF FUNCTION
      For loop compares first word of the user input command with 
      the list of legal commands as defined in commands variable.
      
      Searches for commands by searching through the list
      - If found, makes sure that it is its own word (look not 
        looking) or that it is a one letter command (n)
      - If not, search result is reset
      
      NOTE: searchResult is set to -2 for debugging purposes
            -2 should never naturally come up as a search result, so
            if the result is -2 we can tell if it just didn't go off
  */
  for (i = 0; i < commands.length; i++) {
    console.log("Searching for " + commands[i] + " in " + command);
    searchResult = command.search(commands[i]);
    if (searchResult == 0) {
      console.log(i + ": Is " + commands[i].length + " a space?");
      if (command[commands[i].length] == " " || command.length == 1) {
        console.log("Match found. Breaking loop.");
        commandFound = true;
        break;
      } else {
        console.log("Command is not its own word. Search result reset.");
        searchResult = -2;
      }
    } else {
      console.log("Match not found. Search result reset.");
      searchResult = -2;
    }
  }
  
  if (commandFound == true) {
    console.log("A command was found");
  } else {
    console.log("Sorry, I don't understand what you're saying");
  }
  
};


// #### Room Creation/Editing ####
var map = new Array;

function create_room (name, desc) {
  var newRoom = {
    name: name,
    desc: desc,
    exits: new Array,
    envItems: new Array
  }
  map.push(newRoom);
};

function add_room_exit (roomID, exitDirection, destinationRoomID) {
  if (roomID < map.length) {
    /** Use switch case? Check if other room already has an exit 
        that way
    // WARNING No error checking for if you're doubling up on exits
               No checking what string you're being given
    // REQUIRES That the destination room exists
    */
    var newRoom = {
      exitDir: exitDirection,
      destination: destinationRoomID
    }
    map[roomID].exits.push(newRoom);
    
    if (exitDirection == "n" && 
        map[destinationRoomID].exits["s"] == null) {
      var newSExit = {
        exitDir: "s",
        destination: roomID
      }
      map[destinationRoomID].exits.push(newSExit);
      
      
    } else if (exitDirection == "s" && 
        map[destinationRoomID].exits["n"] == null) {
      var newNExit = {
        exitDir: "n",
        destination: roomID
      }
      map[destinationRoomID].exits.push(newNExit);
      
      
    } else if (exitDirection == "e" && 
        map[destinationRoomID].exits["w"] == null) {
        var newWExit = {
          exitDir: "w",
          destination: roomID
        }
      map[destinationRoomID].exits.push(newWExit);
      
      
    } else if (exitDirection == "w" && 
        map[destinationRoomID].exits["e"] == null) {
        var newEExit = {
          exitDir: "e",
          destination: roomID
        }
      map[destinationRoomID].exits.push(newEExit);
    }
  } else {
    error("No such room exists");
  }
}; // End add_room_exit

var print_room = function (roomID) {
  document.getElementById("roomName").innerHTML = map[roomID].name;
  document.getElementById("roomDesc").innerHTML = map[roomID].desc;
  var exits = "";
  if (map[roomID].exits[0] != null) {
    console.log("ee");
    for (key in map[roomID].exits) {
      console.log("Key: " + key);
      exits = exits + map[roomID].exits[key].exitDir;
      console.log(exits);
      if (map[roomID].exits[key+1] != null) {
        exits = exits + ", ";
      }
    }
    document.getElementById("roomExits").innerHTML = exits;
    
  } else {
    exits = "none";
  }
  console.log("Room " + roomID + " printed");
}

var log_room = function (roomID) {
  console.log(map[roomID].name);
  console.log(map[roomID].desc);
  if (map[roomID].exits != null) {
    for (key in map[roomID].exits) {
      console.log(map[roomID].exits[key]);
    }
  }
  if (map[roomID].envItems != null) {
    for (key in map[roomID].envItems) {
      console.log(map[roomID].envItems[key]);
    }
  }
  
};

var log_all_rooms = function () {
  for (key in map) {
    log_room(key);
  }
};

// #### Env(ironment) Items #### 
/** List of items that users can interact with in
    the rooms of the maps.
    Decided to put in a single array > item info in the 
    rooms so all items can be accessed from the one area 
    instead of hidden away in rooms
    CONTAINS:
      - name
      - description
      - method of interaction (look/use)
*/
var envItems = new Array;

var add_new_env_item = function (roomID, name, desc, method) {
  var newEnvItem = {
    name: name,
    desc: desc,
    method: method,
    roomID: roomID
  }
  envItems.push(newEnvItem);
  map[roomID].envItems.push(newEnvItem);
};

var log_env_item = function (envItemID) {
  console.log(envItems[envItemID].name + " [ID:" + envItemID + 
              "] [Room:" + envItems[envItemID].roomID + "] [" + 
              envItems[envItemID].method + "] : " + 
              envItems[envItemID].desc);
};

var log_all_env_items = function () {
  for (key in envItems) {
    log_env_item(key);
  }
};
// #### Inventory Items #### 
/** List of items that users can interact with in
    the rooms of the maps.
    Decided to put in a single array > in the rooms
    (give rooms inventory) so all items can be accessed
    from the one area instead of hidden away in rooms
    CONTAINS:
      - name
      - description
      - what its use is
*/
var inventoryItems = new Array;
var invItemsCount = 0;