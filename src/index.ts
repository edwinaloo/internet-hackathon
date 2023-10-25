// Import necessary libraries
import * as express from 'express';
import { CosmosClient } from '@azure/cosmos';
import { Container } from '@azure/cosmos';

// Create an Express application
const app = express();
const port = 3000; // Change this to your desired port

// Replace these with your Azure Cosmos DB details
const endpoint = 'YOUR_COSMOS_DB_ENDPOINT';
const key = 'YOUR_COSMOS_DB_KEY';
const client = new CosmosClient({ endpoint, key });

// Define a model for voting data
interface Vote {
  id: string;
  candidate: string;
  votes: number;
}

// Initialize Cosmos DB container and database
const databaseId = 'votingdb';
const containerId = 'votes';

const init = async () => {
  const { database } = await client.databases.createIfNotExists({ id: databaseId });
  const { container } = await database.containers.createIfNotExists({ id: containerId });
};

init().catch((err) => console.error(err));

// Middleware for parsing JSON in requests
app.use(express.json());

// Create a new vote
app.post('/votes', async (req, res) => {
  try {
    const vote: Vote = req.body;

    // Add validation and error handling here

    const { container } = client.database(databaseId).container(containerId);
    const { resource } = await container.items.create(vote);
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all votes
app.get('/votes', async (req, res) => {
  try {
    const { container } = client.database(databaseId).container(containerId);
    const { resources: votes } = await container.items.readAll().fetchAll();
    res.json(votes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Voting app listening on port ${port}`);
});
