
import { UAParser } from "ua-parser-js"; 

export const parseUserAgent = (req, res, next) => {
  const uaString = req.headers['user-agent'] || 'Unknown';
  
  const parser = new UAParser(uaString); 
  const result = parser.getResult();

  req.parsedUA = {
    browser: `${result.browser.name || 'Unknown'} ${result.browser.version || ''}`.trim(),
    os: `${result.os.name || 'Unknown'} ${result.os.version || ''}`.trim(),
    device: result.device.type || 'desktop',
    cpu: result.cpu.architecture || 'unknown',
    raw: uaString
  };
  
  next();
}