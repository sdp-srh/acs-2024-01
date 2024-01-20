/**
 * Fetches data from a provided URL using the Fetch API and Promise.then() method.
 * Logs the fetched data if the fetch operation is successful.
 * Logs an error message if the fetch operation is not successful.
 *
 * @param {string} url - The URL to fetch data from.
 */
// Define an arrow function 'fetchWithThen' that takes a URL as a parameter
const fetchWithThen = (url) => {
    // Start a fetch request to the provided URL
    fetch(url).then(response => {
            // Check if the response is not okay (i.e., status is not in the range 200-299)
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            // Handle the JSON data (parsed response); in this case, log it to the console
            console.log('Fetched data with then:', data);
        })
        .catch(error => {
            // Catch any errors that occur during the fetch operation or in the then chain
            // Log the error to the console
            console.error('There has been a problem with your fetch operation:', error);
        });
}


/**
 * Fetches data from a provided URL using the Fetch API and async/await syntax.
 * Logs the fetched data if the fetch operation is successful.
 * Logs an error message if the fetch operation is not successful.
 *
 * @param {string} url - The URL to fetch data from.
 */
/**
 * Fetches data from a provided URL using the Fetch API and async/await syntax.
 * Logs the fetched data if the fetch operation is successful.
 * Logs an error message if the fetch operation is not successful.
 *
 * @param {string} url - The URL to fetch data from.
 */
const fetchWithAsyncAwait = async (url) => {
    try {
        // Await the fetch operation and store the response
        const response = await fetch(url);
        // If the response was not ok, throw an error
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Await the parsing of the response body as JSON and store the result
        const data = await response.json();
        // Log the fetched data
        console.log('Fetched data with async:', data);
    } catch (error) {
        // If there was an error at any point in the fetch operation, log the error
        console.error('There has been a problem with your fetch operation:', error);
    }
}

const run = async () => {
    await fetchWithThen('https://jsonplaceholder.typicode.com/todos/1');
    await fetchWithAsyncAwait('https://jsonplaceholder.typicode.com/todos/2');
}

run()