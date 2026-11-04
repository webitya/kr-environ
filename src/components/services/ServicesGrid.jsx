'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Sparkles,
  SlidersHorizontal,
  X
} from 'lucide-react';

export default function ServicesGrid({ services = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories dynamically from database
  const categories = useMemo(() => {
    const cats = new Set(services.map((s) => s.category).filter(Boolean));
    return ['All', ...Array.from(cats).sort()];
  }, [services]);

  // Filter services by category and search term
  const filteredServices = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return services.filter((srv) => {
      const matchCat = selectedCategory === 'All' || srv.category === selectedCategory;
      if (!matchCat) return false;

      if (!q) return true;
      const matchTitle = (srv.title || '').toLowerCase().includes(q);
      const matchDesc = (srv.shortDescription || '').toLowerCase().includes(q);
      const matchCategoryText = (srv.category || '').toLowerCase().includes(q);
      const matchSpecs = (srv.specs || []).some(
        (sp) => (sp.label || '').toLowerCase().includes(q) || (sp.value || '').toLowerCase().includes(q)
      );

      return matchTitle || matchDesc || matchCategoryText || matchSpecs;
    });
  }, [services, selectedCategory, searchQuery]);

  return (
    <div className="w-full space-y-6">
      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-[#DCE5DD] p-3 sm:p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Category Pills Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#216B35] text-white shadow-xs'
                    : 'bg-[#F5F8F3] text-[#4B5563] hover:text-[#173B26] hover:bg-[#EAEFE8] border border-[#DCE5DD]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input Box */}
        <div className="relative min-w-[240px] sm:min-w-[280px]">
          <Search className="w-4 h-4 text-[#68756D] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search solutions, hardware, specs..."
            className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-[#DCE5DD] bg-[#F5F8F3] focus:bg-white focus:border-[#216B35] focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#68756D] hover:text-[#173B26] p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between px-1 text-xs text-[#68756D]">
        <span className="font-medium">
          Showing <strong className="text-[#173B26]">{filteredServices.length}</strong> of {services.length} services &amp; technologies
        </span>
        {(selectedCategory !== 'All' || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-[#216B35] hover:underline font-semibold"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* =========================================================================
          FULL-WIDTH 4-CARDS-PER-ROW RESPONSIVE GRID
          ========================================================================= */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredServices.map((service) => (
            <Link
              key={service.id || service._id || service.slug}
              href={`/services/${service.slug}`}
              className="group bg-white rounded-2xl border border-[#DCE5DD] overflow-hidden shadow-xs hover:shadow-lg hover:border-[#216B35]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Compact Cover Image with Floating Category Badge */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={service.featuredImage || '/img4.jpeg'}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Floating Category Pill */}
                  <div className="absolute top-2.5 left-2.5 max-w-[85%]">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#216B35] shadow-xs border border-white/60 truncate">
                      {service.category || 'Wildlife Tech'}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-sm sm:text-base font-bold font-manrope text-[#173B26] group-hover:text-[#216B35] transition-colors leading-snug line-clamp-2 min-h-[2.5rem]">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-xs text-[#4B5563] font-lato line-clamp-2 leading-relaxed">
                    {service.shortDescription || 'State-approved environmental and wildlife technology solution.'}
                  </p>

                  {/* Compact Specs Preview */}
                  {Array.isArray(service.specs) && service.specs.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-[#DCE5DD]/60 flex flex-wrap gap-1.5">
                      {service.specs.slice(0, 2).map((sp, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-[#F5F8F3] text-[#173B26] px-2 py-0.5 rounded-md border border-[#DCE5DD] font-medium truncate max-w-full"
                          title={`${sp.label}: ${sp.value}`}
                        >
                          <strong>{sp.label}:</strong> {sp.value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="px-4 sm:px-5 pb-4 pt-1 border-t border-[#DCE5DD]/40 bg-[#F5F8F3]/30 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#216B35] group-hover:text-[#174D28] transition-colors">
                  View Technical Specs
                </span>
                <div className="w-6 h-6 rounded-full bg-white border border-[#DCE5DD] flex items-center justify-center text-[#216B35] group-hover:bg-[#216B35] group-hover:text-white group-hover:border-[#216B35] transition-all">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* Empty Filter State */
        <div className="p-12 text-center bg-white rounded-2xl border border-[#DCE5DD] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#F5F8F3] text-[#216B35] flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-[#173B26]">No Matching Services Found</h4>
          <p className="text-xs text-[#68756D] max-w-md mx-auto">
            We couldn&apos;t find any service matching your search or category filter. Try clearing your search query.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="btn-primary text-xs px-4 py-2"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}

