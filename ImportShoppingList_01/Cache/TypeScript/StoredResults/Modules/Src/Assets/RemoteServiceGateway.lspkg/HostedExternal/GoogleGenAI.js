"use strict";
/**
 * Unified client for all Google GenAI APIs
 * Provides access to Gemini, Lyria, Imagen and other Google GenAI services
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gemini = exports.GoogleGenAI = void 0;
const Gemini_1 = require("./Gemini");
Object.defineProperty(exports, "Gemini", { enumerable: true, get: function () { return Gemini_1.Gemini; } });
const Lyria_1 = require("./Lyria");
const Imagen_1 = require("./Imagen");
/**
 * Main Google GenAI client that provides access to all Google GenAI APIs
 */
class GoogleGenAI {
}
exports.GoogleGenAI = GoogleGenAI;
/**
 * Access to Gemini API for text and multimodal generation
 */
GoogleGenAI.Gemini = Gemini_1.Gemini;
/**
 * Access to Lyria API for music and vocal generation
 */
GoogleGenAI.Lyria = Lyria_1.Lyria;
/**
 * Access to Imagen API for image generation and editing
 */
GoogleGenAI.Imagen = Imagen_1.Imagen;
//# sourceMappingURL=GoogleGenAI.js.map