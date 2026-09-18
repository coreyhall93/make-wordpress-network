import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const exportRoot = '/Users/coreyhall/Sol/06-Exports/make-wordpress-redesign/2026-09-17';
const prototypesRoot = path.join(exportRoot, 'prototypes');
const previewsRoot = path.join(exportRoot, 'previews');
fs.mkdirSync(prototypesRoot, { recursive: true });
fs.mkdirSync(previewsRoot, { recursive: true });

const directions = [
  { id: 'A', file: 'a-my-make-workbench.html', name: 'My Make workbench', tier: 'WordPress-native', job: 'Resume work across the teams you care about.' },
  { id: 'B', file: 'b-audience-gateway.html', name: 'Audience gateway', tier: 'WordPress-native', job: 'Switch between New contributor, My Make, and All teams.' },
  { id: 'C', file: 'c-find-and-follow.html', name: 'Find and follow', tier: 'WordPress-native', job: 'Search directly for a team, meeting, handbook, pathway, or post.' },
  { id: 'D', file: 'd-network-newsroom.html', name: 'Network newsroom', tier: 'Exploratory', job: 'See what teams are discussing, publishing, and meeting about now.' },
  { id: 'E', file: 'e-contribution-cockpit.html', name: 'Contribution cockpit', tier: 'Exploratory', job: 'Arrange a compact workspace around the teams you selected.' },
];

for (const direction of directions) {
  const previewFile = direction.file.replace('.html', '.png');
  fs.copyFileSync(path.join(projectRoot, 'assets/previews', previewFile), path.join(previewsRoot, previewFile));
}

const selectedTeams = ['Community', 'Design', 'Documentation', 'Training'];
const allTeams = [
  'Accessibility', 'CLI', 'Community', 'Core', 'Core AI', 'Core Performance',
  'Core Program', 'Design', 'Documentation', 'Hosting', 'Marketing', 'Meta', 'Mobile',
  'Openverse', 'Photos', 'Playground', 'Plugins', 'Polyglots', 'Support',
  'Test', 'Themes', 'Tide', 'Training', 'TV',
];
const slugify = name => name.toLowerCase().replaceAll(' ', '-');
const teamIconNames = {
  Accessibility: 'seen', CLI: 'code', Community: 'people', Core: 'wordpress',
  'Core AI': 'symbol', 'Core Performance': 'trending-up', 'Core Program': 'group',
  Design: 'brush', Documentation: 'file', Hosting: 'cloud', Marketing: 'megaphone',
  Meta: 'cog', Mobile: 'mobile', Openverse: 'globe', Photos: 'capture-photo',
  Playground: 'tool', Plugins: 'plugins', Polyglots: 'language', Support: 'lifesaver',
  Test: 'bug', Themes: 'styles', Tide: 'shield', Training: 'institution', TV: 'video',
};
const iconSvg = (name, className = 'team-symbol') => fs.readFileSync(path.join(projectRoot, 'assets/icons', `${name}.svg`), 'utf8')
  .replace('<svg ', `<svg class="${className}" aria-hidden="true" focusable="false" fill="currentColor" `)
  .replaceAll('fillRule', 'fill-rule')
  .replaceAll('clipRule', 'clip-rule');
