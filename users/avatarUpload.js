const uploader = require("../uitlities/singleUpload");
function avatarUpload(req, res, next) {
  const upload = uploader(
    "avatars",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "Only .jpg, jpeg or .png format allowed!"
  );
  // call the middleware function 
upload.single("avatar")(req, res, err => {
     if(err){
          return res.status(400).json({
               success: false,
               messeage: err.messeage || "Something went wrong while uploadding the file"
          });
     }
});
}