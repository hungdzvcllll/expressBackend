"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FileHandles = function (folderName) {
    var multer = require("multer");
    return multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                var path = "".concat(folderName, "/");
                cb(null, path);
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            }
        })
    });
};
exports.default = FileHandles;
//# sourceMappingURL=FileHandles.js.map