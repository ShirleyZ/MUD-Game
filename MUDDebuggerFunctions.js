/*  Some functions from MUD.js WITH debugging console.logs
    (Didn't want to write them out again, just in case)
*/

// #### Player Navigation/Commands ####

function parse_command (command) {
  /** PURPOSE: grab the text that the player has entered and see
      what commands are being made. Then call the correct function
  
  */
  
  command.trim();
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
  
}; // End parse_function