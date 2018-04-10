var game = new Phaser.Game(1800, 1000, Phaser.AUTO, null, { preload: preload, create: create, update: update, render: render }); // this variable sets the game up, and is implemented by the Phaser API

// the following list of variables are all sprites that are used throughout the game
var altBack, // this is the 'x' button to close the magnified clue overview
    altScroll, // this is the magnified clue background scroll
    background, // this is the image where the players stand, and takes up the game bounds from (0, 0) to (1800, 700)
    book, // this is the book menu background image
    bookBackButton, // this is the book menu back button
    booksButton, // this is the button that the player presses to access the book menu
    bugs1, // this is the first page of information in the bugs book
    bugs2, // this is the second page of information in the bugs book
    bugs3, // this is the third page of information in the bugs book
    bugs4, // this is the fourth page of information in the bugs book
    bugsTab, // this is the book tab that takes the player to the bugs book
    bugsTitle, // this is the title image of the bugs book
    clueSearchHoofPrints, // this is the hoof print image that appears on the clue search scene
    clueSearchKey, // this is the key image that appears on the clue search scene
    clueSearchLetter, // this is the letter image that appears on the clue search scene
    clueSearchMaggot, // this is the maggot image that appears on the clue search scene
    clueSearchNote, // this is the note image that appears on the clue search scene
    constable, // this is the constable character sprite
    corpse, // this is the dead body sprite
    clueSearchHint, // this is the pop-up box that prompts the player to tap the clues to collect them
    destination, // this is the 1 pixel sprite that is spawned when the player taps on the screen to walk somewhere
    dialogueArrow, // this is the three dots in the dialogue box that appear to show the player they can continue the dialogue
    dialogueBox, // this is the dialogue box that spans the game bounds from (0, 700) to (1800, 1000)
    dialogueLine, // this is the line of text that changes every line to reflet the line of dialogue being read from the dialogue arrays
    directionArrow, // this is the poiting arrow in the house scene
    done, // this is the done button in the clue search scene
    door, // this is the door sprite that the player can press to leave the house scene
    gotIt, // this is the button to get rid of the clueSearchHint pop-up box
    grandfather, // this is the grandfather character sprite
    hoofAlt, // this is the magnified hoof print image
    hoofAltText, // this is the magnified hoof print text
    hoofClue, // this is the hoof print clue image that appears in the player's bag
    hoofMag, // this is the magnifiying glass icon next to the hoof print image in the bag
    keyAlt, // this is the magnified key image
    keyAltText, // this is the magnified key text
    keyClue, // this is the key clue image that appears in the player's bag
    keyMag, // this is the magnifiying glass icon next to the key image in the bag
    letterAlt, // this is the magnified letter image
    letterAltText, // this is the magnified letter text displayed if the player didn't also find the note
    letterAltTextBoth, // this is the magnified letter text displayed if the player did also find the note
    letterClue, // this is the letter clue image that appears in the player's bag
    letterMag, // this is the magnifiying glass icon next to the letter image in the bag
    loadingScreen, // this is the loading screen image
    loseScreen, // this is the lose screen image
    maggotAlt, // this is the magnified maggot image
    maggotAltText, // this is the magnified meggot text
    maggotClue, // this is the meggot clue image that appears in the player's bag
    maggotMag, // this is the magnifiying glass icon next to the meggot image in the bag
    menuButton, // this is the button that the player presses to access the pause menu
    menuScroll, // this is the pause menu background scroll
    nextPageTab, // this is the arrow button on the bottom right of the book manu, used to go the next page
    no, // this is the button the player presses if they want to go back and check for more clues on the crime scene screen
    noteAlt, // this is the magnified note image
    noteAltText, // this is the magnified note text
    noteAltTextBoth, // this is the magnified note text
    noteClue, // this is the note clue image that appears in the player's bag
    noteMag, // this is the magnifiying glass icon next to the note image in the bag
    playButton, // this is the play button on the title screen
    player, // this is the player character sprite
    poison1, // this is the first page of information in the poison book
    poison2, // this is the second page of information in the poison book
    poison3, // this is the third page of information in the poison book
    poison4, // this is the fourth page of information in the poison book
    poisonedAlt, // this is the magnified poisoned face image
    poisonedAltText, // this is the magnified poisoned face text
    poisonedClue, // this is the poisoned face clue that appears in the player's bag
    poisonedMag, // this is the magnifiying glass icon next to the poisoned face image in the bag
    poisonTab, // this is the book tab that takes the player to the poison book
    poisonTitle, // this is the title image of the poison book
    previousPageTab, // this is the arrow button on the bottom left of the book manu, used to go the previous page
    quitButton, // this is the quit game button on the title screen and in the pause menu
    resumeButton, // this is the resume game button in the pause menu
    satchelBackButton, // this is the back button to exit out of the bag manu
    satchelButton, // this is the button the player presses to access the bag manu
    speaker, // this is the dialogue speaker's name that appears just above the dialogue line
    startOverButton, // this is the start over game in the pause menu
    watch, // this is the grandfather's watch icon in the bag
    winScreen, // this is the win screen image
    yes; // this is the button used when the player is satisfied that they've found all of the clues and wish to progress to the confrontation

// the following list of variables are all values that are used to replace 'magic numbers' in the code, or act as checklist
var alted = false, // this is used so that the player cannot magnify one clue while another is already magnified
    bookOut = "poison", // this is used to determine with set of book pages to display to the player
    characterDelay = 25, // this is the wait time between character printing in the dialogue line
    characterOn, // this is the number character the line of dialogue is currently printing
    cluesFound = [], // this is an array of the clues found, the order of which is used to determine the place of each clue in the bag menu
    crimeSceneCount = 1, // this is used to determine which array of crime scene dialogue to read from
    direction = "left", // this is used to set the direction the character sprite is facing
    footstepPlaying = false, // this is set to true when the player starts walking, and false when they stop, so that you can't layer many instances of the sound effect
    guess = "", // the value of this changes to the name of the last clue the player selected to present to the Baron
    hoofFound = false, // this is set to true when the player finds the hoof print clue
    keyFound = false, // this is set to true when the player finds the key clue
    letterFound = false, // this is set to true when the player find the letter clue
    lineOn, // this is the array slot currently being read from in the dialogue
    lost = false, // this is used to determine if the Baron should say the losing dialogue and display the lose screen
    maggotFound = false, // this is set to true when the player finds the maggot clue
    mistakes = 0, // this is incremented every time the player presents the wrong clue to the Baron
    moving = false, // this is used to determine what the player's body velocity should be 
    noteFound = false, // this is set to true when the player finds the note clue
    pageOn = 0, // this is used to determine which page out the book that's out to display
    paused = false, // this is used to deactivate any buttons and movement when the game is paused
    poisonedFound = false, // this is set to true when the constable mentions the potential poisoning
    prompting = false, // this is set to true in the confrontation scene when the player is asked to present a clue, and makes sure you can't present one out of time
    scene = "title", // this is used to determine who's present, what the background image and music are, and which array of dialogue to be reading
    successes = 0, // this is incremented when the player correctly presents a clue to the Baron
    watchGiven = false, // this is set to true when the player selects the watch from the bag and presents it to the grandfather
    writing = false; // this is used to hide the dialogue dots and stop the player skipping dialogue

// the following list of variables are all the audio files used in the game, and are implemented using the Howler API
var bag = new Howl({ src: ['audio/bag.wav'], volume: 0.4 }), // this is the bag opening sound effect
    baitmanTalk = new Howl({ src: ['audio/baitmanTalk.wav'], loop: 1, volume: 0.5 }), // this is the sound effect used when the Baron is talking
    bookClose = new Howl({ src: ['audio/bookClose.mp3'] }), // this is the book closing sound effect
    clueSearchMusic = new Howl({ src: ['audio/clueSearchMusic.mp3'], loop: 1, volume: 0.4 }), // this is the music played on the clue search screen
    confrontationMusic = new Howl({ src: ['audio/confrontationMusic.mp3'], loop: 1, volume: 0.4 }), // this is the music played on the confrontation screen
    constableTalk = new Howl({ src: ['audio/constableTalk.wav'], loop: 1, volume: 0.8 }), // this is the sound effect used when the constable is takling
    crimeSceneMusic1 = new Howl({ src: ['audio/crimeSceneMusic1.mp3'], loop: 1, volume: 0.4 }), // this is the music played on the first instance of the crime scene screen
    crimeSceneMusic2 = new Howl({ src: ['audio/crimeSceneMusic2.mp3'], loop: 1, volume: 0.4 }), // this is the music played on the rest of the instances of the crime scene screen
    cymbal = new Howl({ src: ['audio/cymbal.mp3'] }), // this is the sound effect used when everyone shouts "WHAT?!" in the confrontation scene
    footstep = new Howl({ src: ['audio/footstep.mp3'], loop: 1 }), // this is the footstep sound effect played when the player is walking
    grandfatherTalk = new Howl({ src: ['audio/grandfatherTalk.wav'], loop: 1, volume: 1 }), // this is the sound effect used when the grandfather is talking
    houseMusic = new Howl({ src: ['audio/houseMusic.mp3'], volume: 0.4, loop: 1 }), // this is the music played on the house screen
    pageTurn = new Howl({ src: ['audio/pageTurn.mp3'] }), // this is the sound effect used when the player opens the book or turns the page
    paper = new Howl({ src: ['audio/paper.wav'], volume: 0.4 }), // this is the sound effect used when the player collects the note and letter clues
    pickUpHoof = new Howl({ src: ['audio/pickUpHoof.wav'], volume: 0.4 }), // this is the sound effect used when the player collects the hoof print clues
    pickUpKey = new Howl({ src: ['audio/pickUpKey.wav'], volume: 0.2 }), // this is the sound effect used when the player collects the key clue
    pickUpMaggot = new Howl({ src: ['audio/pickUpMaggot.wav'], volume: 0.4 }), // this is the sound effect used when the player collects the maggot clue
    playerTalk = new Howl({ src: ['audio/playerTalk.wav'], loop: 1, volume: 0.2 }), // this is the sound effect used when the player is talking
    ting = new Howl({ src: ['audio/ting.wav'], volume: 0.5 }); // this is the ting sound effect when the player presents a clue at the correct time to the Baron

