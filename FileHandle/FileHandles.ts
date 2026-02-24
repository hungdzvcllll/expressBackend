import multer from "multer";

const FileHandles=(folderName)=>{
    const multer=require("multer");
    return  multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        const path = `${folderName}/`;
        cb(null, path);
      },

      // By default, multer removes file extensions so let's add them back
      filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
      }
    })
    })
}
export default FileHandles;