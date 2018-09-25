"use strict";
exports.__esModule = true;
var path_1 = require("path");
// This exposes the real directory of the nbt docs to allow use in mcfunction-langserver
// as parcel bludgeons require.resolve
exports.root = path_1.join(__dirname, "..", "root.json");