function preload() {
    this.game.load.image('titleScreen', 'images/titleScreen.png'); // this loads in the title screen image
    this.game.load.image('playButton', 'images/playButton.png'); // this loads in the play button for the title screen
    this.game.load.image('house_background', 'images/house_background.png'); // this loads in the house scene background image
    this.game.load.image('door', 'images/door.png'); // this loads in the house scene door sprite
    this.game.load.image('crimeScene_background', 'images/crimeScene_background.png'); // this loads in the crime scene background image
    this.game.load.image('corpseDoor', 'images/corpseDoor.png'); // this loads in the crime scene corpse scene skip sprite
    this.game.load.image('clueSearch_background', 'images/clueSearch_background.png'); // this loads in the clue search scene background image
    this.game.load.image('confrontation_background', 'images/confrontation_background.png'); // this loads in the confrontation scene background image
    this.game.load.image('dialogueBox', 'images/dialogueBox.png'); // this loads in the dialogue box image
    this.game.load.spritesheet('dialogueArrow', 'images/dialogueArrow.png', 90, 28); // this loads in the thre-dotted sprite that indicated the dialogue can be progressed
    this.game.load.image('menuButton', 'images/menuButton.png'); // this loads in the menu button image
    this.game.load.image('menu', 'images/menu.png'); // this loads in the menu scroll image
    this.game.load.image('resumeButton', 'images/resumeButton.png'); // this loads in the resume button image
    this.game.load.image('startOverButton', 'images/startOverButton.png'); // this loads in the start over button image
    this.game.load.image('quitButton', 'images/quitButton.png'); // this loads in the quit button image
    this.game.load.image('booksButton', 'images/booksButton.png'); // this loads in the books button image
    this.game.load.image('book', 'images/book.png'); // this loads in the book screen image
    this.game.load.image('bookBackButton', 'images/bookBackButton.png'); // this loads in the books back button image
    this.game.load.image('poisonTab', 'images/poisonTab.png'); // this loads in the poison book tab image
    this.game.load.image('poisonTitle', 'images/poisonTitle.png'); // this loads in the poison book title image
    this.game.load.image('bugsTab', 'images/bugsTab.png'); // this loads in the bugs book tab image
    this.game.load.image('bugsTitle', 'images/bugsTitle.png'); // this loads in the bugs book title image
    this.game.load.image('bugs1', 'images/bugs1.png'); // this loads in the first page of information for the bugs book
    this.game.load.image('bugs2', 'images/bugs2.png'); // this loads in the second page of information for the bugs book
    this.game.load.image('bugs3', 'images/bugs3.png'); // this loads in the third page of information for the bugs book
    this.game.load.image('bugs4', 'images/bugs4.png'); // this loads in the fourth
    this.game.load.image('poison1', 'images/poison1.png'); // this loads in the first page of information for the poison book
    this.game.load.image('poison2', 'images/poison2.png'); // this loads in the second page of information for the poison book
    this.game.load.image('poison3', 'images/poison3.png'); // this loads in the third page of information for the poison book
    this.game.load.image('poison4', 'images/poison4.png'); // this loads in the fourth page of information for the poison book
    this.game.load.image('nextPageTab', 'images/nextPageTab.png'); // this loads in the next book page button image
    this.game.load.image('previousPageTab', 'images/previousPageTab.png'); // this loads in the previous book page button image
    this.game.load.image('yes', 'images/yes.png'); // this loads in the 'I'm satisfied' button that's displayed on the crime scene screen
    this.game.load.image('no', 'images/no.png'); // this loads in the 'Maybe one more look' button that's displayed on the crime scene screen
    this.game.load.image('done', 'images/doneButton.png'); // this loads in the done button that's on the clue search scene screen
    this.game.load.spritesheet('directionArrow', 'images/directionArrow.png', 326, 99); // this loads in the poiting arrow sprite that's in the house scene
    this.game.load.image('destination', 'images/destination.png'); // this loads in the destination sprite that's used for the player's movement
    this.game.load.spritesheet('player', 'images/player.png', 150, 150); // this loads in the player sprite
    this.game.load.spritesheet('grandfather', 'images/grandfather.png', 225, 225); // this loads in the grandfather sprite
    this.game.load.spritesheet('constable', 'images/constable.png', 250, 250); // this loads in the constable sprite
    this.game.load.image('corpse', 'images/body.png'); // this loads in the dead body sprite
    this.game.load.image('clueSearchHint', 'images/clueSearchHint.png'); // this loads the pop-up box that prompts the player to tap the clues
    this.game.load.image('gotIt', 'images/gotIt.png'); // this loads the image for the button to close the clueSearchHint pop-up box
    this.game.load.image('clueSearch_key', 'images/clueSearch_key.png'); // this loads in the key clue on the clue search scene screen
    this.game.load.image('clueSearch_hoofPrints', 'images/hoofPrints.png'); // this loads in the hoof clue on the clue search scene screen
    this.game.load.spritesheet('clueSearch_maggot', 'images/clueSearch_maggot.png', 50, 38); // this loads in the maggot clue on the clue search scene screen
    this.game.load.image('clueSearch_note', 'images/clueSearch_note.png'); // this loads in the note clue on the clue search scene screen
    this.game.load.image('clueSearch_letter', 'images/clueSearch_letter.png'); // this loads in the letter clue on the clue search scene screen
    this.game.load.image('satchelButton', 'images/satchelButton.png') // this loads in the bag button image
    this.game.load.image('satchel', 'images/satchel.png'); // this loads in the bag screen image
    this.game.load.image('satchelBackButton', 'images/satchelBackButton.png'); // this loads in the bag back button image
    this.game.load.image('watch', 'images/watch.png'); // this loads in the grandfather's watch image
    this.game.load.image('poisoned', 'images/poisoned.png'); // this loads in the poisoned face image in the bag
    this.game.load.image('keyClue', 'images/keyClue.png'); // this loads in the key image in the bag
    this.game.load.image('hoofClue', 'images/hoofClue.png'); // this loads in the hoof print image in the bag
    this.game.load.image('maggotClue', 'images/maggot.png'); // this loads in the maggot image in the bag
    this.game.load.image('noteClue', 'images/noteClue.png'); // this loads in the note image in the bag
    this.game.load.image('letterClue', 'images/letterClue.png'); // this loads in the letter image in the bag
    this.game.load.image('magnify', 'images/magnify.png'); // this loads in the magnifying glass image
    this.game.load.image('altScroll', 'images/altScroll.png'); // this loads in the scroll image for when you magnify a clue
    this.game.load.image('altBack', 'images/altBack.png'); // this loads in the magnified clue x button image
    this.game.load.image('poisonedAlt', 'images/poisonedAlt.png'); // this loads in the poisoned face magnified image
    this.game.load.image('keyAlt', 'images/keyAlt.png'); // this loads in the key magnified image
    this.game.load.image('hoofAlt', 'images/hoofAlt.png'); // this loads in the hoof print magnified image
    this.game.load.image('maggotAlt', 'images/maggotAlt.png'); // this loads in the maggot magnified image
    this.game.load.image('noteAlt', 'images/noteAlt.png'); // this loads in the note magnified image
    this.game.load.image('letterAlt', 'images/letterAlt.png'); // this loads in the letter magnified image
    this.game.load.image('poisonedAltText', 'images/poisonedAltText.png'); // this loads in the poisoned face description text
    this.game.load.image('keyAltText', 'images/keyAltText.png'); // this loads in the key description text
    this.game.load.image('hoofAltText', 'images/hoofAltText.png'); // this loads in the hoof print description text
    this.game.load.image('maggotAltText', 'images/maggotAltText.png'); // this loads in the maggot description text
    this.game.load.image('noteAltText', 'images/noteAltText.png'); // this loads in the note description text that's displayed when you haven't also found the letter
    this.game.load.image('letterAltText', 'images/letterAltText.png'); // this loads in the this loads in the letter description text that's displayed when you haven't also found the note
    this.game.load.image('noteAltTextBoth', 'images/noteAltTextBoth.png'); // this loads in the note description text that's displayed when you have also found the letter
    this.game.load.image('letterAltTextBoth', 'images/letterAltTextBoth.png'); // this loads in the letter description text that's displayed when you have also found the note
    this.game.load.image('loseScreen', 'images/loseScreen.png'); // this loads in the lose screen image
    this.game.load.image('winScreen', 'images/winScreen.png'); // this loads in the win screen image
    this.game.load.spritesheet('loadingScreen', 'images/loadingScreen.png', 1800, 1000); // this loads in the loading screen image
}

