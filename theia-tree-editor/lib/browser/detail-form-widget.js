"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.styleContextValue = exports.jsonFormsConfig = exports.DetailFormWidget = void 0;
const react_1 = require("@jsonforms/react");
const vanilla_renderers_1 = require("@jsonforms/vanilla-renderers");
const core_1 = require("@theia/core");
const browser_1 = require("@theia/core/lib/browser");
const inversify_1 = require("inversify");
const react_2 = __importDefault(require("react"));
const client_1 = require("react-dom/client");
const interfaces_1 = require("./interfaces");
const JSON_FORMS_CONTAINER_CSS_CLASS = 'jsonforms-container';
/**
 * Renders the detail view of the tree editor and binds the selected object's data to a generated form.
 */
let DetailFormWidget = class DetailFormWidget extends browser_1.BaseWidget {
    constructor(modelService) {
        super();
        this.modelService = modelService;
        this.changeEmitter = new core_1.Emitter();
        this.root = (0, client_1.createRoot)(this.node);
        this.toDispose.push(this.changeEmitter);
        this.jsonformsOnChange = (state) => this.changeEmitter.fire(state.data);
        this.renderEmptyForms();
    }
    get onChange() {
        return this.changeEmitter.event;
    }
    async setSelection(selectedNode) {
        this.selectedNode = selectedNode;
        this.renderForms();
    }
    async renderForms() {
        if (this.selectedNode) {
            const data = await this.modelService.getDataForNode(this.selectedNode);
            const schema = await this.modelService.getSchemaForNode(this.selectedNode);
            const uiSchema = await this.modelService.getUiSchemaForNode(this.selectedNode);
            this.root.render(react_2.default.createElement("div", { className: JSON_FORMS_CONTAINER_CSS_CLASS },
                react_2.default.createElement(vanilla_renderers_1.JsonFormsStyleContext.Provider, { value: this.getStyles() },
                    react_2.default.createElement(react_1.JsonForms, Object.assign({ data: data, schema: schema, uischema: uiSchema, onChange: this.jsonformsOnChange }, this.getJsonFormsConfig())))));
        }
        else {
            this.renderEmptyForms();
        }
    }
    /**
     * Provides configuration for JsonForms rendering the detail forms.
     * Unless the configuration actually changes,
     * this should always return the same object to avoid unnecessary re-renders.
     */
    getJsonFormsConfig() {
        return exports.jsonFormsConfig;
    }
    /**
     * Returns the styles for the detail form.
     * As long as the styles do not change,
     * this should always return the same object to avoid unnecessary re-renders of the form.
     */
    getStyles() {
        return exports.styleContextValue;
    }
    renderEmptyForms() {
        this.root.render(react_2.default.createElement(react_2.default.Fragment, null, "Please select an element"));
    }
    onUpdateRequest(msg) {
        super.onUpdateRequest(msg);
        this.renderForms();
    }
};
DetailFormWidget = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(interfaces_1.TreeEditor.ModelService)),
    __metadata("design:paramtypes", [Object])
], DetailFormWidget);
exports.DetailFormWidget = DetailFormWidget;
/** Default json forms configuration using the default vanilla cells and renderers. */
exports.jsonFormsConfig = {
    cells: vanilla_renderers_1.vanillaCells,
    renderers: vanilla_renderers_1.vanillaRenderers,
    config: {
        restrict: false,
        trim: false,
        showUnfocusedDescription: true,
        hideRequiredAsterisk: false
    }
};
/** Default vanilla styles extend with theia-specific styling. */
exports.styleContextValue = {
    styles: [
        ...vanilla_renderers_1.vanillaStyles,
        {
            name: 'array.button',
            classNames: ['theia-button']
        },
        {
            name: 'array.table.button',
            classNames: ['theia-button']
        },
        {
            name: 'control.input',
            classNames: ['theia-input']
        },
        {
            name: 'control.select',
            classNames: ['theia-select']
        },
        {
            name: 'vertical.layout',
            classNames: ['theia-vertical']
        }
    ]
};
//# sourceMappingURL=detail-form-widget.js.map