'use client';

export default function HomeClients({ clients = [] }) {
  // If no clients in database yet, show clean placeholder or prompt for admin
  const hasClients = Array.isArray(clients) && clients.length > 0;

  // Duplicate items 3x or 4x to ensure smooth, gap-free infinite scrolling across large screens
  const displayLogos = hasClients 
    ? [...clients, ...clients, ...clients, ...clients] 
    : [];

  return (
    <section 
      className="relative w-full py-6 sm:py-8 bg-[#F5F8F3] border-b border-[#DCE5DD] overflow-hidden select-none"
      aria-label="Our Clients and Partners"
    >
      {/* Side gradient fade masks for smooth entrance/exit */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#F5F8F3] to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#F5F8F3] to-transparent pointer-events-none z-10" />

      <div className="w-full flex flex-col items-center">
        {/* Small Text Heading: "Our Clients" */}
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#216B35] mb-4 sm:mb-5 font-mono text-center">
          Our Clients
        </p>

        {hasClients ? (
          /* Infinite Right-to-Left Marquee Track */
          <div className="w-full overflow-hidden flex">
            <div className="animate-marquee-infinite flex items-center gap-8 sm:gap-14 lg:gap-18 px-4">
              {displayLogos.map((client, index) => (
                <div 
                  key={`${client._id || client.id || index}-${index}`}
                  className="shrink-0 flex items-center justify-center p-2.5 sm:p-3 rounded-xl bg-white border border-[#DCE5DD] shadow-xs hover:shadow-md hover:border-[#216B35]/40 transition-all duration-200 group"
                  title={client.name}
                >
                  {client.websiteUrl ? (
                    <a 
                      href={client.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3"
                    >
                      <img
                        src={client.logoUrl}
                        alt={client.name || 'Client Logo'}
                        className="h-10 sm:h-12 w-auto max-w-[130px] sm:max-w-[160px] object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                        loading="lazy"
                      />
                    </a>
                  ) : (
                    <div className="flex items-center gap-3">
                      <img
                        src={client.logoUrl}
                        alt={client.name || 'Client Logo'}
                        className="h-10 sm:h-12 w-auto max-w-[130px] sm:max-w-[160px] object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Fallback when admin hasn't added client logos yet */
          <div className="py-2 px-4 text-center">
            <p className="text-xs text-[#68756D] font-normal">
              No client logos added yet. Add your official client logos from the Admin Panel under <strong className="text-[#173B26]">Our Clients</strong>.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

