import Link from 'next/link';
import { ArrowRight, Package } from 'lucide-react';

export default function HomeProducts({ products = [] }) {
  // Exactly 4 items in 1 row on desktop
  const displayProducts = products.slice(0, 4);

  if (displayProducts.length === 0) return null;

  return (
    <section className="py-8 sm:py-10 bg-white border-b border-[#DCE5DD] w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Section Header - Compact UI/UX */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-2 border-b border-[#DCE5DD]/60">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#173B26] font-manrope tracking-tight">
              Certified Environmental &amp; Wildlife Products
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] font-manrope max-w-2xl mt-1 leading-relaxed">
              Non-lethal deterrent devices, bird flight diverters, and frontline ranger safety gear deployed across India.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#216B35] hover:text-[#174D28] bg-white hover:bg-[#F5F8F3] border border-[#DCE5DD] hover:border-[#216B35] px-3.5 py-1.5 rounded-lg font-manrope transition-all shadow-xs shrink-0 self-start sm:self-auto"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 1 Row of 4 Compact Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {displayProducts.map((product) => {
            const productHref = product.slug ? `/products/${product.slug}` : `/products`;
            return (
              <div
                key={product.id || product._id || product.slug}
                className="group bg-white rounded-xl border border-[#DCE5DD] overflow-hidden shadow-xs hover:shadow-md hover:border-[#216B35]/50 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Compact Product Image */}
                  <Link href={productHref} className="block relative h-40 sm:h-44 w-full overflow-hidden bg-slate-100 cursor-pointer">
                    <img
                      src={product.featuredImage || '/details.jpeg'}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </Link>

                  {/* Compact Content */}
                  <div className="p-4 space-y-2">
                    <Link href={productHref} className="block group-hover:text-[#216B35] transition-colors">
                      <h3 className="text-sm sm:text-base font-bold font-manrope text-[#173B26] line-clamp-1 leading-snug">
                        {product.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-[#4B5563] font-manrope line-clamp-2 leading-relaxed">
                      {product.shortDescription || 'Certified environmental and wildlife protection hardware solution.'}
                    </p>

                    {/* Quick Specs Snippet */}
                    {product.specs && product.specs.length > 0 && (
                      <div className="pt-2 border-t border-[#DCE5DD]/60 space-y-1">
                        {product.specs.slice(0, 2).map((sp, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#4B5563] truncate">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#216B35] shrink-0" />
                            <span className="truncate">
                              <strong className="text-[#173B26] font-medium">{sp.label}:</strong> {sp.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Compact Footer Action */}
                <div className="p-3.5 pt-2.5 border-t border-[#DCE5DD]/60 bg-[#F5F8F3]/40 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#216B35] truncate max-w-[130px]">
                    {product.price || 'Official Quote'}
                  </span>
                  <Link
                    href={productHref}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#216B35] hover:text-[#174D28] font-manrope group-hover:translate-x-0.5 transition-all"
                  >
                    <span>View Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

