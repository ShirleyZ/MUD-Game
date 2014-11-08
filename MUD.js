/*  JS file for MUD Game Functions

    TODO/DIRECTION:
    - Able to find command, prog what happens next
    - Look command implemented, ISSUE: Basket and 
      basket are different
    - Implement notification/command box
    
    LOOSE ENDS:
    - parse_commands, single word functions, still 
      needed?
    - Look commands should print descriptions and 
      commands into notifications box, not con.log

*/


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

var commands = ["go",  // Navigation
                "look", "take", "drop", // Interaction
                "help"];

var currRoom;

function parse_command (userInput) {
  /** PURPOSE: grab the text that the player has entered and see
      what commands are being made. Then call the correct function
  
  */
  
  userInput.trim();
  var commandFound = false;
  var searchResult = -2;
  var i = 0; // Counter for which command in commands array 
  
  /** For loop compares first word of the user input command with 
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
    console.log("Searching for " + commands[i] + " in " + userInput);
    searchResult = userInput.search(commands[i]);
    if (searchResult == 0) {
      console.log(i + ": Is " + commands[i].length + " a space?");
      if (userInput[commands[i].length] == " " || userInput.length == 1) {
        console.log("Match found.");
        execute_command(i, userInput);
        console.log("Command executed. Breaking loop.");
        commandFound = true;
        break;
      } else if (userInput == commands[i]) {
        console.log("Single command word found");
        commandFound = true;
        if (userInput == "look") {
          // execute_command();
        } else {
          console.log(userInput + " what?");
        }
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
  
}; // End parse_command

function execute_command(commandID, userInput) {
  var commandInfo = "";
  var i = 0;
  
  if (commands[commandID] == "go") {
  
    commandInfo = userInput.slice(3);
    console.log(commandInfo);
    var toRoom = -1;
    
    if (commandInfo == "n" || commandInfo == "north") {
      toRoom = helper_find_exit("n");
    } else if (commandInfo == "s" || commandInfo == "south") {
      toRoom = helper_find_exit("s");
    } else if (commandInfo == "e" || commandInfo == "east") {
      toRoom = helper_find_exit("e");
    } else if (commandInfo == "w" || commandInfo == "west") {
      toRoom = helper_find_exit("w");
    } 
    
    if (toRoom != -1) {
      console.log("To room " + toRoom);
      print_room(toRoom);
    } else {
      console.log("Room not found");
    }
    
    
  } if (commands[commandID] == "look") {
    
    commandInfo = userInput.slice(5);
    commandInfo = commandInfo.toLowerCase();
    console.log(commandInfo);
    var itemDesc = "";
    var itemFound = 0;
    
    for (key in currRoom.envItems) {
      console.log("Comparing '" + commandInfo + "' [with] '" + currRoom.envItems[key].name + "'");
      if (currRoom.envItems[key].name == commandInfo) {
        if (currRoom.envItems[key].method == "look") {
          console.log(currRoom.envItems[key].desc);
          itemDesc = currRoom.envItems[key].desc;
          
          itemFound = 1;
        }
      }
    }
    
    if (itemFound == 0) {
      console.log("What? That's not here.");
      itemDesc = "What? That's not here.";
    }


    var txtNode = document.createTextNode(itemDesc);
    var div = document.createElement('div');
    var notifBox = document.getElementById('notificationsBox');
    
    div.appendChild(txtNode);
    div.className = 'notifications';
    notifBox.appendChild(div);
  }
}; // End execute_command

function helper_find_exit(direction) {
  var toRoom = -1;
  for (key in currRoom.exits) {
    if (currRoom.exits[key].exitDir == direction) {
      toRoom = currRoom.exits[key].destination;
    }
  }
  return toRoom;
}

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
    console.log("Exits exist, printing exits");
    for (key in map[roomID].exits) {
      console.log("Key: " + key);
      exits = exits + ", " + map[roomID].exits[key].exitDir;
      console.log(exits);
    }
    exits = exits.slice(1);
    document.getElementById("roomExits").innerHTML = exits;
    
  } else {
    exits = "none";
  }
  console.log("Room " + roomID + " printed");
  currRoom = map[roomID];
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