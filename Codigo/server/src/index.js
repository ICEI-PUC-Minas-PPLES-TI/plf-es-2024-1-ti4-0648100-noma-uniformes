import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import { router } from "./routes.js"
/*
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
*/

/* CONFIGURAÇÕES */
const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(router);
/*
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, 'public/assests')));
*/

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

/* EXPRESS */

app.listen(5000, () => console.log('Servidor na porta 5000'))