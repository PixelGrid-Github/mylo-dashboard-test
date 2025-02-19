// MODULES //
import { useEffect, useRef } from "react";

// COMPONENTS //

// SECTIONS //

// PLUGINS //
import { createRoot } from "react-dom/client";

// UTILS //

// STYLES //
import styles from "@/styles/components/ContentFromCms.module.scss";

// IMAGES //

// DATA //

/** Content from cms */
export default function CustomMarker({ position, map, children }) {
	const markerRef = useRef(null);
	const markerDivRef = useRef(null);
	const rootRef = useRef(null);

	useEffect(() => {
		if (!map || !window.google) return;

		const markerDiv = document.createElement("div");
		markerDiv.style.position = "absolute";
		markerDiv.style.transform = "translate(-50%, -100%)";
		markerDivRef.current = markerDiv;

		markerRef.current = new window.google.maps.OverlayView();
		markerRef.current.onAdd = () => {
			const panes = markerRef.current.getPanes();
			panes.overlayMouseTarget.appendChild(markerDiv);
		};
		markerRef.current.draw = () => {
			const projection = markerRef.current.getProjection();
			const point = projection.fromLatLngToDivPixel(position);
			if (point) {
				markerDiv.style.left = `${point.x}px`;
				markerDiv.style.top = `${point.y}px`;
			}
		};
		markerRef.current.onRemove = () => {
			if (markerDiv.parentNode) {
				markerDiv.parentNode.removeChild(markerDiv);
			}
		};
		markerRef.current.setMap(map);

		return () => {
			if (markerRef.current) {
				markerRef.current.setMap(null);
			}
		};
	}, [map, position]);

	useEffect(() => {
		if (markerDivRef.current) {
			if (!rootRef.current) {
				rootRef.current = createRoot(markerDivRef.current);
			}
			rootRef.current.render(children);
		}
	}, [children]);

	return null;
}
