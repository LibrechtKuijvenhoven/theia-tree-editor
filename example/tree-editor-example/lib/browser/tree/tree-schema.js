"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleSchema = exports.nodeView = exports.treeView = exports.leafView = void 0;
/********************************************************************************
 * Copyright (c) 2019-2020 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * https://www.eclipse.org/legal/epl-2.0, or the MIT License which is
 * available at https://opensource.org/licenses/MIT.
 *
 * SPDX-License-Identifier: EPL-2.0 OR MIT
 *******************************************************************************/
/* eslint-disable header/header */
exports.leafView = {
    type: 'VerticalLayout',
    elements: [
        {
            type: 'Control',
            label: 'Name',
            scope: '#/properties/name'
        },
        {
            type: 'Control',
            label: 'Description',
            scope: '#/properties/description'
        }
    ]
};
exports.treeView = {
    type: 'VerticalLayout',
    elements: [
        {
            type: 'Control',
            label: 'Name',
            scope: '#/properties/name'
        }
    ]
};
exports.nodeView = {
    type: 'HorizontalLayout',
    elements: [
        {
            type: 'Control',
            label: 'Name',
            scope: '#/properties/name'
        },
        {
            type: 'Control',
            label: 'Weight',
            scope: '#/properties/weight'
        }
    ]
};
exports.exampleSchema = {
    definitions: {
        tree: {
            title: 'Tree',
            properties: {
                typeId: {
                    const: 'Tree'
                },
                name: {
                    type: 'string',
                    minLength: 3,
                    maxLength: 20
                }
            },
            required: ['name'],
            additionalProperties: false
        },
        node: {
            title: 'Node',
            properties: {
                typeId: {
                    const: 'Node'
                },
                name: {
                    type: 'string'
                },
                weight: {
                    type: 'number'
                }
            },
            required: ['name', 'weight'],
            additionalProperties: false
        },
        leaf: {
            title: 'Leaf',
            type: 'object',
            properties: {
                typeId: {
                    const: 'Leaf'
                },
                name: {
                    type: 'string'
                },
                description: {
                    type: 'string'
                }
            },
            additionalProperties: false,
            required: ['name']
        }
    },
    $ref: '#/definitions/tree'
};
//# sourceMappingURL=tree-schema.js.map