const teamIcon = (name, className) => iconSvg(teamIconNames[name], className);
const searchIcon = iconSvg('search', 'switcher-search-icon');
const teamButton = name => `<button data-open-team="${slugify(name)}"><span class="team-option">${teamIcon(name)}<span>${name}</span></span></button>`;
const teamSwitcher = `<div class="switcher" id="switcher" aria-label="Choose a Make WordPress team" hidden><div class="switcher-head"><div><strong>Switch teams</strong><span>Your teams stay close. Every team remains easy to find.</span></div><label class="switcher-search">${searchIcon}<input type="search" placeholder="Find a team" aria-label="Find a team"></label></div><div class="switcher-section"><p>YOUR TEAMS</p><div class="selected-teams-grid">${selectedTeams.map(teamButton).join('')}</div></div><div class="switcher-section switcher-all"><p>ALL TEAMS</p><div class="switcher-team-list">${allTeams.filter(name => !selectedTeams.includes(name)).map(teamButton).join('')}</div></div></div></div><div class="local-links"`;
const genericTeamData = Object.fromEntries(allTeams.map(name => [slugify(name), {
  name,
  icon: teamIcon(name, 'team-data-icon'),
  links: ['Team home', 'Handbook', 'Meetings'],
  post: `${name} team updates`,
  note: 'Visit the team site for its latest published update',
}]));
const directoryTeam = name => `<article class="directory-team"><div><h3>${teamIcon(name)}<span>${name}</span></h3>${selectedTeams.includes(name) ? '<span>Your team</span>' : ''}</div><div class="directory-links"><button data-open-team="${slugify(name)}">Team home</button><a href="#">Handbook</a><a href="#">Meetings</a></div></article>`;
const allTeamsDirectory = `<div class="team-directory">${allTeams.map(directoryTeam).join('')}</div>`;
const workbenchAllPanel = `<div data-panel-set="workbench" data-panel="all" hidden><section><div class="section-head"><div><h2>All teams</h2></div><label class="mini-search">⌕ <input placeholder="Filter teams" aria-label="Filter teams"></label></div>${allTeamsDirectory}</section></div>`;
const audienceAllPanel = `<div data-panel-set="audience" data-panel="all" hidden><section><div class="section-head"><div><h2>Browse every team</h2><p>All Make WordPress teams, in alphabetical order.</p></div><label class="mini-search">⌕ <input placeholder="Filter teams" aria-label="Filter teams"></label></div>${allTeamsDirectory}</section></div>`;
const cockpitRail = `<aside class="cockpit-rail"><h2 class="rail-heading">Your teams</h2>${selectedTeams.map(name => `<button data-open-team="${slugify(name)}">${teamIcon(name)}<span>${name}</span></button>`).join('')}<div class="rail-widget"><h3 class="rail-widget-heading">Next up</h3><strong>Documentation Contributor Day</strong><span>Tue, Sep 22 · 10:00 AM</span><a href="#">View meeting calendar →</a></div><div class="rail-widget"><h3 class="rail-widget-heading">Keep handy</h3><a href="#">Contributor Handbook</a><a href="#">Contribution pathways</a><a href="#">Team handbooks</a></div></aside>`;

