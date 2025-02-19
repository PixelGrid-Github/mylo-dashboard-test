// MODULES //

// COMPONENTS //

// SECTIONS //

// PLUGINS //
import parse from "html-react-parser";

// UTILS //

// STYLES //
import styles from "@/styles/components/ContentFromCms.module.scss";

// IMAGES //

// DATA //

/** Content from cms */
export default function ContentFromCms({ children }) {
	return <div className={`${styles.contentFromCms}`}>{parse(children)}</div>;
}
