//Declaring global variables for the song, amplitude, and fft
let song;
let amplitude;
let fft;

//Preload function to load the song
function preload() {
  song = loadSound("assets/Santa Jazz.mp3");
}

//Defines the initial setup function for the sketch
function setup() {

   //Creates a canvas that fills the browser window
  createCanvas(windowWidth, windowHeight);

  //Set up the background color
  background(229, 228, 240); 

  //Calculates vertical positions for streets
  let yPosArray = calculatePositions([10, 50, 120, 150, 220, 250, 280, 340, 440], windowHeight);
  //Calculates horizontal positions for streets
  let xPosArray = calculatePositions([10, 30, 70, 140, 300, 330, 420, 440, 480, 500], windowWidth);
  
  //Creates horizontal streets on the canvas
  horizontalStreets(yPosArray);
  //Creates vertical streets on the canvas
  verticalStreets(xPosArray);

  //Creates blue colored blocks at specific positions
  createBlock(windowWidth * 0.1, windowHeight * 0.16, windowWidth * 0.06, windowHeight * 0.06, color(0, 0, 255));
  createBlock(windowWidth * 0.1, windowHeight * 0.7, windowWidth * 0.08, windowHeight * 0.08, color(0, 0, 255));
  createBlock(windowWidth * 0.32, windowHeight * 0.52, windowWidth * 0.06, windowHeight * 0.1, color(0, 0, 255));
  createBlock(windowWidth * 0.76, windowHeight * 0.32, windowWidth * 0.1, windowHeight * 0.2, color(0, 0, 255));
  createBlock(windowWidth * 0.82, windowHeight * 0.7, windowWidth * 0.08, windowHeight * 0.08, color(0, 0, 255));

  //Create the red blocks
  createBlock(windowWidth * 0.16, windowHeight * 0.04, windowWidth * 0.04, windowHeight * 0.18, color(255, 0, 0));
  createBlock(windowWidth * 0.26, windowHeight * 0.04, windowWidth * 0.08, windowHeight * 0.12, color(255, 0, 0));
  createBlock(windowWidth * 0.16, windowHeight * 0.54, windowWidth * 0.12, windowHeight * 0.08, color(255, 0, 0));
  createBlock(windowWidth * 0.58, windowHeight * 0.4, windowWidth * 0.12, windowHeight * 0.1, color(255, 0, 0));
  createBlock(windowWidth * 0.68, windowHeight * 0.6, windowWidth * 0.1, windowHeight * 0.14, color(255, 0, 0));

  //Create the grey blocks
  createBlock(windowWidth * 0.28, windowHeight * 0.08, windowWidth * 0.06, windowHeight * 0.06, color(169));
  createBlock(windowWidth * 0.46, windowHeight * 0.22, windowWidth * 0.1, windowHeight * 0.14, color(169));
  createBlock(windowWidth * 0.46, windowHeight * 0.74, windowWidth * 0.06, windowHeight * 0.1, color(169));
  createBlock(windowWidth * 0.74, windowHeight * 0.62, windowWidth * 0.08, windowHeight * 0.04, color(169));
  createBlock(windowWidth * 0.8, windowHeight * 0.04, windowWidth * 0.1, windowHeight * 0.06, color(169));

  //Create a new Amplitude object to analyze the amplitude of the sound
  amplitude = new p5.Amplitude();
  //Create a new FFT (Fast Fourier Transform) object to analyze the frequency spectrum of the sound
  fft = new p5.FFT();
  //Set the input source for the FFT analysis to the 'song' variable
  fft.setInput(song);
  //Play the song
  song.play();
}

//Function to calculate and adjust positions based on the canvas size
function calculatePositions(positionArray, canvasSize) {
  //Initializes an empty array for adjusted positions
  let adjustedPositions = [];

  //Set for loop through each position in the array
  for (let pos of positionArray) {
    //Adjusts the position based on the canvas size and adds it to the array
    adjustedPositions.push((pos / 500) * canvasSize);
  }

  //Returns the array with adjusted positions
  return adjustedPositions;
}

//Function to create a block with position, width, height, and color
function createBlock(x, y, w, h, c) {
  //Set the fill color for the shape
  fill(c);
  //Draw a rectangle
  rect(x, y, w, h);
}


//Function to create horizontal streets using the yPosArray
function horizontalStreets(yPosArray) {
  //For loop through each y position in the array
  for (let yPos of yPosArray) {
    //Creates a row of blocks across the width of the canvas
    for (let i = 0; i < width; i += 20) {
      //Generates a random number between 0 and 100
      let num = floor(random(101));
      //Get a color based on the random number
      let c = colourMap(num);
      //Create a block with the determined color at the current position
      createBlock(i, yPos, 20, 20, c);
    }
  }
}