function create() {
    game.world.removeAll(); // this is used so that every scene transition clears the screen and starts fresh
    lineOn = -1; // this is used so that every scene transition resets the dialogue to start from the beginning of it's respective tree
    if (scene == "title") {
        background = game.add.image(0, 0, 'titleScreen');
        playButton = game.add.button(700, 500, 'playButton', nextSceneLoad, this);
    } else if (scene == "house") {
        background = game.add.image(0, 0, 'house_background');
        houseMusic.play();
    } else if (scene == "crime scene") {
        background = game.add.image(0, 0, 'crimeScene_background');
        if (crimeSceneCount == 1) { houseMusic.stop(); crimeSceneMusic1.play(); }
        else { clueSearchMusic.stop(); crimeSceneMusic2.play(); }
    } else if (scene == "clue search") {
        background = game.add.image(0, 0, 'clueSearch_background');
        if (crimeSceneCount == 1) {
            crimeSceneMusic1.stop();
        } else {
            crimeSceneMusic2.stop();
        }
        clueSearchMusic.play();
    } else if (scene == "confrontation") {
        background = game.add.image(0, 0, 'confrontation_background');
        crimeSceneMusic2.stop()
        confrontationMusic.play();
    } //this if statement assigns the correct background image and music for the scene

    dialogueBox = game.add.image(0, 700, 'dialogueBox');
    dialogueArrow = game.add.sprite(1600, 900, 'dialogueArrow');
    speaker = game.add.text(120, 740, "");
    dialogueLine = game.add.text(100, 800, "");
    directionArrow = game.add.sprite(150, 300, 'directionArrow');
    directionArrow.visible = false;
    constable = game.add.sprite(1450, 393, 'constable');
    corpse = game.add.sprite(300, 585, 'corpse');
    grandfather = game.add.sprite(1300, 425, 'grandfather');
    player = game.add.sprite(1000, 500, 'player');
    menuButton = game.add.button(1725, 630, 'menuButton', showMenu, this);
    booksButton = game.add.button(1635, 630, 'booksButton', showBooks, this);
    satchelButton = game.add.button(1545, 630, 'satchelButton', showSatchel, this);
    yes = game.add.button(550, 850, 'yes', accept, this);
    no = game.add.button(900, 850, 'no', decline, this);
    yes.visible = false;
    no.visible = false;
    done = game.add.button(300, 900, 'done', nextSceneLoad, this);
    door = game.add.button(0, 0, 'door', nextSceneLoad, this);
    if (scene != "house") { door.visible = false; }
    if (crimeSceneCount == 1) {
        corpseDoor = game.add.button(corpse.x, corpse.y, 'corpseDoor', nextSceneLoad, this);
    } else { corpseDoor = game.add.button(corpse.x, corpse.y, 'corpseDoor', previousSceneLoad, this) }
    if (scene != "crime scene") { corpseDoor.visible = false; }
    loadingScreen = game.add.sprite(0, 0, 'loadingScreen');
    // this group of code creates the images that are used in most scenes, the characters, the dialogue area, the menu buttons, and the doors, and makes them invisible when they're not in use

    menuScroll = game.add.image(550, -800, 'menu');
    resumeButton = game.add.button(700, 235, 'resumeButton', resume, this);
    startOverButton = game.add.button(700, 410, 'startOverButton', startOver, this);
    quitButton = game.add.button(700, 585, 'quitButton', quit, this);
    menuScroll.visible = false;
    resumeButton.visible = false;
    startOverButton.visible = false;
    quitButton.visible = false;
    // this group of code create the pause menu for the game, and makes it invisible, to be called for when needed

    book = game.add.image(150, 75, 'book');
    bookBackButton = game.add.button(253, 92, 'bookBackButton', closeBook, this);
    poisonTab = game.add.button(1535, 150, 'poisonTab', openPoison, this);
    poisonTab.rotation = -0.05;
    poisonTitle = game.add.image(1000, 250, 'poisonTitle');
    poisonTitle.visible = false;
    bugsTab = game.add.button(1605, 500, 'bugsTab', openBugs, this);
    bugsTab.rotation = -0.05;
    bugsTitle = game.add.image(1000, 300, 'bugsTitle');
    bugsTitle.visible = false;
    bugs1 = game.add.image(250, 200, 'bugs1');
    bugs1.visible = false;
    bugs2 = game.add.image(950, 200, 'bugs2');
    bugs2.visible = false;
    bugs3 = game.add.image(250, 200, 'bugs3');
    bugs3.visible = false;
    bugs4 = game.add.image(950, 200, 'bugs4');
    bugs4.visible = false;
    poison1 = game.add.image(250, 200, 'poison1');
    poison1.visible = false;
    poison2 = game.add.image(950, 200, 'poison2');
    poison2.visible = false;
    poison3 = game.add.button(250, 200, 'poison3', rightPoison, this); // this page only is a button because when the player is prompted to find the correct poison in the crime scene screen, this is the one they have to pick
    poison3.visible = false;
    poison4 = game.add.image(950, 200, 'poison4');
    poison4.visible = false;
    nextPageTab = game.add.button(1475, 775, 'nextPageTab', nextPage, this);
    previousPageTab = game.add.button(220, 770, 'previousPageTab', previousPage, this);
    nextPageTab.visible = false;
    previousPageTab.visible = false;
    book.visible = false;
    bookBackButton.visible = false;
    poisonTab.visible = false;
    bugsTab.visible = false;
    // this group of code creates the books the player has to use, the contents, tabs, page turners and titles, and makes it all invisible

    satchel = game.add.image(100, 100, 'satchel');
    satchel.visible = false;
    satchelBackButton = game.add.button(775, 850, 'satchelBackButton', closeSatchel, this);
    satchelBackButton.visible = false;
    // this small group of code makes the bag that the player's clues will be put into when they collect them on the clue search screen

    clueSearchKey = game.add.button(860, 330, 'clueSearch_key', keyFind, this);
    if (scene != "clue search") { clueSearchKey.visible = false; }
    clueSearchHoofPrints = game.add.button(0, 0, 'clueSearch_hoofPrints', hoofFind, this);
    if (scene != "clue search") { clueSearchHoofPrints.visible = false; }
    clueSearchMaggot = game.add.button(910, 300, 'clueSearch_maggot', maggotFind, this);
    if (scene != "clue search") { clueSearchMaggot.visible = false; }
    clueSearchNote = game.add.button(1300, 25, 'clueSearch_note', noteFind, this);
    if (scene != "clue search") { clueSearchNote.visible = false; }
    clueSearchLetter = game.add.button(1500, 500, 'clueSearch_letter', letterFind, this);
    if (scene != "clue search") { clueSearchLetter.visible = false; }
    //these statement make the clues on the clue search screen

    watch = game.add.button(800, 280, 'watch', presentWatch, this);
    watch.visible = false;
    poisonedClue = game.add.button(400, 268, 'poisoned', presentPoisoned, this);
    poisonedClue.visible = false;
    keyClue = game.add.button(300, 250, 'keyClue', presentKey, this);
    keyClue.visible = false;
    hoofClue = game.add.button(300, 250, 'hoofClue', presentHoof, this);
    hoofClue.visible = false;
    maggotClue = game.add.button(300, 250, 'maggotClue', presentMaggot, this);
    maggotClue.visible = false;
    noteClue = game.add.button(300, 250, 'noteClue', presentNote, this);
    noteClue.visible = false;
    letterClue = game.add.button(300, 250, 'letterClue', presentLetter, this);
    letterClue.visible = false;
    poisonedMag = game.add.button(0, 0, 'magnify', magnifyPoisoned, this);
    poisonedMag.visible = false;
    keyMag = game.add.button(0, 0, 'magnify', magnifyKey, this);
    keyMag.visible = false;
    hoofMag = game.add.button(0, 0, 'magnify', magnifyHoof, this);
    hoofMag.visible = false;
    maggotMag = game.add.button(0, 0, 'magnify', magnifyMaggot, this);
    maggotMag.visible = false;
    noteMag = game.add.button(0, 0, 'magnify', magnifyNote, this);
    noteMag.visible = false;
    letterMag = game.add.button(0, 0, 'magnify', magnifyLetter, this);
    letterMag.visible = false;
    altScroll = game.add.image(332, 81, 'altScroll');
    altScroll.visible = false;
    altBack = game.add.button(1400, 200, 'altBack', closeAlt, this);
    altBack.visible = false;
    poisonedAlt = game.add.image(660, 500, 'poisonedAlt');
    poisonedAlt.anchor.setTo(0.5, 0.5);
    poisonedAlt.visible = false;
    keyAlt = game.add.image(660, 500, 'keyAlt');
    keyAlt.anchor.setTo(0.5, 0.5);
    keyAlt.visible = false;
    hoofAlt = game.add.image(660, 500, 'hoofAlt');
    hoofAlt.anchor.setTo(0.5, 0.5);
    hoofAlt.visible = false;
    maggotAlt = game.add.image(660, 500, 'maggotAlt');
    maggotAlt.anchor.setTo(0.5, 0.5);
    maggotAlt.visible = false;
    noteAlt = game.add.image(660, 500, 'noteAlt');
    noteAlt.anchor.setTo(0.5, 0.5);
    noteAlt.visible = false;
    letterAlt = game.add.image(660, 500, 'letterAlt');
    letterAlt.anchor.setTo(0.5, 0.5);
    letterAlt.visible = false;
    poisonedAltText = game.add.image(1075, 500, 'poisonedAltText');
    poisonedAltText.anchor.setTo(0.5, 0.5);
    poisonedAltText.visible = false;
    keyAltText = game.add.image(1075, 500, 'keyAltText');
    keyAltText.anchor.setTo(0.5, 0.5);
    keyAltText.visible = false;
    hoofAltText = game.add.image(1075, 500, 'hoofAltText');
    hoofAltText.anchor.setTo(0.5, 0.5);
    hoofAltText.visible = false;
    maggotAltText = game.add.image(1075, 500, 'maggotAltText');
    maggotAltText.anchor.setTo(0.5, 0.5);
    maggotAltText.visible = false;
    noteAltText = game.add.image(1075, 500, 'noteAltText');
    noteAltText.anchor.setTo(0.5, 0.5);
    noteAltText.visible = false;
    letterAltText = game.add.image(1075, 500, 'letterAltText');
    letterAltText.anchor.setTo(0.5, 0.5);
    letterAltText.visible = false;
    noteAltTextBoth = game.add.image(1075, 500, 'noteAltTextBoth');
    noteAltTextBoth.anchor.setTo(0.5, 0.5);
    noteAltTextBoth.visible = false;
    letterAltTextBoth = game.add.image(1075, 500, 'letterAltTextBoth');
    letterAltTextBoth.anchor.setTo(0.5, 0.5);
    letterAltTextBoth.visible = false;
    // this very large list of statements is used to create all the clue images that appear in the bag, the magnifying glass icon next to each, and the magnified view and description of each clue, along with the back button to return to the bag

    game.physics.enable(constable, Phaser.Physics.ARCADE);
    game.physics.enable(corpse, Phaser.Physics.ARCADE);
    game.physics.enable(grandfather, Phaser.Physics.ARCADE);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    // these four lines enable the physics of the characters and the corpse

    player.anchor.setTo(0.5, 0);
    player.body.setSize(player.width - 40, player.height - 20, 20, 20);
    grandfather.anchor.setTo(0.5, 0);
    grandfather.body.setSize(grandfather.width - 80, grandfather.height - 20, 20, 20);
    // these four lines set the anchors and sprites of the two (potentially) moving characters

    player.animations.add('playerIdleRight', [7], 1, true);
    player.animations.add('playerIdleLeft', [4], 1, true);
    player.animations.add('playerIdleFront', [1], 1, true);
    player.animations.add('playerIdleBack', [10], 1, true);
    player.animations.add('moveRight', [8, 7, 6, 7], 8, true);
    player.animations.add('moveLeft', [5, 4, 3, 4], 8, true);
    grandfather.animations.add('grandfatherIdleRight', [7], 1, true);
    grandfather.animations.add('grandfatherIdleLeft', [4], 1, true);
    grandfather.animations.add('grandfatherIdleFront', [1], 1, true);
    grandfather.animations.add('grandfatherIdleBack', [10], 1, true);
    constable.animations.add('constableIdleLeft', [4], 1, true);
    constable.animations.add('constableIdleFront', [1], 1, true);
    constable.animations.add('constableIdleBack', [10], 1, true);
    dialogueArrow.animations.add('arrowMove', [0, 1, 2, 3], 2, true);
    directionArrow.animations.add('point', [0, 1, 2, 3, 4, 3, 2, 1], 4, true);
    clueSearchMaggot.animations.add('wriggle', [0, 1, 2], 3, true);
    loadingScreen.animations.add('load', [0, 1, 2, 3], 2, true);
    // these are all the declared animations for the character sprites, dialogue progression sprite, house arrow, maggots on the clue search screen, and loading screen

    if (scene != "clue search") {
        direction = "left";
        done.visible = false;
        nextLine();
    }// this if statement is just here so the player faces the body on the clue search screen, and spawns facing left on the others

    if (scene == "clue search" && crimeSceneCount == 1) {
        clueSearchHint = game.add.image(700, 350, 'clueSearchHint');
        gotIt = game.add.button(825, 560, 'gotIt', closeHint, this);
    } // this if statement creates the pop-up that tells the player to collect clues in the clue search screen

    if (scene == "title") {
        quitButton.visible = true;
        quitButton.x = 700;
        quitButton.y = 700;
        dialogueBox.visible = false;
        menuButton.visible = false;
        booksButton.visible = false;
        satchelButton.visible = false;
        player.visible = false;
        grandfather.visible = false;
        constable.visible = false;
        corpse.visible = false;
        loadingScreen.alpha = 0;
    } else if (scene != "title") {
        loadingScreen.animations.play('load');
        game.time.events.add(Phaser.Timer.SECOND * 0, loadOut, this);
    } // this if statement hides all the last images that are displayed on all screens except the title screen, and fades out the loading screen
}

