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
exports.FrameButton = void 0;
var __selfType = requireType("./FrameButton");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const RoundButton_1 = require("../../Button/RoundButton");
const Gradients = {
    borderDefault: {
        enabled: true,
        start: new vec2(-1, 1),
        end: new vec2(1, -1),
        stop0: {
            enabled: true,
            color: new vec4(0.1, 0.1, 0.1, 1),
            percent: 0
        },
        stop1: {
            enabled: true,
            color: new vec4(0.2, 0.2, 0.2, 1),
            percent: 0.4
        },
        stop2: {
            enabled: true,
            color: new vec4(0.3, 0.3, 0.3, 1),
            percent: 0.6
        },
        stop3: {
            enabled: true,
            color: new vec4(0.4, 0.4, 0.4, 1),
            percent: 1
        }
    },
    borderTriggered: {
        enabled: true,
        start: new vec2(-1, 1),
        end: new vec2(1, -1),
        stop0: {
            enabled: true,
            color: new vec4(0.1, 0.1, 0.1, 1),
            percent: 0
        },
        stop1: {
            enabled: true,
            color: new vec4(0.2, 0.2, 0.2, 1),
            percent: 0.4
        },
        stop2: {
            enabled: true,
            color: new vec4(0.68, 0.57, 0.25, 0.8),
            percent: 0.6
        },
        stop3: {
            enabled: true,
            color: new vec4(0.68, 0.57, 0.25, 0.8),
            percent: 1
        }
    },
    backgroundDefault: {
        enabled: true,
        type: "Rectangle",
        stop0: {
            enabled: true,
            color: new vec4(0.3, 0.3, 0.3, 0.8),
            percent: 0.5
        },
        stop1: {
            enabled: true,
            color: new vec4(0.25, 0.25, 0.25, 0.8),
            percent: 1
        }
    },
    backgroundHover: {
        enabled: true,
        type: "Radial",
        start: new vec2(0, 0.5),
        end: new vec2(0, 1),
        stop0: {
            enabled: true,
            color: new vec4(0.3, 0.3, 0.3, 0.8),
            percent: 0.5
        },
        stop1: {
            enabled: true,
            color: new vec4(0.68, 0.57, 0.25, 0.8),
            percent: 2
        }
    },
    backgroundTriggered: {
        enabled: true,
        type: "Radial",
        start: new vec2(0, -0.5),
        end: new vec2(0, 0),
        stop0: {
            enabled: true,
            color: new vec4(0.3, 0.3, 0.3, 0.8),
            percent: 0.25
        },
        stop1: {
            enabled: true,
            color: new vec4(0.68, 0.57, 0.25, 0.8),
            percent: 1.75
        }
    }
};
let FrameButton = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var FrameButton = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.image = this.image;
        }
        __initialize() {
            super.__initialize();
            this.image = this.image;
        }
        /**
         * Initializes the button
         */
        initialize(texture = null) {
            const thisButton = this.sceneObject.getComponent(RoundButton_1.RoundButton.getTypeName());
            const rr = thisButton.visual;
            rr.renderMeshVisual.mainPass.colorMask = new vec4b(true, true, true, true);
            rr.renderMeshVisual.mainPass.blendMode = BlendMode.PremultipliedAlphaAuto;
            rr.initialize();
            rr.defaultGradient = Gradients.backgroundDefault;
            rr.hoverGradient = Gradients.backgroundHover;
            rr.triggeredGradient = Gradients.backgroundTriggered;
            rr.toggledDefaultGradient = Gradients.backgroundTriggered;
            rr.borderDefaultGradient = Gradients.borderDefault;
            rr.borderHoverGradient = Gradients.borderDefault;
            rr.borderTriggeredGradient = Gradients.borderTriggered;
            rr.defaultShouldPosition = false;
            rr.hoverShouldPosition = false;
            rr.triggeredShouldPosition = false;
            rr.toggledTriggeredShouldPosition = false;
            rr.toggledHoverShouldPosition = false;
            rr.renderMeshVisual.mainPass.twoSided = false;
            this.image.mainMaterial = this.image.mainMaterial.clone();
            this.image.mainPass.baseTex = texture;
        }
    };
    __setFunctionName(_classThis, "FrameButton");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FrameButton = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FrameButton = _classThis;
})();
exports.FrameButton = FrameButton;
//# sourceMappingURL=FrameButton.js.map