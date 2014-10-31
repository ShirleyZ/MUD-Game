/* MUD Game #1 Test file*/
/* Here be unit tests */

// TESTING MOVING FROM ROOM TO ROOM
assert(currRoom.name, "Apples");
parse_command("go south");
assert(currRoom.name, "Bananas");