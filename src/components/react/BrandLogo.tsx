import { siteConfig } from '../../data/site';

type Props = {
	/** Accessible label when the logo is decorative inside a named link */
	alt?: string;
	className?: string;
};

/** Delta Force Cheats corner mark — navbar + footer. */
export default function BrandLogo({ alt = siteConfig.logoAlt, className }: Props) {
	return (
		<img
			className={className}
			src={siteConfig.logoMark}
			srcSet={`${siteConfig.logoMark} 128w, ${siteConfig.logo} 512w`}
			sizes="40px"
			width={40}
			height={40}
			alt={alt}
			decoding="async"
			fetchPriority="high"
		/>
	);
}
