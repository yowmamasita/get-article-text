#!/usr/bin/env node

const puppeteer = require('puppeteer');

async function getArticleText(url) {

	const browser = await puppeteer.launch({ headless: 'new'});
	const page = await browser.newPage();
	await page.goto(url, {'waitUntil': 'domcontentloaded'});

	const text = await page.evaluate(() => {
		const element = document.querySelector('article');
		const strippedText = element.textContent || element.innerText;
		return strippedText.trim();
	});
	console.log(text);
	await browser.close();
}

if (require.main === module) {
	const args = process.argv.slice(process.argv[0].endsWith('node') ? 2 : 1);
	if (args.length !== 1) throw new Error('no URL provided');
	getArticleText(args[0]);
}
