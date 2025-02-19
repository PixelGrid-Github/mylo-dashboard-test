// MODULES //

// COMPONENTS //
import Head from "next/head";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //

// IMAGES //
import OgImage from "public/img/og-image.jpg";
import Favicon from "public/img/favicon.png";

// DATA //

/** Meta Tags */
export default function MetaTags({ Title, Desc, OgImg, Url }) {
	// Metas for all page
	const defaultMetas = {
		title: "Title",
		desc: "Description",
		url: "http://localhost:3000",
		ogImg: `${OgImage.src}`,
	};

	// Check if page has its own metadetails
	// If not then use the default
	const title = Title ? Title : defaultMetas.title;
	const desc = Desc ? Desc : defaultMetas.desc;
	const ogImg = OgImg ? OgImg : defaultMetas.ogImg;
	const url = Url ? Url : defaultMetas.url;

	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={desc} />
			<meta name="theme-color" content="#000" />

			{/* OG Tags  */}
			<meta property="og:title" content={title} />
			<meta property="og:description" content={desc} />
			<meta property="og:url" content={url} />
			<meta property="og:image" content={ogImg} />
			<meta property="og:image:secure_url" content={ogImg} />
			<meta property="og:type" content="website" />

			{/* twitter card  */}
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={desc} />
			<meta name="twitter:image" content={ogImg} />
			<meta name="twitter:card" content="summary_large_image" />

			{/* canonical tag */}
			<link rel="canonical" href={url} />

			{/* Favicon */}
			<link rel="icon" href={`${Favicon.src}`} />
		</Head>
	);
}
