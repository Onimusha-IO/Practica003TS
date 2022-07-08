import config from "./util/config";
import app from "./app";

const { apiPort } = config;

app.listen(apiPort);
