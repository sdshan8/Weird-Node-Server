import fs from "fs";

export const load_sites = (config)=>{
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
  return site_folders;
}