export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  className = ""
}) {
  const alignClass = align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center mx-auto";

  return (
    <div className={`max-w-4xl mb-6 ${alignClass} ${className}`}>
      <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold text-[#173B26] leading-tight tracking-tight font-manrope">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-xs sm:text-sm text-[#4B5563] leading-relaxed font-manrope">
          {subtitle}
        </p>
      )}
    </div>
  );
}
