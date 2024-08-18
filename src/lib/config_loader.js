import fs from "fs";


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
        console.info(`[INFO] Loaded ${key} from config`)
      }
      return config;
    } catch(json_err) {
      console.warn("[WARN] Invalid config file ${config_location}, Using the default config or environment variables:\n",json_err);
      return config_backup;
    }
  } catch(err){
    console.warn(`[WARN] No config file ${config_location} found, Using the default config or environment variables`);
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
      console.info(`[INFO] Loaded ${option} from environment variables ${env_name}`)
    }
  }
  return config;
}

// function config_loader (){
//   fs.readFile(config_file_location, 'utf8', function (err, data) {
//     if (err) {
//       console.log(`No config files found at ${config_file_location}, Using the default config or environment variables`)
//     } else {
//       try {
//         let config_file = JSON.parse(data)
//         for(let key in config_file) {
//           config[key] = config_file[key]
//         }
//       } catch(json_err) {
//         console.log("There seems to be something wrong with the config file, so it won't be loaded:\n",json_err)
//       }
//     }
//     config = {
//       address: process.env.WS_ADDRESS || config.address,
//       port: process.env.WS_PORT || config.port,
//       domain_mode: process.env.WS_DOMAIN_MODE || config.domain_mode,
//       domain: process.env.WS_DOMAIN || config.domain,
//       sites_folder: process.env.WS_SITES_FOLDER || config.sites_folder
//     }
//     return config
//   });
//   // Loading environment variables
// }