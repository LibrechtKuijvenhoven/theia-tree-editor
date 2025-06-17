"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeLabelProviderContribution = void 0;
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
const core_1 = require("@theia/core");
const browser_1 = require("@theia/core/lib/browser");
const uri_1 = __importDefault(require("@theia/core/lib/common/uri"));
const files_1 = require("@theia/filesystem/lib/common/files");
const inversify_1 = require("inversify");
let TreeLabelProviderContribution = class TreeLabelProviderContribution {
    canHandle(uri) {
        let toCheck = uri;
        if (files_1.FileStat.is(toCheck)) {
            toCheck = toCheck.resource;
        }
        else if (core_1.UriSelection.is(uri)) {
            toCheck = core_1.UriSelection.getUri(uri);
        }
        if (toCheck instanceof uri_1.default) {
            if (toCheck.path.ext === '.tree') {
                return 1000;
            }
        }
        return 0;
    }
    getIcon() {
        return (0, browser_1.codicon)('list-tree');
    }
};
TreeLabelProviderContribution = __decorate([
    (0, inversify_1.injectable)()
], TreeLabelProviderContribution);
exports.TreeLabelProviderContribution = TreeLabelProviderContribution;
//# sourceMappingURL=tree-label-provider-contribution.js.map