/**
 * Developed by Anthony Cox in 2025
 */
import { useEffect, useState } from 'react';
import { cleanup, render } from '@testing-library/react';
import usePrevious from '../../../components/data/react-functions';

describe('React functions module', () => {

  const TestComponent = props => {
    const [ status, setStatus ] = useState(props.status | 0);
    const prevStatus = usePrevious(status);

    useEffect(() => {
      setStatus(props.status);
    }, [ props.status ]);

    return (
      <div>
        <span id="current-status">{status}</span>
        <span id="previous-status">{prevStatus}</span>
      </div>
    );
  }

  describe('usePrevious - previous state value is tracked correctly', () => {
    const testCurrent = [];
    const testPrevious = [];
    
    beforeAll(() => {
      const { rerender, unmount } = render(<TestComponent status={1} />);

      /* Retrieve the DOM elements required for the tests */
      const currentStatus1 = document.querySelector('span[id="current-status"]').textContent;
      const previousStatus1 = document.querySelector('span[id="previous-status"]').textContent;

      /* Verifies the initial current and previous values after the first time render */
      testCurrent.push(currentStatus1);
      testPrevious.push(previousStatus1);

      /* Set a new test status, re-render the component and retrieve the DOM elements required for the tests */
      rerender(<TestComponent status={2} />);
      const currentStatus2 = document.querySelector('span[id="current-status"]').textContent;
      const previousStatus2 = document.querySelector('span[id="previous-status"]').textContent;

      /* Verifies the new current and previous values after the status update */
      testCurrent.push(currentStatus2);
      testPrevious.push(previousStatus2);

      /* Unmount the component and clean up the test */
      unmount();
      cleanup();
    });

    it('verifies that the current status is set correctly on first time render', () => {
      expect(testCurrent[0]).toBe("1");
    });

    it('verifies that the previous status is set correctly on first time render', () => {
      expect(testPrevious[0]).toBe("");
    });

    it('verifies that the current status is set correctly after the status value update', () => {
      expect(testCurrent[1]).toBe("2");
    });

    it('verifies that the previous status is set correctly after the status value update', () => {
      expect(testPrevious[1]).toBe("1");
    });
  });
});
