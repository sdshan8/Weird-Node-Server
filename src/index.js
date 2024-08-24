import express from "express";

import { load_config } from "./lib/config_loader.js";
import { fileServer, badGateway } from "./lib/middleware.js";
import { noticeLog } from "./lib/logger.js";

export const config = load_config()

const app = express();

app.use(fileServer);

app.use(badGateway)

app.listen(config.port, config.address , () => noticeLog.info(`Server is listening on ${config.address + ":"+ config.port}`))