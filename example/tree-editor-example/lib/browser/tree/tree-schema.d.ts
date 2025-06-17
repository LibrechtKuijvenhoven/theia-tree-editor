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
export declare const leafView: {
    type: string;
    elements: {
        type: string;
        label: string;
        scope: string;
    }[];
};
export declare const treeView: {
    type: string;
    elements: {
        type: string;
        label: string;
        scope: string;
    }[];
};
export declare const nodeView: {
    type: string;
    elements: {
        type: string;
        label: string;
        scope: string;
    }[];
};
export declare const exampleSchema: {
    definitions: {
        tree: {
            title: string;
            properties: {
                typeId: {
                    const: string;
                };
                name: {
                    type: string;
                    minLength: number;
                    maxLength: number;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        node: {
            title: string;
            properties: {
                typeId: {
                    const: string;
                };
                name: {
                    type: string;
                };
                weight: {
                    type: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        leaf: {
            title: string;
            type: string;
            properties: {
                typeId: {
                    const: string;
                };
                name: {
                    type: string;
                };
                description: {
                    type: string;
                };
            };
            additionalProperties: boolean;
            required: string[];
        };
    };
    $ref: string;
};
//# sourceMappingURL=tree-schema.d.ts.map