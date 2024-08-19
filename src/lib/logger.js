import { getTime } from "./util.js"

const requstLog = (req, statusCode) => {
  return `${req.ip} - "${req.hostname}" - "${req.method} ${req.url}" ${statusCode} - "${req.get('User-Agent')}"`
}

export const accessLog =  {
  info: (req, status)=>{
    console.info(`[ACCESS - INFO - ${getTime()}] ${requstLog(req, status)}`)
  },
  error: (req, status)=>{
    console.error(`[ACCESS - EROR - ${getTime()}] ${requstLog(req, status)}`)
  },
  warn: (req, status)=>{
    console.warn(`[ACCESS - WARN - ${getTime()}] ${requstLog(req, status)}`)
  }
}
export const noticeLog =  {
  info: (data)=>{
    console.info(`[NOTICE - INFO - ${getTime()}] ${data}`)
  },
  error: (data)=>{
    console.error(`[NOTICE - EROR - ${getTime()}] ${data}`)
  },
  warn: (data)=>{
    console.warn(`[NOTICE - WARN - ${getTime()}] ${data}`)
  }
}

// 93.180.71.3 - - [17/May/2015:08:05:32 +0000] "GET /downloads/product_1 HTTP/1.1" 304 0 "-" "Debian APT-HTTP/1.3 (0.8.16~exp12ubuntu10.21)"