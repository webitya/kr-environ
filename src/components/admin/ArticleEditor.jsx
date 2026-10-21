'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Check,
  Eye,
  Code,
  FileText,
  Upload,
  Globe,
  Tag,
  Search,
  FileJson,
  Plus,
  FolderPlus,
  X,
  Copy,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough as StrikeIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Table as TableIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  Eraser,
  Undo,
  Redo,
  Subscript as SubIcon,
  Superscript as SuperIcon,
  Maximize2,
  Minimize2,
  Minus,
  Info,
  ExternalLink
} from 'lucide-react';

function slugify(text) {
  return (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function generateSchemaJson({ title, excerpt, metaDescription, featuredImage, slug, author, date, focusKeywords }) {
  const cleanSlug = slug || slugify(title) || 'article';
  const cleanImage = featuredImage
    ? (featuredImage.startsWith('http') ? featuredImage : `https://krenviron.com${featuredImage}`)
    : 'https://krenviron.com/img4.jpeg';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://krenviron.com/blog/${cleanSlug}`
    },
    'headline': title || 'Untitled Article',
    'description': metaDescription || excerpt || '',
    'image': [cleanImage],
    'datePublished': date || new Date().toISOString().split('T')[0],
    'dateModified': new Date().toISOString().split('T')[0],
    'author': {
      '@type': 'Person',
      'name': author || 'Sarika Gupta, Proprietor'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'KR Environ Solutions',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://krenviron.com/logo.jpeg'
      }
    },
    'keywords': focusKeywords || ''
  };
  return JSON.stringify(schema, null, 2);
}

