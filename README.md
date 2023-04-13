# TIC TAC TOE

## Motivation

This project was created to practice react front end skills. The full tutorial to develop this game using react was provided by reactjs.org at this [link](https://legacy.reactjs.org/tutorial/tutorial.html), please check it out if you want to build your own tic tac toe using react. The tutorial introduces several react functionalities, tools and good practices, like using **state** attribute to let the react js engine to know whenever to update an element in the DOM. The main goal of the tutorial is to create a game as simple as possible, buuut my goal here is to test my front-end skills deeply (this time using react) so I decided to improve the game.

## Development Steps

### 0. Basic Game

First of all I created the game using the reactjs.org [provided tutorial](ttps://legacy.reactjs.org/tutorial/tutorial.html), the result is a simple TIC TAC TOE game, with the most basic appearance.

![game play to feature 0](./README_data/game_play_0.gif/)

To make the things funnier I decided to create some improvement tasks and then work on then one by one. The tutorial by it self already suggest a couple of new features to challenge the developers, here they are:

1. Display the location for each move in the format (col, row) in the move history list.
2. Bold the currently selected item in the move list.
3. Rewrite Board to use two loops to make the squares instead of hardcoding them.
4. Add a toggle button that lets you sort the moves in either ascending or descending order.
5. When someone wins, highlight the three squares that caused the win.
6. When no one wins, display a message about the result being a draw.

Beside these additional tasks I decided to create some challenging tasks by myself, here they go:

7. Apply a beautiful CSS design instead of using a basic one.
8. Use icons instead of simple X and O.
9. Display time travel like frames instead of simple (col, row).
10. Trace a line over the game indicating the line that won the game.
11. Make a fun animation with a congratulation warning on winning.

Check out the code
Enjoy :)

### 1. Improve history display

To develop this feature it was necessary to remove the history buttons and replace then by tables, each table is displaying an old game state stored in the history. I applied some extra css to display legible tables.

![game play to feature 1](./README_data/game_play_1.gif)

### 2. Bold selected history

To develop this feature I just had to apply conditional css based on the current history selected state.

![game play to feature 2](./README_data/game_play_2.gif)
