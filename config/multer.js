import { createClient } from "@supabase/supabase-js";
import multer from "multer";
import path from "path";

//6H5rAljR7W45ATHX contraseña supabase
const supabase = createClient(
  process.env.PROJECT_URL_SUPABASE,
  process.env.PROJECT_API_KEYS_SUPABASE
);
//Información que se va a guardaar en bite binario
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  console.log(file);
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Archivo no valido"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

//Middleware
async function handleUploadSupabase(req, res, next) {
  const { originalname, buffer } = req.file;
  const filePath = `/avatar/${Date.now()}_${originalname}`;

  //El supabase que instancie con createClient
  const { data, error } = await supabase.storage
    .from("proyecto-backend-bucket")
    .upload(filePath, buffer, {
      contentType: "image/" + path.extname(originalname).substring(1),
    });
  if (error) {
    console.log(error);
    return res.status(501).json("Error al subir la imagen");
  }

  //Creando una caracteristica en req.file
  req.file.supabaseUrl = filePath;
  next();
}
//Al hacer import al exportar sin default, debo import desestructurado todas las funciones que tenga este archivo
export { upload, handleUploadSupabase };
