/* MUD Game #1 */
/** MAP OF THE GAME
    [0]
     |
    [1] - [2]

*/


create_room("Apples", "There are apples here");
create_room("Bananas", "There are bananas here");
create_room("Oranges", "Orange you glad that there are oranges here");

add_room_exit(0, "s", 1);
add_room_exit(1, "e", 2);

add_new_env_item(0, "basket", "There's a basket full of apples here", 
                 "look");
add_new_env_item(0, "apple", "A single apple", "take");
add_new_env_item(1, "basket", "This basket is full of bananas", "look");
add_new_env_item(1, "monkey", "This monkey is busily eating bananas", 
                 "look");
add_new_env_item(1, "a pile of banana peels", 
                 "Looks like the monkey's been here a while", "take");
                 
create_player("Mary");
print_player();

print_room(0);