import promptSync from 'prompt-sync';
const prompt = promptSync();

// get input from the user.
const age = prompt('Your age? ');
console.log(`You are ${age} years old.`);