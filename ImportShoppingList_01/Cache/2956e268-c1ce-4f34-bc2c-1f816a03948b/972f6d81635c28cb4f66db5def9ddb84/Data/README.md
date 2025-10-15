# Remote Service Gateway

The Remote Service Gateway provides a secure and convenient package of trusted remote APIs for integration into your Spectacles Lenses. Access state-of-the-art AI capabilities including chat completions, image generation, text-to-speech, real-time voice conversations, music generation, and 3D model creation.

**Package Version:** 1.0.1

For additional details, visit: https://developers.snap.com/spectacles/about-spectacles-features/apis/remoteservice-gateway

---

## Quick Start

### 1. Import the Package

Drag the `RemoteServiceGatewayExamples__PLACE_IN_SCENE.prefab` from the `Prefabs/` directory into your scene.

### 2. Configure API Tokens

Select the **RemoteServiceGatewayCredentials** object in your scene. In the Inspector panel, configure the API tokens for the services you want to use:

- **OpenAI Token** - Required for OpenAI APIs (Chat Completions, Image Generation, Speech, Realtime)
- **Google Token** - Required for Google GenAI APIs (Gemini, Imagen, Lyria)
- **Snap Token** - Required for Snap-hosted APIs (Deepseek, Snap3D)

⚠️ **Security Warning:** Do not include your API tokens when sharing or uploading this project to version control.

