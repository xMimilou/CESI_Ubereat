const express = require('express'); //
const app = express();
const fs = require('fs');
const multer = require('multer');

const PORT = 3001;

app.use(express.json());

// Middleware to get a single image like : "localhost:3001/pexels-1.jpg"
app.use(express.static('images'));

app.get("/", (req: any, res: any) => {
    res.json({
        test: "Image server test."
    });
});

// app.get("/:image_name", (req: any, res:any) => {
//     const image_name = req.params.image_name;
//     console.log(image_name);
//     res.sendFile(`./images/${image_name}`, { root: __dirname });
// });

// Route to get all of the images links
app.get('/images', (req: any, res: any) => {
    fs.readdir('images', (err: any, files: any) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const imageUrls = files.map((file: any) => `http://localhost:${PORT}/${file}`);
        res.send(imageUrls);
      }
    });
  });

//
const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
      cb(null, 'images');
    },
    filename: function (req: any, file: any, cb: any) {
      cb(null, file.originalname);
    },
});
  
const upload = multer({ storage: storage });

// Route to upload an image. exemple: "curl -X POST -F "image=@/path/to/image.jpg" http://localhost:3000/images".
// body: { image: path_to_image}
app.post('/images', upload.single('image'), (req: any, res: any) => {
    if (req.file) {
      res.send(`File ${req.file.originalname} has been uploaded successfully.`);
    } else {
      res.status(400).send('Error: No file uploaded.');
    }
});

app.listen(PORT, () => {
    console.log(`Images Server running at port ${PORT}`);
});