function nextLine() { // this function displays the next line of dialogue
    lineOn++; // this progresses the dialogue line by line by incrementing the array slot being read from
    prompting = false; // this stops the player being able to present clues at a time other than when asked

    playerTalk.stop();
    grandfatherTalk.stop();
    constableTalk.stop();
    baitmanTalk.stop();
    // these make sure no characters are talking over each other when another starts talking

    if (scene == "house" && lineOn == houseLine.length) { return; }
    else if (scene == "crime scene" && lineOn == crimeSceneOneLine.length && crimeSceneCount == 1) { return; }
    else if (scene == "crime scene" && lineOn == crimeSceneTwoLine.length && crimeSceneCount == 2) { return; }
    else if (scene == "crime scene" && lineOn == crimeSceneRestLine.length && crimeSceneCount > 2) { return; }
    else if (scene == "confrontation" && lineOn == confrontationLine.length) { return; }
    // these stop the dialogue progressing if there's nothing else to say on that screen

    dialogueLine.text = ""; // this clears the dialogue so what's written next is a new line
    characterOn = 0; // this starts the line from the first character
    writing = true; // this is reffered to later and is used to hide the three dots that indicate the dialogue can be progressed

    if (mistakes == 3) {
        speaker.text = "Baron Abraham Baitman";
        baitmanTalk.play();
        game.time.events.repeat(characterDelay, lose[lineOn].length, nextCharacter, this); // each line like this calls upon the nextCharacter funtion, with a set delay (characterDelay) in-between each call, and does it the amount of times as there are characters in the line
        // this is called upon when the player presents three clues at the wrong time, and causes the Baron to go through the lose dialogue and show the lose screen
    } else if ((successes == 1 && !hoofFound) || (successes == 2 && !noteFound) || (successes == 3 && !letterFound) || (successes == 4 && !maggotFound) || (successes == 5 && !keyFound)) {
        if (!lost) {
            lineOn = 0;
            lost = true;
        }
        if (lineOn == 0) {
            speaker.text = "Florence";
            playerTalk.play();
        } else {
            speaker.text = "Baron Abraham Baitman";
            baitmanTalk.play();
        }
        game.time.events.repeat(characterDelay, loseMiss[lineOn].length, nextCharacter, this);
        // this is called upon if the player didn't find the clue that they now need to present, and causes the lose dialogue and screen
    } else if (scene == "house") {
        if (lineOn != 2) {
            speaker.text = "Grandfather";
            grandfatherTalk.play();
        } else {
            speaker.text = "";
        } // this if statement makes sure that the 'narrator' text isn't said by the grandfather
        game.time.events.repeat(characterDelay, houseLine[lineOn].length, nextCharacter, this);
    } else if (scene == "crime scene" && crimeSceneCount == 1) {
        if (lineOn == 0 || lineOn == 2 || lineOn == 4 || lineOn == 5 || lineOn == 6 || lineOn == 7 || lineOn == 8) {
            speaker.text = "Constable Perkins";
            constableTalk.play();
        } else if (lineOn == 1) {
            speaker.text = "Grandfather";
            grandfatherTalk.play();
        } else if (lineOn == 3) {
            speaker.text = "Florence";
            playerTalk.play();
        } else {
            speaker.text = "";
        } // this if statement makes sure the right name is displayed for who's talking
        game.time.events.repeat(characterDelay, crimeSceneOneLine[lineOn].length, nextCharacter, this);
        if (lineOn == 7) {
            poisonedFound = true;
        } // this is used so when the constable mentions poison, the clue is given to the player and is able to be seen in the bag
    } else if (scene == "crime scene" && crimeSceneCount == 2) {
        if (lineOn == 0 || lineOn == 12) {
            speaker.text = "Grandfather";
            grandfatherTalk.play();
        } else if (lineOn == 1) {
            speaker.text = "";
        } else if (lineOn == 2 || lineOn == 4 || lineOn == 5 || lineOn == 7 || lineOn == 9 || lineOn == 10 || lineOn == 11 || lineOn == 15 || lineOn == 17 || lineOn == 18) {
            speaker.text = "Florence";
            playerTalk.play();
        } else {
            speaker.text = "Constable Perkins";
            constableTalk.play();
        } // the .play() parts of these lines play on repeat the voice sound effect for the respective character
        game.time.events.repeat(characterDelay, crimeSceneTwoLine[lineOn].length, nextCharacter, this);
        if (lineOn == 14) {
            yesNoPrompt();
        } // this brings up the yes and no buttons asking if the player thinks they've found all the clues
    } else if (scene == "crime scene" && crimeSceneCount > 2) {
        if (lineOn == 0 || lineOn == 2) {
            speaker.text = "Constable Perkins";
            constableTalk.play();
        } else {
            speaker.text = "Florence";
            playerTalk.play();
        }
        game.time.events.repeat(characterDelay, crimeSceneRestLine[lineOn].length, nextCharacter, this);
        if (lineOn == 0) {
            yesNoPrompt();
        }
    } else if (scene == "confrontation" && successes == 0 && mistakes == 0 && guess == "") { // such a long determiner is used because there are many different dialogue trees used in the scene
        if (lineOn == 0 || lineOn == 1) {
            speaker.text = "Constable Perkins";
            constableTalk.play();
        } else if (lineOn == 2) {
            speaker.text = "Grandfather";
            grandfatherTalk.play();
        } else if (lineOn == 3 || lineOn == 5 || lineOn == 7 || lineOn == 9) {
            speaker.text = "Florence";
            playerTalk.play();
        } else if (lineOn == 4 || lineOn == 6 || lineOn == 8 || lineOn == 10) {
            speaker.text = "Baron Abraham Baitman";
            baitmanTalk.play();
        } else {
            speaker.text = "";
        }
        game.time.events.repeat(characterDelay, confrontationLine[lineOn].length, nextCharacter, this);
    } else if (scene == "confrontation" && guess != "" && !lost) {
        if (successes == 0) {
            if (lineOn == 0 || lineOn == 2 || lineOn == 4 || lineOn == 5 || lineOn == 7 || lineOn == 8 || lineOn == 10 || lineOn == 11 || lineOn == 13 || lineOn == 14 || lineOn == 16) {
                speaker.text = "Florence";
                playerTalk.play();
            } else {
                speaker.text = "Baron Abraham Baitman";
                baitmanTalk.play();
            }
            game.time.events.repeat(characterDelay, presentPoisonedLine[lineOn].length, nextCharacter, this);
            // this is used for when the player needs to present the poisoned face clue
        } else if (successes == 1 && !lost) {
            if (lineOn == 0 || lineOn == 2 || lineOn == 3 || lineOn == 5 || lineOn == 7 || lineOn == 8 || lineOn == 11 || lineOn == 13 || lineOn == 14 || lineOn == 16) {
                speaker.text = "Florence";
                playerTalk.play();
            } else {
                speaker.text = "Baron Abraham Baitman";
                baitmanTalk.play();
            }
            game.time.events.repeat(characterDelay, presentHoofLine[lineOn].length, nextCharacter, this);
            // this is used for when the player needs to present the hoof print clue
        } else if (successes == 2 && !lost) {
            if (lineOn == 0 || lineOn == 2 || lineOn == 4 || lineOn == 5 || lineOn == 7 || lineOn == 9 || lineOn == 10 || lineOn == 12 || lineOn == 13 || lineOn == 15) {
                speaker.text = "Florence";
                playerTalk.play();
            } else {
                speaker.text = "Baron Abraham Baitman";
                baitmanTalk.play();
            }
            game.time.events.repeat(characterDelay, presentNoteLine[lineOn].length, nextCharacter, this);
            // this is used for when the player needs to present the note clue
        } else if (successes == 3 && !lost) {
            if (lineOn == 0 || lineOn == 1 || lineOn == 4 || lineOn == 6 || lineOn == 7 || lineOn == 9) {
                speaker.text = "Florence";
                playerTalk.play();
            } else {
                speaker.text = "Baron Abraham Baitman";
                baitmanTalk.play();
            }
            game.time.events.repeat(characterDelay, presentLetterLine[lineOn].length, nextCharacter, this);
            // this is used for when the player needs to present the letter clue
        } else if (successes == 4 && !lost) {
            if (lineOn == 0 || lineOn == 1 || lineOn == 3 || lineOn == 5) {
                speaker.text = "Florence";
                playerTalk.play();
            } else {
                speaker.text = "Baron Abraham Baitman";
                baitmanTalk.play();
            }
            game.time.events.repeat(characterDelay, presentMaggotLine[lineOn].length, nextCharacter, this);
            // this is used for when the player needs to present the maggot clue
        } else if (successes == 5 && !lost) {
            if (lineOn == 1 || lineOn == 12 || lineOn == 16 || lineOn == 17) {
                speaker.text = "Baron Abraham Baitman";
                baitmanTalk.play();
            } else if (lineOn == 4) {
                speaker.text = "Baron Abraham Baitman | Constable Perkins | Grandfather";
                baitmanTalk.play();
                constableTalk.play();
                grandfatherTalk.play();
                cymbal.play();
            } else if (lineOn == 13) {
                speaker.text = "Constable Perkins";
                constableTalk.play();
            } else if (lineOn == 14) {
                speaker.text = "Grandfather";
                grandfatherTalk.play();
            } else {
                speaker.text = "Florence";
                playerTalk.play();
            }
            game.time.events.repeat(characterDelay, win[lineOn].length, nextCharacter, this);
            // the reason that this is an immediate win and there's no 'but what if the player doesn't present the key', is because earlier I used the if statement that compared successes and clue found booleans, so it said if the player got this far, but didn't have the key, they lose
        }

    }
}
function nextCharacter() { // this function displays the dialogue character by character
    if (scene == "house") {
        dialogueLine.text = dialogueLine.text + houseLine[lineOn].charAt(characterOn); // lines like this make the dialogue line equal to itself plus the character at characterOn position on lineOn line in the respective array, in this case houseLine
        characterOn++; // this increments the character read, so it can be displayed in the string
        if (dialogueLine.text == houseLine[lineOn]) { // this checks to see if the dialogue line is the same as the string it's reading from the array
            hush(); // this stops the characters talking at the end of the line
            writing = false; // this allows the dialogue progressor dots to appear
        }
    } else if (scene == "crime scene" && crimeSceneCount == 1) {
        dialogueLine.text = dialogueLine.text + crimeSceneOneLine[lineOn].charAt(characterOn);
        characterOn++;
        if (dialogueLine.text == crimeSceneOneLine[lineOn]) {
            hush();
            writing = false;
        }
    } else if (scene == "crime scene" && crimeSceneCount == 2) {
        dialogueLine.text = dialogueLine.text + crimeSceneTwoLine[lineOn].charAt(characterOn);
        characterOn++;
        if (dialogueLine.text == crimeSceneTwoLine[lineOn]) {
            hush();
            writing = false;
        }
    } else if (scene == "crime scene" && crimeSceneCount > 2) {
        dialogueLine.text = dialogueLine.text + crimeSceneRestLine[lineOn].charAt(characterOn);
        characterOn++;
        if (dialogueLine.text == crimeSceneRestLine[lineOn]) {
            hush();
            writing = false;
        }
    } else if (scene == "confrontation" && guess == "") {
        dialogueLine.text = dialogueLine.text + confrontationLine[lineOn].charAt(characterOn);
        characterOn++;
        if (dialogueLine.text == confrontationLine[lineOn]) {
            hush();
            writing = false;
        }
    } else if (scene == "confrontation" && guess != "" && successes == 0 && mistakes < 3 && !lost) {
        dialogueLine.text = dialogueLine.text + presentPoisonedLine[lineOn].charAt(characterOn);
        characterOn++;
        if (dialogueLine.text == presentPoisonedLine[lineOn]) {
            if (lineOn == 1 && guess == "poisoned") {
                successes = 1;
            } // if statements like these check to see if the player presented the right clue at the correct moment in dialogue, and if so, awards a success point
            hush();
            writing = false;
        }
    } else if (scene == "confrontation" && guess != "" && successes == 1 && mistakes < 3 && !lost) {
        dialogueLine.text = dialogueLine.text + presentHoofLine[lineOn].charAt(characterOn);
        characterOn++;
        if (dialogueLine.text == presentHoofLine[lineOn]) {
            if (lineOn == 4 && guess == "hoof") {
                successes = 2;
            }
            hush();
            writing = false;
        }
    } else if (scene == "confrontation" && guess != "" && successes == 2 && mistakes < 3 && !lost) {
        dialogueLine.text = dialogueLine.text + presentNoteLine[lineOn].charAt(characterOn);
        characterOn++;
        if (dialogueLine.text == presentNoteLine[lineOn]) {
            if (lineOn == 6 && guess == "note") {
                successes = 3;
            }
            hush();
            writing = false;
        }
    } else if (scene == "confrontation" && guess != "" && successes == 3 && mistakes < 3 && !lost) {
        dialogueLine.text = dialogueLine.text + presentLetterLine[lineOn].charAt(characterOn);
        characterOn++;
        if (dialogueLine.text == presentLetterLine[lineOn]) {
            if (lineOn == 3 && guess == "letter") {
                successes = 4;
            }
            hush();
            writing = false;
        }
    } else if (scene == "confrontation" && guess != "" && successes == 4 && mistakes < 3 && !lost) {
        dialogueLine.text = dialogueLine.text + presentMaggotLine[lineOn].charAt(characterOn);
        characterOn++;
        if (dialogueLine.text == presentMaggotLine[lineOn]) {
            if (lineOn == 2 && guess == "maggot") {
                successes = 5;
            }
            hush();
            writing = false;
        }
    } else if (scene == "confrontation" && guess != "" && successes == 5 && mistakes < 3 && !lost) {
        dialogueLine.text = dialogueLine.text + win[lineOn].charAt(characterOn);
        characterOn++;
        if (dialogueLine.text == win[lineOn]) {
            if (lineOn == 18 && guess == "key") {
                winCondition();
            } // if the player presented the key, and the dialogue is on the line in the 18th slot of the win array, then the win screen is shown
            hush();
            writing = false;
        }
    } else if (mistakes == 3) {
        dialogueLine.text = dialogueLine.text + lose[lineOn].charAt(characterOn);
        characterOn++;
        if (dialogueLine.text == lose[lineOn]) {
            if (lineOn == 2) {
                loseCondition();
            } // if the player presented three clues at the wrong time, and they are on the second line of the lose array, the lose screen is shown
            hush();
            writing = false;
        }
    } else if ((successes == 1 && !hoofFound) || (successes == 2 && !noteFound) || (successes == 3 && !letterFound) || (successes == 4 && !maggotFound) || (successes == 5 && !keyFound)) {
        dialogueLine.text = dialogueLine.text + loseMiss[lineOn].charAt(characterOn);
        characterOn++;
        if (dialogueLine.text == loseMiss[lineOn]) {
            if (lineOn == 3) {
                loseCondition();
            } // if the player didn't have one of the clues needed, and is now on line 3 of the loseMiss array, the lose screen is shown
            hush();
            writing = false;
        }
    }
}
function hush() {
    playerTalk.stop();
    grandfatherTalk.stop();
    constableTalk.stop();
    baitmanTalk.stop();
} // this function is referred to mostly in the nextCharacter function, and stops all the characters talking at the end of their line of dialogue

