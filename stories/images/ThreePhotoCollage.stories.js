/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { ThreePhotoCollage } from '../../components';
import rage1 from './files/rage-1.png';
import rage2 from './files/rage-2.png';
import rage3 from './files/rage-3.png';

export default {
  component: ThreePhotoCollage,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Images/Three Photo Collage',
};

/**
 * Three Photo Collage component template
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_ThreePhotoCollage = args => {
  return <ThreePhotoCollage {...args} />;
};

export const Default = {
  args: {
    id: 'default',
    imageLowerData: {
      alt: 'A screenshot taken from the Rage videogame. Screenshot 3 of 3.',
      src: rage3,
    },
    imageUpperLeftData: {
      alt: 'A screenshot taken from the Rage videogame. Screenshot 1 of 3.',
      src: rage1,
    },
    imageUpperRightData: {
      alt: 'A screenshot taken from the Rage videogame. Screenshot 2 of 3.',
      src: rage2,
    },
  },
  render: Template_ThreePhotoCollage,
};

export const MobilePhoneTest = {
  args: {
    id: 'mobile-phone-test',
    imageLowerData: {
      alt: 'A screenshot taken from the Rage videogame. Screenshot 3 of 3.',
      src: rage3,
    },
    imageUpperLeftData: {
      alt: 'A screenshot taken from the Rage videogame. Screenshot 1 of 3.',
      src: rage1,
    },
    imageUpperRightData: {
      alt: 'A screenshot taken from the Rage videogame. Screenshot 2 of 3.',
      src: rage2,
    },
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_ThreePhotoCollage,
};
