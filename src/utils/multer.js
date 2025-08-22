import multer from "multer";
export const fileValidation = {
    image:['image/png','image/jpeg']
}

function fileUpload(customValidation =[]){
    const storage = multer.diskStorage({})
    function fileFilter(req,file,cb){
        if(customValidation.includes(file.mimetype)){
            cb(null,true);
        }else{
            cb("invalid format",false)
        }

    }
 const upload = multer({ storage: storage });
 return upload;
}

export default fileUpload;



