/**
 * Developed by Anthony Cox in 2025
 */

/* Colour combinations data */
const colourCombinations = {
  gold: {
    backgroundColour: 'gold',
    fontColour: 'black',
  },
  green: {
    backgroundColour: 'green',
    fontColour: 'white',
  },
  grey: {
    backgroundColour: 'grey',
    fontColour: 'white',
  },
  'navy-and-gold': {
    backgroundColour: 'navy',
    fontColour: 'gold',
  },
  'navy-and-white': {
    backgroundColour: 'navy',
    fontColour: 'white',
  },
  red: {
    backgroundColour: 'red',
    fontColour: 'white',
  },
  white: {
    backgroundColour: 'white',
    fontColour: 'black',
  },
};

/**
 * Gets the chosen background and font colour combination based on the developers general colour
 * selection. Defaults to a white background with black font.
 * @param {string|undefined} chosenColour 
 * @returns {{ backgroundColour: string, fontColour: string }}
 */
const getColourCombination = (chosenColour = undefined) => {
  if (colourCombinations[`${chosenColour}`] !== undefined) {
    /* Return the chosen colour combination */
    return {
      backgroundColour: colourCombinations[`${chosenColour}`].backgroundColour,
      fontColour: colourCombinations[`${chosenColour}`].fontColour,
    };
  }
  /* Return the default colour combination */
  return {
    backgroundColour: colourCombinations.white.backgroundColour,
    fontColour: colourCombinations.white.fontColour,
  };
};

export {
  getColourCombination,
};
