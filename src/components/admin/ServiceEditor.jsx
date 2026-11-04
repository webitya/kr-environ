'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Check,
  Eye,
  FileText,
  Upload,
  Globe,
  Tag,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  Code,
  Quote,
  Eraser,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

function slugify(text) {
  return (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function ServiceEditor({
  initialService = null,
  categories = [],
  onSave,
  onCancel,
  onUploadImage,
  onAddCategory
}) {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    slug: '',
    category: 'Wildlife Deterrence & Smart Sensors',
    shortDescription: '',
    featuredImage: '/img4.jpeg',
    status: 'published',
    content: '',
    seoTitle: '',
    metaDescription: '',
    specs: []
  });

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeContentTab, setActiveContentTab] = useState('write'); // 'write' | 'preview'
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  // Dynamic Category Creation
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);

  // New spec row temp inputs
  const [newSpecLabel, setNewSpecLabel] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  // Initialize form with initialService
  useEffect(() => {
    if (initialService) {
      setFormData({
        id: initialService.id || initialService._id || '',
        title: initialService.title || '',
        slug: initialService.slug || '',
        category: initialService.category || 'Wildlife Deterrence & Smart Sensors',
        shortDescription: initialService.shortDescription || '',
        featuredImage: initialService.featuredImage || '/img4.jpeg',
        status: initialService.status || 'published',
        content: initialService.content || '',
        seoTitle: initialService.seoTitle || '',
        metaDescription: initialService.metaDescription || '',
        specs: Array.isArray(initialService.specs) ? initialService.specs : []
      });
      setSlugManuallyEdited(Boolean(initialService.slug));
    }
  }, [initialService]);

  // Auto-slug generator when title changes (unless manually edited)
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: slugManuallyEdited ? prev.slug : slugify(val)
    }));
  };

  const handleSlugChange = (e) => {
    setSlugManuallyEdited(true);
    setFormData((prev) => ({
      ...prev,
      slug: slugify(e.target.value)
    }));
  };

  // Keyboard shortcut Ctrl+S / Cmd+S
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSubmit(e);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [formData]);

  // Submit Handler
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a service or product title.');
      return;
    }

    setSaving(true);
    setSaveSuccess(false);

    try {
      const cleanSlug = formData.slug.trim() || slugify(formData.title);
      const payload = {
        ...formData,
        slug: cleanSlug,
        specs: formData.specs.filter((s) => s.label && s.label.trim())
      };

      await onSave(payload);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert('Error saving service: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  // Specs handlers
  const handleAddSpec = () => {
    if (!newSpecLabel.trim() || !newSpecValue.trim()) return;
    setFormData((prev) => ({
      ...prev,
      specs: [...prev.specs, { label: newSpecLabel.trim(), value: newSpecValue.trim() }]
    }));
    setNewSpecLabel('');
    setNewSpecValue('');
  };

  const handleRemoveSpec = (index) => {
    setFormData((prev) => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index)
    }));
  };

  const handleSpecChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.specs];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, specs: updated };
    });
  };

  // Markdown Toolbar actions for content textarea
  const insertMarkdown = (prefix, suffix = '') => {
    const textarea = document.getElementById('service-content-textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.substring(start, end);
    const before = textarea.value.substring(0, start);
    const after = textarea.value.substring(end);

    const replacement = prefix + (selected || 'text') + suffix;
    const newContent = before + replacement + after;

    setFormData((prev) => ({ ...prev, content: newContent }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + (selected ? selected.length : 4)
      );
    }, 50);
  };

  // Handle Category Add
  const handleCreateCategory = async () => {
    if (!newCatName.trim() || !onAddCategory) return;
    setAddingCategory(true);
    try {
      await onAddCategory(newCatName.trim());
      setFormData((prev) => ({ ...prev, category: newCatName.trim() }));
      setNewCatName('');
      setShowAddCategory(false);
    } catch (err) {
      alert(err.message || 'Failed to create category');
    } finally {
      setAddingCategory(false);
    }
  };

  return (
    <div className="w-full bg-[#F5F8F3] min-h-screen pb-16 font-normal">
      {/* =========================================================================
          TOP STICKY ACTION HEADER (FULL WIDTH)
          ========================================================================= */}
      <div className="sticky top-0 z-30 bg-white border-b border-[#DCE5DD] shadow-xs px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Back button & Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DCE5DD] bg-[#F5F8F3] hover:bg-[#EAEFE8] text-[#173B26] text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Services</span>
          </button>

          <div className="hidden sm:block h-5 w-px bg-[#DCE5DD]" />

          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#216B35]/10 text-[#216B35]">
              <Layers className="w-4 h-4" />
            </span>
            <span className="font-bold text-sm sm:text-base text-[#173B26] truncate max-w-xs sm:max-w-md">
              {formData.id ? `Edit: ${formData.title || 'Untitled'}` : 'New Service / Product'}
            </span>
          </div>
        </div>

        {/* Right: Status Pill & Save Action */}
        <div className="flex items-center gap-2.5">
          {formData.slug && formData.id && (
            <Link
              href={`/services/${formData.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1 text-xs text-[#216B35] hover:text-[#174D28] font-semibold px-2.5 py-1.5 rounded border border-[#216B35]/30 hover:bg-[#F5F8F3] transition-colors"
            >
              <span>View Live</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          )}

          <div className="flex items-center bg-[#F5F8F3] p-1 rounded-lg border border-[#DCE5DD]">
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, status: 'published' }))}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                formData.status === 'published'
                  ? 'bg-[#216B35] text-white shadow-xs'
                  : 'text-[#4B5563] hover:text-[#173B26]'
              }`}
            >
              Published
            </button>
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, status: 'draft' }))}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                formData.status === 'draft'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-[#4B5563] hover:text-[#173B26]'
              }`}
            >
              Draft
            </button>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex items-center gap-1.5 bg-[#216B35] hover:bg-[#174D28] text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all disabled:opacity-60"
          >
            {saving ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : saveSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-200" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Service</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* =========================================================================
          FULL-WIDTH TWO-COLUMN EDITOR WORKSPACE
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* ================= LEFT COLUMN: MAIN CONTENT (8 COLS) ================= */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* Title & Slug Card */}
            <div className="bg-white rounded-xl border border-[#DCE5DD] p-4 sm:p-5 shadow-xs space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                  Service / Product Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="e.g. ANIDERS (Animal Intrusion Detection & Repellent System)"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none text-base font-semibold text-[#173B26]"
                />
              </div>

              {/* URL Slug Input with Live Route Preview */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-[#173B26] uppercase tracking-wider">
                    URL Slug
                  </label>
                  <span className="text-[11px] text-[#68756D]">
                    Auto-generated from title
                  </span>
                </div>
                <div className="flex items-center rounded-lg border border-[#DCE5DD] bg-[#F5F8F3] px-3 py-1.5 focus-within:border-[#216B35] focus-within:bg-white transition-colors">
                  <span className="text-xs text-[#68756D] font-mono select-none">
                    /services/
                  </span>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={handleSlugChange}
                    placeholder="aniders-animal-intrusion-detection-system"
                    className="flex-1 bg-transparent px-1 text-xs font-mono text-[#173B26] focus:outline-none"
                  />
                </div>
              </div>

              {/* Short Summary Description */}
              <div>
                <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                  Short Summary / Overview
                </label>
                <textarea
                  rows={3}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Concise 2-3 sentence overview displayed on service listing cards, search engine snippets, and page header..."
                  className="w-full p-3 rounded-lg border border-[#DCE5DD] text-xs leading-relaxed text-[#4B5563] focus:border-[#216B35] focus:outline-none"
                />
              </div>
            </div>

            {/* Technical Specifications (specs) Table */}
            <div className="bg-white rounded-xl border border-[#DCE5DD] p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#DCE5DD] pb-3">
                <div>
                  <h3 className="font-bold text-sm text-[#173B26]">Technical Specifications Table</h3>
                  <p className="text-[11px] text-[#68756D]">
                    Key technical parameters rendered in the sidebar spec table on the live service page.
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#F5F8F3] text-xs font-mono font-semibold text-[#216B35] border border-[#DCE5DD]">
                  {formData.specs.length} Specs
                </span>
              </div>

              {/* Spec Rows */}
              {formData.specs.length > 0 && (
                <div className="space-y-2">
                  {formData.specs.map((spec, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-2 p-2 rounded-lg bg-[#F5F8F3]/70 border border-[#DCE5DD]"
                    >
                      <input
                        type="text"
                        value={spec.label}
                        onChange={(e) => handleSpecChange(index, 'label', e.target.value)}
                        placeholder="Spec Label (e.g. Detection Range)"
                        className="flex-1 p-1.5 text-xs bg-white rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none font-medium"
                      />
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                        placeholder="Spec Value (e.g. Up to 30 meters)"
                        className="flex-1 p-1.5 text-xs bg-white rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSpec(index)}
                        className="p-1.5 rounded text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
                        title="Remove Spec"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Spec Input Row */}
              <div className="p-3 rounded-lg border-2 border-dashed border-[#216B35]/30 bg-[#F5F8F3]/40 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  value={newSpecLabel}
                  onChange={(e) => setNewSpecLabel(e.target.value)}
                  placeholder="New Spec Parameter (e.g. Battery Life)"
                  className="flex-1 p-2 text-xs bg-white rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                />
                <input
                  type="text"
                  value={newSpecValue}
                  onChange={(e) => setNewSpecValue(e.target.value)}
                  placeholder="Value (e.g. 72 Hours Backup)"
                  className="flex-1 p-2 text-xs bg-white rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddSpec}
                  disabled={!newSpecLabel.trim() || !newSpecValue.trim()}
                  className="btn-primary text-xs px-3 py-2 flex items-center justify-center gap-1 shrink-0 disabled:opacity-40"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Spec</span>
                </button>
              </div>
            </div>

            {/* Full Technical Content & Specifications (Markdown / Rich Text) */}
            <div className="bg-white rounded-xl border border-[#DCE5DD] p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE5DD] pb-3">
                <div>
                  <h3 className="font-bold text-sm text-[#173B26]">Full Technical Content &amp; Case Study</h3>
                  <p className="text-[11px] text-[#68756D]">
                    Detailed description, operating methodology, regulatory benefits, and deployment instructions.
                  </p>
                </div>

                {/* Tabs: Write vs Preview */}
                <div className="flex items-center bg-[#F5F8F3] p-1 rounded-lg border border-[#DCE5DD]">
                  <button
                    type="button"
                    onClick={() => setActiveContentTab('write')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-colors ${
                      activeContentTab === 'write'
                        ? 'bg-white text-[#173B26] shadow-xs'
                        : 'text-[#68756D] hover:text-[#173B26]'
                    }`}
                  >
                    <FileText className="w-3 h-3" />
                    <span>Write (Markdown)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveContentTab('preview')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-colors ${
                      activeContentTab === 'preview'
                        ? 'bg-white text-[#173B26] shadow-xs'
                        : 'text-[#68756D] hover:text-[#173B26]'
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    <span>Live Preview</span>
                  </button>
                </div>
              </div>

              {activeContentTab === 'write' ? (
                <div className="space-y-2">
                  {/* Markdown Quick Formatting Toolbar */}
                  <div className="flex flex-wrap items-center gap-1 p-1.5 rounded-lg bg-[#F5F8F3] border border-[#DCE5DD] text-xs">
                    <button
                      type="button"
                      onClick={() => insertMarkdown('**', '**')}
                      className="p-1.5 rounded hover:bg-white text-[#173B26] font-bold"
                      title="Bold (**text**)"
                    >
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown('*', '*')}
                      className="p-1.5 rounded hover:bg-white text-[#173B26] italic"
                      title="Italic (*text*)"
                    >
                      <Italic className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-px h-4 bg-[#DCE5DD] mx-1" />
                    <button
                      type="button"
                      onClick={() => insertMarkdown('### ')}
                      className="p-1.5 rounded hover:bg-white text-[#173B26] font-bold text-xs"
                      title="Heading 3 (### Title)"
                    >
                      <Heading3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown('- ')}
                      className="p-1.5 rounded hover:bg-white text-[#173B26]"
                      title="Bullet List (- item)"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown('1. ')}
                      className="p-1.5 rounded hover:bg-white text-[#173B26]"
                      title="Numbered List (1. item)"
                    >
                      <ListOrdered className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-px h-4 bg-[#DCE5DD] mx-1" />
                    <button
                      type="button"
                      onClick={() => insertMarkdown('> ')}
                      className="p-1.5 rounded hover:bg-white text-[#173B26]"
                      title="Blockquote (> quote)"
                    >
                      <Quote className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown('`', '`')}
                      className="p-1.5 rounded hover:bg-white text-[#173B26] font-mono text-[11px]"
                      title="Inline Code (`code`)"
                    >
                      <Code className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown('[Link text](', ')') }
                      className="p-1.5 rounded hover:bg-white text-[#173B26]"
                      title="Insert Link ([text](url))"
                    >
                      <LinkIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <textarea
                    id="service-content-textarea"
                    rows={12}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="### Technical Overview&#10;&#10;Detailed description of the technology, sensor calibration, detection ranges, and installation protocol...&#10;&#10;- Feature 1: Solar powered 24/7&#10;- Feature 2: 91% verified conflict deterrent&#10;- Feature 3: GSM cloud telemetry"
                    className="w-full p-3 rounded-lg border border-[#DCE5DD] font-mono text-xs leading-relaxed text-[#173B26] focus:border-[#216B35] focus:outline-none"
                  />
                  <div className="flex items-center justify-between text-[11px] text-[#68756D]">
                    <span>Supports Markdown formatting (### Headings, - Bullets, **Bold**, etc.)</span>
                    <span>{formData.content.length} characters</span>
                  </div>
                </div>
              ) : (
                /* Markdown Live Preview */
                <div className="p-4 rounded-lg border border-[#DCE5DD] bg-[#F5F8F3]/60 min-h-[260px] prose prose-sm max-w-none text-[#173B26]">
                  {formData.content ? (
                    formData.content.split('\n\n').map((block, idx) => {
                      if (block.startsWith('### ')) {
                        return (
                          <h3 key={idx} className="text-base font-bold text-[#173B26] mt-3 mb-1">
                            {block.replace('### ', '')}
                          </h3>
                        );
                      }
                      if (block.startsWith('## ')) {
                        return (
                          <h2 key={idx} className="text-lg font-bold text-[#173B26] mt-4 mb-1">
                            {block.replace('## ', '')}
                          </h2>
                        );
                      }
                      if (block.startsWith('- ')) {
                        return (
                          <ul key={idx} className="list-disc pl-5 space-y-1 my-2 text-xs">
                            {block.split('\n').map((line, liIdx) => (
                              <li key={liIdx}>{line.replace('- ', '')}</li>
                            ))}
                          </ul>
                        );
                      }
                      return (
                        <p key={idx} className="text-xs text-[#4B5563] leading-relaxed my-2">
                          {block}
                        </p>
                      );
                    })
                  ) : (
                    <p className="text-xs text-[#9CA3AF] italic">
                      No technical content written yet. Switch to &quot;Write&quot; tab to add content.
                    </p>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* ================= RIGHT COLUMN: SETTINGS & METADATA (4 COLS) ================= */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Category Card */}
            <div className="bg-white rounded-xl border border-[#DCE5DD] p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#173B26] uppercase tracking-wider">
                  Service Category
                </label>
                <button
                  type="button"
                  onClick={() => setShowAddCategory(!showAddCategory)}
                  className="text-[11px] font-semibold text-[#216B35] hover:text-[#174D28] flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Category</span>
                </button>
              </div>

              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-[#DCE5DD] text-xs font-medium text-[#173B26] bg-white focus:border-[#216B35] focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* Inline Add Category Form */}
              {showAddCategory && (
                <div className="p-3 bg-emerald-50/70 rounded-lg border border-emerald-200 space-y-2 animate-in fade-in duration-150">
                  <span className="text-[11px] font-bold text-emerald-900 block">
                    Create New Category
                  </span>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      placeholder="e.g. Wildlife Analytics"
                      className="flex-1 p-1.5 text-xs bg-white rounded border border-emerald-300 focus:border-emerald-600 focus:outline-none"
                    />
                    <button
                      type="button"
                      disabled={addingCategory || !newCatName.trim()}
                      onClick={handleCreateCategory}
                      className="btn-primary text-xs px-2.5 py-1.5 shrink-0 disabled:opacity-50"
                    >
                      {addingCategory ? 'Adding...' : 'Add'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Featured Image Card */}
            <div className="bg-white rounded-xl border border-[#DCE5DD] p-4 sm:p-5 shadow-xs space-y-3">
              <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider">
                Featured Cover Image <span className="text-red-500">*</span>
              </label>

              {/* Image Preview */}
              {formData.featuredImage && (
                <div className="relative rounded-lg overflow-hidden border border-[#DCE5DD] h-40 bg-slate-100">
                  <img
                    src={formData.featuredImage}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded font-mono">
                    Cloudinary CDN
                  </div>
                </div>
              )}

              {/* Direct Upload Button */}
              <label className="w-full inline-flex items-center justify-center gap-2 bg-[#F5F8F3] hover:bg-[#EAEFE8] text-[#216B35] font-semibold text-xs px-4 py-2.5 rounded-lg border border-[#216B35]/30 cursor-pointer transition-colors shadow-2xs">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Image File (Cloudinary)</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    if (onUploadImage) {
                      const url = await onUploadImage(e, 'service');
                      if (url) {
                        setFormData((prev) => ({ ...prev, featuredImage: url }));
                      }
                    }
                  }}
                />
              </label>

              {/* Manual URL Input */}
              <div>
                <label className="block text-[11px] font-semibold text-[#68756D] mb-1">
                  Or paste direct image URL:
                </label>
                <input
                  type="text"
                  value={formData.featuredImage}
                  onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                  placeholder="https://res.cloudinary.com/..."
                  className="w-full p-2 rounded-lg border border-[#DCE5DD] font-mono text-[11px] text-[#173B26] focus:border-[#216B35] focus:outline-none"
                />
              </div>
            </div>

            {/* SEO & Meta Tags Card */}
            <div className="bg-white rounded-xl border border-[#DCE5DD] p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-1.5 pb-2 border-b border-[#DCE5DD]">
                <Globe className="w-4 h-4 text-[#216B35]" />
                <h4 className="text-xs font-bold text-[#173B26] uppercase tracking-wider">
                  SEO &amp; Search Optimization
                </h4>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#173B26] mb-1">
                  SEO Meta Title
                </label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  placeholder={formData.title ? `${formData.title} | KR Environ Solutions` : 'Custom Meta Title...'}
                  className="w-full p-2 rounded-lg border border-[#DCE5DD] text-xs text-[#173B26] focus:border-[#216B35] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#173B26] mb-1">
                  Meta Description
                </label>
                <textarea
                  rows={3}
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  placeholder="Appears in Google search results and WhatsApp link shares..."
                  className="w-full p-2 rounded-lg border border-[#DCE5DD] text-xs text-[#4B5563] focus:border-[#216B35] focus:outline-none"
                />
              </div>

              {/* Google Search Snippet Preview */}
              <div className="p-3 bg-[#F5F8F3] rounded-lg border border-[#DCE5DD] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#216B35] tracking-wider block">
                  Search Engine Preview
                </span>
                <div className="text-xs text-[#1a0dab] font-semibold truncate hover:underline cursor-pointer">
                  {formData.seoTitle || formData.title || 'Service Title'} | KR Environ Solutions
                </div>
                <div className="text-[11px] text-[#006621] font-mono truncate">
                  https://krenviron.com/services/{formData.slug || 'slug'}
                </div>
                <p className="text-[11px] text-[#545454] line-clamp-2 leading-tight">
                  {formData.metaDescription || formData.shortDescription || 'KR Environ Solutions advanced wildlife technology and ecological engineering solutions.'}
                </p>
              </div>
            </div>

            {/* Quick Actions Footer Box */}
            <div className="p-4 bg-white rounded-xl border border-[#DCE5DD] shadow-xs space-y-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={saving}
                className="btn-primary w-full py-2.5 text-xs font-semibold flex items-center justify-center gap-2 shadow-sm"
              >
                {saving ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving to MongoDB Atlas...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Service &amp; Publish</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onCancel}
                className="w-full py-2 rounded-lg border border-[#DCE5DD] hover:bg-[#F5F8F3] text-xs text-[#4B5563] font-medium transition-colors"
              >
                Cancel and Return to Services List
              </button>
            </div>

          </div>

        </form>
      </div>
    </div>
  );
}

