// Asynchronous function with a delay
const delay = (seconds) => {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

// Function to execute multiple delays with Promise.all
const parallelExecution = async () => {
    console.log('Starting concurrent execution with Promise.all');
    const startTime = Date.now();
    await Promise.all([
        delay(2),
        delay(3),
        delay(1)
    ]);
    const endTime = Date.now();
    console.log(`Concurrent execution time: ${(endTime - startTime) / 1000} seconds`);
};

// Function to execute multiple delays with await in a loop
const sequentialExecution = async () => {
    console.log('Starting sequential execution with await in a loop');
    const startTime = Date.now();
    await delay(2);
    console.log('delay 2 seconds finished')
    await delay(3);
    console.log('delay 3 seconds finished')
    await delay(1);
    console.log('delay 1 second finished')
    const endTime = Date.now();
    console.log(`Sequential execution time: ${(endTime - startTime) / 1000} seconds`);
};

// Execute both functions
(async () => {
    await sequentialExecution();
    await parallelExecution();
    
})();