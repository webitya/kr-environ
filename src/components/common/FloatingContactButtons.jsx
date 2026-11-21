'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';

const PRIMARY_PHONE_DISPLAY = '+91 91557 96749';
const PRIMARY_PHONE_TEL = '+919155796749';
const PRIMARY_PHONE_WA = '919155796749';

export default function FloatingContactButtons() {
  const pathname = usePathname();
  const [pageContext, setPageContext] = useState('');

  // Update context dynamically on client side when navigating
  useEffect(() => {
    if (!pathname) return;

    const timer = setTimeout(() => {
      if (pathname.startsWith('/services/') || pathname.startsWith('/products/')) {
        const h1 = document.querySelector('h1')?.innerText?.trim();
        setPageContext(h1 || '');
      } else {
        setPageContext('');
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Hide floating action buttons in the admin management dashboard and login screens
  if (pathname && (pathname.startsWith('/admin') || pathname.startsWith('/admin-login'))) {
    return null;
  }

  // Pre-filled message: mentions particular service/product on service & product pages, clean greeting on global pages
  const waMessage = pageContext
    ? `Hello KR Environ Solutions, I would like to enquire about: ${pageContext}.`
    : 'Hello KR Environ Solutions, I would like to make an enquiry.';

  return (
    <aside 
      aria-label="Quick Contact Actions"
      className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5 select-none pointer-events-auto"
    >
      {/* Call Button */}
      <a
        href={`tel:${PRIMARY_PHONE_TEL}`}
        aria-label={`Direct Phone Call to KR Environ Solutions (${PRIMARY_PHONE_DISPLAY})`}
        className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-[5px] bg-[#216B35] hover:bg-[#174D28] text-white shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20"
      >
        <Phone className="w-5 h-5 text-white" />
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${PRIMARY_PHONE_WA}?text=${encodeURIComponent(waMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with KR Environ Solutions on WhatsApp"
        className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-[5px] bg-[#25D366] hover:bg-[#20BA5C] text-white shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20"
      >
        {/* Official WhatsApp Vector Logo */}
        <svg 
          viewBox="0 0 32 32" 
          className="w-6 h-6 fill-white" 
          aria-hidden="true"
        >
          <path d="M16.002 2C8.28 2 2 8.28 2 16.002c0 2.588.704 5.016 1.932 7.108L2 30l7.104-1.872A13.93 13.93 0 0 0 16.002 30C23.722 30 30 23.722 30 16.002 30 8.28 23.722 2 16.002 2zm0 25.592a11.53 11.53 0 0 1-5.885-1.604l-.422-.25-4.372 1.152 1.17-4.262-.275-.436A11.536 11.536 0 0 1 4.408 16c0-6.4 5.202-11.602 11.6-11.602 6.4 0 11.602 5.202 11.602 11.6s-5.202 11.594-11.608 11.594zm6.368-8.682c-.348-.174-2.064-1.02-2.384-1.136-.32-.116-.552-.174-.784.174s-.9 1.136-1.104 1.368c-.204.232-.408.262-.756.088-.348-.174-1.472-.544-2.804-1.732-1.036-.924-1.736-2.068-1.94-2.416-.204-.348-.022-.536.152-.71.156-.156.348-.408.522-.612.174-.204.232-.348.348-.58.116-.232.058-.436-.03-.61-.088-.174-.784-1.89-1.076-2.588-.284-.68-.572-.588-.784-.6l-.67-.012c-.232 0-.61.088-.93.436-.32.348-1.22 1.194-1.22 2.912s1.25 3.378 1.424 3.61c.174.232 2.46 3.756 5.96 5.268.832.36 1.482.576 1.99.738.838.266 1.6.228 2.204.138.674-.1 2.064-.844 2.354-1.66.29-.816.29-1.516.204-1.66-.086-.146-.318-.232-.666-.406z"/>
        </svg>
      </a>
    </aside>
  );
}