function winCondition() {
    winScreen = game.add.image(0, 0, 'winScreen');
    confrontationMusic.stop();
    houseMusic.play();
} // this function stops the confrontation music, plays the house/win music, and shows the win screen

function loseCondition() {
    loseScreen = game.add.image(0, 0, 'loseScreen');
    confrontationMusic.stop();
    crimeSceneMusic1.play();
} // this function stops the confrontation music, plays the crime scene/lose music, and shows the lose screen

function yesNoPrompt() {
    yes.visible = true;
    no.visible = true;
} // this function displays the yes and no buttons for scene changing in the crime scene screen
function accept() {
    if (!paused) {
        yes.visible = false;
        no.visible = false;
        if (crimeSceneCount == 2) {
            lineOn = 17;
            nextLine();
        } else {
            lineOn = 3;
            nextLine();
        }
    }
} // this function makes the player tell the constable that they wish to see the Baron, and progresses the dialogue
function decline() {
    if (!paused) {
        yes.visible = false;
        no.visible = false;
        if (scene == "crime scene" && crimeSceneCount == 2) {
            lineOn = 14;
            nextLine();
        } else if (scene == "crime scene" && crimeSceneCount > 2) {
            nextLine();
        }
    }
} // this function makes the player tell the constable that they wish to see the Baron, and progresses the dialogue

function closeHint() {
    clueSearchHint.destroy();
    gotIt.destroy();
} // this functino gets rid of the pop up box prompting the player to collect clues;

function keyFind() {
    if (!gotIt.visible) {
        clueSearchKey.visible = false;
        cluesFound[cluesFound.length] = "key";
        keyFound = true;
        pickUpKey.play();
    }
} // this if statement hides the key and adds it to the satchel when the player picks it up
function hoofFind() {
    if (!gotIt.visible) {
        clueSearchHoofPrints.visible = false;
        pickUpHoof.play();
        cluesFound[cluesFound.length] = "hoof";
        hoofFound = true;
    }
} // this if statement hides the hoof prints and adds it to the satchel when the player picks it up
function maggotFind() {
    if (!gotIt.visible) {
        clueSearchMaggot.visible = false;
        cluesFound[cluesFound.length] = "maggot";
        pickUpMaggot.play();
        maggotFound = true;
    }
} // this if statement hides the maggots and adds it to the satchel when the player picks it up
function noteFind() {
    if (!gotIt.visible) {
        clueSearchNote.visible = false;
        cluesFound[cluesFound.length] = "note";
        paper.play();
        noteFound = true;
    }
} // this if statement hides the note and adds it to the satchel when the player picks it up
function letterFind() {
    if (!gotIt.visible) {
        clueSearchLetter.visible = false;
        cluesFound[cluesFound.length] = "letter";
        paper.play();
        letterFound = true;
    }
} // this if statement hides the letter and adds it to the satchel when the player picks it up

function showMenu() {
    if (!paused) {
        paused = true;
        if (moving) {
            stopMoving();
        }
        player.visible = false; 
        menuScroll.visible = true;
        resumeButton.visible = true;
        quitButton.visible = true;
        startOverButton.visible = true;
    }
} // this function brings up the pause menu
function resume() {
    paused = false;
    menuScroll.visible = false;
    resumeButton.visible = false;
    startOverButton.visible = false;
    quitButton.visible = false;
    player.visible = true;
    if (moving) {
        stopMoving();
    }
} // this function resumes the game from the start menu
function startOver() {
    window.location.reload();
} // this function restarts the game
function quit() {
    window.location.href = "https://georgebritton.nuacomputerscience.co.uk";
} //this function send the player to my blog

