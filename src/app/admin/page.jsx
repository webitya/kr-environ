'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Layers, 
  BookOpen, 
  Mail, 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  CheckCircle2, 
  ExternalLink, 
  LogOut, 
  Image as ImageIcon,
  AlertCircle,
  RefreshCw,
  FolderKanban,
  Camera,
  Tv,
  MapPin,
  Calendar,
  ArrowLeft,
  X
} from 'lucide-react';
import ArticleEditor from '@/components/admin/ArticleEditor';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('services'); // 'services' | 'blogs' | 'projects' | 'gallery' | 'videos' | 'enquiries'
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [videos, setVideos] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Article embedded editor state (Right-side full-width embedded)
  const [isEditingBlog, setIsEditingBlog] = useState(false);

  // Modals state
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState({
    id: '',
    title: '',
    slug: '',
    category: 'Wildlife Deterrence & Smart Sensors',
    shortDescription: '',
    featuredImage: '',
    status: 'published',
    content: ''
  });

  const [currentBlog, setCurrentBlog] = useState({
    id: '',
    title: '',
    slug: '',
    category: 'Wildlife Technology',
    author: 'Sarika Gupta, Proprietor',
    date: '',
    excerpt: '',
    featuredImage: '/img4.jpeg',
    status: 'published',
    content: '',
    metaTitle: '',
    metaDescription: '',
    focusKeywords: '',
    schemaMarkup: ''
  });

  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState({
    id: '',
    title: '',
    slug: '',
    location: '',
    category: 'Agricultural Perimeter Security',
    date: '',
    client: '',
    featuredImage: '',
    overview: '',
    results: '',
    status: 'published'
  });

  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [currentGallery, setCurrentGallery] = useState({
    id: '',
    title: '',
    category: 'Field Presence',
    imageUrl: '',
    caption: '',
    displayOrder: 0
  });

  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState({
    id: '',
    title: '',
    category: 'Product Demonstration',
    thumbnail: '',
    embedUrl: '',
    description: '',
    displayOrder: 0
  });

  const [uploadingImage, setUploadingImage] = useState(false);

  // Dynamic Video Categories from database
  const [videoCategories, setVideoCategories] = useState([
    'Product Demonstration',
    'Field Operations',
    'Training & Rescue',
    'Ranger Safety'
  ]);
  const [showAddVideoCategory, setShowAddVideoCategory] = useState(false);
  const [newVideoCategoryName, setNewVideoCategoryName] = useState('');
  const [savingVideoCategory, setSavingVideoCategory] = useState(false);

  // Dynamic Service Categories from database
  const [serviceCategories, setServiceCategories] = useState([
    'Wildlife Deterrence & Smart Sensors',
    'Perimeter Defense & Checkpoints',
    'Capture & Rescue Technology',
    'Personnel Protection Gear',
    'Turnkey Field Consultancy'
  ]);
  const [showAddServiceCategory, setShowAddServiceCategory] = useState(false);
  const [newServiceCategoryName, setNewServiceCategoryName] = useState('');
  const [savingServiceCategory, setSavingServiceCategory] = useState(false);

  // Dynamic Gallery Categories from database
  const [galleryCategories, setGalleryCategories] = useState([
    'Field Presence',
    'Government Partnership',
    'Field Operations',
    'Credentials'
  ]);
  const [showAddGalleryCategory, setShowAddGalleryCategory] = useState(false);
  const [newGalleryCategoryName, setNewGalleryCategoryName] = useState('');
  const [savingGalleryCategory, setSavingGalleryCategory] = useState(false);

  // Load all dynamic data from MongoDB API routes
  const fetchData = async () => {
    setLoading(true);
    try {
      // Check auth status
      const authRes = await fetch('/api/auth/me');
      if (!authRes.ok) {
        window.location.href = '/admin-login';
        return;
      }

      const [srvRes, blgRes, prjRes, galRes, vidRes, enqRes] = await Promise.all([
        fetch('/api/services'),
        fetch('/api/blogs'),
        fetch('/api/projects'),
        fetch('/api/gallery'),
        fetch('/api/videos'),
        fetch('/api/enquiries')
      ]);

      const [srvData, blgData, prjData, galData, vidData, enqData] = await Promise.all([
        srvRes.json(),
        blgRes.json(),
        prjRes.json(),
        galRes.json(),
        vidRes.json(),
        enqRes.json()
      ]);

      setServices(srvData.services || []);
      setBlogs(blgData.blogs || []);
      setProjects(prjData.projects || []);
      setGallery(galData.gallery || []);
      setVideos(vidData.videos || []);
      setEnquiries(enqData.enquiries || []);

      // Fetch dynamic video categories from MongoDB Atlas
      try {
        const catRes = await fetch('/api/categories?type=video');
        if (catRes.ok) {
          const catData = await catRes.json();
          if (catData.categories && Array.isArray(catData.categories)) {
            const merged = Array.from(new Set([
              ...catData.categories,
              ...(vidData.videos || []).map((v) => v.category).filter(Boolean)
            ])).filter(Boolean).sort();
            setVideoCategories(merged);
          }
        }
      } catch (e) {
        console.error('Error fetching video categories:', e);
      }

      // Fetch dynamic service categories from MongoDB Atlas
      try {
        const srvCatRes = await fetch('/api/categories?type=service');
        if (srvCatRes.ok) {
          const srvCatData = await srvCatRes.json();
          if (srvCatData.categories && Array.isArray(srvCatData.categories)) {
            const merged = Array.from(new Set([
              ...srvCatData.categories,
              ...(srvData.services || []).map((s) => s.category).filter(Boolean)
            ])).filter(Boolean).sort();
            setServiceCategories(merged);
          }
        }
      } catch (e) {
        console.error('Error fetching service categories:', e);
      }

      // Fetch dynamic gallery categories from MongoDB Atlas
      try {
        const galCatRes = await fetch('/api/categories?type=gallery');
        if (galCatRes.ok) {
          const galCatData = await galCatRes.json();
          if (galCatData.categories && Array.isArray(galCatData.categories)) {
            const merged = Array.from(new Set([
              ...galCatData.categories,
              ...(galData.gallery || []).map((g) => g.category).filter(Boolean)
            ])).filter(Boolean).sort();
            setGalleryCategories(merged);
          }
        }
      } catch (e) {
        console.error('Error fetching gallery categories:', e);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error(e);
    }
    window.location.href = '/admin-login';
  };

  // Image Upload handler (guarantees direct Cloudinary upload via /api/upload)
  const handleImageUpload = async (e, targetForm) => {
    const file = e.target.files?.[0];
    if (!file) return null;

    setUploadingImage(true);
    setMessage({ text: 'Uploading image to Cloudinary CDN...', type: 'info' });

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', `kr-environ/${targetForm || 'gallery'}`);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      if (targetForm === 'service') {
        setCurrentService((prev) => ({ ...prev, featuredImage: data.url }));
      } else if (targetForm === 'blog') {
        setCurrentBlog((prev) => ({ ...prev, featuredImage: data.url }));
      } else if (targetForm === 'project') {
        setCurrentProject((prev) => ({ ...prev, featuredImage: data.url }));
      } else if (targetForm === 'gallery') {
        setCurrentGallery((prev) => ({ ...prev, imageUrl: data.url }));
      } else if (targetForm === 'video') {
        setCurrentVideo((prev) => ({ ...prev, thumbnail: data.url }));
      }

      setMessage({ 
        text: `Image uploaded successfully to Cloudinary!`, 
        type: 'success' 
      });
      return data.url;
    } catch (err) {
      setMessage({ text: err.message || 'Image upload failed', type: 'error' });
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  // ---------------- SERVICES HANDLERS ----------------
  const handleCreateServiceCategory = async (e) => {
    if (e) e.preventDefault();
    const trimmed = newServiceCategoryName.trim();
    if (!trimmed) {
      alert('Please enter a category name');
      return;
    }
    setSavingServiceCategory(true);
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed, type: 'service' })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save category');
      }

      setServiceCategories((prev) => {
        const set = new Set([...prev, trimmed]);
        return Array.from(set).sort();
      });

      setCurrentService((prev) => ({ ...prev, category: trimmed }));
      setNewServiceCategoryName('');
      setShowAddServiceCategory(false);
      setMessage({ text: `Service category "${trimmed}" saved to database!`, type: 'success' });
    } catch (err) {
      alert(err.message || 'Could not save category');
    } finally {
      setSavingServiceCategory(false);
    }
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentService)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save service');

      setMessage({ text: `Service '${currentService.title}' saved successfully!`, type: 'success' });
      setServiceModalOpen(false);
      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleDeleteService = async (id, title) => {
    if (!confirm(`Are you sure you want to delete service "${title}"?`)) return;
    try {
      const res = await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setMessage({ text: `Service deleted`, type: 'success' });
      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  // ---------------- BLOGS HANDLERS ----------------
  const handleSaveBlog = async (articleData) => {
    try {
      const dataToSave = articleData || currentBlog;
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save article');

      setMessage({ text: `Article '${dataToSave.title}' saved successfully!`, type: 'success' });
      setIsEditingBlog(false);
      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleDeleteBlog = async (id, title) => {
    if (!confirm(`Are you sure you want to delete article "${title}"?`)) return;
    try {
      const res = await fetch(`/api/blogs?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setMessage({ text: `Article deleted`, type: 'success' });
      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  // ---------------- PROJECTS HANDLERS ----------------
  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentProject)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save project');

      setMessage({ text: `Project '${currentProject.title}' saved successfully!`, type: 'success' });
      setProjectModalOpen(false);
      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleDeleteProject = async (id, title) => {
    if (!confirm(`Are you sure you want to delete project "${title}"?`)) return;
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setMessage({ text: `Project deleted`, type: 'success' });
      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  // ---------------- GALLERY HANDLERS ----------------
  const handleCreateGalleryCategory = async (e) => {
    if (e) e.preventDefault();
    const trimmed = newGalleryCategoryName.trim();
    if (!trimmed) {
      alert('Please enter a category name');
      return;
    }
    setSavingGalleryCategory(true);
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed, type: 'gallery' })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save category');
      }

      setGalleryCategories((prev) => {
        const set = new Set([...prev, trimmed]);
        return Array.from(set).sort();
      });

      setCurrentGallery((prev) => ({ ...prev, category: trimmed }));
      setNewGalleryCategoryName('');
      setShowAddGalleryCategory(false);
      setMessage({ text: `Gallery category "${trimmed}" saved to database!`, type: 'success' });
    } catch (err) {
      alert(err.message || 'Could not save category');
    } finally {
      setSavingGalleryCategory(false);
    }
  };

  const handleSaveGallery = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentGallery)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save gallery photo');

      setMessage({ text: `Gallery photo '${currentGallery.title}' saved successfully!`, type: 'success' });
      setGalleryModalOpen(false);
      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleDeleteGallery = async (id, title) => {
    if (!confirm(`Are you sure you want to delete photo "${title}"?`)) return;
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setMessage({ text: `Gallery photo deleted`, type: 'success' });
      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  // ---------------- VIDEOS HANDLERS ----------------
  const handleCreateVideoCategory = async (e) => {
    if (e) e.preventDefault();
    const trimmed = newVideoCategoryName.trim();
    if (!trimmed) {
      alert('Please enter a category name');
      return;
    }
    setSavingVideoCategory(true);
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed, type: 'video' })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save category');
      }

      setVideoCategories((prev) => {
        const set = new Set([...prev, trimmed]);
        return Array.from(set).sort();
      });

      setCurrentVideo((prev) => ({ ...prev, category: trimmed }));
      setNewVideoCategoryName('');
      setShowAddVideoCategory(false);
      setMessage({ text: `Video category "${trimmed}" saved to database!`, type: 'success' });
    } catch (err) {
      alert(err.message || 'Could not save category');
    } finally {
      setSavingVideoCategory(false);
    }
  };

  const handleSaveVideo = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentVideo)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save video');

      setMessage({ text: `Video '${currentVideo.title}' saved successfully!`, type: 'success' });
      setVideoModalOpen(false);
      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleDeleteVideo = async (id, title) => {
    if (!confirm(`Are you sure you want to delete video "${title}"?`)) return;
    try {
      const res = await fetch(`/api/videos?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setMessage({ text: `Video deleted`, type: 'success' });
      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  // ---------------- ENQUIRIES HANDLERS ----------------
  const handleDeleteEnquiry = async (id, name) => {
    if (!confirm(`Are you sure you want to delete enquiry from "${name}"?`)) return;
    try {
      const res = await fetch(`/api/enquiries?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setMessage({ text: `Enquiry removed`, type: 'success' });
      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const tabTitles = {
    services: 'Services & Products',
    blogs: 'Blogs & Articles',
    projects: 'Projects & Case Studies',
    gallery: 'Photo Gallery',
    videos: 'Tech Videos & Demos',
    enquiries: 'Customer Inquiries'
  };

  const tabCounts = {
    services: services.length,
    blogs: blogs.length,
    projects: projects.length,
    gallery: gallery.length,
    videos: videos.length,
    enquiries: enquiries.length
  };

  const tabDescriptions = {
    services: 'Manage active wildlife technologies, specifications, and service pages.',
    blogs: 'Publish research updates, conflict mitigation articles, and company news.',
    projects: 'Showcase forest department deployments, field results, and case studies.',
    gallery: 'Curate high-resolution field photos and deployment event images.',
    videos: 'Link product demonstrations and YouTube field video overviews.',
    enquiries: 'Review and manage inbound contact inquiries submitted via the live website.'
  };

  const navItems = [
    { id: 'services', label: 'Services & Products', count: services.length, icon: Layers },
    { id: 'blogs', label: 'Blogs & Articles', count: blogs.length, icon: BookOpen },
    { id: 'projects', label: 'Projects & Case Studies', count: projects.length, icon: FolderKanban },
    { id: 'gallery', label: 'Photo Gallery', count: gallery.length, icon: Camera },
    { id: 'videos', label: 'Videos & Tech Demos', count: videos.length, icon: Tv },
    { id: 'enquiries', label: 'Inquiries', count: enquiries.length, icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-[#F5F8F3] flex flex-col md:flex-row w-full font-normal">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-white border-b border-[#DCE5DD] px-2.5 py-1.5 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-2">
          <img
            src="/logo.jpeg"
            alt="KR Environ Solutions Logo"
            className="w-7 h-7 rounded object-contain bg-white border border-[#DCE5DD] p-0.5 shadow-xs shrink-0"
          />
          <div>
            <span className="font-semibold text-xs text-[#173B26] block leading-none">
              KR ENVIRON
            </span>
            <span className="text-[9px] text-[#216B35] font-medium tracking-wide">
              Admin Portal
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href="/"
            target="_blank"
            className="p-1 text-[#216B35] hover:bg-[#F5F8F3] rounded border border-[#216B35]/30"
            title="Live Site"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={fetchData}
            className="p-1 text-[#173B26] hover:bg-[#F5F8F3] rounded border border-[#DCE5DD]"
            title="Refresh Data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleLogout}
            className="p-1 text-red-600 hover:bg-red-50 rounded border border-red-200"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile Sticky Horizontal Tab Strip */}
      <div className="md:hidden bg-white border-b border-[#DCE5DD] px-[3px] py-1 flex items-center gap-1 overflow-x-auto no-scrollbar sticky top-[41px] z-30">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`shrink-0 flex items-center gap-1 px-2 py-0.5 rounded text-xs whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#216B35] text-white font-medium shadow-xs'
                  : 'text-[#4B5563] bg-[#F5F8F3] hover:bg-[#EAEFE8] border border-[#DCE5DD]'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{item.label}</span>
              <span
                className={`text-[9px] px-1 rounded font-medium ${
                  isActive ? 'bg-white/20 text-white' : 'bg-white text-[#68756D]'
                }`}
              >
                {item.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* SIDEBAR NAVIGATION (Desktop & Tablet) */}
      <aside className="hidden md:flex md:w-52 lg:w-56 shrink-0 bg-white border-r border-[#DCE5DD] flex-col md:h-screen md:sticky md:top-0 z-30 shadow-xs">
        {/* Sidebar Brand Header */}
        <div className="p-2 sm:p-2.5 border-b border-[#DCE5DD] flex items-center gap-2">
          <img
            src="/logo.jpeg"
            alt="KR Environ Solutions Logo"
            className="w-7 h-7 rounded object-contain bg-white border border-[#DCE5DD] p-0.5 shadow-xs shrink-0"
          />
          <div className="min-w-0">
            <span className="font-semibold text-xs text-[#173B26] block leading-tight truncate">
              KR Environ Solutions
            </span>
            <span className="text-[10px] text-[#216B35] font-medium tracking-wide block truncate">
              Management Portal
            </span>
          </div>
        </div>

        {/* Sidebar Navigation Items */}
        <div className="p-1.5 flex-1 overflow-y-auto space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id !== 'blogs') setIsEditingBlog(false);
                }}
                className={`w-full flex items-center justify-between px-2 py-1 rounded text-xs transition-all text-left ${
                  isActive
                    ? 'bg-[#216B35] text-white font-medium shadow-xs'
                    : 'text-[#4B5563] hover:text-[#173B26] hover:bg-[#F5F8F3] font-normal'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-[#68756D]'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                <span
                  className={`text-[9px] px-1 py-0.2 rounded font-medium shrink-0 ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#F5F8F3] text-[#68756D] border border-[#DCE5DD]'
                  }`}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-1.5 border-t border-[#DCE5DD] bg-white space-y-1">
          <div className="flex items-center gap-1">
            <button
              onClick={fetchData}
              className="flex-1 inline-flex items-center justify-center gap-1 text-[10px] text-[#173B26] hover:text-[#216B35] font-medium py-1 px-1.5 rounded border border-[#DCE5DD] hover:bg-[#F5F8F3] transition-colors"
              title="Refresh Data from MongoDB Atlas"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Refresh</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="flex-1 inline-flex items-center justify-center gap-1 text-[10px] text-[#216B35] hover:text-[#174D28] font-medium py-1 px-1.5 rounded border border-[#216B35]/30 hover:bg-[#F5F8F3] transition-colors"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="w-full inline-flex items-center justify-center gap-1 text-[10px] text-red-600 hover:text-red-700 font-medium py-1 px-1.5 rounded border border-red-200 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-3 h-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA - MAX 3PX LEFT/RIGHT SPACE */}
      <main className="flex-1 min-w-0 bg-[#F5F8F3] flex flex-col min-h-screen w-full">
        {/* Content Area Sticky Top Bar */}
        <header className="bg-white border-b border-[#DCE5DD] px-[3px] py-1.5 sticky top-[74px] md:top-0 z-20 shadow-xs flex flex-wrap items-center justify-between gap-1.5">
          <div className="flex items-center gap-1.5">
            <h1 className="text-xs sm:text-sm font-semibold text-[#173B26] leading-tight flex items-center gap-1.5">
              <span>{tabTitles[activeTab]}</span>
              <span className="text-[10px] font-normal text-[#216B35] bg-[#F5F8F3] px-1.5 py-0.2 rounded border border-[#216B35]/20">
                {tabCounts[activeTab]} records
              </span>
            </h1>
            <span className="hidden sm:inline text-[#DCE5DD]">|</span>
            <p className="hidden sm:inline text-[10px] text-[#68756D] font-normal truncate max-w-xs">
              {tabDescriptions[activeTab]}
            </p>
          </div>

          <div>
            {activeTab === 'services' && (
              <button
                onClick={() => {
                  setCurrentService({
                    id: '',
                    title: '',
                    slug: '',
                    category: 'Wildlife Deterrence & Smart Sensors',
                    shortDescription: '',
                    featuredImage: '/img4.jpeg',
                    status: 'published',
                    content: ''
                  });
                  setServiceModalOpen(true);
                }}
                className="inline-flex items-center gap-1 bg-[#216B35] hover:bg-[#174D28] text-white px-2 py-0.5 rounded text-xs font-medium shadow-xs transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Add Service</span>
              </button>
            )}

            {activeTab === 'blogs' && (
              isEditingBlog ? (
                <button
                  onClick={() => setIsEditingBlog(false)}
                  className="inline-flex items-center gap-1 bg-[#F5F8F3] hover:bg-[#EAEFE8] text-[#173B26] px-2 py-0.5 rounded text-xs font-medium border border-[#DCE5DD] shadow-xs transition-colors"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Back to Articles</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setCurrentBlog({
                      id: '',
                      title: '',
                      slug: '',
                      category: 'Wildlife Technology',
                      author: 'Sarika Gupta, Proprietor',
                      date: new Date().toISOString().split('T')[0],
                      excerpt: '',
                      featuredImage: '/img4.jpeg',
                      status: 'published',
                      content: '',
                      metaTitle: '',
                      metaDescription: '',
                      focusKeywords: '',
                      schemaMarkup: ''
                    });
                    setIsEditingBlog(true);
                  }}
                  className="inline-flex items-center gap-1 bg-[#216B35] hover:bg-[#174D28] text-white px-2 py-0.5 rounded text-xs font-medium shadow-xs transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  <span>+ Create New Article</span>
                </button>
              )
            )}

            {activeTab === 'projects' && (
              <button
                onClick={() => {
                  setCurrentProject({
                    id: '',
                    title: '',
                    slug: '',
                    location: '',
                    category: 'Agricultural Perimeter Security',
                    date: '',
                    client: '',
                    featuredImage: '/img4.jpeg',
                    overview: '',
                    results: '',
                    status: 'published'
                  });
                  setProjectModalOpen(true);
                }}
                className="inline-flex items-center gap-1 bg-[#216B35] hover:bg-[#174D28] text-white px-2 py-0.5 rounded text-xs font-medium shadow-xs transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Add Project</span>
              </button>
            )}

            {activeTab === 'gallery' && (
              <div className="flex items-center gap-1.5">
                <label className="inline-flex items-center gap-1 bg-[#216B35] hover:bg-[#174D28] text-white px-2.5 py-1 rounded text-xs font-semibold shadow-xs transition-colors cursor-pointer">
                  {uploadingImage ? (
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Upload className="w-3 h-3" />
                  )}
                  <span>{uploadingImage ? 'Uploading...' : 'Upload Image (Cloudinary)'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploadingImage}
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      const url = await handleImageUpload(e, 'gallery');
                      if (url) {
                        const defaultTitle = file?.name?.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'Field Operations Photograph';
                        setCurrentGallery({
                          id: '',
                          title: defaultTitle,
                          category: 'Field Presence',
                          imageUrl: url,
                          caption: '',
                          displayOrder: 0
                        });
                        setGalleryModalOpen(true);
                      }
                    }}
                  />
                </label>
                <button
                  onClick={() => {
                    setCurrentGallery({
                      id: '',
                      title: '',
                      category: 'Field Presence',
                      imageUrl: '/img4.jpeg',
                      caption: '',
                      displayOrder: 0
                    });
                    setGalleryModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1 bg-[#216B35] hover:bg-[#174D28] text-white px-2 py-1 rounded text-xs font-semibold shadow-xs transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Photo</span>
                </button>
              </div>
            )}

            {activeTab === 'videos' && (
              <button
                onClick={() => {
                  setCurrentVideo({
                    id: '',
                    title: '',
                    category: 'Product Demonstration',
                    thumbnail: '/img4.jpeg',
                    embedUrl: 'https://www.youtube.com/embed/sKlBSzb0TUA',
                    description: '',
                    displayOrder: 0
                  });
                  setVideoModalOpen(true);
                }}
                className="inline-flex items-center gap-1 bg-[#216B35] hover:bg-[#174D28] text-white px-2 py-0.5 rounded text-xs font-medium shadow-xs transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Add Video</span>
              </button>
            )}
          </div>
        </header>

        {/* Content Body: Exactly max 3px left/right space */}
        <div className="w-full px-[3px] py-1 flex-1">
          {/* Banner Alert Message */}
          {message.text && (
            <div className={`mb-1.5 p-1.5 rounded flex items-center justify-between text-xs ${
              message.type === 'error'
                ? 'bg-red-50 border border-red-200 text-red-700'
                : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
            }`}>
              <div className="flex items-center gap-1.5">
                {message.type === 'error' ? (
                  <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                )}
                <span>{message.text}</span>
              </div>
              <button
                onClick={() => setMessage({ text: '', type: '' })}
                className="text-[10px] font-semibold hover:underline"
              >
                Dismiss
              </button>
            </div>
          )}

        {/* ================= TAB 1: SERVICES ================= */}
        {activeTab === 'services' && (
          <div className="bg-white rounded border border-[#DCE5DD] shadow-xs overflow-hidden w-full">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#4B5563] min-w-[550px]">
                <thead className="bg-[#F5F8F3] text-[10px] uppercase tracking-wider text-[#173B26] border-b border-[#DCE5DD]">
                  <tr>
                    <th className="px-2 py-1 font-semibold w-10">Image</th>
                    <th className="px-2 py-1 font-semibold">Service / Solution</th>
                    <th className="px-2 py-1 font-semibold">Category</th>
                    <th className="px-2 py-1 font-semibold">Slug URL</th>
                    <th className="px-2 py-1 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCE5DD]">
                  {services.map((srv) => (
                    <tr key={srv.id || srv.slug} className="hover:bg-[#F5F8F3]/50 transition-colors">
                      <td className="px-2 py-1 w-10">
                        <img
                          src={srv.featuredImage || '/img4.jpeg'}
                          alt={srv.title}
                          className="w-8 h-8 rounded-sm object-cover border border-[#DCE5DD] shrink-0"
                        />
                      </td>
                      <td className="px-2 py-1">
                        <div className="font-semibold text-[#173B26] text-xs leading-tight">{srv.title}</div>
                        <div className="text-[10px] text-[#68756D] line-clamp-1 max-w-sm">{srv.shortDescription}</div>
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap">
                        <span className="text-[10px] bg-[#F5F8F3] text-[#216B35] px-1.5 py-0.5 rounded font-medium border border-[#216B35]/20 inline-block">
                          {srv.category}
                        </span>
                      </td>
                      <td className="px-2 py-1 font-mono text-[10px] whitespace-nowrap">
                        <Link
                          href={`/services/${srv.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-[#216B35] hover:underline"
                        >
                          <span>/services/{srv.slug}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </Link>
                      </td>
                      <td className="px-2 py-1 text-right whitespace-nowrap space-x-0.5">
                        <button
                          onClick={() => {
                            setCurrentService(srv);
                            setServiceModalOpen(true);
                          }}
                          className="p-0.5 rounded text-[#216B35] hover:bg-[#F5F8F3] transition-colors"
                          title="Edit Service"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(srv.id || srv.slug, srv.title)}
                          className="p-0.5 rounded text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Service"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 2: BLOGS ================= */}
        {activeTab === 'blogs' && (
          isEditingBlog ? (
            <div className="w-full">
              <ArticleEditor
                key={currentBlog.id || currentBlog.slug || 'new-article'}
                initialBlog={currentBlog}
                onSave={handleSaveBlog}
                onCancel={() => setIsEditingBlog(false)}
                onUploadImage={handleImageUpload}
              />
            </div>
          ) : (
            <div className="bg-white rounded border border-[#DCE5DD] shadow-xs overflow-hidden w-full">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#4B5563] min-w-[550px]">
                  <thead className="bg-[#F5F8F3] text-[10px] uppercase tracking-wider text-[#173B26] border-b border-[#DCE5DD]">
                    <tr>
                      <th className="px-2 py-1 font-semibold w-10">Image</th>
                      <th className="px-2 py-1 font-semibold">Title</th>
                      <th className="px-2 py-1 font-semibold">Category & Date</th>
                      <th className="px-2 py-1 font-semibold">Slug URL</th>
                      <th className="px-2 py-1 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCE5DD]">
                    {blogs.map((blg) => (
                      <tr key={blg.id || blg.slug} className="hover:bg-[#F5F8F3]/50 transition-colors">
                        <td className="px-2 py-1 w-10">
                          <img
                            src={blg.featuredImage || '/img4.jpeg'}
                            alt={blg.title}
                            className="w-8 h-8 rounded-sm object-cover border border-[#DCE5DD] shrink-0"
                          />
                        </td>
                        <td className="px-2 py-1">
                          <div className="font-semibold text-[#173B26] text-xs leading-tight">{blg.title}</div>
                          <div className="text-[10px] text-[#68756D] line-clamp-1 max-w-sm">{blg.excerpt}</div>
                        </td>
                        <td className="px-2 py-1 text-[10px] whitespace-nowrap">
                          <div className="font-medium text-[#216B35]">{blg.category}</div>
                          <div className="text-[#68756D]">{blg.date}</div>
                        </td>
                        <td className="px-2 py-1 whitespace-nowrap">
                          <Link
                            href={`/blog/${blg.slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-[10px] text-[#216B35] hover:underline font-mono"
                          >
                            <span>/blog/{blg.slug}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </Link>
                        </td>
                        <td className="px-2 py-1 text-right whitespace-nowrap space-x-0.5">
                          <button
                            onClick={() => {
                              setCurrentBlog(blg);
                              setIsEditingBlog(true);
                            }}
                            className="p-0.5 rounded text-[#216B35] hover:bg-[#F5F8F3] transition-colors"
                            title="Edit Article in Embedded Full-Width Editor"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(blg.id || blg.slug, blg.title)}
                            className="p-0.5 rounded text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Article"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        )}

        {/* ================= TAB 3: PROJECTS ================= */}
        {activeTab === 'projects' && (
          <div className="bg-white rounded border border-[#DCE5DD] shadow-xs overflow-hidden w-full">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#4B5563] min-w-[550px]">
                <thead className="bg-[#F5F8F3] text-[10px] uppercase tracking-wider text-[#173B26] border-b border-[#DCE5DD]">
                  <tr>
                    <th className="px-2 py-1 font-semibold w-10">Image</th>
                    <th className="px-2 py-1 font-semibold">Project Title</th>
                    <th className="px-2 py-1 font-semibold">Location & Client</th>
                    <th className="px-2 py-1 font-semibold">Slug URL</th>
                    <th className="px-2 py-1 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCE5DD]">
                  {projects.map((prj) => (
                    <tr key={prj.id || prj.slug} className="hover:bg-[#F5F8F3]/50 transition-colors">
                      <td className="px-2 py-1 w-10">
                        <img
                          src={prj.featuredImage || '/img4.jpeg'}
                          alt={prj.title}
                          className="w-8 h-8 rounded-sm object-cover border border-[#DCE5DD] shrink-0"
                        />
                      </td>
                      <td className="px-2 py-1">
                        <div className="font-semibold text-[#173B26] text-xs leading-tight">{prj.title}</div>
                        <div className="text-[10px] text-[#216B35] font-medium">{prj.category}</div>
                      </td>
                      <td className="px-2 py-1 text-[10px] whitespace-nowrap">
                        <div className="font-medium text-[#173B26]">{prj.location}</div>
                        <div className="text-[#68756D]">{prj.client}</div>
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap">
                        <Link
                          href={`/projects/${prj.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-[10px] text-[#216B35] hover:underline font-mono"
                        >
                          <span>/projects/{prj.slug}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </Link>
                      </td>
                      <td className="px-2 py-1 text-right whitespace-nowrap space-x-0.5">
                        <button
                          onClick={() => {
                            setCurrentProject(prj);
                            setProjectModalOpen(true);
                          }}
                          className="p-0.5 rounded text-[#216B35] hover:bg-[#F5F8F3] transition-colors"
                          title="Edit Project"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(prj.id || prj.slug, prj.title)}
                          className="p-0.5 rounded text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 4: GALLERY ================= */}
        {activeTab === 'gallery' && (
          <div className="bg-white rounded border border-[#DCE5DD] shadow-xs overflow-hidden p-2 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {/* Cloudinary Quick Upload Card */}
              <label className="rounded-lg border-2 border-dashed border-[#216B35]/40 hover:border-[#216B35] bg-[#F5F8F3]/50 hover:bg-[#F5F8F3] p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-all group min-h-[140px]">
                <div className="w-9 h-9 rounded-full bg-white text-[#216B35] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform mb-1.5 border border-[#216B35]/20">
                  {uploadingImage ? (
                    <div className="w-4 h-4 border-2 border-[#216B35] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                </div>
                <span className="text-[11px] font-bold text-[#173B26] block">
                  {uploadingImage ? 'Uploading...' : 'Upload to Cloudinary'}
                </span>
                <span className="text-[9px] text-[#68756D] mt-0.5">Click or drag image file</span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingImage}
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    const url = await handleImageUpload(e, 'gallery');
                    if (url) {
                      const defaultTitle = file?.name?.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'Field Operations Photograph';
                      setCurrentGallery({
                        id: '',
                        title: defaultTitle,
                        category: 'Field Presence',
                        imageUrl: url,
                        caption: '',
                        displayOrder: 0
                      });
                      setGalleryModalOpen(true);
                    }
                  }}
                />
              </label>

              {gallery.map((gal) => (
                <div key={gal.id} className="rounded border border-[#DCE5DD] overflow-hidden bg-slate-50 flex flex-col justify-between group">
                  <div className="relative">
                    <img
                      src={gal.imageUrl}
                      alt={gal.title}
                      className="w-full h-24 sm:h-28 object-cover"
                    />
                    {gal.imageUrl?.includes('cloudinary.com') && (
                      <span className="absolute top-1 left-1 bg-black/75 backdrop-blur-xs text-white text-[9px] px-1 py-0.2 rounded font-mono">
                        ☁️ Cloudinary
                      </span>
                    )}
                    <div className="p-1.5">
                      <span className="text-[9px] font-medium text-[#216B35] uppercase tracking-wider block">
                        {gal.category}
                      </span>
                      <h4 className="font-semibold text-[#173B26] text-[11px] mt-0.5 truncate">{gal.title}</h4>
                      <p className="text-[9px] text-[#68756D] line-clamp-1">{gal.caption}</p>
                    </div>
                  </div>
                  <div className="p-1 pt-0 border-t border-[#DCE5DD]/60 flex justify-end gap-0.5">
                    <button
                      onClick={() => {
                        setCurrentGallery(gal);
                        setGalleryModalOpen(true);
                      }}
                      className="p-0.5 rounded text-[#216B35] hover:bg-[#F5F8F3]"
                      title="Edit Photo"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleDeleteGallery(gal.id, gal.title)}
                      className="p-0.5 rounded text-red-600 hover:bg-red-50"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 5: VIDEOS ================= */}
        {activeTab === 'videos' && (
          <div className="bg-white rounded border border-[#DCE5DD] shadow-xs overflow-hidden p-2 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5">
              {videos.map((vid) => (
                <div key={vid.id} className="rounded border border-[#DCE5DD] overflow-hidden bg-slate-50 flex flex-col justify-between">
                  <div>
                    <div className="relative h-24 sm:h-28 w-full bg-slate-900">
                      <img
                        src={vid.thumbnail || '/img4.jpeg'}
                        alt={vid.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-1.5">
                      <span className="text-[9px] font-medium text-emerald-400 bg-[#142D20] px-1 py-0.2 rounded">
                        {vid.category}
                      </span>
                      <h4 className="font-semibold text-[#173B26] text-xs mt-1 truncate">{vid.title}</h4>
                      <p className="text-[10px] text-[#68756D] line-clamp-1">{vid.description}</p>
                      <div className="text-[9px] font-mono text-[#216B35] mt-0.5 truncate">{vid.embedUrl}</div>
                    </div>
                  </div>
                  <div className="p-1 pt-0 border-t border-[#DCE5DD]/60 flex justify-end gap-0.5">
                    <button
                      onClick={() => {
                        setCurrentVideo(vid);
                        setVideoModalOpen(true);
                      }}
                      className="p-0.5 rounded text-[#216B35] hover:bg-[#F5F8F3]"
                      title="Edit Video"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleDeleteVideo(vid.id, vid.title)}
                      className="p-0.5 rounded text-red-600 hover:bg-red-50"
                      title="Delete Video"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 6: ENQUIRIES ================= */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded border border-[#DCE5DD] shadow-xs overflow-hidden w-full">
            <div className="divide-y divide-[#DCE5DD]">
              {enquiries.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#68756D]">
                  No consultation enquiries recorded yet. Submissions from the contact form appear here in real time.
                </div>
              ) : (
                enquiries.map((enq) => (
                  <div key={enq.id} className="p-2 hover:bg-[#F5F8F3]/50 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-[#173B26] text-xs">{enq.name}</span>
                        <span className="text-[9px] bg-[#F5F8F3] text-[#216B35] px-1.5 py-0.2 rounded font-medium border border-[#216B35]/20">
                          {enq.organization || 'Individual / Farmer'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-[#68756D] font-mono">
                          {new Date(enq.date).toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleDeleteEnquiry(enq.id, enq.name)}
                          className="p-0.5 rounded text-red-600 hover:bg-red-50"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="text-[11px] text-[#4B5563] space-x-2.5 mb-1 font-normal">
                      <span><strong>Email:</strong> {enq.email}</span>
                      <span><strong>Phone:</strong> {enq.phone}</span>
                      <span><strong>Service:</strong> {enq.service}</span>
                    </div>

                    <div className="text-[11px] text-[#4B5563] bg-[#F5F8F3] p-1.5 rounded border border-[#DCE5DD] font-normal">
                      {enq.message || 'No additional project details provided.'}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        </div>
      </main>

      {/* ================= MODAL: ADD / EDIT SERVICE ================= */}
      {serviceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-white rounded-md max-w-xl w-full p-4 sm:p-5 shadow-xl border border-[#DCE5DD] my-4">
            <h3 className="text-base font-bold text-[#173B26] mb-0.5">
              {currentService.id ? 'Edit Service / Product' : 'Add New Service / Product'}
            </h3>
            <p className="text-[11px] text-[#68756D] mb-4">
              Updates in MongoDB Atlas and renders at <span className="font-mono text-[#216B35]">/services/[slug]</span>
            </p>

            <form onSubmit={handleSaveService} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Service / Product Title *</label>
                <input
                  type="text"
                  required
                  value={currentService.title}
                  onChange={(e) => setCurrentService({ ...currentService, title: e.target.value })}
                  placeholder="e.g. ANIDERS (Animal Intrusion Detection System)"
                  className="w-full p-2 rounded border border-[#DCE5DD] text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">URL Slug (auto-generated if empty)</label>
                  <input
                    type="text"
                    value={currentService.slug}
                    onChange={(e) => setCurrentService({ ...currentService, slug: e.target.value })}
                    placeholder="aniders-animal-intrusion-detection-system"
                    className="w-full p-2 rounded border border-[#DCE5DD] text-xs font-mono"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-semibold text-[#173B26]">Category *</label>
                    <button
                      type="button"
                      onClick={() => setShowAddServiceCategory(!showAddServiceCategory)}
                      className="text-[11px] text-emerald-700 hover:text-emerald-900 font-semibold inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      <span>+ Add Category</span>
                    </button>
                  </div>

                  <select
                    value={currentService.category}
                    onChange={(e) => {
                      if (e.target.value === '__ADD_NEW__') {
                        setShowAddServiceCategory(true);
                      } else {
                        setCurrentService({ ...currentService, category: e.target.value });
                      }
                    }}
                    className="w-full p-2 rounded border border-[#DCE5DD] text-xs font-medium bg-white focus:outline-none focus:border-[#216B35]"
                  >
                    {serviceCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    {currentService.category && !serviceCategories.includes(currentService.category) && (
                      <option value={currentService.category}>{currentService.category}</option>
                    )}
                    <option value="__ADD_NEW__" className="text-emerald-700 font-bold bg-emerald-50">
                      + Add Custom Category...
                    </option>
                  </select>

                  {showAddServiceCategory && (
                    <div className="mt-2 p-2.5 bg-emerald-50/70 rounded-lg border border-emerald-200 space-y-2 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-emerald-900 flex items-center gap-1">
                          <Plus className="w-3 h-3 text-emerald-700" />
                          <span>Create Custom Service Category</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => { setShowAddServiceCategory(false); setNewServiceCategoryName(''); }}
                          className="text-emerald-700 hover:text-emerald-950 p-0.5 rounded hover:bg-emerald-100"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          autoFocus
                          value={newServiceCategoryName}
                          onChange={(e) => setNewServiceCategoryName(e.target.value)}
                          onKeyDown={async (e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              await handleCreateServiceCategory();
                            }
                          }}
                          placeholder="e.g. Acoustic & Ultrasonic Fencing..."
                          className="flex-1 px-2.5 py-1.5 text-xs bg-white rounded border border-emerald-300 focus:border-emerald-600 focus:outline-none"
                        />
                        <button
                          type="button"
                          disabled={savingServiceCategory || !newServiceCategoryName.trim()}
                          onClick={handleCreateServiceCategory}
                          className="px-3 py-1.5 bg-[#216B35] hover:bg-[#174D28] text-white text-xs font-semibold rounded transition-colors disabled:opacity-50 inline-flex items-center gap-1 shrink-0"
                        >
                          {savingServiceCategory ? (
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Plus className="w-3 h-3" />
                          )}
                          <span>Save</span>
                        </button>
                      </div>
                      <p className="text-[10px] text-emerald-800">
                        Saves directly into MongoDB Atlas and selects it for this service.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={currentService.shortDescription}
                  onChange={(e) => setCurrentService({ ...currentService, shortDescription: e.target.value })}
                  placeholder="Summary for catalog card preview..."
                  className="w-full p-2 rounded border border-[#DCE5DD] text-xs"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-semibold text-[#173B26]">Featured Image *</label>
                  {currentService.featuredImage?.includes('cloudinary.com') && (
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                      ☁️ Cloudinary Hosted
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentService.featuredImage}
                      onChange={(e) => setCurrentService({ ...currentService, featuredImage: e.target.value })}
                      placeholder="/img4.jpeg or Cloudinary URL"
                      className="flex-1 p-2 rounded border border-[#DCE5DD] text-xs font-mono"
                    />
                    <label className="btn-secondary px-3 py-1.5 rounded cursor-pointer shrink-0 text-xs inline-flex items-center gap-1 font-semibold text-[#216B35] border-[#216B35]/40 hover:bg-[#F5F8F3]">
                      {uploadingImage ? (
                        <div className="w-3.5 h-3.5 border-2 border-[#216B35] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      <span>{uploadingImage ? 'Uploading...' : 'Upload (Cloudinary)'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        onChange={(e) => handleImageUpload(e, 'service')}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {currentService.featuredImage && (
                    <div className="relative rounded-lg overflow-hidden border border-[#DCE5DD] bg-slate-100 h-28 flex items-center justify-center">
                      <img
                        src={currentService.featuredImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Full Technical Content / Specifications (Markdown)</label>
                <textarea
                  rows={5}
                  value={currentService.content}
                  onChange={(e) => setCurrentService({ ...currentService, content: e.target.value })}
                  placeholder="### Detailed Specifications..."
                  className="w-full p-2 rounded border border-[#DCE5DD] text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#DCE5DD]">
                <button
                  type="button"
                  onClick={() => setServiceModalOpen(false)}
                  className="px-3 py-1.5 rounded border border-[#DCE5DD] hover:bg-[#F5F8F3] text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-4 py-1.5 rounded text-xs"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



      {/* ================= MODAL: ADD / EDIT PROJECT ================= */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-white rounded-md max-w-xl w-full p-4 sm:p-5 shadow-xl border border-[#DCE5DD] my-4">
            <h3 className="text-base font-bold text-[#173B26] mb-0.5">
              {currentProject.id ? 'Edit Deployment Project' : 'Add New Deployment Project'}
            </h3>
            <p className="text-[11px] text-[#68756D] mb-4">
              Updates in MongoDB Atlas and renders at <span className="font-mono text-[#216B35]">/projects/[slug]</span>
            </p>

            <form onSubmit={handleSaveProject} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={currentProject.title}
                  onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                  placeholder="e.g. 70 ANIDERS Systems Deployed Along Bihar–Nepal Border"
                  className="w-full p-2 rounded border border-[#DCE5DD] text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">Location</label>
                  <input
                    type="text"
                    value={currentProject.location}
                    onChange={(e) => setCurrentProject({ ...currentProject, location: e.target.value })}
                    placeholder="Araria District, Bihar"
                    className="w-full p-2 rounded border border-[#DCE5DD] text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">Client / Department</label>
                  <input
                    type="text"
                    value={currentProject.client}
                    onChange={(e) => setCurrentProject({ ...currentProject, client: e.target.value })}
                    placeholder="State Forest Department"
                    className="w-full p-2 rounded border border-[#DCE5DD] text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">Category</label>
                  <input
                    type="text"
                    value={currentProject.category}
                    onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                    placeholder="Agricultural Perimeter Security"
                    className="w-full p-2 rounded border border-[#DCE5DD] text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">Deployment Date</label>
                  <input
                    type="text"
                    value={currentProject.date}
                    onChange={(e) => setCurrentProject({ ...currentProject, date: e.target.value })}
                    placeholder="April 2024"
                    className="w-full p-2 rounded border border-[#DCE5DD] text-xs"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-semibold text-[#173B26]">Featured Image *</label>
                  {currentProject.featuredImage?.includes('cloudinary.com') && (
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                      ☁️ Cloudinary Hosted
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentProject.featuredImage}
                      onChange={(e) => setCurrentProject({ ...currentProject, featuredImage: e.target.value })}
                      placeholder="/img4.jpeg or Cloudinary URL"
                      className="flex-1 p-2 rounded border border-[#DCE5DD] text-xs font-mono"
                    />
                    <label className="btn-secondary px-3 py-1.5 rounded cursor-pointer shrink-0 text-xs inline-flex items-center gap-1 font-semibold text-[#216B35] border-[#216B35]/40 hover:bg-[#F5F8F3]">
                      {uploadingImage ? (
                        <div className="w-3.5 h-3.5 border-2 border-[#216B35] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      <span>{uploadingImage ? 'Uploading...' : 'Upload (Cloudinary)'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        onChange={(e) => handleImageUpload(e, 'project')}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {currentProject.featuredImage && (
                    <div className="relative rounded-lg overflow-hidden border border-[#DCE5DD] bg-slate-100 h-28 flex items-center justify-center">
                      <img
                        src={currentProject.featuredImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Project Overview</label>
                <textarea
                  rows={3}
                  value={currentProject.overview}
                  onChange={(e) => setCurrentProject({ ...currentProject, overview: e.target.value })}
                  placeholder="Overview of the deployment..."
                  className="w-full p-2 rounded border border-[#DCE5DD] text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Results & Impact Metric</label>
                <input
                  type="text"
                  value={currentProject.results}
                  onChange={(e) => setCurrentProject({ ...currentProject, results: e.target.value })}
                  placeholder="Achieved 94% reduction in crop destruction across 300 hectares..."
                  className="w-full p-2 rounded border border-[#DCE5DD] text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#DCE5DD]">
                <button
                  type="button"
                  onClick={() => setProjectModalOpen(false)}
                  className="px-3 py-1.5 rounded border border-[#DCE5DD] hover:bg-[#F5F8F3] text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-4 py-1.5 rounded text-xs"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD / EDIT GALLERY ================= */}
      {galleryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-white rounded-md max-w-lg w-full p-4 sm:p-5 shadow-xl border border-[#DCE5DD] my-4">
            <h3 className="text-base font-bold text-[#173B26] mb-0.5">
              {currentGallery.id ? 'Edit Gallery Photo' : 'Add Gallery Photo'}
            </h3>
            <p className="text-[11px] text-[#68756D] mb-4">
              Displayed in the interactive visual archive at <span className="font-mono text-[#216B35]">/gallery</span>
            </p>

            <form onSubmit={handleSaveGallery} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  value={currentGallery.title}
                  onChange={(e) => setCurrentGallery({ ...currentGallery, title: e.target.value })}
                  placeholder="e.g. Forest Headquarters Jharkhand (Van Bhawan)"
                  className="w-full p-2 rounded border border-[#DCE5DD] text-xs"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-semibold text-[#173B26]">Category *</label>
                  <button
                    type="button"
                    onClick={() => setShowAddGalleryCategory(!showAddGalleryCategory)}
                    className="text-[11px] text-emerald-700 hover:text-emerald-900 font-semibold inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span>+ Add Category</span>
                  </button>
                </div>

                <select
                  value={currentGallery.category}
                  onChange={(e) => {
                    if (e.target.value === '__ADD_NEW__') {
                      setShowAddGalleryCategory(true);
                    } else {
                      setCurrentGallery({ ...currentGallery, category: e.target.value });
                    }
                  }}
                  className="w-full p-2 rounded border border-[#DCE5DD] text-xs font-medium bg-white focus:outline-none focus:border-[#216B35]"
                >
                  {galleryCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                  {currentGallery.category && !galleryCategories.includes(currentGallery.category) && (
                    <option value={currentGallery.category}>{currentGallery.category}</option>
                  )}
                  <option value="__ADD_NEW__" className="text-emerald-700 font-bold bg-emerald-50">
                    + Add Custom Category...
                  </option>
                </select>

                {showAddGalleryCategory && (
                  <div className="mt-2 p-2.5 bg-emerald-50/70 rounded-lg border border-emerald-200 space-y-2 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-emerald-900 flex items-center gap-1">
                        <Plus className="w-3 h-3 text-emerald-700" />
                        <span>Create Custom Gallery Category</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => { setShowAddGalleryCategory(false); setNewGalleryCategoryName(''); }}
                        className="text-emerald-700 hover:text-emerald-950 p-0.5 rounded hover:bg-emerald-100"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        autoFocus
                        value={newGalleryCategoryName}
                        onChange={(e) => setNewGalleryCategoryName(e.target.value)}
                        onKeyDown={async (e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            await handleCreateGalleryCategory();
                          }
                        }}
                        placeholder="e.g. Field Deployments, Exhibitions..."
                        className="flex-1 px-2.5 py-1.5 text-xs bg-white rounded border border-emerald-300 focus:border-emerald-600 focus:outline-none"
                      />
                      <button
                        type="button"
                        disabled={savingGalleryCategory || !newGalleryCategoryName.trim()}
                        onClick={handleCreateGalleryCategory}
                        className="px-3 py-1.5 bg-[#216B35] hover:bg-[#174D28] text-white text-xs font-semibold rounded transition-colors disabled:opacity-50 inline-flex items-center gap-1 shrink-0"
                      >
                        {savingGalleryCategory ? (
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Plus className="w-3 h-3" />
                        )}
                        <span>Save</span>
                      </button>
                    </div>
                    <p className="text-[10px] text-emerald-800">
                      Saves directly into MongoDB Atlas and selects it for this photo.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-semibold text-[#173B26]">Image *</label>
                  {currentGallery.imageUrl?.includes('cloudinary.com') && (
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                      ☁️ Cloudinary Hosted
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={currentGallery.imageUrl}
                      onChange={(e) => setCurrentGallery({ ...currentGallery, imageUrl: e.target.value })}
                      placeholder="/img4.jpeg or Cloudinary URL"
                      className="flex-1 p-2 rounded border border-[#DCE5DD] text-xs font-mono"
                    />
                    <label className="btn-secondary px-3 py-1.5 rounded cursor-pointer shrink-0 text-xs inline-flex items-center gap-1 font-semibold text-[#216B35] border-[#216B35]/40 hover:bg-[#F5F8F3]">
                      {uploadingImage ? (
                        <div className="w-3.5 h-3.5 border-2 border-[#216B35] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      <span>{uploadingImage ? 'Uploading...' : 'Upload to Cloudinary'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        onChange={(e) => handleImageUpload(e, 'gallery')}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Visual Preview */}
                  {currentGallery.imageUrl && (
                    <div className="relative rounded-lg overflow-hidden border border-[#DCE5DD] bg-slate-100 h-36 flex items-center justify-center">
                      <img
                        src={currentGallery.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                        {currentGallery.imageUrl.includes('cloudinary.com') ? '☁️ Cloudinary CDN' : 'Local file'}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Caption / Description</label>
                <textarea
                  rows={2}
                  value={currentGallery.caption}
                  onChange={(e) => setCurrentGallery({ ...currentGallery, caption: e.target.value })}
                  placeholder="Detailed photo description..."
                  className="w-full p-2 rounded border border-[#DCE5DD] text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#DCE5DD]">
                <button
                  type="button"
                  onClick={() => setGalleryModalOpen(false)}
                  className="px-3 py-1.5 rounded border border-[#DCE5DD] hover:bg-[#F5F8F3] text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-4 py-1.5 rounded text-xs"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD / EDIT VIDEO ================= */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-white rounded-md max-w-lg w-full p-4 sm:p-5 shadow-xl border border-[#DCE5DD] my-4">
            <h3 className="text-base font-bold text-[#173B26] mb-0.5">
              {currentVideo.id ? 'Edit Demonstration Video' : 'Add Demonstration Video'}
            </h3>
            <p className="text-[11px] text-[#68756D] mb-4">
              Displayed in the video demonstration gallery at <span className="font-mono text-[#216B35]">/videos</span>
            </p>

            <form onSubmit={handleSaveVideo} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Video Title *</label>
                <input
                  type="text"
                  required
                  value={currentVideo.title}
                  onChange={(e) => setCurrentVideo({ ...currentVideo, title: e.target.value })}
                  placeholder="e.g. ANIDERS | Animal Intrusion Detection and Repellent System"
                  className="w-full p-2 rounded border border-[#DCE5DD] text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">YouTube Embed URL *</label>
                <input
                  type="text"
                  required
                  value={currentVideo.embedUrl}
                  onChange={(e) => setCurrentVideo({ ...currentVideo, embedUrl: e.target.value })}
                  placeholder="https://www.youtube.com/embed/sKlBSzb0TUA"
                  className="w-full p-2 rounded border border-[#DCE5DD] text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Thumbnail Image URL / Upload</label>
                <div className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentVideo.thumbnail}
                      onChange={(e) => setCurrentVideo({ ...currentVideo, thumbnail: e.target.value })}
                      placeholder="/img4.jpeg or Cloudinary URL"
                      className="flex-1 p-2 rounded border border-[#DCE5DD] text-xs font-mono"
                    />
                    <label className="btn-secondary px-3 py-1.5 rounded cursor-pointer shrink-0 text-xs inline-flex items-center gap-1 font-semibold text-[#216B35] border-[#216B35]/40 hover:bg-[#F5F8F3]">
                      {uploadingImage ? (
                        <div className="w-3.5 h-3.5 border-2 border-[#216B35] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      <span>{uploadingImage ? 'Uploading...' : 'Upload (Cloudinary)'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        onChange={(e) => handleImageUpload(e, 'video')}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {currentVideo.thumbnail && (
                    <div className="relative rounded-lg overflow-hidden border border-[#DCE5DD] bg-slate-100 h-28 flex items-center justify-center">
                      <img
                        src={currentVideo.thumbnail}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-semibold text-[#173B26]">Category *</label>
                  <button
                    type="button"
                    onClick={() => setShowAddVideoCategory(!showAddVideoCategory)}
                    className="text-[11px] text-emerald-700 hover:text-emerald-900 font-semibold inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span>+ Add Category</span>
                  </button>
                </div>

                <select
                  value={currentVideo.category}
                  onChange={(e) => {
                    if (e.target.value === '__ADD_NEW__') {
                      setShowAddVideoCategory(true);
                    } else {
                      setCurrentVideo({ ...currentVideo, category: e.target.value });
                    }
                  }}
                  className="w-full p-2 rounded border border-[#DCE5DD] text-xs font-medium bg-white focus:outline-none focus:border-[#216B35]"
                >
                  {videoCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                  <option value="__ADD_NEW__" className="text-emerald-700 font-bold bg-emerald-50">
                    + Add Custom Category...
                  </option>
                </select>

                {showAddVideoCategory && (
                  <div className="mt-2 p-2.5 bg-emerald-50/70 rounded-lg border border-emerald-200 space-y-2 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-emerald-900 flex items-center gap-1">
                        <Plus className="w-3 h-3 text-emerald-700" />
                        <span>Create Custom Video Category</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => { setShowAddVideoCategory(false); setNewVideoCategoryName(''); }}
                        className="text-emerald-700 hover:text-emerald-950 p-0.5 rounded hover:bg-emerald-100"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        autoFocus
                        value={newVideoCategoryName}
                        onChange={(e) => setNewVideoCategoryName(e.target.value)}
                        onKeyDown={async (e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            await handleCreateVideoCategory();
                          }
                        }}
                        placeholder="e.g. Drone Surveillance, Night Footage..."
                        className="flex-1 px-2.5 py-1.5 text-xs bg-white rounded border border-emerald-300 focus:border-emerald-600 focus:outline-none"
                      />
                      <button
                        type="button"
                        disabled={savingVideoCategory || !newVideoCategoryName.trim()}
                        onClick={handleCreateVideoCategory}
                        className="px-3 py-1.5 bg-[#216B35] hover:bg-[#174D28] text-white text-xs font-semibold rounded transition-colors disabled:opacity-50 inline-flex items-center gap-1 shrink-0"
                      >
                        {savingVideoCategory ? (
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Plus className="w-3 h-3" />
                        )}
                        <span>Save</span>
                      </button>
                    </div>
                    <p className="text-[10px] text-emerald-800">
                      Saves directly into MongoDB Atlas and selects it for this video.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={currentVideo.description}
                  onChange={(e) => setCurrentVideo({ ...currentVideo, description: e.target.value })}
                  placeholder="Video overview and operational summary..."
                  className="w-full p-2 rounded border border-[#DCE5DD] text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#DCE5DD]">
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(false)}
                  className="px-3 py-1.5 rounded border border-[#DCE5DD] hover:bg-[#F5F8F3] text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-4 py-1.5 rounded text-xs"
                >
                  Save Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
