import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import { accessLog, noticeLog } from "./lib/logger.js";
import { isFolder } from "./lib/util.js";

import { default_config, file_config, env_config } from './lib/config_loader.js';

let config = default_config;
config = file_config(config);
config = env_config(config);
if(config.domain_mode == "full") {
  config.domain = ""
  config.dot_domain = ""
} else {
  config.dot_domain = "." + config.domain
}


let sites_folder_content = fs.readdirSync(config.sites_folder,{ withFileTypes: true});
let site_folders = {};
for(let sites_folder of sites_folder_content) {
  if (sites_folder.isDirectory()) {
    site_folders[sites_folder.name + config.dot_domain] = {
      name: sites_folder.name,
      path: sites_folder.path + '/' + sites_folder.name
    }
  }
}

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  if(!site_folders[req.hostname]) {
    return next()
  }

  const op = {
    root: site_folders[req.hostname].path
  };



  if(isFolder(op.root + req.path)) {
    return res.sendFile( 'index.html' , op, function (error) {
      if (error) {
        accessLog.error(req, 404)
        return res.sendStatus(404)
      } else {
        accessLog.info(req, 200)
      }
    })
  }

  return res.sendFile( req.path , op, function (error) {
    if (error) {
      accessLog.error(req, 404)
      return res.sendStatus(404)
    } else {
      accessLog.info(req, 200)
    }
  })
});



app.listen(config.port, config.address , () => noticeLog.info(`Server is listening on ${config.address + ":"+ config.port}`))