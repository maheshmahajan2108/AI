# AI Support Engineer - Backend

A NestJS backend for the AI Support Engineer learning project. Step 1 implements basic LLM integration with OpenAI API.

## Project Structure

```
src/
├── ai/
│   ├── ai.module.ts         # AI module definition
│   ├── ai.controller.ts     # HTTP endpoints
│   ├── ai.service.ts        # Business logic & OpenAI integration
│   └── ai.dto.ts            # Data transfer objects & validation
├── app.module.ts            # Root application module
└── main.ts                  # Application entry point
```

## Prerequisites

- Node.js 18+ and npm
- OpenAI API key (from https://platform.openai.com/api-keys)

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the `backend` directory by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```

2. Add your OpenAI API key to `.env`:
   ```
   OPENAI_API_KEY=sk-...your-api-key-here...
   ```

   **Important:** Never commit `.env` to version control. It's already added to `.gitignore`.

## Running the Application

### Development mode (with hot reload):
```bash
npm run dev
```

### Production build:
```bash
npm run build
npm start
```

The application will start on `http://localhost:3000`.

## Testing POST /ai/chat

### Using cURL:
```bash
curl -X POST http://localhost:3000/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Explain what an API is"}'
```

### Using httpie:
```bash
http POST http://localhost:3000/ai/chat message="Explain what an API is"
```

### Using VS Code REST Client extension:
Create a file named `requests.http`:
```http
POST http://localhost:3000/ai/chat
Content-Type: application/json

{
  "message": "Explain what an API is"
}
```

### Expected Response:
```json
{
  "response": "An API (Application Programming Interface) is..."
}
```

### Valid Request Examples:
```bash
# Ask about APIs
curl -X POST http://localhost:3000/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is REST?"}'

# Ask about TypeScript
curl -X POST http://localhost:3000/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Explain TypeScript types"}'
```

### Invalid Request Examples:
```bash
# Missing message field (will return validation error)
curl -X POST http://localhost:3000/ai/chat \
  -H "Content-Type: application/json" \
  -d '{}'

# Empty message (will return validation error)
curl -X POST http://localhost:3000/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": ""}'
```

## Request Flow

```
HTTP Request (POST /ai/chat)
    ↓
AiController.chat()
    ↓
AiService.chat()
    ↓
OpenAI Client Library
    ↓
OpenAI API
    ↓
LLM (GPT-4o-mini)
    ↓
AiService (returns response)
    ↓
AiController (returns ChatResponseDto)
    ↓
HTTP Response (JSON)
```

## Architecture

### AiController (`src/ai/ai.controller.ts`)
- Handles HTTP POST requests to `/ai/chat`
- Validates incoming request using `ChatRequestDto`
- Delegates to `AiService` for LLM logic
- Returns response via `ChatResponseDto`

### AiService (`src/ai/ai.service.ts`)
- Manages OpenAI client initialization
- Reads `OPENAI_API_KEY` from environment
- Implements `chat()` method for LLM communication
- Uses gpt-4o-mini model with temperature 0.7, max tokens 1000
- Extracts and returns the assistant's response

### AiDto (`src/ai/ai.dto.ts`)
- `ChatRequestDto`: Validates that `message` is a required non-empty string
- `ChatResponseDto`: Response structure with LLM output

### AppModule (`src/app.module.ts`)
- Root application module
- Imports AiModule

### Main (`src/main.ts`)
- Application bootstrap
- Enables global validation pipe (auto-validates all DTOs)
- Starts server on port 3000 (or PORT env variable)

## Troubleshooting

### Error: "OPENAI_API_KEY environment variable is not set"
- Ensure `.env` file exists in the `backend` directory
- Ensure `.env` contains a valid OpenAI API key
- Restart the development server after adding the key

### Error: 401 Unauthorized from OpenAI
- Verify your OpenAI API key is correct
- Check that your API key has not expired
- Ensure you have API credits available in your OpenAI account

### Validation error on request
- Ensure `message` field is present and is a non-empty string
- Check Content-Type header is `application/json`

## Next Steps

This is Step 1 of the AI Support Engineer learning project. Future steps will add:
- Step 2: Structured outputs
- Step 3: Tool calling
- Step 4+: RAG, Agents, Multi-agent workflows, Database, etc.
