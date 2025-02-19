// MODULES //

// COMPONENTS //

// STYLES //
import styles from "@/styles/components/InnerBanner.module.scss";

// PLUGINS //

// IMAGES //
import DefaultBanner from "@/../public/img/banner/defaultDesktopBanner.jpg";
import DefaultBannerMob from "@/../public/img/banner/defaultMobileBanner.jpg";

// UTILS //

/** Inner Banner component */
function InnerBanner({
	desktopImage,
	bannerTitle,
	bannerDescription,
	mobileImage,
}) {
	return (
		<div className={`${styles.inner_banner_wrap} `}>
			{/* Banner Image */}
			<div className={`${styles.banner_image} next_image`}>
				<picture>
					<source
						srcSet={desktopImage ? desktopImage : DefaultBanner.src}
						media="(min-width:767px)"
					/>
					<img
						src={mobileImage ? mobileImage : DefaultBannerMob.src}
						alt="mobileImage"
					/>
				</picture>
			</div>
			{/* Banner Content */}
			<div className={`${styles.banner_content}`}>
				<div className="container">
					<h1>{bannerTitle}</h1>
					<p>{bannerDescription}</p>
				</div>
			</div>
		</div>
	);
}

export default InnerBanner;
