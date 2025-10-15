import { AudioProcessor } from "../../Helpers/AudioProcessor";
import { DynamicAudioOutput } from "../../Helpers/DynamicAudioOutput";
import { MicrophoneRecorder } from "../../Helpers/MicrophoneRecorder";
import { OpenAI } from "../OpenAI";
import { OpenAITypes } from "../OpenAITypes";

@component
export class ExampleOAIRealtime extends BaseScriptComponent {
  @ui.separator
  @ui.label(
    "Example of connecting to the OpenAI Realtime API. Change various settings in the inspector to customize!"
  )
  @ui.separator
  @ui.separator
  @ui.group_start("Setup")
  @input
  private websocketRequirementsObj: SceneObject;
  @input
  private dynamicAudioOutput: DynamicAudioOutput;
  @input
  private microphoneRecorder: MicrophoneRecorder;
  @input
  private textDisplay: Text;
  @ui.group_end
  @ui.separator
  @ui.group_start("Inputs")
  @input
  @widget(new TextAreaWidget())
  private instructions: string =
    "You are a helpful assistant that loves to make puns";
  @ui.group_end
  @ui.separator
  @ui.group_start("Outputs")
  @ui.label(
    '<span style="color: yellow;">⚠️ To prevent audio feedback loop in Lens Studio Editor, use headphones or manage your microphone input.</span>'
  )
  @input
  private audioOutput: boolean = false;

  @input
  @showIf("audioOutput", true)
  @widget(
    new ComboBoxWidget([
      new ComboBoxItem("alloy", "alloy"),
      new ComboBoxItem("ash", "ash"),
      new ComboBoxItem("ballad", "ballad"),
      new ComboBoxItem("coral", "coral"),
      new ComboBoxItem("echo", "echo"),
      new ComboBoxItem("sage", "sage"),
      new ComboBoxItem("shimmer", "shimmer"),
      new ComboBoxItem("verse", "verse"),
    ])
  )
  private voice: string = "coral";
  @ui.group_end
  @ui.separator
  private audioProcessor: AudioProcessor = new AudioProcessor();

  onAwake() {
    this.websocketRequirementsObj.enabled = true;
    this.createEvent("OnStartEvent").bind(() => {
      this.dynamicAudioOutput.initialize(24000);
      this.connectToWebsocket();
    });

    // Display internet connection status
    this.textDisplay.text = global.deviceInfoSystem.isInternetAvailable()
      ? "Websocket connected"
      : "No internet";

    global.deviceInfoSystem.onInternetStatusChanged.add((args) => {
      this.textDisplay.text = args.isInternetAvailable
        ? "Reconnected to internete"
        : "No internet";
    });
  }

  connectToWebsocket() {
    let OAIRealtime = OpenAI.createRealtimeSession({
      model: "gpt-4o-mini-realtime-preview",
    });

    OAIRealtime.onOpen.add((event) => {
      print("Connection opened");
      let modalitiesArray = ["text"];
      if (this.audioOutput) {
        modalitiesArray.push("audio");
      }

      const setTextColor: OpenAITypes.Common.ToolDefinition = {
        type: "function",
        name: "set-text-color",
        description:
          "Use this function to set the text color of the text display",
        parameters: {
          type: "object",
          properties: {
            r: {
              type: "number",
              description: "Red component of the color (0-255)",
            },
            g: {
              type: "number",
              description: "Green component of the color (0-255)",
            },
            b: {
              type: "number",
              description: "Blue component of the color (0-255)",
            },
          },
          required: ["r", "g", "b"],
        },
      };

      // Set up the session
      let sessionUpdateMsg: OpenAITypes.Realtime.SessionUpdateRequest = {
        type: "session.update",
        session: {
          instructions: this.instructions,
          voice: this.voice,
          modalities: modalitiesArray,
          input_audio_format: "pcm16",
          tools: [setTextColor],
          output_audio_format: "pcm16",
          turn_detection: {
            type: "server_vad",
            threshold: 0.5,
            prefix_padding_ms: 300,
            silence_duration_ms: 500,
            create_response: true,
          },
        },
      };
      OAIRealtime.send(sessionUpdateMsg);

      // Process microphone input to send to the server
      this.audioProcessor.onAudioChunkReady.add((encodedAudioChunk) => {
        let audioMsg: OpenAITypes.Realtime.ClientMessage = {
          type: "input_audio_buffer.append",
          audio: encodedAudioChunk,
        };
        OAIRealtime.send(audioMsg);
      });

      // Configure the microphone
      this.microphoneRecorder.setSampleRate(24000);
      this.microphoneRecorder.onAudioFrame.add((audioFrame) => {
        this.audioProcessor.processFrame(audioFrame);
      });

      this.microphoneRecorder.startRecording();
    });

    let completedTextDisplay = true;

    OAIRealtime.onMessage.add((message) => {
      // Listen for text responses
      if (
        message.type === "response.text.delta" ||
        message.type === "response.audio_transcript.delta"
      ) {
        if (!completedTextDisplay) {
          this.textDisplay.text += message.delta;
        } else {
          this.textDisplay.text = message.delta;
        }
        completedTextDisplay = false;
      } else if (message.type === "response.done") {
        completedTextDisplay = true;
      }

      // Set up Audio Playback
      else if (message.type === "response.audio.delta") {
        let delta = Base64.decode(message.delta);
        this.dynamicAudioOutput.addAudioFrame(delta);
      }
      // Listen for function calls
      else if (message.type === "response.output_item.done") {
        if (message.item && message.item.type === "function_call") {
          const functionCall = message.item;
          print(`Function called: ${functionCall.name}`);
          print(`Function args : ${functionCall.arguments}`);
          print("call_id: " + functionCall.call_id);
          let args = JSON.parse(functionCall.arguments);
          this.textDisplay.textFill.color = new vec4(
            args.r / 255,
            args.g / 255,
            args.b / 255,
            1
          );

          // Send a message back to the server indicating the function call was successful
          let messageToSend: OpenAITypes.Realtime.ConversationItemCreateRequest =
            {
              type: "conversation.item.create",
              item: {
                type: "function_call_output",
                call_id: functionCall.call_id,
                output:
                  "You have successfully called the function to set the text color.",
              },
            };

          OAIRealtime.send(messageToSend);
        }
      }
    });

    OAIRealtime.onError.add((event) => {
      print("Websocket error: " + event);
    });

    OAIRealtime.onClose.add((event) => {
      this.textDisplay.text = "Websocket closed: " + event.reason;
      print("Websocket closed: " + event.reason);
    });
  }
}
