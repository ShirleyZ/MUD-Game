/* MUD Game #1 */
/** MAP OF THE GAME
    [0]
     |
    [1] - [2]

*/


create_room("Apples", "A mostly-empty room greets you. The walls are wooden and you can't see any windows. In the middle of the room there is a basket full of apples.");
create_room("Bananas", "This room has stone walls and has an inhabitant. A monkey is sitting next to a basket of bananas, idly  eating them. Nearby is a pile of banana peels.");
create_room("Oranges", "Orange you glad that there are oranges here");

add_room_exit(0, "s", 1);
add_room_exit(1, "e", 2);

add_new_env_item(0, "basket", "The basket is full of apples. They all seem to be fairly fresh. Maybe you should take one.", 
                 "look");
add_new_env_item(0, "apple", "A single apple", "take");
add_new_env_item(1, "basket", "This basket is full of bananas", "look");
add_new_env_item(1, "monkey", "This monkey is busily eating bananas and pays you no mind.", 
                 "look");
add_new_env_item(1, "pile of banana peels", 
                 "Looks like the monkey's been here a while", "look");
add_new_env_item(1, "banana peel", 
                 "The peel of a banana.", "take");
                 
create_player("Mary");
print_player();

print_room(0);