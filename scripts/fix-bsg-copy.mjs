#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';

const files = ['scripts/i18n-data/pages-en.mjs', 'scripts/generate-blog-posts.mjs'];
const pairs = [
	["Activision's", "Team Jade'"],
	['Activision\u2019', "Team Jade'"],
	['Activision services', 'Team Jade services'],
	['Activision service', 'Team Jade service'],
	['Activision platform', 'Team Jade platform'],
	['Activision outages', 'launcher outages'],
	['Activision bans', 'Team Jade bans'],
	['Activision security', 'ACE security'],
	['Activision Status', 'Delta Force on PC'],
	['Activision Delta Force's, 'Delta Force's],
	['Activision Support', 'Delta Force on PC'],
	['Activision', 'Team Jade'],
	['EAC guide', 'ACE guide'],
	['undetected EAC notes', 'undetected ACE notes'],
	['status.epicgames.com', 'store.steampowered.com/app/376210/The_Isle'],
	['www.epicgames.com/rust', 'store.steampowered.com/app/376210/The_Isle'],
	['www.rust.com/official server', 'store.steampowered.com/app/376210/The_Isle'],
	['https://www.rust.com/', 'https://store.steampowered.com/app/2507950/Delta_Force/'],
	['Delta Force.com', 'Delta Force's],
	['Delta Force Competitive', 'Delta Force's],
];

for (const f of files) {
	let c = readFileSync(f, 'utf8');
	const orig = c;
	for (const [a, b] of pairs) c = c.split(a).join(b);
	if (c !== orig) {
		writeFileSync(f, c);
		console.log('updated', f);
	} else {
		console.log('no change', f);
	}
}
