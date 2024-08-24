import { config } from '../index.js';
import { load_sites } from "./site_loader.js";
import { isFolder } from "./util.js";
import { accessLog } from "./logger.js";


export const fileServer = (req, res, next) => {
  const site_folders = load_sites(config)
  if(!site_folders[req.hostname]) {
    return next()
  }

  const op = {
    root: site_folders[req.hostname].path,
    dotfiles: 'allow'
  };


  if(req.path.startsWith('/.hooks')) {
    accessLog.warn(req, 401)
    return res.sendStatus(401)
  }
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
}

export const badGateway = (req, res, next) => {
  accessLog.error(req, 502)
  return res.sendStatus(502)
}