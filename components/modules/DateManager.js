/**
 * Developed by Anthony Cox in 2026
 */

/**
 * Common date handling functionality
 */
export default class DateManager {
  
	/**
	 * Gets todays date as a set of string values
	 * @returns {{ day: string, month: string, year: string }}
	 */
	static getTodaysDate() {
		/* Get todays date attributes */
    const todaysDate = new Date();
    const date = todaysDate.getDate();
    const month = todaysDate.getMonth() + 1;
    const year = todaysDate.getFullYear();

    /* Generate the string output for todays date */
    const dateOutput = date >= 10 ? `${date}` : `0${date}`;
    const monthOutput = month >= 10 ? `${month}` : `0${month}`;
    const yearOutput = `${year}`;

    return {
			day: dateOutput,
			month: monthOutput,
			year: yearOutput,
		};
	}
}