for (const direction of directions) {
  const sourcePath = path.join(projectRoot, 'mockups/synthesis', direction.file);
  const targetPath = path.join(prototypesRoot, direction.file);
  const html = fs.readFileSync(sourcePath, 'utf8')
    .replaceAll('href="index.html"', 'href="../index.html#directions"')
    .replaceAll('href="../../index.html"', 'href="../index.html#directions"')
    .replaceAll('All five directions', 'Back to the concept overview')
    .replaceAll('Compare all directions', 'Back to the concept overview')
    .replace(/<div class="synthesis-bar">[\s\S]*?<\/div>/, '')
    .replace(/<div class="switcher" id="switcher" hidden>[\s\S]*?<\/div><\/div><div class="local-links"/, teamSwitcher)
    .replace('id="team-switch" aria-expanded', 'id="team-switch" aria-controls="switcher" aria-expanded')
    .replace(/<span class="recipe">[\s\S]*?<\/span>/g, '')
    .replace(/<button class="star"[^>]*>[★☆]<\/button>/g, '<span class="selected-team">Your team</span>')
    .replaceAll('★ ', '')
    .replaceAll('☆ ', '')
    .replaceAll('representative source-linked data', 'working concept')
    .replaceAll('Representative source-linked data', 'Representative content')
    .replaceAll('SAMPLE SOURCE-LINKED DATA', 'SAMPLE CONTENT')
    .replaceAll('Deterministic source-linked modules. No AI summary required.', 'Meetings, posts, and useful destinations for your teams.')
    .replaceAll('Comparable source-linked signals', 'Comparable team activity')
    .replaceAll('Your WordPress work, in one place.', 'Your WordPress work, together.')
    .replaceAll('Today across Your teams', 'Today across your teams')
    .replace(/<div data-panel-set="workbench" data-panel="all" hidden>[\s\S]*?<\/section><\/div><section class="newcomer">/, `${workbenchAllPanel}<section class="newcomer">`)
    .replace(/<div data-panel-set="audience" data-panel="all" hidden>[\s\S]*?<\/section><\/div><\/main><main id="team-view"/, `${audienceAllPanel}</main><main id="team-view"`)
    .replace(/<button class="primary" id="customize-cockpit"[\s\S]*?<\/button>/, '')
    .replace(/<div class="customize-panel" id="cockpit-panel" hidden>[\s\S]*?<\/div>/, '')
    .replace(/<script>const customize=document\.querySelector\('#customize-cockpit'\)[\s\S]*?<\/script>/, '')
    .replace(/<aside class="cockpit-rail">[\s\S]*?<\/aside>/, cockpitRail)
    .replaceAll('<span class="team-icon">●</span>', `<span class="team-icon">${teamIcon('Community')}</span>`)
    .replaceAll('<span class="team-icon">◒</span>', `<span class="team-icon">${teamIcon('Design')}</span>`)
    .replaceAll('<span class="team-icon">▤</span>', `<span class="team-icon">${teamIcon('Documentation')}</span>`)
    .replaceAll('<span class="team-icon">◇</span>', `<span class="team-icon">${teamIcon('Training')}</span>`)
    .replace('</style>', `
h1,h2,h3{text-wrap:balance}
p{text-wrap:pretty}
body[data-tier="native"] .hero h1,body[data-tier="native"] .team-boundary h1{font-size:clamp(38px,4vw,54px)}
.search-hero .search-shell{margin-left:auto;margin-right:auto}
.search-hero .shortcut-strip{justify-content:center}
.page{padding-left:clamp(28px,3.5vw,48px);padding-right:clamp(28px,3.5vw,48px)}
.team-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}
.team-grid.large{grid-template-columns:repeat(2,minmax(0,1fr))}
.workbench-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}
.compact-cards{grid-template-columns:repeat(2,minmax(0,1fr))}
.team-card,.synth-team-card{min-width:0}
.switcher{position:fixed;left:0;right:0;width:100vw;max-height:calc(100vh - 90px);overflow:auto;scrollbar-gutter:stable;padding:0;border:0;border-top:1px solid #3c434a;background:#1d2327;box-shadow:0 16px 30px rgba(0,0,0,.28)}
.switcher-head{display:flex;align-items:center;justify-content:space-between;gap:28px;padding:22px max(24px,calc((100vw - var(--max))/2));border-bottom:1px solid #3c434a}
.switcher-head strong{display:block;font-size:20px;line-height:1.3}
.switcher-head>div>span{display:block;margin-top:3px;color:#c3c4c7;font-size:13px}
.switcher-search{display:flex;align-items:center;width:min(320px,100%);border:1px solid #646970;background:#2c3338}
.switcher-search-icon{width:20px;height:20px;margin-left:12px;color:#f0f0f1;flex:none}
.switcher-search input{width:100%;padding:10px 12px;border:0;outline:0;background:transparent;color:#fff;font:inherit}
.switcher-search input::placeholder{color:#c3c4c7}
.switcher-search:focus-within{border-color:#9fb1ff;box-shadow:0 0 0 1px #9fb1ff}
.switcher-section{padding:17px max(24px,calc((100vw - var(--max))/2))}
.switcher-all{padding-top:14px;border-top:1px solid #3c434a}
.switcher p{margin:0 0 7px;color:#a7aaad;font-size:11px;font-weight:700;letter-spacing:.1em}
.selected-teams-grid,.switcher-team-list{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0 24px}
.switcher-team-list{padding:0;border:0}
.switcher button{min-height:41px;padding:8px 6px;border:0;border-bottom:1px solid rgba(255,255,255,.12);background:transparent;text-align:left}
.switcher button[hidden]{display:none}
.switcher button:hover,.switcher button:focus-visible{background:#2c3338;outline:0}
.team-option{display:flex;align-items:center;gap:10px;min-width:0}
.team-symbol,.team-data-icon,.team-icon svg,.local-team-icon svg,.avatar svg{display:block;width:20px;height:20px;flex:none;color:currentColor}
.team-icon{display:inline-flex;align-items:center}
.selected-team{margin-left:auto;color:var(--muted);font-size:12px;white-space:nowrap}
.team-directory{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));border-top:1px solid var(--line)}
.directory-team{display:flex;align-items:center;justify-content:space-between;gap:20px;min-width:0;padding:18px 0;border-bottom:1px solid var(--line)}
.directory-team:nth-child(odd){padding-right:28px;border-right:1px solid var(--line)}
.directory-team:nth-child(even){padding-left:28px}
.directory-team h3{display:flex;align-items:center;gap:10px;margin:0;font:600 18px/1.3 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
.directory-team>div>span{color:var(--muted);font-size:12px}
.directory-links{display:flex;justify-content:flex-end;gap:12px;flex-wrap:wrap}
.directory-links button,.directory-links a{border:0;background:none;color:var(--blue);padding:0;font-size:13px;text-decoration:none}
.directory-links button{font-weight:700}
.story-grid .story:nth-child(4){grid-column:2/4}
.cockpit-rail button{display:flex;align-items:center;gap:8px}
.rail-widget{margin-top:28px;padding-top:24px;border-top:1px solid var(--line)}
.rail-widget-heading{margin:0 0 10px;font:600 14px/1.4 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
.rail-widget strong,.rail-widget>span{display:block}
.rail-widget>span{margin-top:3px;color:var(--muted);font-size:13px}
.rail-widget a{display:block;margin-top:8px;font-size:13px}
@media(max-width:1100px){.selected-teams-grid,.switcher-team-list{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media(max-width:1150px){.team-grid:not(.large),.compact-cards{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:900px){.story-grid .story:nth-child(4){grid-column:auto}}
@media(max-width:760px){.page{padding-left:18px;padding-right:18px}.switcher{max-height:calc(100vh - 70px)}.switcher-head{align-items:flex-start;flex-direction:column;gap:14px;padding:18px}.switcher-section{padding:15px 18px}.selected-teams-grid,.switcher-team-list{grid-template-columns:repeat(2,minmax(0,1fr));gap:0 14px}.team-directory,.team-grid,.team-grid.large,.team-grid:not(.large),.compact-cards{grid-template-columns:1fr}.directory-team:nth-child(n){padding:16px 0;border-right:0}}
@media(max-width:480px){.selected-teams-grid,.switcher-team-list{grid-template-columns:1fr}}
</style>`)
    .replace('</body>', `<script>Object.assign(teams,${JSON.stringify(genericTeamData)});document.querySelectorAll('.mini-search input').forEach(input=>input.addEventListener('input',()=>{const query=input.value.trim().toLowerCase();input.closest('section').querySelectorAll('.directory-team').forEach(team=>{team.hidden=query&&!team.querySelector('h3').textContent.toLowerCase().includes(query)})}));const makeNav=document.querySelector('.make-nav');const teamSearch=document.querySelector('.switcher-search input');const teamMenuButtons=[...menu.querySelectorAll('[data-open-team]')];teamSearch.addEventListener('input',()=>{const query=teamSearch.value.trim().toLowerCase();teamMenuButtons.forEach(button=>{button.hidden=query&&!button.textContent.toLowerCase().includes(query)})});const positionTeamMenu=()=>{menu.style.top=Math.max(0,makeNav.getBoundingClientRect().bottom)+'px'};btn.addEventListener('click',()=>{if(!menu.hidden){positionTeamMenu();requestAnimationFrame(()=>teamSearch.focus())}else{teamSearch.value='';teamMenuButtons.forEach(button=>button.hidden=false)}});window.addEventListener('resize',()=>{if(!menu.hidden)positionTeamMenu()});window.addEventListener('scroll',()=>{if(!menu.hidden)positionTeamMenu()},{passive:true});document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!menu.hidden){menu.hidden=true;btn.setAttribute('aria-expanded','false');btn.focus()}});</script></body>`);
  fs.writeFileSync(targetPath, html);
}

