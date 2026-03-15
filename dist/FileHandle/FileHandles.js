"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileHandles = (folderName) => {
    const multer = require("multer");
    return multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                const path = `${folderName}/`;
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