import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { '.html':'text/html; charset=utf-8', '.md':'text/markdown; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8' };

http.createServer((req,res)=>{
  const requested = decodeURIComponent((req.url || '/').split('?')[0]);
  const relative = requested === '/' ? 'index.html' : requested.replace(/^\/+/, '');
  const file = path.resolve(root, relative);
  if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file,(err,data)=>{
    if(err){res.writeHead(404);return res.end('Not found');}
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(data);
  });
}).listen(port,'127.0.0.1',()=>console.log(`Make WordPress prototypes: http://127.0.0.1:${port}`));