function showSatchel() { // this function brings up the bag and pauses the game when the bag button is tapped
    if (!paused) {
        paused = true;
        bag.play();
        satchel.visible = true;
        satchelBackButton.visible = true;
        player.visible = false;

        if (watchGiven == false) {
            watch.visible = true;
        } // this if statement is different to the rest in this function, because the player starts with the watch in their bag, and gives it away within the first 3 lines of dialogue
        if (poisonedFound) {
            poisonedClue.visible = true;
            poisonedMag.visible = true;
            poisonedMag.x = poisonedClue.x + 150;
            poisonedMag.y = poisonedClue.y;
        } // these if statements check if the player found each clue, and if they did, display them and their respective magnifying icons when the bag is open
        if (keyFound) {
            keyClue.visible = true;
            keyMag.visible = true;
            keyMag.x = keyClue.x + 150;
            keyMag.y = keyClue.y;
        }
        if (hoofFound) {
            hoofClue.visible = true;
            hoofMag.visible = true;
            hoofMag.x = hoofClue.x + 250;
            hoofMag.y = hoofClue.y;
        }
        if (maggotFound) {
            maggotClue.visible = true;
            maggotMag.visible = true;
            maggotMag.x = maggotClue.x + 250;
            maggotMag.y = maggotClue.y;
        }
        if (noteFound) {
            noteClue.visible = true;
            noteMag.visible = true;
            noteMag.x = noteClue.x + 140;
            noteMag.y = noteClue.y;
        }
        if (letterFound) {
            letterClue.visible = true;
            letterMag.visible = true;
            letterMag.x = letterClue.x + 110;
            letterMag.y = letterClue.y;
        }

        if (moving) {
            stopMoving();
        } // a simple 'stop the player moving' check
    }
}
function magnifyPoisoned() { // this function brings up the magnified picture and text of the poisoned face clue
    if (!alted) {
        alted = true;
        satchelBackButton.visible = false;
        altScroll.visible = true;
        altBack.visible = true;
        poisonedAlt.visible = true;
        poisonedAltText.visible = true;
    }
}
function magnifyKey() { // this function brings up the magnified picture and text of the key clue
    if (!alted) {
        alted = true;
        satchelBackButton.visible = false;
        altScroll.visible = true;
        altBack.visible = true;
        keyAlt.visible = true;
        keyAltText.visible = true;
    }
}
function magnifyHoof() { // this function brings up the magnified picture and text of the hoof print clue
    if (!alted) {
        alted = true;
        satchelBackButton.visible = false;
        altScroll.visible = true;
        altBack.visible = true;
        hoofAlt.visible = true;
        hoofAltText.visible = true;
    }
}
function magnifyMaggot() { // this function brings up the magnified picture and text of the maggot clue
    if (!alted) {
        alted = true;
        satchelBackButton.visible = false;
        altScroll.visible = true;
        altBack.visible = true;
        maggotAlt.visible = true;
        maggotAltText.visible = true;
    }
}
function magnifyNote() { // this function brings up the magnified picture and text of the note clue
    if (!alted) {
        alted = true;
        satchelBackButton.visible = false;
        altScroll.visible = true;
        altBack.visible = true;
        noteAlt.visible = true;
        if (letterFound) {
            noteAltTextBoth.visible = true;
        } else {
            noteAltText.visible = true;
        } // this statement makes the magnified text mention the handwriting similarities to the letter if they're both found, but doesn't if not
    }
}
function magnifyLetter() { // this function brings up the magnified picture and text of the letter clue
    if (!alted) {
        alted = true;
        satchelBackButton.visible = false;
        altScroll.visible = true;
        altBack.visible = true;
        letterAlt.visible = true;
        if (noteFound) {
            letterAltTextBoth.visible = true;
        } else {
            letterAltText.visible = true;
        } // this statement makes the magnified text mention the handwriting similarities to the note if they're both found, but doesn't if not
    }
}
function closeAlt() { // this function closes the magnified clue, and returns the player to the bag screen
    alted = false;
    satchelBackButton.visible = true;
    altScroll.visible = false;
    altBack.visible = false;
    poisonedAlt.visible = false;
    keyAlt.visible = false;
    hoofAlt.visible = false;
    maggotAlt.visible = false;
    noteAlt.visible = false;
    letterAlt.visible = false;
    poisonedAltText.visible = false;
    keyAltText.visible = false;
    hoofAltText.visible = false;
    maggotAltText.visible = false;
    noteAltText.visible = false;
    letterAltText.visible = false;
    noteAltTextBoth.visible = false;
    letterAltTextBoth.visible = false;
}

function presentWatch() { // this function checks if the grandfather has asked for the watch, and removed it from the bag when the player taps it, plays a ting sound as confirmation of doing it right, and progresses the dialogue
    if ((lineOn == 2 || lineOn == 1) && scene == "house") {
        watch.destroy();
        watchGiven = true;
        ting.play();
        closeSatchel();
        lineOn = 2;
        nextLine();
    }
}
function rightPoison() { // this function checks if the player has been asked to identify the poison, and when they tap the monkshood in the book, closes the book and progresses the dialogue
    if (crimeSceneCount == 2 && scene == "crime scene" && lineOn == 1) {
        closeBook();
        nextLine();
    }
}
function presentPoisoned() { // this function presents the poisoned face clue at the confrontation, removes it from the bag, closes the bag, and progresses the dialogue in the right tree
    if (scene == "confrontation" && successes == 0 && !dialogueArrow.visible && prompting) {
        lineOn = -1;
        guess = "poisoned";
        poisonedClue.destroy();
        poisonedMag.destroy();
        ting.play();
        closeSatchel();
        nextLine();
    }
}
function presentHoof() { // this function presents the hoof print clue at the confrontation, removes it from the bag, closes the bag, and progresses the dialogue in the right tree, if the wrong clue was tapped, then it doesn't remove the clue, and starts the correct 'wrong clue' dialogue tree, and increments mistakes
    if (prompting) {
        if (scene == "confrontation" && successes == 0 && !dialogueArrow.visible) {
            lineOn = 13;
            guess = "hoof";
            mistakes++;
            if (mistakes == 3) { lineOn = -1; }
            closeSatchel();
            nextLine();
        } else if (scene == "confrontation" && successes == 1 && !dialogueArrow.visible) {
            lineOn = -1;
            guess = "hoof";
            hoofClue.destroy();
            hoofMag.destroy();
            ting.play();
            closeSatchel();
            nextLine();
        }
    }
}
function presentNote() { // this function presents the note clue at the confrontation, removes it from the bag, closes the bag, and progresses the dialogue in the right tree, if the wrong clue was tapped, then it doesn't remove the clue, and starts the correct 'wrong clue' dialogue tree, and increments mistakes
    if (prompting) {
        if (scene == "confrontation" && successes == 0 && !dialogueArrow.visible) {
            lineOn = 7;
            guess = "note";
            mistakes++;
            if (mistakes == 3) { lineOn = -1; }
            closeSatchel();
            nextLine();
        } else if (scene == "confrontation" && successes == 1 && !dialogueArrow.visible) {
            lineOn = 4;
            guess = "note";
            mistakes++;
            if (mistakes == 3) { lineOn = -1; }
            closeSatchel();
            nextLine();
        } else if (scene == "confrontation" && successes == 2 && !dialogueArrow.visible) {
            lineOn = -1;
            guess = "note";
            noteClue.destroy();
            noteMag.destroy();
            ting.play();
            closeSatchel();
            nextLine();
        }
    }
}
function presentLetter() { // this function presents the letter clue at the confrontation, removes it from the bag, closes the bag, and progresses the dialogue in the right tree, if the wrong clue was tapped, then it doesn't remove the clue, and starts the correct 'wrong clue' dialogue tree, and increments mistakes
    if (prompting) {
        if (scene == "confrontation" && successes == 0 && !dialogueArrow.visible) {
            lineOn = 10;
            guess = "letter";
            mistakes++;
            if (mistakes == 3) { lineOn = -1; }
            closeSatchel();
            nextLine();
        } else if (scene == "confrontation" && successes == 1 && !dialogueArrow.visible) {
            lineOn = 7;
            guess = "letter";
            mistakes++;
            if (mistakes == 3) { lineOn = -1; }
            closeSatchel();
            nextLine();
        } else if (scene == "confrontation" && successes == 2 && !dialogueArrow.visible) {
            lineOn = 6;
            guess = "letter";
            mistakes++;
            if (mistakes == 3) { lineOn = -1; }
            closeSatchel();
            nextLine();
        } else if (scene == "confrontation" && successes == 3 && !dialogueArrow.visible) {
            lineOn = -1;
            guess = "letter";
            letterClue.destroy();
            letterMag.destroy();
            ting.play();
            closeSatchel();
            nextLine();
        }
    }
}
function presentMaggot() { // this function presents the maggot clue at the confrontation, removes it from the bag, closes the bag, and progresses the dialogue in the right tree, if the wrong clue was tapped, then it doesn't remove the clue, and starts the correct 'wrong clue' dialogue tree, and increments mistakes
    if (prompting) {
        if (scene == "confrontation" && successes == 0 && !dialogueArrow.visible) {
            lineOn = 4;
            guess = "maggot";
            mistakes++;
            if (mistakes == 3) { lineOn = -1; }
            closeSatchel();
            nextLine();
        } else if (scene == "confrontation" && successes == 1 && !dialogueArrow.visible) {
            lineOn = 10;
            guess = "maggot";
            mistakes++;
            if (mistakes == 3) { lineOn = -1; }
            closeSatchel();
            nextLine();
        } else if (scene == "confrontation" && successes == 2 && !dialogueArrow.visible) {
            lineOn = 9;
            guess = "maggot";
            mistakes++;
            if (mistakes == 3) { lineOn = -1; }
            closeSatchel();
            nextLine();
        } else if (scene == "confrontation" && successes == 3 && !dialogueArrow.visible) {
            lineOn = 3;
            guess = "maggot";
            mistakes++;
            if (mistakes == 3) { lineOn = -1; }
            closeSatchel();
            nextLine();
        } else if (scene == "confrontation" && successes == 4 && !dialogueArrow.visible) {
            lineOn = -1;
            guess = "maggot";
            maggotClue.destroy();
            maggotMag.destroy();
            ting.play();
            closeSatchel();
            nextLine();
        }
    }
}
function presentKey() { // this function presents the key clue at the confrontation, removes it from the bag, closes the bag, and progresses the dialogue in the right tree, if the wrong clue was tapped, then it doesn't remove the clue, and starts the correct 'wrong clue' dialogue tree, and increments mistakes
    if (prompting) {
        if (scene == "confrontation" && successes == 0 && !dialogueArrow.visible) {
            lineOn = 1;
            guess = "key";
            mistakes++;
            if (mistakes == 3) { lineOn = -1; }
            closeSatchel();
            nextLine();
        } else if (scene == "confrontation" && successes == 1 && !dialogueArrow.visible) {
            lineOn = 13;
            guess = "key";
            mistakes++;
            if (mistakes == 3) { lineOn = -1; }
            closeSatchel();
            nextLine();
        } else if (scene == "confrontation" && successes == 2 && !dialogueArrow.visible) {
            lineOn = 12;
            guess = "key";
            mistakes++;
            if (mistakes == 3) { lineOn = -1; }
            closeSatchel();
            nextLine();
        } else if (scene == "confrontation" && successes == 3 && !dialogueArrow.visible) {
            lineOn = 6;
            guess = "key";
            mistakes++;
            if (mistakes == 3) { lineOn = -1; }
            closeSatchel();
            nextLine();
        } else if (scene == "confrontation" && successes == 4 && !dialogueArrow.visible) {
            lineOn = 2;
            guess = "key";
            mistakes++;
            if (mistakes == 3) { lineOn = -1; }
            closeSatchel();
            nextLine();
        } else if (scene == "confrontation" && successes == 5 && !dialogueArrow.visible) {
            lineOn = -1;
            guess = "key";
            keyClue.destroy();
            keyMag.destroy();
            ting.play();
            closeSatchel();
            nextLine();
        }
    }
}
function closeSatchel() { // this function closes the bag and unpauses the game
    if (!alted) {
        satchel.visible = false;
        satchelBackButton.visible = false;
        player.visible = true;
        paused = false;

        if (watchGiven == false) {
            watch.visible = false;
        }
        if (poisonedFound) {
            poisonedClue.visible = false;
            poisonedMag.visible = false;
        }
        if (keyFound) {
            keyClue.visible = false;
            keyMag.visible = false;
        }
        if (hoofFound) {
            hoofClue.visible = false;
            hoofMag.visible = false;
        }
        if (maggotFound) {
            maggotClue.visible = false;
            maggotMag.visible = false;
        }
        if (noteFound) {
            noteClue.visible = false;
            noteMag.visible = false;
        }
        if (letterFound) {
            letterClue.visible = false;
            letterMag.visible = false;
        }

        if (moving) {
            stopMoving();
        }
    }
}

