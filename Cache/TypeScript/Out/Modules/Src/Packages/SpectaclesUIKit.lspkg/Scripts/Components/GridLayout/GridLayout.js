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
exports.GridLayout = exports.PositionCallbackArgs = exports.LayoutDirection = void 0;
var __selfType = requireType("./GridLayout");
function component(target) { target.getTypeName = function () { return __selfType; }; }
var LayoutDirection;
(function (LayoutDirection) {
    LayoutDirection[LayoutDirection["Row"] = 0] = "Row";
    LayoutDirection[LayoutDirection["Column"] = 1] = "Column";
})(LayoutDirection || (exports.LayoutDirection = LayoutDirection = {}));
/**
 * position callback arguments
 */
class PositionCallbackArgs {
}
exports.PositionCallbackArgs = PositionCallbackArgs;
/**
 *
 * Low Level Layout Component
 * Set a base CellSize in local space
 * Define a number of Rows And Columns
 * And it will create a list or grid in the specified shape
 *
 */
let GridLayout = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var GridLayout = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.rows = this.rows;
            this.columns = this.columns;
            this.cellSize = this.cellSize;
            this.cellPadding = this.cellPadding;
            this.layoutBy = this.layoutBy;
            this.transform = this.getTransform();
            this.children = [];
            this.initialized = false;
            this.showDebug = false;
            /**
             * callback for each child on layout
             * @input row, column
             * use for advanced positioning per item
             */
            this.positionCallback = null;
            /**
             * initialization function
             * call on next line after programmatically creating component
             * to prevent a flash of unstyled content
             */
            this.initialize = () => {
                if (this.initialized)
                    return;
                this.layout();
                this.createEvent("UpdateEvent").bind(this.update);
                this.initialized = true;
            };
            /**
             * call this function to lay out the children of this scene object
             * according to the parameters set in the component
             * will change their local transform
             */
            this.layout = () => {
                this.children = this.sceneObject.children;
                for (let i = 0; i < this.children.length; i++) {
                    const child = this.children[i];
                    const transform = child.getTransform();
                    let column, row;
                    if (this.layoutBy === LayoutDirection.Column) {
                        column = Math.floor(i / this.rows);
                        row = i % this.rows;
                    }
                    else {
                        column = i % this.columns;
                        row = Math.floor(i / this.columns);
                    }
                    const layoutPosition = this.calculateChildPosition(column, row);
                    layoutPosition.x = layoutPosition.x + (this.cellPadding.x + this.cellPadding.z) * 0.5 - this.cellPadding.z;
                    layoutPosition.y = layoutPosition.y - (this.cellPadding.y + this.cellPadding.w) * 0.5 + this.cellPadding.w;
                    transform.setLocalPosition(layoutPosition);
                }
            };
            /**
             *
             * @param x x index of target
             * @param y y index of target
             * @returns SceneObject at x, y in grid
             */
            this.getCellSceneObject = (x, y) => {
                let i;
                if (this.layoutBy === LayoutDirection.Column) {
                    i = x * this.rows;
                    i += y % this.rows;
                }
                else {
                    i = y * this.columns;
                    i += x % this.columns;
                }
                return this.children[i];
            };
            this.repositionFunction = (args) => {
                return this.positionCallback(args);
            };
            this.update = () => {
                if (this.showDebug) {
                    this.debugRender();
                }
            };
            /**
             * internal only debug render helper
             * to remove before distribution
             */
            this.debugRender = () => {
                const worldPos = this.getTransform().getWorldPosition();
                for (let i = 0; i < this.children.length; i++) {
                    let column, row;
                    if (this.layoutBy === LayoutDirection.Column) {
                        column = Math.floor(i / this.rows);
                        row = i % this.rows;
                    }
                    else {
                        column = i % this.columns;
                        row = Math.floor(i / this.columns);
                    }
                    const layoutPosition = this.calculateChildPosition(column, row);
                    const totalCellSize = this.totalCellSize;
                    global.debugRenderSystem.drawBox(layoutPosition.add(worldPos), totalCellSize.x, totalCellSize.y, totalCellSize.x, new vec4(1, 1, 1, 1));
                }
                global.debugRenderSystem.drawSphere(this.aabbMin, 4, new vec4(1, 0, 0, 1));
                global.debugRenderSystem.drawSphere(this.aabbMax, 4, new vec4(1, 0, 0, 1));
                global.debugRenderSystem.drawSphere(this.transform.getWorldPosition(), 4, new vec4(0, 1, 1, 1));
            };
        }
        __initialize() {
            super.__initialize();
            this.rows = this.rows;
            this.columns = this.columns;
            this.cellSize = this.cellSize;
            this.cellPadding = this.cellPadding;
            this.layoutBy = this.layoutBy;
            this.transform = this.getTransform();
            this.children = [];
            this.initialized = false;
            this.showDebug = false;
            /**
             * callback for each child on layout
             * @input row, column
             * use for advanced positioning per item
             */
            this.positionCallback = null;
            /**
             * initialization function
             * call on next line after programmatically creating component
             * to prevent a flash of unstyled content
             */
            this.initialize = () => {
                if (this.initialized)
                    return;
                this.layout();
                this.createEvent("UpdateEvent").bind(this.update);
                this.initialized = true;
            };
            /**
             * call this function to lay out the children of this scene object
             * according to the parameters set in the component
             * will change their local transform
             */
            this.layout = () => {
                this.children = this.sceneObject.children;
                for (let i = 0; i < this.children.length; i++) {
                    const child = this.children[i];
                    const transform = child.getTransform();
                    let column, row;
                    if (this.layoutBy === LayoutDirection.Column) {
                        column = Math.floor(i / this.rows);
                        row = i % this.rows;
                    }
                    else {
                        column = i % this.columns;
                        row = Math.floor(i / this.columns);
                    }
                    const layoutPosition = this.calculateChildPosition(column, row);
                    layoutPosition.x = layoutPosition.x + (this.cellPadding.x + this.cellPadding.z) * 0.5 - this.cellPadding.z;
                    layoutPosition.y = layoutPosition.y - (this.cellPadding.y + this.cellPadding.w) * 0.5 + this.cellPadding.w;
                    transform.setLocalPosition(layoutPosition);
                }
            };
            /**
             *
             * @param x x index of target
             * @param y y index of target
             * @returns SceneObject at x, y in grid
             */
            this.getCellSceneObject = (x, y) => {
                let i;
                if (this.layoutBy === LayoutDirection.Column) {
                    i = x * this.rows;
                    i += y % this.rows;
                }
                else {
                    i = y * this.columns;
                    i += x % this.columns;
                }
                return this.children[i];
            };
            this.repositionFunction = (args) => {
                return this.positionCallback(args);
            };
            this.update = () => {
                if (this.showDebug) {
                    this.debugRender();
                }
            };
            /**
             * internal only debug render helper
             * to remove before distribution
             */
            this.debugRender = () => {
                const worldPos = this.getTransform().getWorldPosition();
                for (let i = 0; i < this.children.length; i++) {
                    let column, row;
                    if (this.layoutBy === LayoutDirection.Column) {
                        column = Math.floor(i / this.rows);
                        row = i % this.rows;
                    }
                    else {
                        column = i % this.columns;
                        row = Math.floor(i / this.columns);
                    }
                    const layoutPosition = this.calculateChildPosition(column, row);
                    const totalCellSize = this.totalCellSize;
                    global.debugRenderSystem.drawBox(layoutPosition.add(worldPos), totalCellSize.x, totalCellSize.y, totalCellSize.x, new vec4(1, 1, 1, 1));
                }
                global.debugRenderSystem.drawSphere(this.aabbMin, 4, new vec4(1, 0, 0, 1));
                global.debugRenderSystem.drawSphere(this.aabbMax, 4, new vec4(1, 0, 0, 1));
                global.debugRenderSystem.drawSphere(this.transform.getWorldPosition(), 4, new vec4(0, 1, 1, 1));
            };
        }
        onAwake() {
            this.createEvent("OnStartEvent").bind(this.initialize);
        }
        get isInitialized() {
            return this.initialized;
        }
        get totalCellSize() {
            const totalSize = vec2.zero();
            totalSize.x = this.cellSize.x + this.cellPadding.x + this.cellPadding.z;
            totalSize.y = this.cellSize.y + this.cellPadding.y + this.cellPadding.w;
            return totalSize;
        }
        get aabbMin() {
            const totalCellSize = this.totalCellSize;
            const leftEdge = this.columns * totalCellSize.x * -0.5;
            let rowCount;
            if (this.layoutBy === LayoutDirection.Row) {
                rowCount = Math.ceil(this.children.length / this.columns);
            }
            else if (this.layoutBy === LayoutDirection.Column) {
                rowCount = Math.min(this.children.length, this.rows);
            }
            const bottomEdge = this.rows * totalCellSize.y * 0.5 + rowCount * -totalCellSize.y;
            return this.transform.getWorldTransform().multiplyPoint(new vec3(leftEdge, bottomEdge, 0));
        }
        get aabbMax() {
            const totalCellSize = this.totalCellSize;
            const topEdge = this.rows * totalCellSize.y * 0.5;
            let columnCount;
            if (this.layoutBy === LayoutDirection.Row) {
                columnCount = Math.min(this.children.length, this.columns);
            }
            else if (this.layoutBy === LayoutDirection.Column) {
                columnCount = Math.ceil(this.children.length / this.rows);
            }
            const rightEdge = this.columns * totalCellSize.x * -0.5 + columnCount * totalCellSize.x;
            return this.transform.getWorldTransform().multiplyPoint(new vec3(rightEdge, topEdge, 0));
        }
        /**
         * @returns total number of rows in grid
         */
        get totalRows() {
            return this.layoutBy === LayoutDirection.Row ? Math.ceil(this.children.length / this.columns) : this.rows;
        }
        /**
         * @returns total number of columns in grid
         */
        get totalColumns() {
            return this.layoutBy === LayoutDirection.Column ? Math.ceil(this.children.length / this.rows) : this.columns;
        }
        /**
         *
         * @param gridColumn of target cell
         * @param gridRow of target cell
         * @returns position of cell at column and row
         */
        calculateChildPosition(gridColumn, gridRow) {
            const baseX = this.columns * this.totalCellSize.x * -0.5;
            const baseY = this.rows * this.totalCellSize.y * 0.5;
            let position = vec3.zero();
            position.y = baseY - gridRow * this.totalCellSize.y - this.totalCellSize.y * 0.5;
            position.x = baseX + gridColumn * this.totalCellSize.x + this.totalCellSize.x * 0.5;
            if (this.positionCallback) {
                const offset = this.repositionFunction({ column: gridColumn, row: gridRow });
                position = position.add(offset);
            }
            return position;
        }
    };
    __setFunctionName(_classThis, "GridLayout");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GridLayout = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GridLayout = _classThis;
})();
exports.GridLayout = GridLayout;
//# sourceMappingURL=GridLayout.js.map