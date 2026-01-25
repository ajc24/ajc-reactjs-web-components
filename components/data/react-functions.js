/**
 * Developed by Anthony Cox in 2025
 */
import { useEffect, useRef } from 'react';

/**
 * Functionality to track a previous properties value for a functional component
 */
const usePrevious = value => {
  const ref = useRef();
  
  useEffect(() => {
    /* Use the reference to continue tracking the previous value of the variable */
    ref.current = value;
  }, [ value ]);
  
  return ref.current;
};
export default usePrevious;
