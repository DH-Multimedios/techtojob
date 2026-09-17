type BrandCurveProps = {
  className?: string;
};

export function BrandCurve({ className = "" }: BrandCurveProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 640 180"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d="M-20 164C101 20 232 18 326 102c77 69 166 65 334-92"
        stroke="currentColor"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
