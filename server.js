import express from "express";
import "dotenv/config";

const geoUrl = process.env.GEO_API_URL;

const app = express();
const PORT = 3000;

const geoAPI = ``;

app.use(express.json());

app.get("/location", async (req, res) => {
    fetch(geoUrl)
        .then((data) => res.json(data))
        .catch((error) => console.error(error));

    
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
