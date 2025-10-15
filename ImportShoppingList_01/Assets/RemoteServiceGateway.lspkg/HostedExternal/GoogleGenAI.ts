/**
 * Unified client for all Google GenAI APIs
 * Provides access to Gemini, Lyria, Imagen and other Google GenAI services
 */

import { Gemini } from "./Gemini";
import { Lyria } from "./Lyria";
import { Imagen } from "./Imagen";
import { GoogleGenAITypes } from "./GoogleGenAITypes";

/**
 * Main Google GenAI client that provides access to all Google GenAI APIs
 */
export class GoogleGenAI {
  /**
   * Access to Gemini API for text and multimodal generation
   */
  static readonly Gemini = Gemini;

  /**
   * Access to Lyria API for music and vocal generation
   */
  static readonly Lyria = Lyria;

  /**
   * Access to Imagen API for image generation and editing
   */
  static readonly Imagen = Imagen;
}

// Re-export types for convenience
export type { GoogleGenAITypes } from "./GoogleGenAITypes";

// Backwards compatibility - re-export Gemini
export { Gemini };
