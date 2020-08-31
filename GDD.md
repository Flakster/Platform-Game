## History

The idea of the game is a planetary traveller which name is P1 who in this opportunity is in a far away planet full of evil flies and slugs. Our character can't thouch any of this creatures or he will die. The way the player can help our brave traveler to keep alive, is by jumping using the up arrow key or by squatting using the down arrow key. The goal is to advance as much as possible into this planet, but we have to be careful, because as our hero advances, his enemies gets more and more furious and advance to him increasingly faster.

![game2](https://user-images.githubusercontent.com/53324035/91667258-da986280-eac8-11ea-8389-253edb576465.png)

## Assets

For the main character the following spritesheet will be used:

![p1_spritesheet](https://user-images.githubusercontent.com/53324035/91672200-9c179d80-eaf2-11ea-9c0e-732274df51e6.png)

It has the frames needed for giving the movement to P1

For the flies this is the spritesheet:

![fly_spritesheet](https://user-images.githubusercontent.com/53324035/91672202-9fab2480-eaf2-11ea-933c-632279bd6602.png)

This is the spritesheet for the slug:

![slime_spritesheet](https://user-images.githubusercontent.com/53324035/91672205-a2a61500-eaf2-11ea-92e3-42fb607f2e9f.png)

The world is made up of a background sky and a platform that represents the planet surface. Another couple of assets are the logos of Phaser and Zenva

![assets](https://user-images.githubusercontent.com/53324035/91673178-768d9280-eaf8-11ea-8a20-be1153627e45.png)

Some other assets are user interface images for the buttons and other elements:

![ui-assets](https://user-images.githubusercontent.com/53324035/91673182-7b524680-eaf8-11ea-865c-6ee08c681370.png)

The background music is an 8-bit mp3 file conveniently trimmed to play in a loop reinforcing the idea of the endless runner.

All this assets are preloaded at the beginnig of the game:

![game1](https://user-images.githubusercontent.com/53324035/91667256-d66c4500-eac8-11ea-8c5a-f808fa65e546.png)


## Main character

 The main character is an endless runner and is affected by the gravity of the planet, so the player has to calculate when to jump to avoid touching the slimes, because jumping too early could cause he accidentally land over one of them, 

## Scenes

**Boot Scene**

In this scene the logos are loaded to be available during the preloading of the rest of assets

**Preloader Scene**

In this scene, the assets needed to playing the game are loaded, while a progress bar shows the percentage of completion 

**Title Scene**

During this scene some information for the game could be shown. In the first version a start button will be displayed giving the chance to the user to choose the moment to begin playing. 

![game6](https://user-images.githubusercontent.com/53324035/91674344-f36f3b00-eafd-11ea-88f8-cf8f4cb505f4.png)

**PlayGame Scene**

This is the scene where tha main action occurs, the score is displayed in the upper left corner of the screen and as the character advances avoiding the enemies, the score increases in 10 per each of them.

As the score increases, so does the speed of the enemies, and due the gravity of the planet each leap gives a time to avoid the slugs. This means the player has to press the up arrow key in the right moment.

The character eventially will die, and then the score scene will start

**Score Scene**

In this scene the score is shown again to the player, who types his/her name to be store in the leader board trough and internet API service

![game3](https://user-images.githubusercontent.com/53324035/91667259-dd935300-eac8-11ea-9e6a-fd4a7be47b89.png)

 **Leader board Scene**

 This scene shows the highest five scores 

![game4](https://user-images.githubusercontent.com/53324035/91667261-e126da00-eac8-11ea-8056-8451cd22981b.png)
