//@ts-check
const walk = require("ignore-walk");
const path = require("path");
const fs = require("fs");
const promisify = require("util").promisify;

async function run() {
	const rootDir = __dirname;
	const files = await walk({
		path: rootDir,
		ignoreFiles: [".buildignore"]
	});
	console.log(files);
	const result = {};
	const promises = files.map(async pth => {
		const actual = path.join(rootDir, pth);
		try {
			result[pth] = (await readFileAsync(actual)).toString();
		} catch (e) {}
	});
	await Promise.all(promises);
	console.log(result);
	const ordered = {};
	Object.keys(result)
		.sort()
		.forEach(function(key) {
			ordered[key] = JSON.parse(result[key]);
		});
	await writeFileAsync(
		path.join(rootDir, "output.json"),
		JSON.stringify(ordered, undefined, "\t")
	);
}

run();

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
