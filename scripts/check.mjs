import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dir=path.join(root,'mockups');
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.html')).sort();
const failures=[];
if(files.length!==20) failures.push(`Expected 20 prototypes, found ${files.length}`);
for(const file of files){const s=fs.readFileSync(path.join(dir,file),'utf8');for(const marker of ['class="wp-nav"','class="make-nav"','class="wp-mark-link"','--wporg-global-height:70px','--wporg-local-height:60px','Swag ↗','id="make-home"','id="team-switch"','id="home-view"','id="team-view"','data-open-team="community"','data-open-team="design"','data-open-team="documentation"','data-open-team="training"'])if(!s.includes(marker))failures.push(`${file}: missing ${marker}`);}
const gallery=fs.readFileSync(path.join(root,'index.html'),'utf8');
const newTabLinks=(gallery.match(/target="_blank" rel="noopener"/g)||[]).length;
if(newTabLinks!==20) failures.push(`Expected 20 new-tab gallery links, found ${newTabLinks}`);
const boardPath=path.join(root,'review-board.html');
if(!fs.existsSync(boardPath)) failures.push('Missing review-board.html');
else { const board=fs.readFileSync(boardPath,'utf8'); for(const marker of ['data-zone="unreviewed"','data-zone="keep"','data-zone="maybe"','data-zone="kill"','localStorage.getItem(KEY)','Download feedback']) if(!board.includes(marker)) failures.push(`Review board missing ${marker}`); const boardCards=(board.match(/class="review-card"/g)||[]).length; if(boardCards!==20) failures.push(`Expected 20 review cards, found ${boardCards}`); }
const synthesisDir=path.join(dir,'synthesis');
const synthesisFiles=['a-my-make-workbench.html','b-audience-gateway.html','c-find-and-follow.html','d-network-newsroom.html','e-contribution-cockpit.html'];
for(const file of synthesisFiles){const filePath=path.join(synthesisDir,file);if(!fs.existsSync(filePath)){failures.push(`Missing synthesis prototype ${file}`);continue}const s=fs.readFileSync(filePath,'utf8');for(const marker of ['class="wp-nav"','class="make-nav"','id="home-view"','id="team-view"','All five directions'])if(!s.includes(marker))failures.push(`${file}: missing ${marker}`)}
const synthesisIndex=path.join(synthesisDir,'index.html');
if(!fs.existsSync(synthesisIndex)) failures.push('Missing synthesis gallery');
else { const synthesis=fs.readFileSync(synthesisIndex,'utf8'); const synthesisLinks=(synthesis.match(/target="_blank" rel="noopener"/g)||[]).length; if(synthesisLinks!==10) failures.push(`Expected 10 synthesis new-tab links, found ${synthesisLinks}`); }
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log(`OK: ${files.length} original prototypes, a persistent 20-card review board, and ${synthesisFiles.length} synthesis prototypes.`);
