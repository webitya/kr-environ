'use client';

import Link from 'next/link';
import { 
  Package, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

export default function ProductsClient({ products = [] }) {
  return (
    <div className="w-full">
      {/* Products Grid: 3 columns on large desktop, 2 on tablet, 1 on mobile */}
      {products.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-[#DCE5DD] shadow-xs space-y-3">
          <Package className="w-12 h-12 text-[#68756D] mx-auto opacity-40" />
          <h4 className="text-base font-bold text-[#173B26]">No Products Found</h4>
          <p className="text-xs text-[#68756D] max-w-sm mx-auto">
            Products can be added via the admin management portal.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {products.map((product) => {
            const productHref = product.slug ? `/products/${product.slug}` : `/products`;

            return (
              <div
                key={product.id || product._id || product.slug}
                className="group bg-white rounded-2xl border border-[#DCE5DD] overflow-hidden shadow-xs hover:shadow-lg hover:border-[#216B35]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Product Image Stage */}
                  <Link href={productHref} className="block relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100 cursor-pointer">
                    <img
                      src={product.featuredImage || '/details.jpeg'}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Category Tag (Top-Left) */}
                    {product.category && (
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-[#173B26] border border-[#DCE5DD] shadow-xs">
                        {product.category}
                      </div>
                    )}

                    {/* Model Code Tag (Top-Right) */}
                    {product.modelCode && (
                      <div className="absolute top-3 right-3 bg-[#173B26]/90 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white shadow-xs">
                        {product.modelCode}
                      </div>
                    )}
                  </Link>

                  {/* Product Content Details */}
                  <div className="p-5 space-y-3">
                    <Link href={productHref} className="block group-hover:text-[#216B35] transition-colors">
                      <h3 className="text-base sm:text-lg font-bold font-manrope text-[#173B26] leading-snug">
                        {product.title}
                      </h3>
                    </Link>

                    <p className="text-xs sm:text-sm text-[#4B5563] font-manrope line-clamp-3 leading-relaxed">
                      {product.shortDescription || 'Certified environmental and wildlife protection hardware solution.'}
                    </p>

                    {/* Quick Specs List */}
                    {product.specs && product.specs.length > 0 && (
                      <div className="pt-2 border-t border-[#DCE5DD]/60 space-y-1.5">
                        {product.specs.slice(0, 3).map((spec, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-[12px] text-[#4B5563]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#216B35] mt-0.5 shrink-0" />
                            <span className="leading-tight">
                              <strong className="text-[#173B26] font-medium">{spec.label}:</strong> {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Pricing / Supply Framework Badge */}
                    <div className="pt-2 flex items-center justify-between text-[11px]">
                      <span className="text-[#68756D] font-medium">Procurement:</span>
                      <span className="text-[#216B35] font-semibold bg-[#F5F8F3] px-2 py-0.5 rounded border border-[#DCE5DD]">
                        {product.price || 'Official Quote / GeM Framework'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="p-4 sm:p-5 pt-3 border-t border-[#DCE5DD]/50 bg-[#F5F8F3]/40 flex items-center justify-end">
                  <Link
                    href={productHref}
                    className="w-full py-2 px-3.5 rounded-lg text-xs font-semibold text-white bg-[#216B35] hover:bg-[#174D28] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
