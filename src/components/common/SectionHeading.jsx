export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  className = ""
}) {
  const alignClass = align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center mx-auto";

  return (
    <div className={`max-w-4xl mb-8 ${alignClass} ${className}`}>
      <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold text-[#173B26] leading-tight tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2.5 text-sm sm:text-base text-[#4B5563] leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={`mt-3 flex ${align === "left" ? "justify-start" : align === "right" ? "justify-end" : "justify-center"}`}>
        <div className="h-0.5 w-14 bg-gradient-to-r from-[#216B35] to-[#174D28] rounded-full" />
      </div>
    </div>
  );
}