For setup instructions, visit: [Remote Service Gateway Setup](https://developers.snap.com/spectacles/about-spectacles-features/apis/remoteservice-gateway#setup-instructions)

### 3. Try the Examples

Example usages for every API are included in the scene as SceneObjects with the "Example" prefix. Configure each in the Inspector panel and enable "Run On Tap" to test them. For WebSocket APIs, enable either `ExampleOpenAIRealtime` OR `ExampleGeminiLive` to test real-time models with microphone input.

---

## Supported APIs

### OpenAI APIs

_Externally hosted by OpenAI_ | [Documentation](https://platform.openai.com/docs/api-reference/introduction)

- **Chat Completions** - Generate conversational AI responses using GPT models (GPT-5, GPT-4o, etc.)
- **Image Generation** - Create and edit images from text descriptions using DALL-E
- **Text-to-Speech** - Convert text to natural-sounding speech audio with multiple voice options
- **Realtime** - Real-time conversational AI with low-latency voice capabilities (WebSocket)

**Example Scripts:** `ExampleOAICalls.ts`, `ExampleOAIRealtime.ts`

### Google Generative AI APIs

_Externally hosted by Google_ | [Documentation](https://ai.google.dev/gemini-api/docs)

#### Gemini

- **Gemini Model** - Access Google's Gemini large language models for multimodal AI (text, images, video)
- **Gemini Live** - Real-time conversational AI with voice and video capabilities (WebSocket)

**Example Scripts:** `ExampleGeminiCalls.ts`, `ExampleGeminiLive.ts`

#### Imagen

_Google Vertex AI_ | [Documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/image/overview)

- **Image Generation** - Generate high-quality images from text prompts

**Example Scripts:** `ExampleImagenCalls.ts`

#### Lyria

_Google Vertex AI_ | [Documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/music/generate-music)

- **Music Generation** - Create original music compositions from text descriptions

**Example Scripts:** `ExampleLyriaCall.ts`

### Snap-Hosted APIs

_Hosted directly by Snap_

#### Deepseek

[Documentation](https://api-docs.deepseek.com/api/create-chat-completion)

- **Chat Completions with Deepseek-R1 Reasoning** - Advanced AI chat with transparent step-by-step reasoning capabilities

**Example Scripts:** `ExampleDeepseekCalls.ts`

#### Snap3D

- **Text-to-3D** - Generate 3D models and assets from text descriptions, optimized for Spectacles

**Example Scripts:** `ExampleSnap3D.ts`

---

## Package Structure

```
RemoteServiceGateway.lspkg/
├── Prefabs/
│   └── RemoteServiceGatewayExamples__PLACE_IN_SCENE.prefab
├── HostedExternal/
│   ├── OpenAI.ts, Gemini.ts, Imagen.ts, Lyria.ts
│   ├── Examples/
│   └── RemoteServiceModules/
├── HostedSnap/
│   ├── Deepseek.ts, Snap3D.ts
│   ├── Examples/
│   └── RemoteServiceModules/
├── Helpers/
│   ├── VideoController.ts
│   ├── MicrophoneRecorder.ts
│   ├── AudioProcessor.ts
│   └── DynamicAudioOutput.ts
├── Utils/
│   ├── Event.ts
│   └── Promisfy.ts
└── Resources/
    └── Visuals/
```

---

## Helper Scripts

The package includes utility scripts to simplify media handling and AI integrations:

### Media Processing Helpers

- **`VideoController`** - Captures and encodes camera frames for visual AI processing. Provides formatted video data for APIs that support visual input (e.g., Gemini Live).

- **`MicrophoneRecorder`** - Manages microphone input and audio frame recording. Handles audio capture for real-time voice interactions.

- **`AudioProcessor`** - Buffers and formats audio data for external services. Processes audio streams into the appropriate format for AI APIs.

- **`DynamicAudioOutput`** - Handles playback of PCM16 audio from generative AI models. Enables real-time audio output from text-to-speech and voice generation APIs.

### Utility Classes

- **`Event`** - Event system for managing callbacks and listeners
- **`Promisfy`** - Promise utilities for asynchronous operations

These helpers streamline integration with APIs requiring audio/visual input or supporting audio output.

---

## Usage Examples

Example usages of every API are in the scene as SceneObjects with the prefix "Example". Configure each of them in the inspector to enable them to Run On Tap to try them out! For Websocket APIs you can enable ExampleOpenAIRealtime OR ExampleGeminiLive to test running realtime models with microphone input.

### Chat Completion (OpenAI)

```typescript
import { OpenAI } from "RemoteServiceGateway/HostedExternal/OpenAI";
import { OpenAITypes } from "RemoteServiceGateway/HostedExternal/OpenAITypes";

const request: OpenAITypes.ChatCompletionRequest = {
  model: "gpt-4o",
  messages: [{ role: "user", content: "Hello!" }],
};

OpenAI.createChatCompletion(request).then((response) => {
  print(response.choices[0].message.content);
});
```

### Image Generation (Imagen)

```typescript
import { Imagen } from "RemoteServiceGateway/HostedExternal/Imagen";
import { GoogleGenAITypes } from "RemoteServiceGateway/HostedExternal/GoogleGenAITypes";

const request: GoogleGenAITypes.Imagen.ImagenRequest = {
  model: "imagen-3.0-generate-001",
  body: {
    instances: [
      {
        prompt: "Futuristic spaceship",
      },
    ],
    parameters: {
      sampleCount: 1,
    },
  },
};

Imagen.generateImage(request).then((response) => {
  // Handle base64 image response
});
```

### 3D Generation (Snap3D)

```typescript
import { Snap3D } from "RemoteServiceGateway/HostedSnap/Snap3D";

Snap3D.submitAndGetStatus({
  prompt: "Spaceship",
  format: "glb",
  refine: false,
  use_vertex_color: false,
}).then((submitGetStatusResults) => {
  // Handle event
});
```

---

## Best Practices

1. **Token Security**: Never commit API tokens to version control. You can set the tokens programatically via `setApiToken` on `RemoteServiceGatewayCredentials.ts`

2. **Error Handling**: Always implement proper error handling for API calls:

   ```typescript
   try {
     const response = await OpenAI.createChatCompletion(request);
   } catch (error) {
     print("API Error:", error);
   }
   ```

3. **Resource Management**: For real-time APIs (WebSocket), properly clean up connections when done.

4. **Testing**: Use the provided example scripts as templates for your own implementations.

---

## Support & Resources

- **Documentation**: https://developers.snap.com/spectacles/about-spectacles-features/apis/remoteservice-gateway
- **Setup Guide**: https://developers.snap.com/spectacles/about-spectacles-features/apis/remoteservice-gateway#setup-instructions

For issues or questions, please refer to the Spectacles developer documentation.  


## 
 






 
