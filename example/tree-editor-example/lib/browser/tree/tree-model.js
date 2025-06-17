"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleModel = void 0;
var ExampleModel;
(function (ExampleModel) {
    let Type;
    (function (Type) {
        Type.Leaf = 'Leaf';
        Type.Tree = 'Tree';
        Type.Node = 'Node';
        function name(type) {
            return type;
        }
        Type.name = name;
    })(Type = ExampleModel.Type || (ExampleModel.Type = {}));
    const components = [Type.Node, Type.Leaf];
    /** Maps types to their creatable children */
    ExampleModel.childrenMapping = new Map([
        [
            Type.Tree,
            [
                {
                    property: 'children',
                    children: components
                }
            ]
        ],
        [
            Type.Node,
            [
                {
                    property: 'children',
                    children: components
                }
            ]
        ]
    ]);
})(ExampleModel = exports.ExampleModel || (exports.ExampleModel = {}));
//# sourceMappingURL=tree-model.js.map