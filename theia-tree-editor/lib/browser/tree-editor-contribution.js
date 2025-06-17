"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTreeEditorContribution = void 0;
const browser_1 = require("@theia/core/lib/browser");
const master_tree_widget_1 = require("./master-tree-widget");
const util_1 = require("./util");
/**
 * Abstract base class for defining custom tree editor contributions.
 * An editor's contribution registers its commands and context menus.
 * Furthermore, it defines which URIs the editor can handle and may configure
 * the widget with additional options (see WidgetOpenHandler).
 */
class BaseTreeEditorContribution extends browser_1.WidgetOpenHandler {
    constructor(editorId, modelService, labelProvider) {
        super();
        this.editorId = editorId;
        this.modelService = modelService;
        this.labelProvider = labelProvider;
    }
    /**
     * @returns maps property names to type identifiers to their corresponding add command
     */
    getCommandMap() {
        if (!this.commandMap) {
            this.commandMap = (0, util_1.generateAddCommandDescriptions)(this.modelService);
        }
        return this.commandMap;
    }
    registerCommands(commands) {
        this.getCommandMap().forEach((description, _commandId, _map) => {
            commands.registerCommand(description.command, new AddCommandHandler(description.parentType, description.property, description.type, this.modelService));
        });
    }
    registerMenus(menus) {
        this.getCommandMap().forEach((description, _property, _map) => {
            var _a, _b;
            const iconInfo = {
                _id: 'theia-tree-editor-command-icon-info',
                editorId: this.editorId,
                type: description.type
            };
            menus.registerMenuAction(master_tree_widget_1.TreeContextMenu.ADD_MENU, {
                commandId: description.command.id,
                label: description.command.label,
                icon: (_b = (_a = this.labelProvider).getIcon) === null || _b === void 0 ? void 0 : _b.call(_a, iconInfo)
            });
        });
    }
}
exports.BaseTreeEditorContribution = BaseTreeEditorContribution;
class AddCommandHandler {
    constructor(parent, property, type, modelService) {
        this.parent = parent;
        this.property = property;
        this.type = type;
        this.modelService = modelService;
    }
    execute(treeAnchor) {
        treeAnchor.onClick(this.property, this.type);
    }
    isVisible(treeAnchor) {
        if (!treeAnchor) {
            return false;
        }
        const nodeType = treeAnchor.node.jsonforms.type;
        if (nodeType !== this.parent) {
            return false;
        }
        // Check whether the node object's type can contain children of this command's type.
        return this.modelService
            .getChildrenMapping()
            .get(nodeType)
            .map(desc => desc.children)
            .reduce((acc, val) => acc.concat(val), [])
            .reduce((acc, val) => acc.add(val), new Set())
            .has(this.type);
    }
}
//# sourceMappingURL=tree-editor-contribution.js.map