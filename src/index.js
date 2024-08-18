import express from "express";
import fs from "fs";
import { default_config, file_config, env_config } from './lib/config_loader.js';
import bodyParser from "body-parser";

let config = default_config
config = file_config(config)
config = env_config(config)

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));


