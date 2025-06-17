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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeModelService = void 0;
const core_1 = require("@theia/core");
const inversify_1 = require("inversify");
const tree_model_1 = require("./tree-model");
const tree_schema_1 = require("./tree-schema");
let TreeModelService = class TreeModelService {
    constructor(logger) {
        this.logger = logger;
    }
    getDataForNode(node) {
        return node.jsonforms.data;
    }
    getSchemaForNode(node) {
        return Object.assign({ definitions: tree_schema_1.exampleSchema.definitions }, this.getSchemaForType(node.jsonforms.type));
    }
    getSchemaForType(type) {
        if (!type) {
            return undefined;
        }
        const schema = Object.entries(tree_schema_1.exampleSchema.definitions)
            .map(entry => entry[1])
            .find(definition => definition.properties && definition.properties.typeId.const === type);
        if (schema === undefined) {
            this.logger.warn("Can't find definition schema for type " + type);
        }
        return schema;
    }
    getUiSchemaForNode(node) {
        const type = node.jsonforms.type;
        switch (type) {
            case tree_model_1.ExampleModel.Type.Tree:
                return tree_schema_1.treeView;
            case tree_model_1.ExampleModel.Type.Node:
                return tree_schema_1.nodeView;
            case tree_model_1.ExampleModel.Type.Leaf:
                return tree_schema_1.leafView;
            default:
                this.logger.warn("Can't find registered ui schema for type " + type);
                return undefined;
        }
    }
    getChildrenMapping() {
        return tree_model_1.ExampleModel.childrenMapping;
    }
    getNameForType(type) {
        return tree_model_1.ExampleModel.Type.name(type);
    }
};
TreeModelService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(core_1.ILogger)),
    __metadata("design:paramtypes", [Object])
], TreeModelService);
exports.TreeModelService = TreeModelService;
//# sourceMappingURL=tree-model-service.js.map