//Function to create vertical streets using the xPosArray
function verticalStreets(xPosArray) {
  //For loop through each x position in the array
  for (let xPos of xPosArray) {
    //Creates a row of blocks across the height of the canvas
    for (let i = 0; i < height; i += 20) {
      //Generates a random number between 0 and 100
      let num = floor(random(101));
      //Get a color based on the random number
      let c = colourMap(num);
      //Create a block with the determined color at the current position
      createBlock(xPos, i, 20, 20, c);
    }
  }
}

//Function to map a number to a specific color
function colourMap(num) {
  //Check the range of the number and returns a corresponding color
  if (num >= 0 && num <= 65) {
    // Set as the yellow color
    return color(255, 255, 0); 
  } else if (num >= 66 && num <= 80) {
    // Set as the black color
    return color(0); 
  } else if (num >= 81 && num <= 85) {
    // Set the red color
    return color(255, 0, 0); 
  } else if (num >= 86 && num <= 100) {
    // Set the grey color
    return color(169); 
  }
}

function draw() {
  //Get the current amplitude level of the song
  let level = amplitude.getLevel();

  //Map the amplitude level to a block size for the blue blocks
  let blueBlockSize = map(level, 0, 1, 10, 100);

  //Analyze the frequency spectrum of the song
  let spectrum = fft.analyze();

  //Map the 50th frequency band to a block size for the red blocks
  let redBlockSize = map(spectrum[50], 0, 255, 10, 100);

  //Map the 100th frequency band to a block size for the grey blocks
  let greyBlockSize = map(spectrum[100], 0, 255, 10, 100); // Adjust the index (100) to suit your needs

  //Pushe the current drawing style 
  push();
  //Apply a translation transformation
  translate(0, 0);

  //Create blue blocks with dynamic sizes based on the song amplitude level
  createBlock(windowWidth * 0.1, windowHeight * 0.16, blueBlockSize, blueBlockSize, color(0, 0, 255));
  createBlock(windowWidth * 0.1, windowHeight * 0.7, blueBlockSize, blueBlockSize, color(0, 0, 255));
  createBlock(windowWidth * 0.32, windowHeight * 0.52, blueBlockSize, blueBlockSize, color(0, 0, 255));
  createBlock(windowWidth * 0.76, windowHeight * 0.32, blueBlockSize, blueBlockSize, color(0, 0, 255));
  createBlock(windowWidth * 0.82, windowHeight * 0.7, blueBlockSize, blueBlockSize, color(0, 0, 255));

  //Create red blocks with dynamic sizes based on a specific frequency band intensity
  createBlock(windowWidth * 0.16, windowHeight * 0.04, redBlockSize, redBlockSize, color(255, 0, 0));
  createBlock(windowWidth * 0.26, windowHeight * 0.04, redBlockSize, redBlockSize, color(255, 0, 0));
  createBlock(windowWidth * 0.16, windowHeight * 0.54, redBlockSize, redBlockSize, color(255, 0, 0));
  createBlock(windowWidth * 0.58, windowHeight * 0.4, redBlockSize, redBlockSize, color(255, 0, 0));
  createBlock(windowWidth * 0.68, windowHeight * 0.6, redBlockSize, redBlockSize, color(255, 0, 0));

  //Create grey blocks with dynamic sizes based on a specific frequency band intensity
  createBlock(windowWidth * 0.28, windowHeight * 0.08, greyBlockSize, greyBlockSize, color(169));
  createBlock(windowWidth * 0.46, windowHeight * 0.22, greyBlockSize, greyBlockSize, color(169));
  createBlock(windowWidth * 0.46, windowHeight * 0.74, greyBlockSize, greyBlockSize, color(169));
  createBlock(windowWidth * 0.74, windowHeight * 0.62, greyBlockSize, greyBlockSize, color(169));
  createBlock(windowWidth * 0.8, windowHeight * 0.04, greyBlockSize, greyBlockSize, color(169));

  //Pop the current drawing style 
  pop();
}

function mouseClicked() {
  //Check if the song is currently playing
  if (song.isPlaying()) {
    //If the song is playing, pause it
    song.pause();
  } else {
    //If the song is not playing, play it
    song.play();
  }
}

function windowResized() {
  // Add the resize function for the window size changing
  resizeCanvas(windowWidth, windowHeight);
  // Draw the pictures again
  setup(); 
}