function showBooks() { // this function brings up the player's books, remembering which book was open from last time (or just starts from poison if it's the first opening)
    if (!paused) {
        paused = true;
        book.visible = true;
        bookBackButton.visible = true;
        poisonTab.visible = true;
        bugsTab.visible = true;
        player.visible = false;
        pageTurn.play();
        if (moving) {
            stopMoving();
        }
        if (bookOut == "poison") {
            openPoison();
        } else if (bookOut == "bugs") {
            openBugs();
        }
    }
}
function showPages() { // this function allows the player to flip through books and pages, hiding and showing the titles and pages as necessary
    if (bookOut == "poison") {
        if (pageOn == 0) {
            poisonTitle.visible = true;
            bugsTitle.visible = false;
            nextPageTab.visible = true;
            previousPageTab.visible = false;
            poison1.visible = false;
            poison2.visible = false;
        } else if (pageOn == 1) {
            keyClue.visible = false;
            poisonTitle.visible = false;
            nextPageTab.visible = true;
            previousPageTab.visible = true;
            bugs1.visible = false;
            bugs2.visible = false;
            poison1.visible = true;
            poison2.visible = true;
            poison3.visible = false;
            poison4.visible = false;
        } else if (pageOn == 2) {
            nextPageTab.visible = false;
            previousPageTab.visible = true;
            bugs3.visible = false;
            bugs4.visible = false;
            poison1.visible = false;
            poison2.visible = false;
            poison3.visible = true;
            poison4.visible = true;
        }
    } else if (bookOut == "bugs") {
        if (pageOn == 0) {
            bugsTitle.visible = true;
            poisonTitle.visible = false;
            nextPageTab.visible = true;
            previousPageTab.visible = false;
            bugs1.visible = false;
            bugs2.visible = false;
        } else if (pageOn == 1) {
            keyClue.visible = false;
            bugsTitle.visible = false;
            nextPageTab.visible = true;
            previousPageTab.visible = true;
            poison1.visible = false;
            poison2.visible = false;
            bugs1.visible = true;
            bugs2.visible = true;
            bugs3.visible = false;
            bugs4.visible = false;
        } else if (pageOn == 2) {
            nextPageTab.visible = false;
            previousPageTab.visible = true;
            bugs1.visible = false;
            bugs2.visible = false;
            bugs3.visible = true;
            bugs4.visible = true;
            poison3.visible = false;
            poison4.visible = false;
        }
    }
}
function nextPage() { // this function turns the page to the next one of whichever book the player has out
    pageOn++;
    showPages();
    pageTurn.play();
}
function previousPage() { // this function turns the page to the previous one of whichever book the player has out
    pageOn--;
    showPages();
    pageTurn.play();
}
function closeBook() { // this function closes the book screen and unpauses the game
    if (paused) {
        book.visible = false;
        bookBackButton.visible = false;
        poisonTab.visible = false;
        bugsTab.visible = false;
        player.visible = true;
        keyClue.visible = false;
        poisonTitle.visible = false;
        bugsTitle.visible = false;
        nextPageTab.visible = false;
        previousPageTab.visible = false;
        bugs1.visible = false;
        bugs2.visible = false;
        bugs3.visible = false;
        bugs4.visible = false;
        poison1.visible = false;
        poison2.visible = false;
        poison3.visible = false;
        poison4.visible = false;
        bookClose.play();
        paused = false;
        if (moving) {
            stopMoving();
        }
    }
}
function openPoison() { // this function opens the book on poisons
    bookOut = "poison";
    poisonTab.x = 1555; // these .x lines change the book tab alignment to make it look like they are deeper into the book when you change away from them
    bugsTab.x = 1595;
    showPages();
    if (moving) {
        stopMoving();
    }
}
function openBugs() { // this function opens the book on bugs
    bookOut = "bugs";
    poisonTab.x = 1580;
    bugsTab.x = 1575;
    showPages();
    if (moving) {
        stopMoving();
    }
}

function nextSceneLoad() { // this function prepares the screen for a next scene transition, this is needed otherwise the player would be able to skip through all the scenes at once
    playButton.inputEnabled = false; // these .inputEnabled lines make it impossible for the player to press the scene transition buttons more than once, and skip all the way to the end
    done.inputEnabled = false;
    door.inputEnabled = false;
    corpseDoor.inputEnabled = false;
    hush();
    loadingScreen.animations.play('load'); // this starts the loading animation
    game.add.tween(loadingScreen).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true); // this fades in the loading screen at a speed of two seconds
    game.time.events.add(Phaser.Timer.SECOND * 2, loadSilence, this); // this calls the loadSilence function, stopping all sound as the loading screen turns fully black
    game.time.events.add(Phaser.Timer.SECOND * 4, nextScene, this); // this waits for four seconds with the loading screen animation playing, and then goes to the nextScene function
}
function previousSceneLoad() { // this function prepares the screen for a previous scene transition
    corpseDoor.inputEnabled = false; // only this .inputEnabled line is needed, as there's only one button that takes the player back a scene
    game.add.tween(loadingScreen).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
    game.time.events.add(Phaser.Timer.SECOND * 2, loadSilence, this);
    game.time.events.add(Phaser.Timer.SECOND * 4, previousScene, this);
}
function loadSilence() { // this function stops all the scene's music, any footsteps, and hushes the characters
    houseMusic.stop();
    crimeSceneMusic1.stop();
    crimeSceneMusic2.stop();
    clueSearchMusic.stop();
    if (moving) { stopMoving(); }
    hush();
}
function loadOut() {
    game.add.tween(loadingScreen).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true); // this fades out the loading screen at a rate of two seconds
}
function nextScene() { // this function changes the scene from one to another, going forward in the story
    if (scene == "clue search") {
        scene = "crime scene";
        crimeSceneCount++; // this is needed because as the player goes in and out of the clue search, and back into the crime scene scene, different dialogue trees are used
        create(); // this calls the create funtion and resets the screen with the requires sprites
        if (moving) {
            stopMoving();
        }
    } else if (scene == "crime scene") {
        if (crimeSceneCount == 1) { scene = "clue search"; }
        else { scene = "confrontation"; }
        create();
        if (moving) {
            stopMoving();
        }
    } else if (scene == "house") {
        scene = "crime scene";
        create();
        if (moving) {
            stopMoving();
        }
    } else if (scene == "title") {
        scene = "house";
        create();
        if (moving) {
            stopMoving();
        }
    }
    paused = false;
}
function previousScene() { // this function changes to the previous scene, going from the crime scene back into the clue search scene
    scene = "clue search";
    create();
    if (moving) {
        stopMoving();
    }
    paused = false;
}

function onTap(pointer) { // this function receives the pointer as a variable from the update function, and uses its coordinates in assigning it a function
    if (pointer.y < 700 && scene != "clue search" && !paused && scene != "title") { // this if statement checks that the player is in a valid move zone, and assigns a destination at the location of the pointer
        destination = game.add.sprite(pointer.x, pointer.y, 'destination'); // this line creates a destination sprite that the player will move towards
        moving = true;
        if (destination.x < player.x) {
            direction = "left";
        } else if (destination.x > player.x) {
            direction = "right";
        } // this if statement makes sure the player is facing the right way when they walk

        if (!footstepPlaying) { // this checks if the footstep sound is playing, and stops it from making it play multiple instances if you click multiple times
            footstep.play();
            footstepPlaying = true;
        }
    } else if (pointer.y > 700 && scene != "clue search" && !paused && !writing && dialogueArrow.visible) {
        nextLine();
    } // this else if progresses the dialogue if the player taps inside the dialogue box when the dialogue dots are showing
}

function stopMoving() { // this function despawns the 'destination' sprite and stops the player's movement
    moving = false;
    destination.destroy();
    player.body.velocity.x = 0;
    footstep.stop();
    footstepPlaying = false;
}

