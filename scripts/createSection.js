/* eslint-disable @typescript-eslint/no-var-requires */
// scripts/createsection.js
const fs = require("fs-extra");
const path = require("path");

const sectionName = process.argv[2];

if (!sectionName) {
	console.error("Please provide a section name.");
	process.exit(1);
}

const sectionDir = path.join(__dirname, "..", "src", "sections");
const styleDir = path.join(__dirname, "..", "src", "styles", "sections");

/** */
const createSection = async () => {
	try {
		// Check if the section file already exists
		const sectionFileExists = await fs
			.access(path.join(sectionDir, `${sectionName}.js`))
			.then(() => true)
			.catch(() => false);

		if (sectionFileExists) {
			console.error(`Section ${sectionName} already exists.`);
			process.exit(1);
		}

		// Create the section file
		const sectionContent = `// MODULES //

// COMPONENTS //

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/${sectionName}.module.scss";

// IMAGES //

// DATA //

/** ${sectionName} Section */
export default function ${sectionName}() {
	return <section className={styles.${sectionName}}></section>;
}
        `;

		await fs.writeFile(
			path.join(sectionDir, `${sectionName}.js`),
			sectionContent
		);

		// Create the style file
		await fs.writeFile(
			path.join(styleDir, `${sectionName}.module.scss`),
			// eslint-disable-next-line quotes
			`@import "../helpers/helpers.scss";
			
.${sectionName}{}`
		);

		console.log(`Section ${sectionName} created successfully!`);
	} catch (err) {
		console.error("Error creating section:", err);
	}
};

createSection();
