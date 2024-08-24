import fs from "fs";
import { noticeLog } from "./logger.js";


const env_mapping = {
  address: "WS_ADDRESS",
  port: "WS_PORT",
  domain_mode: "WS_DOMAIN_MODE",
  domain: "WS_DOMAIN",
  sites_folder: "WS_SITES_FOLDER"
}

export const default_config = {
  address: "0.0.0.0",
  port: 80,
  domain_mode: "sub",
  domain: "localhost",
  sites_folder: "./sites"
}

export const file_config = (input_config) => {
  let config = {}
  if(input_config) config = input_config;
  const config_backup = config;
    
  const config_location = process.env.WS_CONFIG_FILE || "config.json"

  try {
    const data = fs.readFileSync(config_location, { encoding: 'utf8', flag: 'r' });
    try {
      let config_file = JSON.parse(data)
      for(let key in config_file) {
        config[key] = config_file[key];
        noticeLog.info(`Loaded ${key} from config`)
      }
      return config;
    } catch(json_err) {
      noticeLog.warn("Invalid config file ${config_location}, Using the default config:\n",json_err);
      return config_backup;
    }
  } catch(err){
    noticeLog.warn(`No config file ${config_location} found, Using the default config`);
    return config_backup;
  }
}

export const env_config = (input_config)=>{
  let config = {}
  if(input_config) config = input_config;
  
  for(let option in env_mapping){
    const env_name = env_mapping[option]
    if(process.env[env_name]) {
      config[option] = process.env[env_name]
      noticeLog.info(`Loaded ${option} from environment variables ${env_name}`)
    }
  }
  return config;
}

export const load_config = ()=> {
  let config = default_config;
  config = file_config(config);
  config = env_config(config);
  if(config.domain_mode == "full") {
    config.domain = "";
    config.dot_domain = "";
  } else {
    config.dot_domain = "." + config.domain;
  }
  return config;
}