function update() {
    if (scene == "house") { // this part of the if statement assigns the placement and visibility of sprite for the house scene
        if (!directionArrow.visible) { door.visible = false; }
        else { door.visible = true; }
        grandfather.animations.play('grandfatherIdleLeft'); // lines  like this assign the direction the NPC sprites face during these scenes
        grandfather.visible = true;
        corpse.visible = false;
        constable.visible = false;
        player.y = 500;
        grandfather.x = 1350;
        grandfather.y = 425;
    } else if (scene == "crime scene") { // this part of the if statement assigns the placement and visibility of sprite for the crime scene screen
        if ((crimeSceneCount == 1 && lineOn == crimeSceneOneLine.length - 1) || (crimeSceneCount == 2 && lineOn == 16) || (crimeSceneCount > 2 && lineOn == 2)) { // this if statement makes the corpse door appear if the player has opted to go back to check for more clues, and hides it in any other case
            corpseDoor.visible = true;
        } else { corpseDoor.visible = false; }
        grandfather.animations.play('grandfatherIdleLeft');
        constable.animations.play('constableIdleLeft');
        grandfather.visible = true;
        corpse.visible = true;
        constable.visible = true;
        player.y = 494;
        grandfather.x = 1375;
        grandfather.y = 421;
        constable.x = 1405;
        constable.y = 393;
    } else if (scene == "clue search") { // this part of the if statement assigns the placement and visibility of sprite for the clue search screen
        player.animations.play('playerIdleBack');
        grandfather.animations.play('grandfatherIdleBack');
        constable.animations.play('constableIdleBack');
        clueSearchMaggot.animations.play('wriggle'); // this plays the maggot's wriggling animation on the clue search screen
        dialogueBox.visible = false;
        if (!keyFound && !paused) { clueSearchKey.visible = true; } else { clueSearchKey.visible = false; } //these five if statements check if the player has the found each clue, and makes it invisible on the screen if they have. If they haven't and the game isn't paused, they're left visible
        if (!hoofFound && !paused) { clueSearchHoofPrints.visible = true; } else { clueSearchHoofPrints.visible = false; }
        if (!maggotFound && !paused) { clueSearchMaggot.visible = true; } else { clueSearchMaggot.visible = false; }
        if (!noteFound && !paused) { clueSearchNote.visible = true; } else { clueSearchNote.visible = false; }
        if (!letterFound && !paused) { clueSearchLetter.visible = true; } else { clueSearchLetter.visible = false; }
        corpse.x = 700;
        corpse.y = 300;
        player.x = 878;
        player.y = 400;
        menuButton.y = game.height - menuButton.height; // these menu, books and satchel aligners are used because there's no dialogue box in this scene, so they're put at the bottom of the screen
        booksButton.y = game.height - booksButton.height;
        satchelButton.y = game.height - satchelButton.height;
        grandfather.x = 750;
        grandfather.y = game.height - (grandfather.height + 25); // these character lines put the NPCs 25 pixels above the bottom of the screen
        constable.x = 900;
        constable.y = game.height - (constable.height + 25);
    } else if (scene == "confrontation") { // this part of the if statement assigns the placement and visibility of sprite for the confrontation screen
        grandfather.animations.play('grandfatherIdleLeft');
        constable.animations.play('constableIdleLeft');
        grandfather.visible = true;
        constable.visible = true;
        corpse.visible = false;
        player.y = 540;
        grandfather.x = 1550;
        grandfather.y = 450;
        constable.x = 1350;
        constable.y = 300;
    }

    if (moving && !paused && scene != "clue search") { // this if statement makes sure that the player is facing the right direction when they stop walking
        if (destination.x < player.x - 50) {
            player.body.velocity.x = -300;
            player.animations.play('moveLeft');
        } else if (destination.x > player.x + 50) {
            player.body.velocity.x = 300;
            player.animations.play('moveRight');
        } else {
            stopMoving();
        }
    } else {
        footstep.stop(); // this line stops the footstep sound effect when the player stops moving
        if (scene != "clue search") {
            if (direction == "left") {
                player.animations.play('playerIdleLeft');
            } else {
                player.animations.play('playerIdleRight');
            }
        }
    }

    if (scene == "clue search" && (paused || gotIt.visible)) {
        done.inputEnabled = false;
    } else {
        done.inputEnabled = true;
    }

    // this chunk of code assigns the correct location for the clues in the bag depending on what order they were collected in
    if (cluesFound[0] == "key") { keyClue.x = 725; keyClue.y = 275; }
    if (cluesFound[1] == "key") { keyClue.x = 1125; keyClue.y = 275; }
    if (cluesFound[2] == "key") { keyClue.x = 350; keyClue.y = 575; }
    if (cluesFound[3] == "key") { keyClue.x = 750; keyClue.y = 575; }
    if (cluesFound[4] == "key") { keyClue.x = 1125; keyClue.y = 575; }
    if (cluesFound[0] == "hoof") { hoofClue.x = 750; hoofClue.y = 275; }
    if (cluesFound[1] == "hoof") { hoofClue.x = 1140; hoofClue.y = 275; }
    if (cluesFound[2] == "hoof") { hoofClue.x = 350; hoofClue.y = 575; }
    if (cluesFound[3] == "hoof") { hoofClue.x = 750; hoofClue.y = 575; }
    if (cluesFound[4] == "hoof") { hoofClue.x = 1150; hoofClue.y = 575; }
    if (cluesFound[0] == "maggot") { maggotClue.x = 750; maggotClue.y = 275; }
    if (cluesFound[1] == "maggot") { maggotClue.x = 1140; maggotClue.y = 275; }
    if (cluesFound[2] == "maggot") { maggotClue.x = 350; maggotClue.y = 575; }
    if (cluesFound[3] == "maggot") { maggotClue.x = 750; maggotClue.y = 575; }
    if (cluesFound[4] == "maggot") { maggotClue.x = 1125; maggotClue.y = 575; }
    if (cluesFound[0] == "note") { noteClue.x = 800; noteClue.y = 275; }
    if (cluesFound[1] == "note") { noteClue.x = 1190; noteClue.y = 275; }
    if (cluesFound[2] == "note") { noteClue.x = 400; noteClue.y = 575; }
    if (cluesFound[3] == "note") { noteClue.x = 800; noteClue.y = 575; }
    if (cluesFound[4] == "note") { noteClue.x = 1175; noteClue.y = 575; }
    if (cluesFound[0] == "letter") { letterClue.x = 825; letterClue.y = 250; }
    if (cluesFound[1] == "letter") { letterClue.x = 1210; letterClue.y = 250; }
    if (cluesFound[2] == "letter") { letterClue.x = 425; letterClue.y = 550; }
    if (cluesFound[3] == "letter") { letterClue.x = 825; letterClue.y = 550; }
    if (cluesFound[4] == "letter") { letterClue.x = 1200; letterClue.y = 550; }

    if (!moving && player.x < 550 && player.x > 250 && scene == "confrontation") {
        player.animations.play('playerIdleBack');
    } else if (!moving && player.x < 250 && scene == "confrontation") {
        player.animations.play('playerIdleRight');
    } else if (!moving && player.x > 550 && scene == "confrontation") {
        player.animations.play('playerIdleLeft');
    }// this small if statement makes the player face the suspect in the confrontation scene

    if (grandfather.visible == true) { // these two if statements make the corpse and grandfather impassable if they are visible
        grandfather.body.immovable = true;
        game.physics.arcade.collide(player, grandfather, stopMoving, null, this);
    }
    if (corpse.visible == true) {
        corpse.body.immovable = true;
        game.physics.arcade.collide(player, corpse, stopMoving, null, this);
    }

    if (!paused) {
        game.input.onTap.add(onTap, this);
    } // this if statement checks for on-screen taps to start the player moving and progress the dialogue

    if (book.visible == true && nextPageTab.visible == false && previousPageTab.visible == false) {
        bookOut = "poison";
        pageOn = 0;
        showPages();
    } // this prevents the books from being in an undefined limbo state, and makes sure a book is open

    if (!moving) {
        footstep.stop();
    } // this stops the footstep sounds when the player stops walking, a double check is needed in case of an accidental skip of the first

    // the following if statements play and stop the dialogue continue dots
    if (scene != "clue search" && !writing && dialogueLine.text != "" && speaker.text != "" && !paused) {
        dialogueArrow.visible = true;
        dialogueArrow.animations.play('arrowMove');
    } else {
        dialogueArrow.animations.stop();
        dialogueArrow.visible = false;
    }
    if (scene == "house" && lineOn == houseLine.length - 1) {
        dialogueArrow.animations.stop();
        dialogueArrow.visible = false;
        directionArrow.visible = true; // these directionArrow lines show the pointing arrow when the player is prompted to leave the house
        directionArrow.animations.play('point');
    } else if (scene == "crime scene" && lineOn == crimeSceneOneLine.length && crimeSceneCount == 1) {
        dialogueArrow.animations.stop();
        dialogueArrow.visible = false;
    } else if (scene == "crime scene" && lineOn == crimeSceneTwoLine.length && crimeSceneCount == 2) {
        dialogueArrow.animations.stop();
        dialogueArrow.visible = false;
    } else if (scene == "crime scene" && lineOn == 16) {
        dialogueArrow.animations.stop();
        dialogueArrow.visible = false;
    } else if (scene == "crime scene" && crimeSceneCount == 2 && lineOn == 14) {
        dialogueArrow.animations.stop();
        dialogueArrow.visible = false;
    } else if (scene == "crime scene" && crimeSceneCount > 2) {
        if (lineOn == 0 || lineOn == 2) {
            dialogueArrow.animations.stop();
            dialogueArrow.visible = false;
        }
    } else if (dialogueLine.text == confrontationLine[confrontationLine.length - 1]) {
        dialogueArrow.animations.stop();
        dialogueArrow.visible = false;
        prompting = true;
    } else if (scene == "confrontation" && guess != "" && successes == 0) {
        if (lineOn == 4 || lineOn == 7 || lineOn == 10 || lineOn == 13 || lineOn == 16) {
            dialogueArrow.animations.stop();
            dialogueArrow.visible = false;
            prompting = true;
        }
    } else if (successes == 1 && lineOn == 1 && guess == "poisoned" && hoofFound) {
        dialogueArrow.animations.stop();
        dialogueArrow.visible = false;
        prompting = true;
    } else if (scene == "confrontation" && successes == 1 && guess != "hoof") {
        if (lineOn == 7 || lineOn == 10 || lineOn == 13 || lineOn == 16) {
            dialogueArrow.animations.stop();
            dialogueArrow.visible = false;
            prompting = true;
        }
    } else if (successes == 2 && lineOn == 4 && guess == "hoof" && noteFound) {
        dialogueArrow.animations.stop();
        dialogueArrow.visible = false;
        prompting = true;
    } else if (scene == "confrontation" && successes == 2 && guess != "note") {
        if (lineOn == 9 || lineOn == 12 || lineOn == 15) {
            dialogueArrow.animations.stop();
            dialogueArrow.visible = false;
            prompting = true;
        }
    } else if (successes == 2 && lineOn == 6 && guess == "note" && letterFound) {
        dialogueArrow.animations.stop();
        dialogueArrow.visible = false;
        prompting = true;
    } else if (scene == "confrontation" && successes == 3 && guess != "letter") {
        if (lineOn == 6 || lineOn == 9) {
            dialogueArrow.animations.stop();
            dialogueArrow.visible = false;
            prompting = true;
        }
    } else if (successes == 4 && lineOn == 3 && guess == "letter" && maggotFound) {
        dialogueArrow.animations.stop();
        dialogueArrow.visible = false;
        prompting = true;
    } else if (scene == "confrontation" && successes == 4 && guess != "maggot") {
        if (lineOn == 5) {
            dialogueArrow.animations.stop();
            dialogueArrow.visible = false;
            prompting = true;
        }
    } else if (successes == 5 && lineOn == 2 && guess == "maggot" && keyFound) {
        dialogueArrow.animations.stop();
        dialogueArrow.visible = false;
        prompting = true;
    }
    if (lineOn == 17 || lineOn == 19) {
        if (scene == "crime scene") {
            nextSceneLoad();
        }
    }
    if (lineOn == 3 || lineOn == 5) {
        if (crimeSceneCount > 2 && scene == "crime scene") {
            nextSceneLoad();
        }
    }

    loadingScreen.bringToTop(); // this line makes sure that the loading screen is always on the top layer, so is fades in and out over everything
}

function render() {
    
}
