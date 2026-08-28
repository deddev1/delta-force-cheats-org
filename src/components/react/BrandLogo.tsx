type Props = {
	/** Accessible label when the logo is decorative inside a named link */
	alt?: string;
	className?: string;
};

/** NC monogram mark — Delta Force Cheats. */
export default function BrandLogo({ alt = 'Delta Force Cheats logo', className }: Props) {
	return (
		<img
			className={className}
			src="/images/delta-force-cheats-logo-mark.webp"
			srcSet="/images/delta-force-cheats-logo-mark.webp 128w, /images/delta-force-cheats-logo.webp 512w"
			sizes="40px"
			width={40}
			height={40}
			alt={alt}
			decoding="async"
			fetchPriority="high"
		/>
	);
}
