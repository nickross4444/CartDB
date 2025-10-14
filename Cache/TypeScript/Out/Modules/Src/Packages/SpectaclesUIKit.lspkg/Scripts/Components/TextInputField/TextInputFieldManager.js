"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInputFieldManager = void 0;
const Singleton_1 = require("SpectaclesInteractionKit.lspkg/Decorators/Singleton");
const FunctionTimingUtils_1 = require("SpectaclesInteractionKit.lspkg/Utils/FunctionTimingUtils");
/**
 * TextFieldInputManager helps manage functions across all TextInputFields
 * This class is created and handled automatically and dynamically
 * You should not have to add it manually
 * If you see it in the scene preview that is good!
 */
let TextInputFieldManager = (() => {
    let _classDecorators = [Singleton_1.Singleton];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TextInputFieldManager = _classThis = class {
        constructor() {
            this.textInputFields = [];
            this.active = new Set();
            this.recentlyClosed = false;
            this.fieldToInteractables = {};
            this.interactables = new Set();
            this.initialized = false;
            /**
             * initialization function
             */
            this.initialize = () => {
                this.initialized = true;
            };
            /**
             *
             * @param field add field to text manager
             */
            this.addField = (field) => {
                this.textInputFields.push(field);
                const interactable = field.interactable;
                this.fieldToInteractables[field.uniqueIdentifier] = interactable;
                this.interactables.add(interactable);
            };
            this.isRegisteredTextFieldInteractable = (interactable) => {
                return this.interactables.has(interactable);
            };
            /**
             *
             * @param field remove field from text manager
             */
            this.removeField = (field) => {
                const index = this.textInputFields.indexOf(field);
                const interactable = this.fieldToInteractables[field.uniqueIdentifier];
                this.interactables.delete(interactable);
                delete this.fieldToInteractables[field.uniqueIdentifier];
                if (index > -1) {
                    this.textInputFields.splice(index, 1);
                }
            };
            /**
             * deselect all
             * @returns
             */
            this.deselectAll = () => {
                return new Promise((resolve, reject) => {
                    try {
                        for (const field of this.active.values()) {
                            field.editMode(false);
                        }
                        this.recentlyClosed = true;
                        (0, FunctionTimingUtils_1.setTimeout)(() => {
                            this.recentlyClosed = false;
                        }, 750);
                        resolve();
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            };
            /**
             *
             * @param field register this field as active
             */
            this.registerActive = (field) => {
                this.active.add(field);
            };
            /**
             *
             * @param field unregister this field as active
             */
            this.deregisterActive = (field) => {
                this.active.delete(field);
            };
        }
        TextInputFieldManager() {
            if (!this.initialized) {
                this.initialize();
            }
        }
    };
    __setFunctionName(_classThis, "TextInputFieldManager");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TextInputFieldManager = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TextInputFieldManager = _classThis;
})();
exports.TextInputFieldManager = TextInputFieldManager;
//# sourceMappingURL=TextInputFieldManager.js.map