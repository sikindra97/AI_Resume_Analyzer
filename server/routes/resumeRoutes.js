const express =
require("express");

const auth =
require("../middleware/auth");

const upload =
require(
"../middleware/uploadMiddleware"
);

const {

uploadResume,

getAllResumes,

getResume

} =
require(
"../controllers/resumeController"
);

const router =
express.Router();

router.post(
"/upload",
auth,
upload.single("resume"),
uploadResume
);

router.get(
"/all",
auth,
getAllResumes
);

router.get(
"/:id",
auth,
getResume
);

module.exports =
router;