export default function ArticleEditor({
  initialBlog,
  onSave,
  onCancel,
  onUploadImage
}) {
  const [formData, setFormData] = useState({
    id: initialBlog?.id || '',
    title: initialBlog?.title || '',
    slug: initialBlog?.slug || '',
    category: initialBlog?.category || 'Wildlife Technology',
    author: initialBlog?.author || 'Sarika Gupta, Proprietor',
    date: initialBlog?.date || new Date().toISOString().split('T')[0],
    excerpt: initialBlog?.excerpt || '',
    featuredImage: initialBlog?.featuredImage || '/img4.jpeg',
    status: initialBlog?.status || 'published',
    content: initialBlog?.content || '',
    metaTitle: initialBlog?.metaTitle || '',
    metaDescription: initialBlog?.metaDescription || '',
    focusKeywords: initialBlog?.focusKeywords || '',
    schemaMarkup: initialBlog?.schemaMarkup || ''
  });

  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'seo' | 'schema' | 'preview'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [autoSchema, setAutoSchema] = useState(true);
  const [autoSlug, setAutoSlug] = useState(!initialBlog?.slug);
  const [htmlMode, setHtmlMode] = useState(false);
  const [rawHtml, setRawHtml] = useState(initialBlog?.content || '');

  // Persistent categories state loaded from MongoDB Atlas
  const [categories, setCategories] = useState([
    'Wildlife Technology',
    'Field Conservation',
    'Rescue Operations',
    'Agricultural Security',
    'Sensors & Deterrence'
  ]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [savingCategory, setSavingCategory] = useState(false);
  const [categoryMsg, setCategoryMsg] = useState('');

  // Fetch all persistent categories from MongoDB on mount
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch('/api/categories');
        if (res.ok) {
          const data = await res.json();
          if (data.categories && Array.isArray(data.categories)) {
            const merged = Array.from(new Set([
              ...data.categories,
              formData.category || 'Wildlife Technology'
            ])).filter(Boolean).sort();
            setCategories(merged);
          }
        }
      } catch (err) {
        console.error('Error loading categories:', err);
      }
    }
    loadCategories();
  }, []);

  const editorRef = useRef(null);

  // Initialize editor content once mounted
  useEffect(() => {
    if (editorRef.current && !htmlMode) {
      if (editorRef.current.innerHTML !== (formData.content || '')) {
        editorRef.current.innerHTML = formData.content || '';
      }
    }
  }, [htmlMode]);

  // Synchronize auto slug when title changes
  useEffect(() => {
    if (autoSlug && formData.title) {
      const generatedSlug = slugify(formData.title);
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, autoSlug]);

  // Auto-fill Meta Title if empty
  useEffect(() => {
    if (!formData.metaTitle && formData.title) {
      setFormData((prev) => ({
        ...prev,
        metaTitle: `${prev.title} | KR Environ Solutions`
      }));
    }
  }, [formData.title]);

  // Auto-fill Meta Description if empty
  useEffect(() => {
    if (!formData.metaDescription && formData.excerpt) {
      setFormData((prev) => ({
        ...prev,
        metaDescription: prev.excerpt.slice(0, 155)
      }));
    }
  }, [formData.excerpt]);

  // Auto-generate Schema when relevant fields update
  useEffect(() => {
    if (autoSchema) {
      const generated = generateSchemaJson(formData);
      setFormData((prev) => ({ ...prev, schemaMarkup: generated }));
    }
  }, [
    autoSchema,
    formData.title,
    formData.excerpt,
    formData.metaDescription,
    formData.slug,
    formData.featuredImage,
    formData.author,
    formData.date,
    formData.focusKeywords
  ]);

  // Handle rich editor updates
  const handleEditorInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setFormData((prev) => ({ ...prev, content: html }));
      setRawHtml(html);
    }
  };

  // Formatting execution helper
  const exec = (command, value = null) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand(command, false, value);
    handleEditorInput();
  };

  // Insert HTML helper
  const insertHTML = (htmlSnippet) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand('insertHTML', false, htmlSnippet);
    handleEditorInput();
  };

  // Insert Table
  const handleInsertTable = () => {
    const rows = prompt('Number of rows:', '3') || '3';
    const cols = prompt('Number of columns:', '3') || '3';
    const numRows = Math.min(Math.max(parseInt(rows, 10) || 3, 1), 10);
    const numCols = Math.min(Math.max(parseInt(cols, 10) || 3, 1), 6);

    let tableHtml = '<table style="width:100%; border-collapse:collapse; margin:12px 0; border:1px solid #DCE5DD; font-size:13px;">';
    tableHtml += '<thead><tr style="background-color:#F5F8F3;">';
    for (let c = 0; c < numCols; c++) {
      tableHtml += `<th style="border:1px solid #DCE5DD; padding:6px 10px; font-weight:600; text-align:left;">Header ${c + 1}</th>`;
    }
    tableHtml += '</tr></thead><tbody>';
    for (let r = 0; r < numRows; r++) {
      tableHtml += '<tr>';
      for (let c = 0; c < numCols; c++) {
        tableHtml += `<td style="border:1px solid #DCE5DD; padding:6px 10px;">Item ${r + 1}.${c + 1}</td>`;
      }
      tableHtml += '</tr>';
    }
    tableHtml += '</tbody></table><p><br></p>';
    insertHTML(tableHtml);
  };

  // Insert Callout Box
  const handleInsertCallout = (type = 'info') => {
    let styles = 'padding:12px 14px; margin:12px 0; border-left:4px solid; border-radius:3px; font-size:13px;';
    let icon = 'ℹ️';
    let label = 'Note';

    if (type === 'info') {
      styles += ' background:#F5F8F3; border-color:#216B35; color:#174D28;';
      icon = '';
      label = 'Technical Note';
    } else if (type === 'success') {
      styles += ' background:#F5F8F3; border-color:#216B35; color:#173B26;';
      icon = '';
      label = 'Field Result';
    } else if (type === 'warning') {
      styles += ' background:#FFF9F0; border-color:#D97706; color:#92400E;';
      icon = '';
      label = 'Caution';
    } else if (type === 'tip') {
      styles += ' background:#F3F4F6; border-color:#4B5563; color:#1F2937;';
      icon = '';
      label = 'Pro Tip';
    }

    const html = `<div style="${styles}"><strong>${label}:</strong> Insert your important contextual information, field observation or recommendation here.</div><p><br></p>`;
    insertHTML(html);
  };

  // Insert Link
  const handleInsertLink = () => {
    const url = prompt('Enter URL (https://...):', 'https://');
    if (url && url !== 'https://') {
      exec('createLink', url);
    }
  };

  // Insert Image URL
  const handleInsertImage = () => {
    const url = prompt('Enter image URL (/img4.jpeg or full web address):', '/img4.jpeg');
    if (url) {
      const alt = prompt('Image descriptive alt text for SEO:', formData.title || 'Field deployment');
      const imgHtml = `<figure style="margin:16px 0; text-align:center;"><img src="${url}" alt="${alt || 'Image'}" style="max-width:100%; height:auto; border-radius:4px; border:1px solid #DCE5DD; display:inline-block;" /><figcaption style="font-size:11px; color:#68756D; margin-top:4px;">${alt || ''}</figcaption></figure><p><br></p>`;
      insertHTML(imgHtml);
    }
  };

  // Word count & read time statistics
  const textContent = (formData.content || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = textContent ? textContent.split(/\s+/).length : 0;
  const charCount = textContent.length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  // Focus keyword checker
  const keywordsList = (formData.focusKeywords || '')
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean);

  const keywordChecks = keywordsList.map((kw) => {
    const kwLower = kw.toLowerCase();
    const inTitle = (formData.title || '').toLowerCase().includes(kwLower);
    const inMeta = (formData.metaDescription || '').toLowerCase().includes(kwLower);
    const inContent = textContent.toLowerCase().includes(kwLower);
    const contentMatches = (textContent.toLowerCase().match(new RegExp(kwLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    return { kw, inTitle, inMeta, inContent, count: contentMatches };
  });

  // Handle adding new custom category and persisting directly to MongoDB
  const handleAddCategory = async (e) => {
    if (e) e.preventDefault();
    const trimmed = newCategoryName.trim();
    if (!trimmed) {
      alert('Please enter a category name');
      return;
    }
    setSavingCategory(true);
    setCategoryMsg('');
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save category');
      }

      setCategories((prev) => {
        const set = new Set([...prev, trimmed]);
        return Array.from(set).sort();
      });

      setFormData((prev) => ({ ...prev, category: trimmed }));
      setNewCategoryName('');
      setCategoryMsg(`"${trimmed}" saved!`);
      setTimeout(() => {
        setShowCategoryModal(false);
        setCategoryMsg('');
      }, 700);
    } catch (err) {
      alert(err.message || 'Could not save category');
    } finally {
      setSavingCategory(false);
    }
  };

  // Handle Save
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter an article title');
      return;
    }
    setSaving(true);
    try {
      const finalData = {
        ...formData,
        content: htmlMode ? rawHtml : (editorRef.current ? editorRef.current.innerHTML : formData.content)
      };
      await onSave(finalData);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // Copy Schema to Clipboard
  const handleCopySchema = () => {
    navigator.clipboard.writeText(formData.schemaMarkup);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className={`w-full flex flex-col bg-[#F5F8F3] min-h-screen text-[#4B5563] ${isFullscreen ? 'fixed inset-0 z-50 overflow-y-auto bg-white p-2 sm:p-4' : ''}`}>
      {/* ================= TOP ACTION BAR ================= */}
      <div className="bg-white border-b border-[#DCE5DD] px-2 py-1.5 sticky top-0 z-30 flex flex-wrap items-center justify-between gap-2 shadow-xs rounded-sm">
        <div className="flex items-center gap-1.5 min-w-0">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs text-[#173B26] hover:bg-[#F5F8F3] border border-[#DCE5DD] transition-colors"
            title="Back to Article List"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <span className="text-[#DCE5DD]">|</span>

          <span className="text-xs font-semibold text-[#173B26] truncate max-w-xs sm:max-w-md">
            {formData.id ? `Editing: ${formData.title || 'Untitled'}` : 'Create New Article'}
          </span>

          <span className="text-[10px] bg-[#F5F8F3] text-[#216B35] border border-[#216B35]/20 px-1.5 py-0.2 rounded font-medium shrink-0">
            {wordCount} words • {readTime} min read
          </span>
        </div>

        {/* View Switchers & Save */}
        <div className="flex items-center gap-1">
          {/* Navigation Tabs */}
          <div className="flex items-center bg-[#F5F8F3] p-0.5 rounded border border-[#DCE5DD]">
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`px-2 py-0.5 rounded text-xs flex items-center gap-1 transition-all ${
                activeTab === 'editor'
                  ? 'bg-white text-[#173B26] font-semibold shadow-xs'
                  : 'text-[#68756D] hover:text-[#173B26]'
              }`}
            >
              <FileText className="w-3 h-3" />
              <span>Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('seo')}
              className={`px-2 py-0.5 rounded text-xs flex items-center gap-1 transition-all ${
                activeTab === 'seo'
                  ? 'bg-white text-[#173B26] font-semibold shadow-xs'
                  : 'text-[#68756D] hover:text-[#173B26]'
              }`}
            >
              <Search className="w-3 h-3" />
              <span>SEO & Meta</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('schema')}
              className={`px-2 py-0.5 rounded text-xs flex items-center gap-1 transition-all ${
                activeTab === 'schema'
                  ? 'bg-white text-[#173B26] font-semibold shadow-xs'
                  : 'text-[#68756D] hover:text-[#173B26]'
              }`}
            >
              <FileJson className="w-3 h-3 text-emerald-600" />
              <span>Schema JSON</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-2 py-0.5 rounded text-xs flex items-center gap-1 transition-all ${
                activeTab === 'preview'
                  ? 'bg-white text-[#173B26] font-semibold shadow-xs'
                  : 'text-[#68756D] hover:text-[#173B26]'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Preview</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1 rounded text-[#4B5563] hover:bg-[#F5F8F3] border border-[#DCE5DD]"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Editor'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex items-center gap-1 bg-[#216B35] hover:bg-[#174D28] text-white px-3 py-1 rounded text-xs font-semibold shadow-xs transition-colors disabled:opacity-50"
          >
            {saving ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>{saving ? 'Saving...' : 'Save & Publish'}</span>
          </button>
        </div>
      </div>

      {/* ================= TAB 1: MS WORD STYLE FULL-WIDTH EDITOR ================= */}
      {activeTab === 'editor' && (
        <div className="w-full flex-1 flex flex-col gap-1.5 py-1">
          {/* Quick Header Details: Title & Category */}
          <div className="bg-white border border-[#DCE5DD] p-2 rounded shadow-xs flex flex-wrap items-center gap-2">
            <div className="flex-1 min-w-[240px]">
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter Article Title here (e.g. Human-Wildlife Conflict Mitigation: How ANIDERS is Transforming Borders)..."
                className="w-full text-sm sm:text-base font-semibold text-[#173B26] px-2 py-1 rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
              <div className="flex items-center gap-1">
                <select
                  value={formData.category}
                  onChange={(e) => {
                    if (e.target.value === '__ADD_NEW__') {
                      setShowCategoryModal(true);
                    } else {
                      setFormData({ ...formData, category: e.target.value });
                    }
                  }}
                  className="text-xs px-2 py-1 rounded border border-[#DCE5DD] text-[#173B26] font-medium bg-white focus:outline-none focus:border-[#216B35]"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                  <option value="__ADD_NEW__" className="text-emerald-700 font-bold bg-emerald-50">
                    + Add Custom Category...
                  </option>
                </select>

                <button
                  type="button"
                  onClick={() => setShowCategoryModal(true)}
                  className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded border border-emerald-600/30 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 font-semibold transition-colors"
                  title="Add custom category & save to database"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Category</span>
                </button>
              </div>

              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="text-xs px-2 py-1 rounded border border-[#DCE5DD] text-[#216B35] font-medium bg-white focus:outline-none"
              >
                <option value="published">Status: Published</option>
                <option value="draft">Status: Draft</option>
              </select>
            </div>
          </div>

          {/* ================= MS WORD FULL RIBBON TOOLBAR ================= */}
          <div className="bg-white border border-[#DCE5DD] rounded shadow-xs p-1 flex flex-wrap items-center gap-1 sticky top-[42px] z-20">
            {/* History Controls */}
            <div className="flex items-center gap-0.5 pr-1 border-r border-[#DCE5DD]">
              <button
                type="button"
                onClick={() => exec('undo')}
                className="p-1 rounded text-[#4B5563] hover:bg-[#F5F8F3] hover:text-[#173B26]"
                title="Undo (Ctrl+Z)"
              >
                <Undo className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => exec('redo')}
                className="p-1 rounded text-[#4B5563] hover:bg-[#F5F8F3] hover:text-[#173B26]"
                title="Redo (Ctrl+Y)"
              >
                <Redo className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Paragraph / Heading Styles */}
            <div className="flex items-center gap-0.5 pr-1 border-r border-[#DCE5DD]">
              <select
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === 'p') exec('formatBlock', '<p>');
                  else if (val === 'h1') exec('formatBlock', '<h1>');
                  else if (val === 'h2') exec('formatBlock', '<h2>');
                  else if (val === 'h3') exec('formatBlock', '<h3>');
                  else if (val === 'h4') exec('formatBlock', '<h4>');
                  else if (val === 'blockquote') exec('formatBlock', '<blockquote>');
                  else if (val === 'pre') exec('formatBlock', '<pre>');
                }}
                className="text-xs px-1.5 py-0.5 rounded border border-[#DCE5DD] text-[#173B26] bg-[#F5F8F3] font-medium focus:outline-none"
                title="Paragraph Style"
              >
                <option value="p">Paragraph</option>
                <option value="h1">Heading 1 (H1)</option>
                <option value="h2">Heading 2 (H2)</option>
                <option value="h3">Heading 3 (H3)</option>
                <option value="h4">Heading 4 (H4)</option>
                <option value="blockquote">Quote Block</option>
                <option value="pre">Code / Monospace</option>
              </select>

              <select
                onChange={(e) => exec('fontSize', e.target.value)}
                className="text-xs px-1.5 py-0.5 rounded border border-[#DCE5DD] text-[#4B5563] bg-[#F5F8F3] focus:outline-none"
                title="Font Size"
              >
                <option value="3">14px (Normal)</option>
                <option value="1">11px (Small)</option>
                <option value="2">12px</option>
                <option value="4">16px (Medium)</option>
                <option value="5">18px (Large)</option>
                <option value="6">24px (X-Large)</option>
                <option value="7">32px (Huge)</option>
              </select>
            </div>

            {/* Character Formats */}
            <div className="flex items-center gap-0.5 pr-1 border-r border-[#DCE5DD]">
              <button
                type="button"
                onClick={() => exec('bold')}
                className="p-1 rounded text-[#4B5563] hover:bg-[#F5F8F3] hover:text-[#173B26]"
                title="Bold (Ctrl+B)"
              >
                <Bold className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => exec('italic')}
                className="p-1 rounded text-[#4B5563] hover:bg-[#F5F8F3] hover:text-[#173B26]"
                title="Italic (Ctrl+I)"
              >
                <Italic className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => exec('underline')}
                className="p-1 rounded text-[#4B5563] hover:bg-[#F5F8F3] hover:text-[#173B26]"
                title="Underline (Ctrl+U)"
              >
                <UnderlineIcon className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => exec('strikeThrough')}
                className="p-1 rounded text-[#4B5563] hover:bg-[#F5F8F3] hover:text-[#173B26]"
                title="Strikethrough"
              >
                <StrikeIcon className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => exec('subscript')}
                className="p-1 rounded text-[#4B5563] hover:bg-[#F5F8F3] hover:text-[#173B26]"
                title="Subscript (x₂)"
              >
                <SubIcon className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => exec('superscript')}
                className="p-1 rounded text-[#4B5563] hover:bg-[#F5F8F3] hover:text-[#173B26]"
                title="Superscript (x²)"
              >
                <SuperIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Color Palettes */}
            <div className="flex items-center gap-1 pr-1 border-r border-[#DCE5DD]">
              <div className="flex items-center gap-0.5" title="Text Color">
                <span className="text-[10px] text-[#68756D] font-medium">A:</span>
                <input
                  type="color"
                  defaultValue="#173B26"
                  onChange={(e) => exec('foreColor', e.target.value)}
                  className="w-4 h-4 p-0 rounded border border-[#DCE5DD] cursor-pointer"
                  title="Text Color"
                />
              </div>

              <div className="flex items-center gap-0.5" title="Highlight Color">
                <span className="text-[10px] text-[#68756D] font-medium">BG:</span>
                <input
                  type="color"
                  defaultValue="#F5F8F3"
                  onChange={(e) => exec('hiliteColor', e.target.value)}
                  className="w-4 h-4 p-0 rounded border border-[#DCE5DD] cursor-pointer"
                  title="Highlight Color"
                />
              </div>

              <button
                type="button"
                onClick={() => exec('removeFormat')}
                className="p-1 rounded text-[#4B5563] hover:bg-[#F5F8F3]"
                title="Clear Formatting"
              >
                <Eraser className="w-3.5 h-3.5 text-red-500" />
              </button>
            </div>

            {/* Alignment */}
            <div className="flex items-center gap-0.5 pr-1 border-r border-[#DCE5DD]">
              <button
                type="button"
                onClick={() => exec('justifyLeft')}
                className="p-1 rounded text-[#4B5563] hover:bg-[#F5F8F3]"
                title="Align Left"
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => exec('justifyCenter')}
                className="p-1 rounded text-[#4B5563] hover:bg-[#F5F8F3]"
                title="Align Center"
              >
                <AlignCenter className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => exec('justifyRight')}
                className="p-1 rounded text-[#4B5563] hover:bg-[#F5F8F3]"
                title="Align Right"
              >
                <AlignRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => exec('justifyFull')}
                className="p-1 rounded text-[#4B5563] hover:bg-[#F5F8F3]"
                title="Justify"
              >
                <AlignJustify className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Lists & Indent */}
            <div className="flex items-center gap-0.5 pr-1 border-r border-[#DCE5DD]">
              <button
                type="button"
                onClick={() => exec('insertUnorderedList')}
                className="p-1 rounded text-[#4B5563] hover:bg-[#F5F8F3]"
                title="Bulleted List"
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => exec('insertOrderedList')}
                className="p-1 rounded text-[#4B5563] hover:bg-[#F5F8F3]"
                title="Numbered List"
              >
                <ListOrdered className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => exec('insertHorizontalRule')}
                className="p-1 rounded text-[#4B5563] hover:bg-[#F5F8F3]"
                title="Horizontal Divider Line"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Word Inserts: Link, Image, Table, Callouts */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleInsertLink}
                className="p-1 rounded text-[#216B35] hover:bg-[#F5F8F3]"
                title="Insert Web Link"
              >
                <LinkIcon className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleInsertImage}
                className="p-1 rounded text-[#216B35] hover:bg-[#F5F8F3]"
                title="Insert Image by Web URL"
              >
                <ImageIcon className="w-3.5 h-3.5" />
              </button>

              <label
                className="p-1 rounded text-[#216B35] hover:bg-[#F5F8F3] cursor-pointer inline-flex items-center"
                title="Upload & Insert Image from Computer"
              >
                <Upload className="w-3.5 h-3.5" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    if (onUploadImage) {
                      const url = await onUploadImage(e, 'blog');
                      if (url) {
                        const imgHtml = `<figure style="margin:16px 0; text-align:center;"><img src="${url}" alt="Article figure" style="max-width:100%; height:auto; border-radius:4px; border:1px solid #DCE5DD; display:inline-block;" /></figure><p><br></p>`;
                        insertHTML(imgHtml);
                      }
                    }
                  }}
                />
              </label>

              <button
                type="button"
                onClick={handleInsertTable}
                className="inline-flex items-center gap-0.5 p-1 rounded text-[#173B26] hover:bg-[#F5F8F3] text-[11px] font-medium"
                title="Insert Word-Style Table"
              >
                <TableIcon className="w-3.5 h-3.5 text-[#216B35]" />
                <span className="hidden md:inline">Table</span>
              </button>

              {/* Callouts Dropdown */}
              <div className="flex items-center gap-0.5 bg-[#F5F8F3] px-1 py-0.5 rounded border border-[#DCE5DD]">
                <span className="text-[10px] text-[#68756D] font-medium">Box:</span>
                <button
                  type="button"
                  onClick={() => handleInsertCallout('info')}
                  className="text-[10px] text-[#216B35] hover:underline px-0.5"
                  title="Insert Blue Note Box"
                >
                  Info
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertCallout('success')}
                  className="text-[10px] text-[#216B35] hover:underline px-0.5"
                  title="Insert Green Result Box"
                >
                  Result
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertCallout('warning')}
                  className="text-[10px] text-amber-600 hover:underline px-0.5"
                  title="Insert Warning Box"
                >
                  Alert
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertCallout('tip')}
                  className="text-[10px] text-gray-700 hover:underline px-0.5"
                  title="Insert Tip Box"
                >
                  Tip
                </button>
              </div>

              {/* Source HTML Toggle */}
              <button
                type="button"
                onClick={() => {
                  if (!htmlMode) {
                    if (editorRef.current) setRawHtml(editorRef.current.innerHTML);
                    setHtmlMode(true);
                  } else {
                    setFormData((prev) => ({ ...prev, content: rawHtml }));
                    setHtmlMode(false);
                  }
                }}
                className={`p-1 rounded text-xs flex items-center gap-0.5 border ${
                  htmlMode ? 'bg-[#173B26] text-white border-[#173B26]' : 'border-[#DCE5DD] text-[#4B5563] hover:bg-[#F5F8F3]'
                }`}
                title="Toggle HTML Source Code"
              >
                <Code className="w-3.5 h-3.5" />
                <span className="text-[10px]">{htmlMode ? 'Visual' : 'HTML'}</span>
              </button>
            </div>
          </div>

          {/* ================= EDITING CANVAS ================= */}
          <div className="flex-1 w-full bg-white border border-[#DCE5DD] rounded shadow-sm overflow-hidden flex flex-col">
            {htmlMode ? (
              <textarea
                value={rawHtml}
                onChange={(e) => {
                  setRawHtml(e.target.value);
                  setFormData((prev) => ({ ...prev, content: e.target.value }));
                }}
                className="w-full flex-1 p-4 font-mono text-xs text-slate-800 bg-slate-50 focus:outline-none min-h-[460px]"
                placeholder="HTML Source code..."
              />
            ) : (
              <div
                ref={editorRef}
                contentEditable
                onInput={handleEditorInput}
                className="w-full flex-1 p-4 sm:p-6 text-sm text-[#173B26] focus:outline-none min-h-[460px] leading-relaxed prose max-w-none"
                style={{ minHeight: '460px' }}
                data-placeholder="Start writing your in-depth research, wildlife study, or tech deployment article here..."
              />
            )}

            {/* Bottom Status Bar */}
            <div className="bg-[#F5F8F3] border-t border-[#DCE5DD] px-3 py-1 flex flex-wrap items-center justify-between text-[11px] text-[#68756D]">
              <div className="flex items-center gap-3">
                <span>Words: <strong>{wordCount}</strong></span>
                <span>Characters: <strong>{charCount}</strong></span>
                <span>Reading Time: <strong>~{readTime} min</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span>Slug: <strong className="font-mono text-[#216B35]">/blog/{formData.slug || 'slug'}</strong></span>
                <span className="text-[#216B35]">● MS Word WYSIWYG Ready</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: SEO & METADATA SUITE ================= */}
      {activeTab === 'seo' && (
        <div className="w-full flex-1 py-1 space-y-2">
          {/* SEO Health Card */}
          <div className="bg-white border border-[#DCE5DD] p-3 rounded shadow-xs">
            <h3 className="text-xs font-bold text-[#173B26] mb-1 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-[#216B35]" />
              <span>Search Engine Optimization & Google Preview Suite</span>
            </h3>
            <p className="text-[11px] text-[#68756D]">
              Configure high-ranking search metadata, URL permalink, focus search keywords, and review your live Google SERP snippet.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {/* Left Column: Form Fields */}
            <div className="bg-white border border-[#DCE5DD] p-3 rounded shadow-xs space-y-2.5">
              {/* Article Category */}
              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <label className="text-xs font-semibold text-[#173B26]">
                    Article Category *
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowCategoryModal(true)}
                    className="text-[10px] text-emerald-700 hover:text-emerald-900 font-semibold inline-flex items-center gap-0.5"
                  >
                    <Plus className="w-3 h-3" />
                    <span>+ Add Custom Category</span>
                  </button>
                </div>
                <select
                  value={formData.category}
                  onChange={(e) => {
                    if (e.target.value === '__ADD_NEW__') {
                      setShowCategoryModal(true);
                    } else {
                      setFormData({ ...formData, category: e.target.value });
                    }
                  }}
                  className="w-full p-1.5 text-xs rounded border border-[#DCE5DD] text-[#173B26] font-medium bg-white focus:outline-none focus:border-[#216B35]"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                  <option value="__ADD_NEW__" className="text-emerald-700 font-bold bg-emerald-50">
                    + Add Custom Category...
                  </option>
                </select>
              </div>

              {/* Focus Keywords */}
              <div>
                <label className="block text-xs font-semibold text-[#173B26] mb-0.5">
                  Focus Keywords (comma-separated) *
                </label>
                <input
                  type="text"
                  value={formData.focusKeywords}
                  onChange={(e) => setFormData({ ...formData, focusKeywords: e.target.value })}
                  placeholder="e.g. human wildlife conflict, ANIDERS sensor, wildlife deterrence india"
                  className="w-full p-1.5 text-xs rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                />
                <p className="text-[10px] text-[#68756D] mt-0.5">
                  Used by search engines to index primary themes and embedded automatically into JSON-LD Schema.
                </p>

                {/* Keyword Tag Chips */}
                {keywordsList.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {keywordsList.map((kw, i) => (
                      <span key={i} className="text-[10px] bg-[#F5F8F3] text-[#216B35] border border-[#216B35]/20 px-1.5 py-0.2 rounded font-medium">
                        #{kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* URL Slug */}
              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <label className="text-xs font-semibold text-[#173B26]">
                    Permalink / URL Slug *
                  </label>
                  <label className="text-[10px] text-[#216B35] flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoSlug}
                      onChange={(e) => setAutoSlug(e.target.checked)}
                      className="rounded"
                    />
                    <span>Auto-sync with Title</span>
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-mono text-[#68756D] bg-[#F5F8F3] px-2 py-1 rounded border border-[#DCE5DD] shrink-0">
                    /blog/
                  </span>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => {
                      setAutoSlug(false);
                      setFormData({ ...formData, slug: slugify(e.target.value) });
                    }}
                    placeholder="article-url-slug"
                    className="flex-1 p-1.5 text-xs font-mono rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                  />
                </div>
              </div>

              {/* Meta Title */}
              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <label className="text-xs font-semibold text-[#173B26]">
                    Meta Title (Browser & Search Heading) *
                  </label>
                  <span className={`text-[10px] font-mono ${formData.metaTitle.length > 60 ? 'text-red-500 font-semibold' : 'text-[#68756D]'}`}>
                    {formData.metaTitle.length} / 60 chars
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  placeholder="Compelling 50-60 character title with primary keyword..."
                  className="w-full p-1.5 text-xs rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                />
              </div>

              {/* Meta Description */}
              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <label className="text-xs font-semibold text-[#173B26]">
                    Meta Description (Google SERP Snippet) *
                  </label>
                  <span className={`text-[10px] font-mono ${formData.metaDescription.length > 160 ? 'text-red-500 font-semibold' : 'text-[#68756D]'}`}>
                    {formData.metaDescription.length} / 160 chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  placeholder="Engaging 140-160 character summary that invites readers to click..."
                  className="w-full p-1.5 text-xs rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                />
              </div>

              {/* Excerpt Lead */}
              <div>
                <label className="block text-xs font-semibold text-[#173B26] mb-0.5">
                  Card Excerpt Summary
                </label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Summary shown on blog listing cards..."
                  className="w-full p-1.5 text-xs rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                />
              </div>

              {/* Featured Image URL */}
              <div>
                <label className="block text-xs font-semibold text-[#173B26] mb-0.5">
                  Featured Image URL (OG / Social Card Image)
                </label>
                <div className="space-y-1.5">
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={formData.featuredImage}
                      onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                      placeholder="/img4.jpeg or Cloudinary URL"
                      className="flex-1 p-1.5 text-xs font-mono rounded border border-[#DCE5DD] focus:outline-none"
                    />
                    <label className="btn-secondary px-2.5 py-1 rounded text-xs cursor-pointer shrink-0 inline-flex items-center gap-1 font-semibold text-[#216B35] border-[#216B35]/40 hover:bg-[#F5F8F3]">
                      <Upload className="w-3 h-3" />
                      <span>Upload (Cloudinary)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          if (onUploadImage) {
                            const uploadedUrl = await onUploadImage(e, 'blog');
                            if (uploadedUrl) {
                              setFormData((prev) => ({ ...prev, featuredImage: uploadedUrl }));
                            }
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {formData.featuredImage && (
                    <div className="flex items-center gap-2 p-1.5 rounded border border-[#DCE5DD] bg-slate-50">
                      <img
                        src={formData.featuredImage}
                        alt="Featured Preview"
                        className="w-12 h-10 object-cover rounded border border-[#DCE5DD]"
                      />
                      <span className="text-[10px] text-[#4B5563] truncate flex-1 font-mono">
                        {formData.featuredImage.includes('cloudinary.com') ? '☁️ Cloudinary CDN: ' + formData.featuredImage : formData.featuredImage}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Live Google Search Result & SEO Checklist */}
            <div className="space-y-2">
              {/* Google SERP Card Preview */}
              <div className="bg-white border border-[#DCE5DD] p-3 rounded shadow-xs">
                <span className="text-[10px] font-bold text-[#68756D] uppercase tracking-wider block mb-2">
                  Google Search Result (Live Snippet Preview)
                </span>

                <div className="border border-slate-200 p-3 rounded bg-white">
                  {/* Google Breadcrumb */}
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-700 font-sans mb-1">
                    <div className="w-4 h-4 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[9px] font-bold">
                      KR
                    </div>
                    <span className="font-medium text-slate-800">KR Environ Solutions</span>
                    <span className="text-slate-400">› blog › {formData.slug || 'article'}</span>
                  </div>

                  {/* Google Blue Title */}
                  <h4 className="text-base text-[#1a0dab] hover:underline font-normal cursor-pointer leading-snug">
                    {formData.metaTitle || formData.title || 'KR Environ Solutions Research & Wildlife Tech Article'}
                  </h4>

                  {/* Google Snippet */}
                  <p className="text-xs text-[#4d5156] font-sans mt-1 leading-relaxed">
                    <span className="text-slate-500">{formData.date} — </span>
                    {formData.metaDescription || formData.excerpt || 'Read how KR Environ Solutions pioneers innovative human-wildlife conflict mitigation technologies across India.'}
                  </p>
                </div>
              </div>

              {/* Keyword Performance & Optimization Checklist */}
              <div className="bg-white border border-[#DCE5DD] p-3 rounded shadow-xs">
                <h4 className="text-xs font-bold text-[#173B26] mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#216B35]" />
                  <span>Keyword Optimization & SEO Checklist</span>
                </h4>

                {keywordChecks.length === 0 ? (
                  <p className="text-[11px] text-[#68756D]">
                    Enter at least one focus keyword above to run real-time title, snippet, and density checks.
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    {keywordChecks.map((item, idx) => (
                      <div key={idx} className="p-2 rounded border border-[#DCE5DD] bg-[#F5F8F3] text-xs">
                        <div className="font-semibold text-[#173B26] mb-1">
                          Keyword: <span className="text-[#216B35]">"{item.kw}"</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1 text-[11px]">
                          <span className={`inline-flex items-center gap-1 ${item.inTitle ? 'text-emerald-700 font-medium' : 'text-slate-400'}`}>
                            {item.inTitle ? '✓ In Title' : '✕ Missing in Title'}
                          </span>
                          <span className={`inline-flex items-center gap-1 ${item.inMeta ? 'text-emerald-700 font-medium' : 'text-slate-400'}`}>
                            {item.inMeta ? '✓ In Meta' : '✕ Missing in Meta'}
                          </span>
                          <span className={`inline-flex items-center gap-1 ${item.inContent ? 'text-emerald-700 font-medium' : 'text-slate-400'}`}>
                            {item.inContent ? `✓ In Body (${item.count}×)` : '✕ Missing in Body'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: AUTOMATIC SCHEMA.ORG GENERATOR ================= */}
      {activeTab === 'schema' && (
        <div className="w-full flex-1 py-1 space-y-2">
          <div className="bg-white border border-[#DCE5DD] p-3 rounded shadow-xs flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-bold text-[#173B26] flex items-center gap-1.5">
                <FileJson className="w-3.5 h-3.5 text-emerald-600" />
                <span>Schema.org JSON-LD Structured Data Generator (Automatic)</span>
              </h3>
              <p className="text-[11px] text-[#68756D] mt-0.5">
                Automatically formats article data into Google-compliant <strong className="font-mono text-[#216B35]">BlogPosting</strong> Schema for rich snippets and Google News discovery.
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              <label className="text-[11px] text-[#173B26] font-medium flex items-center gap-1 bg-[#F5F8F3] px-2 py-1 rounded border border-[#DCE5DD] cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoSchema}
                  onChange={(e) => setAutoSchema(e.target.checked)}
                  className="rounded"
                />
                <span>Auto-generate from Article</span>
              </label>

              <button
                type="button"
                onClick={handleCopySchema}
                className="inline-flex items-center gap-1 bg-[#F5F8F3] text-[#216B35] hover:bg-[#E8F0E5] border border-[#216B35]/30 px-2.5 py-1 rounded text-xs font-medium transition-colors"
              >
                {copySuccess ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copySuccess ? 'Copied!' : 'Copy JSON-LD'}</span>
              </button>
            </div>
          </div>

          {/* JSON-LD Editor & Live Code View */}
          <div className="bg-slate-900 border border-slate-800 rounded p-3 text-emerald-400 font-mono text-xs overflow-x-auto shadow-md">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
              <span>application/ld+json Structured Data</span>
              <span>Valid Schema.org format</span>
            </div>
            <textarea
              rows={16}
              value={formData.schemaMarkup}
              onChange={(e) => {
                setAutoSchema(false);
                setFormData({ ...formData, schemaMarkup: e.target.value });
              }}
              className="w-full bg-transparent text-emerald-300 font-mono text-xs focus:outline-none resize-y leading-relaxed"
              spellCheck={false}
            />
          </div>
        </div>
      )}

      {/* ================= TAB 4: ARTICLE READER PREVIEW ================= */}
      {activeTab === 'preview' && (
        <div className="w-full flex-1 py-1">
          <div className="bg-white border border-[#DCE5DD] p-4 sm:p-6 rounded shadow-sm max-w-4xl mx-auto space-y-4">
            <span className="text-[10px] uppercase font-bold text-[#216B35] tracking-wider block">
              {formData.category}
            </span>

            <h1 className="text-xl sm:text-2xl font-bold text-[#173B26] leading-tight">
              {formData.title || 'Untitled Article'}
            </h1>

            <div className="flex items-center gap-3 text-xs text-[#68756D] border-y border-[#DCE5DD] py-2">
              <span>By <strong>{formData.author}</strong></span>
              <span>•</span>
              <span>Published on {formData.date}</span>
              <span>•</span>
              <span>{readTime} min read</span>
            </div>

            {formData.featuredImage && (
              <div className="rounded overflow-hidden border border-[#DCE5DD] max-h-80">
                <img
                  src={formData.featuredImage}
                  alt={formData.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {formData.excerpt && (
              <div className="p-3 rounded bg-[#F5F8F3] border-l-3 border-[#216B35] text-xs sm:text-sm text-[#173B26] italic font-medium">
                "{formData.excerpt}"
              </div>
            )}

            {/* Rich Content Render */}
            <div
              className="prose max-w-none text-xs sm:text-sm text-[#4B5563] leading-relaxed space-y-2 pt-2"
              dangerouslySetInnerHTML={{ __html: formData.content || '<p>No content written yet.</p>' }}
            />
          </div>
        </div>
      )}
      {/* ================= MODAL: ADD CUSTOM CATEGORY ================= */}
      {showCategoryModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => { if (!savingCategory) setShowCategoryModal(false); }}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl border border-[#DCE5DD] w-full max-w-md p-5 relative space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#DCE5DD] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <FolderPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#173B26]">Add Custom Category</h3>
                  <p className="text-[11px] text-[#68756D]">Persists directly into MongoDB Atlas database</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCategoryModal(false)}
                className="text-[#68756D] hover:text-[#173B26] p-1 rounded hover:bg-[#F5F8F3]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#173B26] mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  autoFocus
                  required
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g. Drone Surveillance, Human-Elephant Coexistence..."
                  className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-[#DCE5DD] focus:border-[#216B35] focus:ring-1 focus:ring-[#216B35] focus:outline-none"
                />
                <p className="text-[10px] text-[#68756D] mt-1">
                  Once added, this category is saved permanently in MongoDB and will be available for all future articles.
                </p>
              </div>

              {categoryMsg && (
                <div className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{categoryMsg}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#DCE5DD]">
                <button
                  type="button"
                  disabled={savingCategory}
                  onClick={() => setShowCategoryModal(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#4B5563] hover:bg-[#F5F8F3] border border-[#DCE5DD] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingCategory || !newCategoryName.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#216B35] hover:bg-[#174D28] transition-colors disabled:opacity-50 shadow-xs"
                >
                  {savingCategory ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Plus className="w-3.5 h-3.5" />
                  )}
                  <span>{savingCategory ? 'Saving to Database...' : 'Save & Select Category'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
