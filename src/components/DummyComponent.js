// MODULES //

// COMPONENTS //
import ContentFromCms from "@/components/ContentFromCms";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/DummyComponent.module.scss";

// IMAGES //

// DATA //

/** DummyComponent Component */
export default function DummyComponent({ title, desc, thumbImage }) {
	return (
		<div className={styles.blog_item}>
			<div>
				<p>{title}</p>
				<div className={`${styles.desc}`}>
					<ContentFromCms>{desc}</ContentFromCms>
				</div>
			</div>
		</div>
	);
}
