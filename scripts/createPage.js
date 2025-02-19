/* eslint-disable @typescript-eslint/no-var-requires */
// scripts/createPage.js
const fs = require("fs-extra");
const path = require("path");

const pageName = process.argv[2];

if (!pageName) {
	console.error("Please provide a page name.");
	process.exit(1);
}

const pageDir = path.join(__dirname, "..", "pages");
const styleDir = path.join(__dirname, "..", "src", "styles", "pages");

/** Convert string to PascalCase */
const toPascalCaseWitSpace = (str) => {
	return str
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(" ");
};
/** Convert string to PascalCase */
const toPascalCaseWithoutSpace = (str) => {
	return str
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join("");
};

/** */
const createPage = async () => {
	try {
		const pascalCaseName = toPascalCaseWithoutSpace(pageName);
		const nameWithSpace = toPascalCaseWitSpace(pageName);

		// Check if the page file already exists
		const pageFileExists = await fs
			.access(path.join(pageDir, `${pageName}.js`))
			.then(() => true)
			.catch(() => false);

		if (pageFileExists) {
			console.error(`page ${pageName} already exists.`);
			process.exit(1);
		}

		// Create the page file
		const pageContent = `// MODULES //

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/${pascalCaseName}.module.scss";

// IMAGES //

// DATA //

/** ${nameWithSpace} Page */
export default function ${pascalCaseName}Page() {
	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"${nameWithSpace}"} Desc={""} OgImg={""} Url={"/${pageName}"} />

			{/* Header */}
			<Header />

			{/* Page Content starts here */}
			<main className={styles.${pascalCaseName}Page}>
				
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			<Footer />
		</div>
	);
}
        `;

		await fs.writeFile(path.join(pageDir, `${pageName}.js`), pageContent);

		// Create the style file
		await fs.writeFile(
			path.join(styleDir, `${pascalCaseName}.module.scss`),
			// eslint-disable-next-line quotes
			`@import "../helpers/helpers.scss";
			
.${pascalCaseName}Page{}`
		);

		console.log(`page ${pageName} created successfully!`);
	} catch (err) {
		console.error("Error creating page:", err);
	}
};

createPage();
