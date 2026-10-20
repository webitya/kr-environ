export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  badgeColor = "green", // "green" | "blue" | "gold"
  className = ""
}) {
  const alignClass = align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center mx-auto";

  const badgeStyles = {
    green: "bg-[#F5F8F3] text-[#216B35] border-[#DCE5DD]",
    blue: "bg-[#EFF7FA] text-[#087EA4] border-[#087EA4]/20",
    gold: "bg-[#F2BE36]/15 text-[#173B26] border-[#F2BE36]/30 font-semibold"
  };

  return (
    <div className={`max-w-3xl mb-12 ${alignClass} ${className}`}>
      {badge && (
        <span
          className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-poppins uppercase tracking-wider border mb-3 ${
            badgeStyles[badgeColor] || badgeStyles.green
          }`}
        >
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-montserrat font-bold text-[#173B26] leading-tight tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-[#4B5563] font-lato leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={`mt-4 flex ${align === "left" ? "justify-start" : align === "right" ? "justify-end" : "justify-center"}`}>
        <div className="h-1 w-20 bg-gradient-to-r from-[#216B35] to-[#087EA4] rounded-full" />
      </div>
    </div>
  );
}
