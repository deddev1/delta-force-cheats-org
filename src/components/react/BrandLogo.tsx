import { siteConfig } from '../../data/site';

type Props = {
	/** Accessible label when the logo is decorative inside a named link */
	alt?: string;
	className?: string;
};

/** Delta Force Cheats corner mark — crisp SVG for navbar. */
export default function BrandLogo({ alt = siteConfig.logoAlt, className }: Props) {
	return (
		<img
			className={className}
			src={siteConfig.logoMark}
			width={32}
			height={32}
			alt={alt}
			decoding="async"
			fetchPriority="high"
		/>
	);
}
