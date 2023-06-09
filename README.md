# poke-evolution-chain

```
# Poke Evolution Chain

This project aims to provide a solution for retrieving the evolution chain and variations of a Pokémon using the Poke API. It utilizes Node.js and Express to create a server that serves the evolution chain information as a JSON response.

## Prerequisites

- Node.js (version 20.3.0)
- npm (version 9.6.7)

## Getting Started

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/poke-evolution-chain.git
   ```

2. Install the dependencies:

   ```shell
   cd poke-evolution-chain
   npm install
   ```

3. Start the server:

   ```shell
   npm start
   ```

   The server will be running at `http://localhost:3000`.

## Usage

To retrieve the evolution chain information for a Pokémon, make a GET request to the following endpoint:

```
GET /evolution-chain/:pokemonName
```

Replace `:pokemonName` with the name of the Pokémon you want to retrieve the evolution chain for.

The server will respond with a JSON object representing the evolution chain and variations of the Pokémon.

## API Reference

### GET /evolution-chain/:pokemonName

Retrieves the evolution chain and variations of a Pokémon.

- Parameters:
  - `pokemonName` (string): The name of the Pokémon.

- Response:
  - Status: 200 OK
  - Body: JSON object representing the evolution chain and variations. The structure will be as follows:

    ```json
    {
      "name": "caterpie",
      "variations": [
        {
          "name": "metapod",
          "variations": [
            {
              "name": "butterfree",
              "variations": []
            }
          ]
        }
      ]
    }
    ```

    The `name` field represents the name of the Pokémon and the `variations` field contains an array of similar objects representing the variations in the evolution chain.

- Error Responses:
  - Status: 404 Not Found
    - Body: `{"error": "Pokemon not found."}`

  - Status: 500 Internal Server Error
    - Body: `{"error": "Internal server error."}`

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or bug fixes, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
```

Feel free to customize the sections and content according to your project's specific needs.