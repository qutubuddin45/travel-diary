import multer from "multer";
import path from "path";

//storage configuration
const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
  

const fileFilter = (req, file, cb) => {
    // Allow only images and PDFs
    if (
        file.mimetype.startsWith("image/") ||
        file.mimetype === "application/pdf"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Only images and PDFs are allowed"), false);
    }
}




//initialiaze multer instance

// ✅ Correct
const upload = multer({ storage: diskStorage, fileFilter });
export default upload;