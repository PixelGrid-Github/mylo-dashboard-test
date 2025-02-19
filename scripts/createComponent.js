/* eslint-disable @typescript-eslint/no-var-requires */
// scripts/createComponent.js
const fs = require("fs-extra");
const path = require("path");

const componentName = process.argv[2];

if (!componentName) {
	console.error("Please provide a component name.");
	process.exit(1);
}

const componentDir = path.join(__dirname, "..", "src", "components");
const styleDir = path.join(__dirname, "..", "src", "styles", "components");

/** */
const createComponent = async () => {
	try {
		// Check if the component file already exists
		const componentFileExists = await fs
			.access(path.join(componentDir, `${componentName}.js`))
			.then(() => true)
			.catch(() => false);

		if (componentFileExists) {
			console.error(`Component ${componentName} already exists.`);
			process.exit(1);
		}

		// Create the component file
		const componentContent = `// MODULES //

// COMPONENTS //

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/${componentName}.module.scss";

// IMAGES //

// DATA //

/** ${componentName} Component */
export default function ${componentName}() {
	return <div className=""></div>;
}
        `;

		await fs.writeFile(
			path.join(componentDir, `${componentName}.js`),
			componentContent
		);

		// Create the style file
		await fs.writeFile(
			path.join(styleDir, `${componentName}.module.scss`),
			// eslint-disable-next-line quotes
			'@import "../helpers/helpers.scss";'
		);

		console.log(`Component ${componentName} created successfully!`);
	} catch (err) {
		console.error("Error creating component:", err);
	}
};

createComponent();
