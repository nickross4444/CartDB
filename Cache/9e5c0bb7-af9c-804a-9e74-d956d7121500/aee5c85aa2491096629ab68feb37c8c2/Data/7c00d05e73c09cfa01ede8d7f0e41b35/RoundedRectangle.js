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
exports.RoundedRectangle = void 0;
var __selfType = requireType("./RoundedRectangle");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const BASE_MESH_SIZE = vec2.one().uniformScale(2);
/**
 * Rounded Rectangle Component
 * Gives a Rounded Rectangle at a given size
 * Provides Background Color, Gradient or Texture
 * And an Optional Inset Border, with Color or Gradient
 */
let RoundedRectangle = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var RoundedRectangle = _classThis = class extends _classSuper {
        constructor() {
            super();
            this._renderOrder = this._renderOrder;
            this._size = this._size;
            this._cornerRadius = this._cornerRadius;
            this._gradient = this._gradient;
            this._backgroundColor = this._backgroundColor;
            this._useTexture = this._useTexture;
            this._texture = this._texture;
            this._textureMode = this._textureMode;
            this._textureWrap = this._textureWrap;
            this._gradientType = this._gradientType;
            this._gradientStartPosition = this._gradientStartPosition;
            this._gradientEndPosition = this._gradientEndPosition;
            this._gradientColor0 = this._gradientColor0;
            this._gradientPercent0 = this._gradientPercent0;
            this._gradientColor1 = this._gradientColor1;
            this._gradientPercent1 = this._gradientPercent1;
            this._gradientStop2 = this._gradientStop2;
            this._gradientColor2 = this._gradientColor2;
            this._gradientPercent2 = this._gradientPercent2;
            this._gradientStop3 = this._gradientStop3;
            this._gradientColor3 = this._gradientColor3;
            this._gradientPercent3 = this._gradientPercent3;
            this._gradientStop4 = this._gradientStop4;
            this._gradientColor4 = this._gradientColor4;
            this._gradientPercent4 = this._gradientPercent4;
            this._gradientStop5 = this._gradientStop5;
            this._gradientColor5 = this._gradientColor5;
            this._gradientPercent5 = this._gradientPercent5;
            this._border = this._border;
            this._borderSize = this._borderSize;
            this._borderType = this._borderType;
            this._borderColor = this._borderColor;
            this._borderGradientType = this._borderGradientType;
            this._borderGradientStartPosition = this._borderGradientStartPosition;
            this._borderGradientEndPosition = this._borderGradientEndPosition;
            this._borderGradientColor0 = this._borderGradientColor0;
            this._borderGradientPercent0 = this._borderGradientPercent0;
            this._borderGradientColor1 = this._borderGradientColor1;
            this._borderGradientPercent1 = this._borderGradientPercent1;
            this._borderGradientStop2 = this._borderGradientStop2;
            this._borderGradientColor2 = this._borderGradientColor2;
            this._borderGradientPercent2 = this._borderGradientPercent2;
            this._borderGradientStop3 = this._borderGradientStop3;
            this._borderGradientColor3 = this._borderGradientColor3;
            this._borderGradientPercent3 = this._borderGradientPercent3;
            this._borderGradientStop4 = this._borderGradientStop4;
            this._borderGradientColor4 = this._borderGradientColor4;
            this._borderGradientPercent4 = this._borderGradientPercent4;
            this._borderGradientStop5 = this._borderGradientStop5;
            this._borderGradientColor5 = this._borderGradientColor5;
            this._borderGradientPercent5 = this._borderGradientPercent5;
            this._initialized = false;
            this._transform = this.sceneObject.getTransform();
            /**
             * get a stop from the background gradient at index
             * @param index: number
             * @returns GradientStop
             */
            this.getBackgroundGradientStop = (index) => {
                return {
                    color: this["_gradientColor" + index],
                    percent: this["_gradientPercent" + index],
                    enabled: this["_gradientStop" + index]
                };
            };
            /**
             * set a stop in the background gradient
             * at given index, with parameters defined by GradientStop
             * @param index: number
             * @param stop: GradientStop
             */
            this.setBackgroundGradientStop = (index, stop) => {
                if (stop.color !== undefined)
                    this["_gradientColor" + index] = stop.color;
                if (stop.percent !== undefined)
                    this["_gradientPercent" + index] = stop.percent;
                if (stop.enabled !== undefined)
                    this["_gradientStop" + index] = stop.enabled;
                else
                    this["_gradientStop" + index] = true;
                this.updateBackgroundGradient();
            };
            /**
             * set background gradient using a GradientParameters input
             * @param gradientParameters: GradientParameters
             */
            this.setBackgroundGradient = (gradientParameters) => {
                if (gradientParameters.enabled !== undefined)
                    this.gradient = gradientParameters.enabled;
                if (gradientParameters.type !== undefined)
                    this.gradientType = gradientParameters.type;
                if (gradientParameters.stop0)
                    this.setBackgroundGradientStop(0, gradientParameters.stop0);
                else
                    this.setBackgroundGradientStop(0, { enabled: false });
                if (gradientParameters.stop1)
                    this.setBackgroundGradientStop(1, gradientParameters.stop1);
                else
                    this.setBackgroundGradientStop(1, { enabled: false });
                if (gradientParameters.stop2)
                    this.setBackgroundGradientStop(2, gradientParameters.stop2);
                else
                    this.setBackgroundGradientStop(2, { enabled: false });
                if (gradientParameters.stop3)
                    this.setBackgroundGradientStop(3, gradientParameters.stop3);
                else
                    this.setBackgroundGradientStop(3, { enabled: false });
                if (gradientParameters.stop4)
                    this.setBackgroundGradientStop(4, gradientParameters.stop4);
                else
                    this.setBackgroundGradientStop(4, { enabled: false });
                if (gradientParameters.start)
                    this.gradientStartPosition = gradientParameters.start;
                if (gradientParameters.end)
                    this.gradientEndPosition = gradientParameters.end;
                this.updateBackgroundGradient();
            };
            /**
             * get a stop from the border gradient at index
             * @param index: number
             * @returns GradientStop
             */
            this.getBorderGradientStop = (index) => {
                return {
                    color: this["_borderGradientColor" + index],
                    percent: this["_borderGradientPercent" + index],
                    enabled: this["_borderGradientStop" + index]
                };
            };
            /**
             * set a stop in the border gradient
             * at given index, with parameters defined by GradientStop
             * @param index: number
             * @param stop: GradientStop
             */
            this.setBorderGradientStop = (index, stop) => {
                if (stop.color !== undefined)
                    this["_borderGradientColor" + index] = stop.color;
                if (stop.percent !== undefined)
                    this["_borderGradientPercent" + index] = stop.percent;
                if (stop.enabled !== undefined)
                    this["_borderGradientStop" + index] = stop.enabled;
                else
                    this["_borderGradientStop" + index] = true;
                this.updateBorderGradient();
            };
            /**
             * set background gradient using a GradientParameters input
             * @param gradientParameters: GradientParameters
             */
            this.setBorderGradient = (gradientParameters) => {
                if (gradientParameters.enabled !== undefined)
                    this.borderType = gradientParameters.enabled ? "Gradient" : "Color";
                if (gradientParameters.type !== undefined)
                    this.borderGradientType = gradientParameters.type;
                if (gradientParameters.stop0)
                    this.setBorderGradientStop(0, gradientParameters.stop0);
                else
                    this.setBorderGradientStop(0, { enabled: false });
                if (gradientParameters.stop1)
                    this.setBorderGradientStop(1, gradientParameters.stop1);
                else
                    this.setBorderGradientStop(1, { enabled: false });
                if (gradientParameters.stop2)
                    this.setBorderGradientStop(2, gradientParameters.stop2);
                else
                    this.setBorderGradientStop(2, { enabled: false });
                if (gradientParameters.stop3)
                    this.setBorderGradientStop(3, gradientParameters.stop3);
                else
                    this.setBorderGradientStop(3, { enabled: false });
                if (gradientParameters.stop4)
                    this.setBorderGradientStop(4, gradientParameters.stop4);
                else
                    this.setBorderGradientStop(4, { enabled: false });
                if (gradientParameters.start)
                    this.borderGradientStartPosition = gradientParameters.start;
                if (gradientParameters.end)
                    this.borderGradientEndPosition = gradientParameters.end;
                this.updateBorderGradient();
            };
            /**
             * internal function to update material based on background gradient params
             */
            this.updateBackgroundGradient = () => {
                let stops = 0;
                if (this._gradient) {
                    stops = 2;
                    this.renderMeshVisual.mainPass["colors[0]"] = this._gradientColor0;
                    this.renderMeshVisual.mainPass["percents[0]"] = this._gradientPercent0;
                    this.renderMeshVisual.mainPass["colors[1]"] = this._gradientColor1;
                    this.renderMeshVisual.mainPass["percents[1]"] = this._gradientPercent1;
                    if (this._gradientStop2) {
                        stops = 3;
                        this.renderMeshVisual.mainPass["colors[2]"] = this._gradientColor2;
                        this.renderMeshVisual.mainPass["percents[2]"] = this._gradientPercent2;
                    }
                    if (this._gradientStop3) {
                        stops = 4;
                        this.renderMeshVisual.mainPass["colors[3]"] = this._gradientColor3;
                        this.renderMeshVisual.mainPass["percents[3]"] = this._gradientPercent3;
                    }
                    if (this._gradientStop4) {
                        stops = 5;
                        this.renderMeshVisual.mainPass["colors[4]"] = this._gradientColor4;
                        this.renderMeshVisual.mainPass["percents[4]"] = this._gradientPercent4;
                    }
                    if (this._gradientStop5) {
                        stops = 6;
                        this.renderMeshVisual.mainPass["colors[5]"] = this._gradientColor5;
                        this.renderMeshVisual.mainPass["percents[5]"] = this._gradientPercent5;
                    }
                    if (this._gradientType === "Linear") {
                        const angle = Math.atan2(this._gradientEndPosition.y - this._gradientStartPosition.y, this._gradientEndPosition.x - this._gradientStartPosition.x);
                        const linearGradientStart = this._gradientStartPosition.x * Math.cos(-angle) - this._gradientStartPosition.y * Math.sin(-angle);
                        this.renderMeshVisual.mainPass.linearGradientStart = linearGradientStart;
                        const linearGradientEnd = this._gradientEndPosition.x * Math.cos(-angle) - this._gradientEndPosition.y * Math.sin(-angle);
                        this.renderMeshVisual.mainPass.linearGradientEnd = linearGradientEnd;
                        this.renderMeshVisual.mainPass.linearGradientAngle = angle;
                        this.renderMeshVisual.mainPass.linearGradientLength = linearGradientEnd - linearGradientStart;
                    }
                    else if (this._gradientType === "Radial") {
                        const diff = this._gradientEndPosition.sub(this._gradientStartPosition);
                        this.renderMeshVisual.mainPass.radialGradientLength = diff.length;
                    }
                    if (this._gradientType === "Linear") {
                        this.renderMeshVisual.mainPass.gradientType = 0;
                    }
                    else if (this._gradientType === "Radial") {
                        this.renderMeshVisual.mainPass.gradientType = 1;
                    }
                    else if (this._gradientType === "Rectangle") {
                        this.renderMeshVisual.mainPass.gradientType = 2;
                    }
                    this.renderMeshVisual.mainPass.gradientStartPosition = this._gradientStartPosition;
                }
                this.renderMeshVisual.mainPass.stops = stops;
            };
            /**
             * internal function to update material based on border gradient params
             */
            this.updateBorderGradient = () => {
                let stops = 0;
                if (this._borderType === "Gradient" && this.border) {
                    stops = 2;
                    this.renderMeshVisual.mainPass["borderGradientColors[0]"] = this._borderGradientColor0;
                    this.renderMeshVisual.mainPass["borderGradientPercents[0]"] = this._borderGradientPercent0;
                    this.renderMeshVisual.mainPass["borderGradientColors[1]"] = this._borderGradientColor1;
                    this.renderMeshVisual.mainPass["borderGradientPercents[1]"] = this._borderGradientPercent1;
                    if (this._borderGradientStop2) {
                        stops = 3;
                        this.renderMeshVisual.mainPass["borderGradientColors[2]"] = this._borderGradientColor2;
                        this.renderMeshVisual.mainPass["borderGradientPercents[2]"] = this._borderGradientPercent2;
                    }
                    if (this._borderGradientStop3) {
                        stops = 4;
                        this.renderMeshVisual.mainPass["borderGradientColors[3]"] = this._borderGradientColor3;
                        this.renderMeshVisual.mainPass["borderGradientPercents[3]"] = this._borderGradientPercent3;
                    }
                    if (this._borderGradientStop4) {
                        stops = 5;
                        this.renderMeshVisual.mainPass["borderGradientColors[4]"] = this._borderGradientColor4;
                        this.renderMeshVisual.mainPass["borderGradientPercents[4]"] = this._borderGradientPercent4;
                    }
                    if (this._borderGradientStop5) {
                        stops = 6;
                        this.renderMeshVisual.mainPass["borderGradientColors[5]"] = this._borderGradientColor5;
                        this.renderMeshVisual.mainPass["borderGradientPercents[5]"] = this._borderGradientPercent5;
                    }
                    if (this._borderGradientType === "Linear") {
                        const angle = Math.atan2(this._borderGradientEndPosition.y - this._borderGradientStartPosition.y, this._borderGradientEndPosition.x - this._borderGradientStartPosition.x);
                        const linearGradientStart = this._borderGradientStartPosition.x * Math.cos(-angle) -
                            this._borderGradientStartPosition.y * Math.sin(-angle);
                        this.renderMeshVisual.mainPass.borderLinearGradientStart = linearGradientStart;
                        const linearGradientEnd = this._borderGradientEndPosition.x * Math.cos(-angle) - this._borderGradientEndPosition.y * Math.sin(-angle);
                        this.renderMeshVisual.mainPass.borderLinearGradientEnd = linearGradientEnd;
                        this.renderMeshVisual.mainPass.borderLinearGradientAngle = angle;
                        this.renderMeshVisual.mainPass.borderLinearGradientLength = linearGradientEnd - linearGradientStart;
                    }
                    else if (this._borderGradientType === "Radial") {
                        const diff = this._borderGradientEndPosition.sub(this._borderGradientStartPosition);
                        this.renderMeshVisual.mainPass.borderRadialGradientLength = diff.length;
                    }
                    if (this._borderGradientType === "Linear") {
                        this.renderMeshVisual.mainPass.borderGradientType = 0;
                    }
                    else if (this._borderGradientType === "Radial") {
                        this.renderMeshVisual.mainPass.borderGradientType = 1;
                    }
                    else if (this._borderGradientType === "Rectangle") {
                        this.renderMeshVisual.mainPass.borderGradientType = 2;
                    }
                    this.renderMeshVisual.mainPass.borderGradientStartPosition = this._borderGradientStartPosition;
                }
                this.renderMeshVisual.mainPass.borderGradientStops = stops;
            };
        }
        __initialize() {
            super.__initialize();
            this._renderOrder = this._renderOrder;
            this._size = this._size;
            this._cornerRadius = this._cornerRadius;
            this._gradient = this._gradient;
            this._backgroundColor = this._backgroundColor;
            this._useTexture = this._useTexture;
            this._texture = this._texture;
            this._textureMode = this._textureMode;
            this._textureWrap = this._textureWrap;
            this._gradientType = this._gradientType;
            this._gradientStartPosition = this._gradientStartPosition;
            this._gradientEndPosition = this._gradientEndPosition;
            this._gradientColor0 = this._gradientColor0;
            this._gradientPercent0 = this._gradientPercent0;
            this._gradientColor1 = this._gradientColor1;
            this._gradientPercent1 = this._gradientPercent1;
            this._gradientStop2 = this._gradientStop2;
            this._gradientColor2 = this._gradientColor2;
            this._gradientPercent2 = this._gradientPercent2;
            this._gradientStop3 = this._gradientStop3;
            this._gradientColor3 = this._gradientColor3;
            this._gradientPercent3 = this._gradientPercent3;
            this._gradientStop4 = this._gradientStop4;
            this._gradientColor4 = this._gradientColor4;
            this._gradientPercent4 = this._gradientPercent4;
            this._gradientStop5 = this._gradientStop5;
            this._gradientColor5 = this._gradientColor5;
            this._gradientPercent5 = this._gradientPercent5;
            this._border = this._border;
            this._borderSize = this._borderSize;
            this._borderType = this._borderType;
            this._borderColor = this._borderColor;
            this._borderGradientType = this._borderGradientType;
            this._borderGradientStartPosition = this._borderGradientStartPosition;
            this._borderGradientEndPosition = this._borderGradientEndPosition;
            this._borderGradientColor0 = this._borderGradientColor0;
            this._borderGradientPercent0 = this._borderGradientPercent0;
            this._borderGradientColor1 = this._borderGradientColor1;
            this._borderGradientPercent1 = this._borderGradientPercent1;
            this._borderGradientStop2 = this._borderGradientStop2;
            this._borderGradientColor2 = this._borderGradientColor2;
            this._borderGradientPercent2 = this._borderGradientPercent2;
            this._borderGradientStop3 = this._borderGradientStop3;
            this._borderGradientColor3 = this._borderGradientColor3;
            this._borderGradientPercent3 = this._borderGradientPercent3;
            this._borderGradientStop4 = this._borderGradientStop4;
            this._borderGradientColor4 = this._borderGradientColor4;
            this._borderGradientPercent4 = this._borderGradientPercent4;
            this._borderGradientStop5 = this._borderGradientStop5;
            this._borderGradientColor5 = this._borderGradientColor5;
            this._borderGradientPercent5 = this._borderGradientPercent5;
            this._initialized = false;
            this._transform = this.sceneObject.getTransform();
            /**
             * get a stop from the background gradient at index
             * @param index: number
             * @returns GradientStop
             */
            this.getBackgroundGradientStop = (index) => {
                return {
                    color: this["_gradientColor" + index],
                    percent: this["_gradientPercent" + index],
                    enabled: this["_gradientStop" + index]
                };
            };
            /**
             * set a stop in the background gradient
             * at given index, with parameters defined by GradientStop
             * @param index: number
             * @param stop: GradientStop
             */
            this.setBackgroundGradientStop = (index, stop) => {
                if (stop.color !== undefined)
                    this["_gradientColor" + index] = stop.color;
                if (stop.percent !== undefined)
                    this["_gradientPercent" + index] = stop.percent;
                if (stop.enabled !== undefined)
                    this["_gradientStop" + index] = stop.enabled;
                else
                    this["_gradientStop" + index] = true;
                this.updateBackgroundGradient();
            };
            /**
             * set background gradient using a GradientParameters input
             * @param gradientParameters: GradientParameters
             */
            this.setBackgroundGradient = (gradientParameters) => {
                if (gradientParameters.enabled !== undefined)
                    this.gradient = gradientParameters.enabled;
                if (gradientParameters.type !== undefined)
                    this.gradientType = gradientParameters.type;
                if (gradientParameters.stop0)
                    this.setBackgroundGradientStop(0, gradientParameters.stop0);
                else
                    this.setBackgroundGradientStop(0, { enabled: false });
                if (gradientParameters.stop1)
                    this.setBackgroundGradientStop(1, gradientParameters.stop1);
                else
                    this.setBackgroundGradientStop(1, { enabled: false });
                if (gradientParameters.stop2)
                    this.setBackgroundGradientStop(2, gradientParameters.stop2);
                else
                    this.setBackgroundGradientStop(2, { enabled: false });
                if (gradientParameters.stop3)
                    this.setBackgroundGradientStop(3, gradientParameters.stop3);
                else
                    this.setBackgroundGradientStop(3, { enabled: false });
                if (gradientParameters.stop4)
                    this.setBackgroundGradientStop(4, gradientParameters.stop4);
                else
                    this.setBackgroundGradientStop(4, { enabled: false });
                if (gradientParameters.start)
                    this.gradientStartPosition = gradientParameters.start;
                if (gradientParameters.end)
                    this.gradientEndPosition = gradientParameters.end;
                this.updateBackgroundGradient();
            };
            /**
             * get a stop from the border gradient at index
             * @param index: number
             * @returns GradientStop
             */
            this.getBorderGradientStop = (index) => {
                return {
                    color: this["_borderGradientColor" + index],
                    percent: this["_borderGradientPercent" + index],
                    enabled: this["_borderGradientStop" + index]
                };
            };
            /**
             * set a stop in the border gradient
             * at given index, with parameters defined by GradientStop
             * @param index: number
             * @param stop: GradientStop
             */
            this.setBorderGradientStop = (index, stop) => {
                if (stop.color !== undefined)
                    this["_borderGradientColor" + index] = stop.color;
                if (stop.percent !== undefined)
                    this["_borderGradientPercent" + index] = stop.percent;
                if (stop.enabled !== undefined)
                    this["_borderGradientStop" + index] = stop.enabled;
                else
                    this["_borderGradientStop" + index] = true;
                this.updateBorderGradient();
            };
            /**
             * set background gradient using a GradientParameters input
             * @param gradientParameters: GradientParameters
             */
            this.setBorderGradient = (gradientParameters) => {
                if (gradientParameters.enabled !== undefined)
                    this.borderType = gradientParameters.enabled ? "Gradient" : "Color";
                if (gradientParameters.type !== undefined)
                    this.borderGradientType = gradientParameters.type;
                if (gradientParameters.stop0)
                    this.setBorderGradientStop(0, gradientParameters.stop0);
                else
                    this.setBorderGradientStop(0, { enabled: false });
                if (gradientParameters.stop1)
                    this.setBorderGradientStop(1, gradientParameters.stop1);
                else
                    this.setBorderGradientStop(1, { enabled: false });
                if (gradientParameters.stop2)
                    this.setBorderGradientStop(2, gradientParameters.stop2);
                else
                    this.setBorderGradientStop(2, { enabled: false });
                if (gradientParameters.stop3)
                    this.setBorderGradientStop(3, gradientParameters.stop3);
                else
                    this.setBorderGradientStop(3, { enabled: false });
                if (gradientParameters.stop4)
                    this.setBorderGradientStop(4, gradientParameters.stop4);
                else
                    this.setBorderGradientStop(4, { enabled: false });
                if (gradientParameters.start)
                    this.borderGradientStartPosition = gradientParameters.start;
                if (gradientParameters.end)
                    this.borderGradientEndPosition = gradientParameters.end;
                this.updateBorderGradient();
            };
            /**
             * internal function to update material based on background gradient params
             */
            this.updateBackgroundGradient = () => {
                let stops = 0;
                if (this._gradient) {
                    stops = 2;
                    this.renderMeshVisual.mainPass["colors[0]"] = this._gradientColor0;
                    this.renderMeshVisual.mainPass["percents[0]"] = this._gradientPercent0;
                    this.renderMeshVisual.mainPass["colors[1]"] = this._gradientColor1;
                    this.renderMeshVisual.mainPass["percents[1]"] = this._gradientPercent1;
                    if (this._gradientStop2) {
                        stops = 3;
                        this.renderMeshVisual.mainPass["colors[2]"] = this._gradientColor2;
                        this.renderMeshVisual.mainPass["percents[2]"] = this._gradientPercent2;
                    }
                    if (this._gradientStop3) {
                        stops = 4;
                        this.renderMeshVisual.mainPass["colors[3]"] = this._gradientColor3;
                        this.renderMeshVisual.mainPass["percents[3]"] = this._gradientPercent3;
                    }
                    if (this._gradientStop4) {
                        stops = 5;
                        this.renderMeshVisual.mainPass["colors[4]"] = this._gradientColor4;
                        this.renderMeshVisual.mainPass["percents[4]"] = this._gradientPercent4;
                    }
                    if (this._gradientStop5) {
                        stops = 6;
                        this.renderMeshVisual.mainPass["colors[5]"] = this._gradientColor5;
                        this.renderMeshVisual.mainPass["percents[5]"] = this._gradientPercent5;
                    }
                    if (this._gradientType === "Linear") {
                        const angle = Math.atan2(this._gradientEndPosition.y - this._gradientStartPosition.y, this._gradientEndPosition.x - this._gradientStartPosition.x);
                        const linearGradientStart = this._gradientStartPosition.x * Math.cos(-angle) - this._gradientStartPosition.y * Math.sin(-angle);
                        this.renderMeshVisual.mainPass.linearGradientStart = linearGradientStart;
                        const linearGradientEnd = this._gradientEndPosition.x * Math.cos(-angle) - this._gradientEndPosition.y * Math.sin(-angle);
                        this.renderMeshVisual.mainPass.linearGradientEnd = linearGradientEnd;
                        this.renderMeshVisual.mainPass.linearGradientAngle = angle;
                        this.renderMeshVisual.mainPass.linearGradientLength = linearGradientEnd - linearGradientStart;
                    }
                    else if (this._gradientType === "Radial") {
                        const diff = this._gradientEndPosition.sub(this._gradientStartPosition);
                        this.renderMeshVisual.mainPass.radialGradientLength = diff.length;
                    }
                    if (this._gradientType === "Linear") {
                        this.renderMeshVisual.mainPass.gradientType = 0;
                    }
                    else if (this._gradientType === "Radial") {
                        this.renderMeshVisual.mainPass.gradientType = 1;
                    }
                    else if (this._gradientType === "Rectangle") {
                        this.renderMeshVisual.mainPass.gradientType = 2;
                    }
                    this.renderMeshVisual.mainPass.gradientStartPosition = this._gradientStartPosition;
                }
                this.renderMeshVisual.mainPass.stops = stops;
            };
            /**
             * internal function to update material based on border gradient params
             */
            this.updateBorderGradient = () => {
                let stops = 0;
                if (this._borderType === "Gradient" && this.border) {
                    stops = 2;
                    this.renderMeshVisual.mainPass["borderGradientColors[0]"] = this._borderGradientColor0;
                    this.renderMeshVisual.mainPass["borderGradientPercents[0]"] = this._borderGradientPercent0;
                    this.renderMeshVisual.mainPass["borderGradientColors[1]"] = this._borderGradientColor1;
                    this.renderMeshVisual.mainPass["borderGradientPercents[1]"] = this._borderGradientPercent1;
                    if (this._borderGradientStop2) {
                        stops = 3;
                        this.renderMeshVisual.mainPass["borderGradientColors[2]"] = this._borderGradientColor2;
                        this.renderMeshVisual.mainPass["borderGradientPercents[2]"] = this._borderGradientPercent2;
                    }
                    if (this._borderGradientStop3) {
                        stops = 4;
                        this.renderMeshVisual.mainPass["borderGradientColors[3]"] = this._borderGradientColor3;
                        this.renderMeshVisual.mainPass["borderGradientPercents[3]"] = this._borderGradientPercent3;
                    }
                    if (this._borderGradientStop4) {
                        stops = 5;
                        this.renderMeshVisual.mainPass["borderGradientColors[4]"] = this._borderGradientColor4;
                        this.renderMeshVisual.mainPass["borderGradientPercents[4]"] = this._borderGradientPercent4;
                    }
                    if (this._borderGradientStop5) {
                        stops = 6;
                        this.renderMeshVisual.mainPass["borderGradientColors[5]"] = this._borderGradientColor5;
                        this.renderMeshVisual.mainPass["borderGradientPercents[5]"] = this._borderGradientPercent5;
                    }
                    if (this._borderGradientType === "Linear") {
                        const angle = Math.atan2(this._borderGradientEndPosition.y - this._borderGradientStartPosition.y, this._borderGradientEndPosition.x - this._borderGradientStartPosition.x);
                        const linearGradientStart = this._borderGradientStartPosition.x * Math.cos(-angle) -
                            this._borderGradientStartPosition.y * Math.sin(-angle);
                        this.renderMeshVisual.mainPass.borderLinearGradientStart = linearGradientStart;
                        const linearGradientEnd = this._borderGradientEndPosition.x * Math.cos(-angle) - this._borderGradientEndPosition.y * Math.sin(-angle);
                        this.renderMeshVisual.mainPass.borderLinearGradientEnd = linearGradientEnd;
                        this.renderMeshVisual.mainPass.borderLinearGradientAngle = angle;
                        this.renderMeshVisual.mainPass.borderLinearGradientLength = linearGradientEnd - linearGradientStart;
                    }
                    else if (this._borderGradientType === "Radial") {
                        const diff = this._borderGradientEndPosition.sub(this._borderGradientStartPosition);
                        this.renderMeshVisual.mainPass.borderRadialGradientLength = diff.length;
                    }
                    if (this._borderGradientType === "Linear") {
                        this.renderMeshVisual.mainPass.borderGradientType = 0;
                    }
                    else if (this._borderGradientType === "Radial") {
                        this.renderMeshVisual.mainPass.borderGradientType = 1;
                    }
                    else if (this._borderGradientType === "Rectangle") {
                        this.renderMeshVisual.mainPass.borderGradientType = 2;
                    }
                    this.renderMeshVisual.mainPass.borderGradientStartPosition = this._borderGradientStartPosition;
                }
                this.renderMeshVisual.mainPass.borderGradientStops = stops;
            };
        }
        /**
         * The render order of the Rounded Rectangle.
         */
        get renderOrder() {
            return this._renderOrder;
        }
        /**
         * The render order of the Rounded Rectangle.
         */
        set renderOrder(value) {
            if (value === undefined) {
                return;
            }
            this._renderOrder = value;
            if (this._initialized) {
                this._rmv.renderOrder = value;
            }
        }
        onAwake() {
            this.createEvent("OnStartEvent").bind(() => {
                this.initialize();
            });
            this.createEvent("OnEnableEvent").bind(() => {
                if (this._initialized) {
                    this._rmv.enabled = true;
                }
            });
            this.createEvent("OnDisableEvent").bind(() => {
                if (this._initialized) {
                    this._rmv.enabled = false;
                }
            });
            this.createEvent("OnDestroyEvent").bind(() => {
                this._rmv?.destroy();
                this._rmv = null;
            });
        }
        /**
         * initialize function
         * run once
         * if creating dynamically: set parameters, then run this function to create and initialize in one frame
         */
        initialize() {
            if (this._initialized)
                return;
            // setup mesh
            this._rmv =
                this.sceneObject.getComponent("RenderMeshVisual") || this.sceneObject.createComponent("RenderMeshVisual");
            this._rmv.mesh = RoundedRectangle._mesh;
            this.applyMaterial();
            this._rmv.renderOrder = this._renderOrder;
            // Initializing Size
            const frustumVec = new vec3(this._size.x, this._size.y, 0);
            this._rmv.mainPass.size = this._size.sub(BASE_MESH_SIZE); // subtract size of underlying circle mesh
            this._rmv.mainPass.frustumCullMin = frustumVec.uniformScale(-0.5);
            this._rmv.mainPass.frustumCullMax = frustumVec.uniformScale(0.5);
            // Initializing Corner Radius
            this._rmv.mainPass.cornerRadius = this._cornerRadius;
            // Initializing Border
            this._rmv.mainPass.border = this._border ? 1 : 0;
            // need border calculations if using gradient type rectangle
            if (!this._border) {
                this._borderSize = 0;
                if (this._gradientType === "Rectangle") {
                    this._rmv.mainPass.border = 1;
                }
            }
            this._rmv.mainPass.borderSize = this._borderSize;
            this._rmv.mainPass.borderColor = this._borderColor;
            this.updateBorderGradient();
            // Initializing Background Color
            this._rmv.mainPass.backgroundColor = this._backgroundColor;
            // Initializing Background Gradient
            this.updateBackgroundGradient();
            // Initializing Texture
            this._rmv.mainPass.useTexture = this._useTexture ? 1 : 0;
            const textureAspect = this._texture ? (this._texture.control.getAspect() * this.size.y) / this.size.x : 1;
            if (this._textureMode === "Stretch") {
                this._rmv.mainPass.textureMode = new vec2(1, 1);
            }
            else if (this._textureMode === "Fill Height") {
                this._rmv.mainPass.textureMode = new vec2(1 / textureAspect, 1);
            }
            else if (this._textureMode === "Fill Width") {
                this._rmv.mainPass.textureMode = new vec2(1, textureAspect);
            }
            if (this._textureWrap === "None") {
                this._rmv.mainPass.textureWrap = 0;
            }
            else if (this._textureWrap === "Repeat") {
                this._rmv.mainPass.textureWrap = 1;
            }
            else if (this._textureWrap === "Clamp") {
                this._rmv.mainPass.textureWrap = 2;
            }
            if (this._texture) {
                this._rmv.mainPass.backgroundTexture = this._texture;
            }
            this._initialized = true;
        }
        applyMaterial() {
            if (!this._material) {
                this._material = RoundedRectangle._materialAsset;
            }
            this._material = this._material.clone();
            this._material.mainPass.frustumCullMode = FrustumCullMode.UserDefinedAABB;
            this._rmv.mainMaterial = this._material;
            this.size = this._size;
            this.cornerRadius = this._cornerRadius;
            this.backgroundColor = this._backgroundColor;
            this.gradient = this._gradient;
            this.gradientType = this._gradientType;
            this.border = this._border;
            if (this.border) {
                this.borderType = this._borderType;
                this.borderSize = this._borderSize;
                this.borderColor = this._borderColor;
            }
            this.useTexture = this._useTexture;
            if (this.useTexture) {
                this.texture = this._texture;
                this.textureMode = this._textureMode;
                this.textureWrap = this._textureWrap;
            }
            this.updateBackgroundGradient();
            this.updateBorderGradient();
        }
        /**
         * The transform of the rounded rectangle.
         */
        get transform() {
            return this._transform;
        }
        /**
         * The render mesh visual of the rounded rectangle.
         */
        get renderMeshVisual() {
            return this._rmv;
        }
        /**
         * @returns vec2 size of the rectangle in centimeters in local space.
         */
        get size() {
            return this._size;
        }
        /**
         * @param size set the rectangle to this size in centimeters in local space.
         */
        set size(size) {
            if (size === undefined) {
                return;
            }
            this._size = size;
            if (this._initialized) {
                const frustumVec = new vec3(size.x, size.y, 0);
                if (this.renderMeshVisual.mainMaterial) {
                    this.renderMeshVisual.mainPass.size = this._size.sub(BASE_MESH_SIZE); // subtract size of underlying circle mesh
                    this.renderMeshVisual.mainPass.frustumCullMin = frustumVec.uniformScale(-0.5);
                    this.renderMeshVisual.mainPass.frustumCullMax = frustumVec.uniformScale(0.5);
                }
            }
        }
        /**
         * @returns current corner radius in centimeters in local space.
         */
        get cornerRadius() {
            return this._cornerRadius;
        }
        /**
         * @param cornerRadius set corner radius in centimeters in local space.
         */
        set cornerRadius(cornerRadius) {
            if (cornerRadius === undefined) {
                return;
            }
            this._cornerRadius = cornerRadius;
            if (this._initialized) {
                this.renderMeshVisual.mainPass.cornerRadius = cornerRadius;
            }
        }
        /**
         * @returns vec4 of current background color. for solid color, not gradient.
         */
        get backgroundColor() {
            return this._backgroundColor;
        }
        /**
         * @param color set current solid background color.
         */
        set backgroundColor(color) {
            if (color === undefined) {
                return;
            }
            this._backgroundColor = color;
            if (this._initialized) {
                this.renderMeshVisual.mainPass.backgroundColor = color;
            }
        }
        /**
         * @returns boolean of whether this uses a background texture.
         */
        get useTexture() {
            return this._useTexture;
        }
        /**
         * @param use boolean of whether to use a background texture.
         */
        set useTexture(use) {
            if (use === undefined) {
                return;
            }
            this._useTexture = use;
            if (this._initialized) {
                this.renderMeshVisual.mainPass.useTexture = use ? 1 : 0;
            }
        }
        /**
         * @returns current background texture asset.
         */
        get texture() {
            return this._texture;
        }
        /**
         * @param texture set asset for background texture.
         */
        set texture(texture) {
            if (texture === undefined) {
                return;
            }
            this._texture = texture;
            if (this._initialized) {
                this.renderMeshVisual.mainPass.backgroundTexture = this._texture;
            }
        }
        /**
         * @returns current texture mode of background texture: Stretch, Fill Height or Fill Width.
         */
        get textureMode() {
            return this._textureMode;
        }
        /**
         * @param mode set texture mode of background texture: Stretch: Fill Height or Fill Width.
         */
        set textureMode(mode) {
            if (mode === undefined) {
                return;
            }
            this._textureMode = mode;
            if (this._initialized) {
                // const rectAspect = mode === "Fill Width" ? this.size.y / this.size.x : this.size.x / this.size.y
                const textureAspect = (this._texture.control.getAspect() * this.size.y) / this.size.x;
                // const textureAspect = this._texture.control.getAspect()
                if (mode === "Stretch") {
                    this.renderMeshVisual.mainPass.textureMode = new vec2(1, 1);
                }
                else if (mode === "Fill Height") {
                    this.renderMeshVisual.mainPass.textureMode = new vec2(1 / textureAspect, 1);
                }
                else if (mode === "Fill Width") {
                    this.renderMeshVisual.mainPass.textureMode = new vec2(1, textureAspect);
                }
            }
        }
        /**
         * @returns current texture wrap method: None, Repeat or Clamp.
         */
        get textureWrap() {
            return this._textureWrap;
        }
        /**
         * @param wrap sets current texture wrap method: None, Repeat or Clamp.
         */
        set textureWrap(wrap) {
            if (wrap === undefined) {
                return;
            }
            this._textureWrap = wrap;
            if (this._initialized) {
                if (wrap === "None") {
                    this.renderMeshVisual.mainPass.textureWrap = 0;
                }
                else if (wrap === "Repeat") {
                    this.renderMeshVisual.mainPass.textureWrap = 1;
                }
                else if (wrap === "Clamp") {
                    this.renderMeshVisual.mainPass.textureWrap = 2;
                }
            }
        }
        /**
         * @returns boolean of whether or not the background uses a gradient.
         */
        get gradient() {
            return this._gradient;
        }
        /**
         * @param enabled boolean to enable or disable background gradient.
         */
        set gradient(enabled) {
            if (enabled === undefined) {
                return;
            }
            this._gradient = enabled;
            if (this._initialized) {
                this.updateBackgroundGradient();
            }
        }
        /**
         * @returns type of the background gradient: Linear, or Radial.
         */
        get gradientType() {
            return this._gradientType;
        }
        /**
         * @param type set type of the background gradient: Linear or Radial.
         */
        set gradientType(type) {
            if (type === undefined) {
                return;
            }
            this._gradientType = type;
            if (this._initialized) {
                if (this._gradientType === "Rectangle") {
                    // rectangle requires border
                    this.renderMeshVisual.mainPass.border = 1;
                }
                else {
                    if (!this._border)
                        this.renderMeshVisual.mainPass.border = 0;
                }
                this.updateBackgroundGradient();
            }
        }
        /**
         * @returns vec2 of the background starting position.
         * The start position defines the range for the stops.
         */
        get gradientStartPosition() {
            return this._gradientStartPosition;
        }
        /**
         * @param position set vec2 of the background starting position.
         * The start position defines the range for the stops.
         */
        set gradientStartPosition(position) {
            if (position === undefined) {
                return;
            }
            this._gradientStartPosition = position;
        }
        /**
         * @returns vec2 of the background ending position.
         * The end position defines the range for the stops.
         */
        get gradientEndPosition() {
            return this._gradientEndPosition;
        }
        /**
         * @param position set vec2 of the background ending position.
         * The end position defines the range for the stops.
         */
        set gradientEndPosition(position) {
            if (position === undefined) {
                return;
            }
            this._gradientEndPosition = position;
        }
        /**
         * @returns boolean whether or not the border is enabled.
         */
        get border() {
            return this._border;
        }
        /**
         * @param enabled boolean to show or hide the border.
         */
        set border(enabled) {
            if (enabled === undefined) {
                return;
            }
            this._border = enabled;
            if (this._initialized) {
                this.renderMeshVisual.mainPass.border = enabled ? 1 : 0;
                // need border calculations if using gradient type rectangle
                if (!enabled) {
                    this.borderSize = 0;
                    if (this._gradientType === "Rectangle") {
                        this.renderMeshVisual.mainPass.border = 1;
                    }
                }
                this.updateBorderGradient();
            }
        }
        /**
         * @returns current border thickness in centimeters in local space.
         */
        get borderSize() {
            return this._borderSize;
        }
        /**
         * @param borderSize set border thickness in centimeters in local space.
         */
        set borderSize(borderSize) {
            if (borderSize === undefined) {
                return;
            }
            this._borderSize = borderSize;
            if (this._initialized) {
                this.renderMeshVisual.mainPass.borderSize = borderSize;
            }
        }
        /**
         * @returns vec4 of the solid border color (not gradient).
         */
        get borderColor() {
            return this._borderColor;
        }
        /**
         * @param color set vec4 of the solid border color (not gradient).
         */
        set borderColor(color) {
            if (color === undefined) {
                return;
            }
            this._borderColor = color;
            if (this._initialized) {
                this.renderMeshVisual.mainPass.borderColor = color;
            }
        }
        /**
         * @returns which type of border: either Color or Gradient.
         */
        get borderType() {
            return this._borderType;
        }
        /**
         * @param type set border type: either Color or Gradient.
         */
        set borderType(type) {
            if (type === undefined) {
                return;
            }
            this._borderType = type;
            if (this._initialized) {
                this.updateBorderGradient();
            }
        }
        /**
         * @returns type of gradient for the border gradient: Linear or Radial.
         */
        get borderGradientType() {
            return this._borderGradientType;
        }
        /**
         * @param type set type of gradient for the border gradient: Linear or Gradient.
         */
        set borderGradientType(type) {
            if (type === undefined) {
                return;
            }
            this._borderGradientType = type;
            if (this._initialized) {
                this.updateBorderGradient();
            }
        }
        /**
         * @returns vec2 of current border gradient start position.
         * The start position defines the range for the stops.
         */
        get borderGradientStartPosition() {
            return this._borderGradientStartPosition;
        }
        /**
         * @param position set vec2 of the border gradient start position.
         * The start position defines the range for the stops.
         */
        set borderGradientStartPosition(position) {
            if (position === undefined) {
                return;
            }
            this._borderGradientStartPosition = position;
        }
        /**
         * @returns vec2 of current border gradient end position.
         * The end position defines the range for the stops.
         */
        get borderGradientEndPosition() {
            return this._borderGradientEndPosition;
        }
        /**
         * @param position set vec2 of the border gradient end position.
         * The end position defines the range for the stops.
         */
        set borderGradientEndPosition(position) {
            if (position === undefined) {
                return;
            }
            this._borderGradientEndPosition = position;
        }
        /**
         * Set Material asset that is cloned on initialize
         */
        set material(material) {
            if (material === undefined) {
                return;
            }
            this._material = material;
            if (this._initialized) {
                this.applyMaterial();
            }
        }
        /**
         * Get Material asset that is cloned on initialize
         */
        get material() {
            return this._material;
        }
        /**
         * Helper function to convert native LS types to readable strings
         */
        /**
         * MOVE THIS TO UTILITIES
         */
        formatValue(value, indent = 0) {
            const spaces = "  ".repeat(indent);
            if (value === null || value === undefined) {
                return "null";
            }
            // Helper function to format numbers
            const formatNumber = (num) => {
                if (Number.isInteger(num))
                    return num.toString();
                return parseFloat(num.toFixed(3)).toString();
            };
            // Handle vec2
            if (value && typeof value === "object" && "x" in value && "y" in value && !("z" in value)) {
                return `vec2(${formatNumber(value.x)}, ${formatNumber(value.y)})`;
            }
            // Handle vec3
            if (value && typeof value === "object" && "x" in value && "y" in value && "z" in value && !("w" in value)) {
                return `vec3(${formatNumber(value.x)}, ${formatNumber(value.y)}, ${formatNumber(value.z)})`;
            }
            // Handle vec4
            if (value && typeof value === "object" && "x" in value && "y" in value && "z" in value && "w" in value) {
                return `vec4(${formatNumber(value.x)}, ${formatNumber(value.y)}, ${formatNumber(value.z)}, ${formatNumber(value.w)})`;
            }
            // Handle arrays
            if (Array.isArray(value)) {
                if (value.length === 0)
                    return "[]";
                const items = value.map((item) => this.formatValue(item, 0)).join(", ");
                return `[${items}]`;
            }
            // Handle objects
            if (typeof value === "object") {
                const entries = Object.entries(value);
                if (entries.length === 0)
                    return "{}";
                const formatted = entries
                    .map(([key, val]) => {
                    return `${spaces}  ${key}: ${this.formatValue(val, indent + 1)}`;
                })
                    .join(",\n");
                return `{\n${formatted}\n${spaces}}`;
            }
            // Handle primitives
            if (typeof value === "string") {
                return `"${value}"`;
            }
            if (typeof value === "number") {
                return formatNumber(value);
            }
            return String(value);
        }
        /**
         * Prints the current configuration of the RoundedRectangle
         * to the console in a readable format.
         * Useful for debugging and understanding the current state.
         */
        printConfig() {
            const configOutput = {};
            configOutput.size = this.size;
            configOutput.cornerRadius = this.cornerRadius;
            configOutput.background = {};
            if (this.gradient) {
                configOutput.backgroundGradient = {};
                configOutput.backgroundGradient.type = this.gradientType;
                configOutput.backgroundGradient.start = this.gradientStartPosition;
                configOutput.backgroundGradient.end = this.gradientEndPosition;
                configOutput.backgroundGradient.stop0 = this.getBackgroundGradientStop(0);
                configOutput.backgroundGradient.stop1 = this.getBackgroundGradientStop(1);
                configOutput.backgroundGradient.stop2 = this.getBackgroundGradientStop(2);
                configOutput.backgroundGradient.stop3 = this.getBackgroundGradientStop(3);
                configOutput.backgroundGradient.stop4 = this.getBackgroundGradientStop(4);
            }
            else if (this.useTexture) {
                configOutput.texture = this.texture;
                configOutput.textureMode = this.textureMode;
                configOutput.textureWrap = this.textureWrap;
            }
            else {
                configOutput.backgroundColor = this.backgroundColor;
            }
            if (this.border) {
                configOutput.border = {};
                configOutput.border.borderSize = this.borderSize;
                if (this.borderType === "Gradient") {
                    configOutput.borderGradient = {};
                    configOutput.borderGradient.type = this.borderGradientType;
                    configOutput.borderGradient.start = this.borderGradientStartPosition;
                    configOutput.borderGradient.end = this.borderGradientEndPosition;
                    configOutput.borderGradient.stop0 = this.getBorderGradientStop(0);
                    configOutput.borderGradient.stop1 = this.getBorderGradientStop(1);
                    configOutput.borderGradient.stop2 = this.getBorderGradientStop(2);
                    configOutput.borderGradient.stop3 = this.getBorderGradientStop(3);
                    configOutput.borderGradient.stop4 = this.getBorderGradientStop(4);
                }
                else {
                    configOutput.border.color = this.borderColor;
                }
            }
            print("RoundedRectangle Configuration:");
            print(this.formatValue(configOutput));
        }
    };
    __setFunctionName(_classThis, "RoundedRectangle");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RoundedRectangle = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis._mesh = requireAsset("../../../Meshes/StretchableCircle.mesh");
    _classThis._materialAsset = requireAsset("../../../Materials/RoundedRectangleStroke.mat");
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RoundedRectangle = _classThis;
})();
exports.RoundedRectangle = RoundedRectangle;
//# sourceMappingURL=RoundedRectangle.js.map