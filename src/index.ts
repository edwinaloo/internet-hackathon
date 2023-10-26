// Import necessary libraries
import * as express from 'express';

// Create an Express application
const app = express();
const port = 3000; // Change this to your desired port

// Define a model for voting data
interface Vote {
  id: string;
  candidate: string;
  votes: number;
}

// new commit

// Middleware for parsing JSON in requests
app.use(express.json());

// Create a new vote
app.post('/votes', (req, res) => {
  try {
    const vote: Vote = req.body;

    // Add your validation and error handling here

    // For demonstration purposes, we'll assume you have a mock database here.
    // You can replace this with your actual database logic.
    const mockDatabase: Vote[] = [];

    // Add the new vote to the database
    mockDatabase.push(vote);

    res.status(201).json(vote); // Return the created vote
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all votes
app.get('/votes', (req, res) => {
  try {
    // For demonstration purposes, we'll assume you have a mock database here.
    // You can replace this with your actual database logic.
    const mockDatabase: Vote[] = [];

    // Return all votes from the database
    res.json(mockDatabase);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Voting app listening on port ${port}`);
});