const directionSlides = directions.map((direction, index) => `<article class="carousel-slide" data-slide="${direction.id}" aria-hidden="${index === 0 ? 'false' : 'true'}"><a href="prototypes/${direction.file}" target="_blank" rel="noopener" tabindex="${index === 0 ? '0' : '-1'}"><img src="previews/${direction.file.replace('.html', '.png')}" alt="Preview of ${direction.name}" width="1440" height="960"${index === 0 ? '' : ' loading="lazy"'}></a></article>`).join('');
const directionChoices = directions.map((direction, index) => `<button class="carousel-choice${index === 0 ? ' is-active' : ''}" data-direction="${direction.id}" aria-pressed="${index === 0}" aria-label="Show ${direction.name}"><span>${direction.id}</span><strong>${direction.name}</strong></button>`).join('');
const directionData = Object.fromEntries(directions.map(direction => [direction.id, direction]));

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="A working exploration of a clearer Make.WordPress.org homepage and shared team navigation.">
  <title>A clearer front door for Make WordPress</title>
  <style>
    :root{--ink:#1e1e1e;--muted:#50575e;--line:#dcdcde;--soft:#f6f7f7;--blue:#3858e9;--dark:#23282e;--paper:#fff;--measure:1180px;--edge:clamp(20px,5vw,72px)}
    *{box-sizing:border-box}
    html{scroll-behavior:smooth}
    body{margin:0;color:var(--ink);background:var(--paper);font:16px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased}
    a{color:var(--blue);text-underline-offset:.14em}
    button{font:inherit}
    .site-header{min-height:58px;padding:0 var(--edge);display:flex;align-items:center;gap:28px;background:var(--dark);color:#fff;position:sticky;top:0;z-index:50}
    .site-header strong{font-size:15px}
    .site-header nav{display:flex;gap:22px;margin-left:auto}
    .site-header a{color:#fff;text-decoration:none;font-size:14px}
    .site-header a:hover{text-decoration:underline}
    .hero{max-width:var(--measure);margin:auto;padding:clamp(48px,6vw,72px) var(--edge) clamp(44px,5vw,64px)}
    h1,h2,h3{font-family:Georgia,"Times New Roman",serif;font-weight:400}
    h1{max-width:980px;margin:0;font-size:clamp(40px,4.2vw,56px);line-height:1.08;letter-spacing:-.018em;text-wrap:balance}
    .hero-copy{max-width:720px;margin:22px 0 0;font-size:18px;line-height:1.55;color:#3c434a}
    .hero-scope{max-width:720px;margin:12px 0 0;color:var(--muted)}
    .story{background:var(--dark);color:#fff}
    .story-inner{max-width:var(--measure);margin:auto;padding:clamp(44px,5vw,64px) var(--edge);display:grid;grid-template-columns:repeat(3,1fr);gap:0;background:var(--dark)}
    .story article{background:var(--dark);padding:0 clamp(22px,3vw,42px);border-left:1px solid rgba(255,255,255,.16)}
    .story article:first-child{border-left:0}
    .story article:first-child{padding-left:0}.story article:last-child{padding-right:0}
    .story h2{margin:0 0 14px;font-size:clamp(25px,2.3vw,32px);line-height:1.18}
    .story p:last-child{margin:0;color:#e2e4e7}
    .directions h2{margin:4px 0 16px;font-size:clamp(30px,3vw,40px);line-height:1.15}
    .directions{background:var(--soft);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
    .directions-inner{max-width:var(--measure);margin:auto;padding:clamp(48px,5vw,68px) var(--edge)}
    .directions-intro{max-width:760px;color:var(--muted);font-size:18px}
    .viewer-copy{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:end;padding:24px 0 18px}
    .concept-meta{display:flex;gap:10px;margin:0 0 7px;color:var(--muted);font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
    .concept-meta span+span::before{content:'·';margin-right:10px}
    .viewer-copy h3{margin:0 0 6px;font-size:30px}
    .viewer-copy p{margin:0;color:var(--muted)}
    .viewer-copy a{display:inline-block;padding:10px 14px;border:1px solid #8c8f94;background:#fff;text-decoration:none;white-space:nowrap}
    .carousel{position:relative}
    .carousel-window{overflow:hidden;border:1px solid #8c8f94;background:#fff}
    .carousel-track{display:flex;transition:transform .35s cubic-bezier(.2,.7,.3,1)}
    .carousel-slide{flex:0 0 100%;min-width:0;background:#fff}
    .carousel-slide a{display:block}
    .carousel-slide a:focus-visible{outline:3px solid #9fb1ff;outline-offset:-3px}
    .carousel-slide img{display:block;width:100%;height:auto;aspect-ratio:3/2;object-fit:cover;object-position:top}
    .carousel-controls{display:grid;grid-template-columns:auto 1fr auto;align-items:stretch;margin-top:32px;border:1px solid #8c8f94;background:#fff}
    .carousel-arrow,.carousel-choice{border:0;background:#fff;color:var(--ink);cursor:pointer}
    .carousel-arrow{min-width:112px;padding:13px 16px;font-weight:650}
    .carousel-arrow:first-child{border-right:1px solid var(--line)}
    .carousel-arrow:last-child{border-left:1px solid var(--line)}
    .carousel-choices{display:grid;grid-template-columns:repeat(5,1fr)}
    .carousel-choice{min-width:0;padding:10px 8px;border-right:1px solid var(--line);text-align:center}
    .carousel-choice:last-child{border-right:0}
    .carousel-choice span{display:block;color:var(--muted);font-size:11px;font-weight:700;letter-spacing:.1em}
    .carousel-choice strong{display:block;margin-top:2px;overflow:hidden;font-size:12px;text-overflow:ellipsis;white-space:nowrap}
    .carousel-arrow:hover,.carousel-choice:hover{background:#f0f0f1}
    .carousel-choice.is-active{background:var(--ink);color:#fff}.carousel-choice.is-active span{color:#c3c4c7}
    .carousel-arrow:focus-visible,.carousel-choice:focus-visible{outline:3px solid #9fb1ff;outline-offset:-3px;position:relative;z-index:2}
    footer{padding:34px var(--edge);background:var(--dark);color:#c3c4c7;text-align:center;font-size:14px}
    @media(max-width:820px){.site-header nav a:first-child{display:none}.story-inner{grid-template-columns:1fr;gap:32px}.story article,.story article:first-child,.story article:last-child{padding:0;border-left:0}.viewer-copy{grid-template-columns:1fr}.viewer-copy a{justify-self:start}.carousel-arrow{min-width:64px}.arrow-label,.carousel-choice strong{display:none}}
    @media(max-width:560px){.site-header{padding:14px 20px;align-items:flex-start}.site-header nav{display:none}.hero{padding-top:44px}.story-inner,.directions-inner{padding-left:20px;padding-right:20px}.carousel-controls{grid-template-columns:54px 1fr 54px}.carousel-arrow{min-width:0;padding:11px 8px}.carousel-choice{padding:9px 4px}}
    @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.carousel-track{transition:none}}
  </style>
</head>
<body>
  <header class="site-header"><strong>Make WordPress exploration</strong><nav aria-label="Page"><a href="#problem">Why this matters</a><a href="#directions">Compare five prototypes</a></nav></header>
  <main>
    <section class="hero">
      <h1>A clearer front door for Make WordPress.</h1>
      <p class="hero-copy">I’ve been thinking about how Make.WordPress.org could better show what teams are doing and make it easier to move between them.</p>
      <p class="hero-scope">This explores the network home and shared navigation. Individual team landing pages remain separate.</p>
    </section>
    <section class="story" id="problem"><div class="story-inner">
      <article><h2>The problem</h2><p>The network is difficult to see. The current home lists teams, but it is hard to quickly see their next meetings, recent posts, and useful destinations. Once you enter a team site, moving back home or switching teams is not obvious.</p></article>
      <article><h2>The brainstorm</h2><p>Show the work. These directions explore personal team views, shared team cards, newcomer routes, search, recent publishing, and a simpler two-row navigation model.</p></article>
      <article><h2>The impact</h2><p>Help people find their next move. A clearer network view could reduce navigation friction, improve cross-team awareness, and give both new and experienced contributors a useful starting point.</p></article>
    </div></section>
    <section class="directions" id="directions"><div class="directions-inner">
      <h2>Compare the working ideas.</h2><p class="directions-intro">Use the carousel to scan each direction, then open any full prototype in a new tab.</p>
      <div class="carousel" aria-roledescription="carousel" aria-label="Five Make WordPress prototype previews">
        <div class="carousel-controls"><button class="carousel-arrow" id="carousel-previous" type="button" aria-label="Previous prototype"><span aria-hidden="true">←</span> <span class="arrow-label">Previous</span></button><div class="carousel-choices" role="group" aria-label="Choose a prototype">${directionChoices}</div><button class="carousel-arrow" id="carousel-next" type="button" aria-label="Next prototype"><span class="arrow-label">Next</span> <span aria-hidden="true">→</span></button></div>
        <div class="viewer-copy"><div><p class="concept-meta"><span id="viewer-id">Concept ${directions[0].id}</span><span id="viewer-tier">${directions[0].tier}</span></p><h3 id="viewer-name">${directions[0].name}</h3><p id="viewer-job">${directions[0].job}</p></div><a id="viewer-link" href="prototypes/${directions[0].file}" target="_blank" rel="noopener">Open full prototype ↗</a></div>
        <div class="carousel-window"><div class="carousel-track">${directionSlides}</div></div>
      </div>
    </div></section>
  </main>
  <footer>Working Make WordPress network prototype · Representative content only</footer>
  <script>
    const directions=${JSON.stringify(directionData)};
    const buttons=[...document.querySelectorAll('[data-direction]')];
    const slides=[...document.querySelectorAll('[data-slide]')];
    const track=document.querySelector('.carousel-track');
    const carousel=document.querySelector('.carousel');
    let activeIndex=0;
    const conceptId=document.querySelector('#viewer-id');
    const tier=document.querySelector('#viewer-tier');
    const name=document.querySelector('#viewer-name');
    const job=document.querySelector('#viewer-job');
    const link=document.querySelector('#viewer-link');
    const showDirection=index=>{
      activeIndex=(index+slides.length)%slides.length;
      const activeSlide=slides[activeIndex];
      const direction=directions[activeSlide.dataset.slide];
      track.style.transform='translateX(-'+(activeIndex*100)+'%)';
      slides.forEach((slide,slideIndex)=>{const active=slideIndex===activeIndex;slide.setAttribute('aria-hidden',String(!active));slide.querySelector('a').tabIndex=active?0:-1});
      buttons.forEach((button,buttonIndex)=>{const active=buttonIndex===activeIndex;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active))});
      conceptId.textContent='Concept '+direction.id;
      tier.textContent=direction.tier;
      name.textContent=direction.name;
      job.textContent=direction.job;
      link.href='prototypes/'+direction.file;
    };
    buttons.forEach((button,index)=>button.addEventListener('click',()=>showDirection(index)));
    document.querySelector('#carousel-previous').addEventListener('click',()=>showDirection(activeIndex-1));
    document.querySelector('#carousel-next').addEventListener('click',()=>showDirection(activeIndex+1));
    carousel.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();showDirection(activeIndex+(event.key==='ArrowLeft'?-1:1))}});
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(exportRoot, 'index.html'), html);
console.log(`Generated share site at ${exportRoot}`);
