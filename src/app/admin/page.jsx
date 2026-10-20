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
  Sparkles, 
  Image as ImageIcon,
  AlertCircle,
  RefreshCw,
  FolderKanban,
  Camera,
  Tv,
  MapPin,
  Calendar
} from 'lucide-react';

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

  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({
    id: '',
    title: '',
    slug: '',
    category: 'Wildlife Technology',
    author: 'S. Gupta, Proprietor',
    excerpt: '',
    featuredImage: '',
    status: 'published',
    content: ''
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

  // Load all dynamic data from MongoDB API routes
  const fetchData = async () => {
    setLoading(true);
    try {
      // Check auth status
      const authRes = await fetch('/api/auth/me');
      if (!authRes.ok) {
        router.push('/admin-login');
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
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin-login');
  };

  // Image Upload handler (supports Cloudinary API via /api/upload)
  const handleImageUpload = async (e, targetForm) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setMessage({ text: 'Uploading image...', type: 'info' });

    try {
      const formData = new FormData();
      formData.append('file', file);

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
        text: `Image uploaded successfully! (${data.source === 'cloudinary' ? 'Cloudinary Hosted' : 'Local Storage'})`, 
        type: 'success' 
      });
    } catch (err) {
      setMessage({ text: err.message || 'Image upload failed', type: 'error' });
    } finally {
      setUploadingImage(false);
    }
  };

  // ---------------- SERVICES HANDLERS ----------------
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
  const handleSaveBlog = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentBlog)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save blog');

      setMessage({ text: `Article '${currentBlog.title}' saved successfully!`, type: 'success' });
      setBlogModalOpen(false);
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

  return (
    <div className="min-h-screen bg-[#F5F8F3] font-poppins flex flex-col">
      {/* Admin Top Navigation */}
      <header className="bg-white border-b border-[#DCE5DD] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpeg"
              alt="KR Environ Solutions Logo"
              className="w-11 h-11 rounded-xl object-contain bg-white border border-[#DCE5DD] p-0.5 shadow-sm"
            />
            <div>
              <span className="font-montserrat font-extrabold text-lg text-[#173B26] block leading-none">
                KR ENVIRON ADMIN
              </span>
              <span className="text-[10px] text-[#087EA4] font-bold uppercase tracking-wider">
                Dynamic CMS & Management (MongoDB Atlas)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="inline-flex items-center gap-1.5 text-xs text-[#173B26] hover:text-[#216B35] font-semibold px-3 py-1.5 rounded-lg border border-[#DCE5DD] hover:bg-[#F5F8F3] transition-colors"
              title="Refresh Data from MongoDB"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs text-[#087EA4] hover:text-[#06617F] font-semibold px-3 py-1.5 rounded-lg border border-[#087EA4]/20 hover:bg-[#EFF7FA] transition-colors"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-semibold px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Banner Alert Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl flex items-center justify-between text-sm ${
            message.type === 'error'
              ? 'bg-red-50 border border-red-200 text-red-700'
              : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
          }`}>
            <div className="flex items-center gap-2">
              {message.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              )}
              <span>{message.text}</span>
            </div>
            <button
              onClick={() => setMessage({ text: '', type: '' })}
              className="text-xs font-bold hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Dashboard Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE5DD] pb-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('services')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'services'
                  ? 'bg-[#216B35] text-white shadow-sm'
                  : 'bg-white text-[#4B5563] border border-[#DCE5DD] hover:bg-[#F5F8F3]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Services ({services.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('blogs')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'blogs'
                  ? 'bg-[#216B35] text-white shadow-sm'
                  : 'bg-white text-[#4B5563] border border-[#DCE5DD] hover:bg-[#F5F8F3]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Blogs ({blogs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'projects'
                  ? 'bg-[#216B35] text-white shadow-sm'
                  : 'bg-white text-[#4B5563] border border-[#DCE5DD] hover:bg-[#F5F8F3]'
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              <span>Projects ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'gallery'
                  ? 'bg-[#216B35] text-white shadow-sm'
                  : 'bg-white text-[#4B5563] border border-[#DCE5DD] hover:bg-[#F5F8F3]'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Gallery ({gallery.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('videos')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'videos'
                  ? 'bg-[#216B35] text-white shadow-sm'
                  : 'bg-white text-[#4B5563] border border-[#DCE5DD] hover:bg-[#F5F8F3]'
              }`}
            >
              <Tv className="w-4 h-4" />
              <span>Videos ({videos.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('enquiries')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'enquiries'
                  ? 'bg-[#216B35] text-white shadow-sm'
                  : 'bg-white text-[#4B5563] border border-[#DCE5DD] hover:bg-[#F5F8F3]'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Inquiries ({enquiries.length})</span>
            </button>
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
                className="btn-primary text-xs sm:text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Service</span>
              </button>
            )}

            {activeTab === 'blogs' && (
              <button
                onClick={() => {
                  setCurrentBlog({
                    id: '',
                    title: '',
                    slug: '',
                    category: 'Wildlife Technology',
                    author: 'S. Gupta, Proprietor',
                    excerpt: '',
                    featuredImage: '/img4.jpeg',
                    status: 'published',
                    content: ''
                  });
                  setBlogModalOpen(true);
                }}
                className="btn-primary text-xs sm:text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Article</span>
              </button>
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
                className="btn-primary text-xs sm:text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            )}

            {activeTab === 'gallery' && (
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
                className="btn-primary text-xs sm:text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Gallery Photo</span>
              </button>
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
                className="btn-primary text-xs sm:text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Video</span>
              </button>
            )}
          </div>
        </div>

        {/* ================= TAB 1: SERVICES ================= */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-2xl border border-[#DCE5DD] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#4B5563]">
                <thead className="bg-[#F5F8F3] text-xs uppercase font-poppins text-[#173B26] border-b border-[#DCE5DD]">
                  <tr>
                    <th className="px-6 py-4 font-bold">Image</th>
                    <th className="px-6 py-4 font-bold">Service / Solution</th>
                    <th className="px-6 py-4 font-bold">Category</th>
                    <th className="px-6 py-4 font-bold">Slug URL</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCE5DD] font-lato">
                  {services.map((srv) => (
                    <tr key={srv.id || srv.slug} className="hover:bg-[#F5F8F3]/50 transition-colors">
                      <td className="px-6 py-4">
                        <img
                          src={srv.featuredImage || '/img4.jpeg'}
                          alt={srv.title}
                          className="w-14 h-14 rounded-lg object-cover border border-[#DCE5DD]"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold font-montserrat text-[#173B26] text-base">{srv.title}</div>
                        <div className="text-xs text-[#68756D] line-clamp-1 mt-0.5">{srv.shortDescription}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs bg-[#EFF7FA] text-[#087EA4] px-2.5 py-1 rounded-full font-poppins font-medium border border-[#087EA4]/20">
                          {srv.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs">
                        <Link
                          href={`/services/${srv.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-[#087EA4] hover:underline"
                        >
                          <span>/services/{srv.slug}</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setCurrentService(srv);
                            setServiceModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-[#087EA4] hover:bg-[#EFF7FA]"
                          title="Edit Service"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(srv.id || srv.slug, srv.title)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
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
          <div className="bg-white rounded-2xl border border-[#DCE5DD] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#4B5563]">
                <thead className="bg-[#F5F8F3] text-xs uppercase font-poppins text-[#173B26] border-b border-[#DCE5DD]">
                  <tr>
                    <th className="px-6 py-4 font-bold">Image</th>
                    <th className="px-6 py-4 font-bold">Title</th>
                    <th className="px-6 py-4 font-bold">Category & Date</th>
                    <th className="px-6 py-4 font-bold">Slug URL</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCE5DD] font-lato">
                  {blogs.map((blg) => (
                    <tr key={blg.id || blg.slug} className="hover:bg-[#F5F8F3]/50 transition-colors">
                      <td className="px-6 py-4">
                        <img
                          src={blg.featuredImage || '/img4.jpeg'}
                          alt={blg.title}
                          className="w-14 h-14 rounded-lg object-cover border border-[#DCE5DD]"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold font-montserrat text-[#173B26] text-base">{blg.title}</div>
                        <div className="text-xs text-[#68756D] line-clamp-1 mt-0.5">{blg.excerpt}</div>
                      </td>
                      <td className="px-6 py-4 text-xs font-poppins">
                        <div className="font-semibold text-[#087EA4]">{blg.category}</div>
                        <div className="text-[#68756D] mt-0.5">{blg.date}</div>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/blog/${blg.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-xs text-[#087EA4] hover:underline font-mono"
                        >
                          <span>/blog/{blg.slug}</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setCurrentBlog(blg);
                            setBlogModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-[#087EA4] hover:bg-[#EFF7FA]"
                          title="Edit Article"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blg.id || blg.slug, blg.title)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                          title="Delete Article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 3: PROJECTS ================= */}
        {activeTab === 'projects' && (
          <div className="bg-white rounded-2xl border border-[#DCE5DD] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#4B5563]">
                <thead className="bg-[#F5F8F3] text-xs uppercase font-poppins text-[#173B26] border-b border-[#DCE5DD]">
                  <tr>
                    <th className="px-6 py-4 font-bold">Image</th>
                    <th className="px-6 py-4 font-bold">Project Title</th>
                    <th className="px-6 py-4 font-bold">Location & Client</th>
                    <th className="px-6 py-4 font-bold">Slug URL</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCE5DD] font-lato">
                  {projects.map((prj) => (
                    <tr key={prj.id || prj.slug} className="hover:bg-[#F5F8F3]/50 transition-colors">
                      <td className="px-6 py-4">
                        <img
                          src={prj.featuredImage || '/img4.jpeg'}
                          alt={prj.title}
                          className="w-14 h-14 rounded-lg object-cover border border-[#DCE5DD]"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold font-montserrat text-[#173B26] text-base">{prj.title}</div>
                        <div className="text-xs text-[#216B35] font-semibold mt-0.5">{prj.category}</div>
                      </td>
                      <td className="px-6 py-4 text-xs font-poppins">
                        <div className="font-semibold text-[#173B26]">{prj.location}</div>
                        <div className="text-[#68756D] mt-0.5">{prj.client}</div>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/projects/${prj.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-xs text-[#087EA4] hover:underline font-mono"
                        >
                          <span>/projects/{prj.slug}</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setCurrentProject(prj);
                            setProjectModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-[#087EA4] hover:bg-[#EFF7FA]"
                          title="Edit Project"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(prj.id || prj.slug, prj.title)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
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
          <div className="bg-white rounded-2xl border border-[#DCE5DD] shadow-sm overflow-hidden p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((gal) => (
                <div key={gal.id} className="rounded-xl border border-[#DCE5DD] overflow-hidden bg-slate-50 flex flex-col justify-between">
                  <div>
                    <img
                      src={gal.imageUrl}
                      alt={gal.title}
                      className="w-full h-44 object-cover"
                    />
                    <div className="p-4">
                      <span className="text-[11px] font-bold text-[#087EA4] uppercase tracking-wider font-poppins">
                        {gal.category}
                      </span>
                      <h4 className="font-bold font-montserrat text-[#173B26] text-sm mt-1">{gal.title}</h4>
                      <p className="text-xs text-[#68756D] font-lato mt-1 line-clamp-2">{gal.caption}</p>
                    </div>
                  </div>
                  <div className="p-4 pt-0 border-t border-[#DCE5DD]/60 flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => {
                        setCurrentGallery(gal);
                        setGalleryModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg text-[#087EA4] hover:bg-[#EFF7FA]"
                      title="Edit Photo"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteGallery(gal.id, gal.title)}
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 5: VIDEOS ================= */}
        {activeTab === 'videos' && (
          <div className="bg-white rounded-2xl border border-[#DCE5DD] shadow-sm overflow-hidden p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {videos.map((vid) => (
                <div key={vid.id} className="rounded-xl border border-[#DCE5DD] overflow-hidden bg-slate-50 flex flex-col justify-between">
                  <div>
                    <div className="relative h-44 w-full bg-slate-900">
                      <img
                        src={vid.thumbnail || '/img4.jpeg'}
                        alt={vid.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-[11px] font-bold text-[#F2BE36] bg-[#142D20] px-2 py-0.5 rounded font-poppins">
                        {vid.category}
                      </span>
                      <h4 className="font-bold font-montserrat text-[#173B26] text-sm mt-2">{vid.title}</h4>
                      <p className="text-xs text-[#68756D] font-lato mt-1 line-clamp-2">{vid.description}</p>
                      <div className="text-[11px] font-mono text-[#087EA4] mt-2 truncate">{vid.embedUrl}</div>
                    </div>
                  </div>
                  <div className="p-4 pt-0 border-t border-[#DCE5DD]/60 flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => {
                        setCurrentVideo(vid);
                        setVideoModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg text-[#087EA4] hover:bg-[#EFF7FA]"
                      title="Edit Video"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteVideo(vid.id, vid.title)}
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                      title="Delete Video"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 6: ENQUIRIES ================= */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-2xl border border-[#DCE5DD] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#DCE5DD]">
              <h3 className="text-lg font-bold font-montserrat text-[#173B26]">
                Incoming Consultation Enquiries
              </h3>
              <p className="text-xs text-[#68756D] font-lato mt-0.5">
                Submissions from the live website consultation form (Stored directly in MongoDB Atlas)
              </p>
            </div>

            <div className="divide-y divide-[#DCE5DD]">
              {enquiries.length === 0 ? (
                <div className="p-12 text-center text-sm text-[#68756D]">
                  No consultation enquiries recorded yet. Submissions from the contact form appear here in real time.
                </div>
              ) : (
                enquiries.map((enq) => (
                  <div key={enq.id} className="p-6 hover:bg-[#F5F8F3]/50 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#173B26] font-manrope text-base">{enq.name}</span>
                        <span className="text-xs bg-[#EFF7FA] text-[#087EA4] px-2.5 py-0.5 rounded-full font-semibold border border-[#087EA4]/20">
                          {enq.organization || 'Individual / Farmer'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#68756D] font-mono">
                          {new Date(enq.date).toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleDeleteEnquiry(enq.id, enq.name)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-[#4B5563] space-x-4 mb-3 font-poppins">
                      <span><strong>Email:</strong> {enq.email}</span>
                      <span><strong>Phone:</strong> {enq.phone}</span>
                      <span><strong>Service:</strong> {enq.service}</span>
                    </div>

                    <div className="text-sm text-[#4B5563] bg-[#F5F8F3] p-3.5 rounded-xl border border-[#DCE5DD] font-lato">
                      {enq.message || 'No additional project details provided.'}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>

      {/* ================= MODAL: ADD / EDIT SERVICE ================= */}
      {serviceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#DCE5DD] my-8">
            <h3 className="text-xl font-bold font-montserrat text-[#173B26] mb-1">
              {currentService.id ? 'Edit Service / Product' : 'Add New Service / Product'}
            </h3>
            <p className="text-xs text-[#68756D] mb-6">
              Updates in MongoDB Atlas and renders at <span className="font-mono text-[#087EA4]">/services/[slug]</span>
            </p>

            <form onSubmit={handleSaveService} className="space-y-4 text-xs font-poppins">
              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Service / Product Title *</label>
                <input
                  type="text"
                  required
                  value={currentService.title}
                  onChange={(e) => setCurrentService({ ...currentService, title: e.target.value })}
                  placeholder="e.g. ANIDERS (Animal Intrusion Detection System)"
                  className="w-full p-2.5 rounded-lg border border-[#DCE5DD] text-sm font-lato"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">URL Slug (auto-generated if empty)</label>
                  <input
                    type="text"
                    value={currentService.slug}
                    onChange={(e) => setCurrentService({ ...currentService, slug: e.target.value })}
                    placeholder="aniders-animal-intrusion-detection-system"
                    className="w-full p-2.5 rounded-lg border border-[#DCE5DD] text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">Category</label>
                  <select
                    value={currentService.category}
                    onChange={(e) => setCurrentService({ ...currentService, category: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#DCE5DD] text-xs font-poppins"
                  >
                    <option value="Wildlife Deterrence & Smart Sensors">Wildlife Deterrence & Smart Sensors</option>
                    <option value="Perimeter Defense & Checkpoints">Perimeter Defense & Checkpoints</option>
                    <option value="Capture & Rescue Technology">Capture & Rescue Technology</option>
                    <option value="Personnel Protection Gear">Personnel Protection Gear</option>
                    <option value="Turnkey Field Consultancy">Turnkey Field Consultancy</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={currentService.shortDescription}
                  onChange={(e) => setCurrentService({ ...currentService, shortDescription: e.target.value })}
                  placeholder="Summary for catalog card preview..."
                  className="w-full p-2.5 rounded-lg border border-[#DCE5DD] text-sm font-lato"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Featured Image URL / Upload</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentService.featuredImage}
                    onChange={(e) => setCurrentService({ ...currentService, featuredImage: e.target.value })}
                    placeholder="/img4.jpeg or Cloudinary URL"
                    className="flex-1 p-2.5 rounded-lg border border-[#DCE5DD] text-xs font-mono"
                  />
                  <label className="btn-secondary px-3 cursor-pointer shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'service')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Full Technical Content / Specifications (Markdown)</label>
                <textarea
                  rows={6}
                  value={currentService.content}
                  onChange={(e) => setCurrentService({ ...currentService, content: e.target.value })}
                  placeholder="### Detailed Specifications..."
                  className="w-full p-2.5 rounded-lg border border-[#DCE5DD] text-sm font-lato"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#DCE5DD]">
                <button
                  type="button"
                  onClick={() => setServiceModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#DCE5DD] hover:bg-[#F5F8F3]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-6"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD / EDIT BLOG ================= */}
      {blogModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#DCE5DD] my-8">
            <h3 className="text-xl font-bold font-montserrat text-[#173B26] mb-1">
              {currentBlog.id ? 'Edit Article' : 'Create New Article'}
            </h3>
            <p className="text-xs text-[#68756D] mb-6">
              Updates in MongoDB Atlas and renders at <span className="font-mono text-[#087EA4]">/blog/[slug]</span>
            </p>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs font-poppins">
              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={currentBlog.title}
                  onChange={(e) => setCurrentBlog({ ...currentBlog, title: e.target.value })}
                  placeholder="e.g. Human-Wildlife Conflict Mitigation: How ANIDERS is Transforming Forest Borders"
                  className="w-full p-2.5 rounded-lg border border-[#DCE5DD] text-sm font-lato"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={currentBlog.slug}
                    onChange={(e) => setCurrentBlog({ ...currentBlog, slug: e.target.value })}
                    placeholder="human-wildlife-conflict-mitigation-aniders"
                    className="w-full p-2.5 rounded-lg border border-[#DCE5DD] text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">Category</label>
                  <input
                    type="text"
                    value={currentBlog.category}
                    onChange={(e) => setCurrentBlog({ ...currentBlog, category: e.target.value })}
                    placeholder="Wildlife Technology"
                    className="w-full p-2.5 rounded-lg border border-[#DCE5DD] text-xs font-poppins"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Excerpt Summary</label>
                <textarea
                  rows={2}
                  value={currentBlog.excerpt}
                  onChange={(e) => setCurrentBlog({ ...currentBlog, excerpt: e.target.value })}
                  placeholder="Short excerpt for card preview..."
                  className="w-full p-2.5 rounded-lg border border-[#DCE5DD] text-sm font-lato"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Featured Image URL / Upload</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentBlog.featuredImage}
                    onChange={(e) => setCurrentBlog({ ...currentBlog, featuredImage: e.target.value })}
                    placeholder="/img4.jpeg or Cloudinary URL"
                    className="flex-1 p-2.5 rounded-lg border border-[#DCE5DD] text-xs font-mono"
                  />
                  <label className="btn-secondary px-3 cursor-pointer shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'blog')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Article Content (Markdown)</label>
                <textarea
                  rows={8}
                  value={currentBlog.content}
                  onChange={(e) => setCurrentBlog({ ...currentBlog, content: e.target.value })}
                  placeholder="### Article content here..."
                  className="w-full p-2.5 rounded-lg border border-[#DCE5DD] text-sm font-lato"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#DCE5DD]">
                <button
                  type="button"
                  onClick={() => setBlogModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#DCE5DD] hover:bg-[#F5F8F3]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-6"
                >
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD / EDIT PROJECT ================= */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#DCE5DD] my-8">
            <h3 className="text-xl font-bold font-montserrat text-[#173B26] mb-1">
              {currentProject.id ? 'Edit Deployment Project' : 'Add New Deployment Project'}
            </h3>
            <p className="text-xs text-[#68756D] mb-6">
              Updates in MongoDB Atlas and renders at <span className="font-mono text-[#087EA4]">/projects/[slug]</span>
            </p>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs font-poppins">
              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={currentProject.title}
                  onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                  placeholder="e.g. 70 ANIDERS Systems Deployed Along Bihar–Nepal Border"
                  className="w-full p-2.5 rounded-lg border border-[#DCE5DD] text-sm font-lato"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">Location</label>
                  <input
                    type="text"
                    value={currentProject.location}
                    onChange={(e) => setCurrentProject({ ...currentProject, location: e.target.value })}
                    placeholder="Araria District, Bihar"
                    className="w-full p-2.5 rounded-lg border border-[#DCE5DD] text-xs font-poppins"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">Client / Department</label>
                  <input
                    type="text"
                    value={currentProject.client}
                    onChange={(e) => setCurrentProject({ ...currentProject, client: e.target.value })}
                    placeholder="State Forest Department"
                    className="w-full p-2.5 rounded-lg border border-[#DCE5DD] text-xs font-poppins"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">Category</label>
                  <input
                    type="text"
                    value={currentProject.category}
                    onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                    placeholder="Agricultural Perimeter Security"
                    className="w-full p-2.5 rounded-lg border border-[#DCE5DD] text-xs font-poppins"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">Deployment Date</label>
                  <input
                    type="text"
                    value={currentProject.date}
                    onChange={(e) => setCurrentProject({ ...currentProject, date: e.target.value })}
                    placeholder="April 2024"
                    className="w-full p-2.5 rounded-lg border border-[#DCE5DD] text-xs font-poppins"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Featured Image URL / Upload</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentProject.featuredImage}
                    onChange={(e) => setCurrentProject({ ...currentProject, featuredImage: e.target.value })}
                    placeholder="/img4.jpeg or Cloudinary URL"
                    className="flex-1 p-2.5 rounded-lg border border-[#DCE5DD] text-xs font-mono"
                  />
                  <label className="btn-secondary px-3 cursor-pointer shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'project')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Project Overview</label>
                <textarea
                  rows={3}
                  value={currentProject.overview}
                  onChange={(e) => setCurrentProject({ ...currentProject, overview: e.target.value })}
                  placeholder="Overview of the deployment..."
                  className="w-full p-2.5 rounded-lg border border-[#DCE5DD] text-sm font-lato"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Results & Impact Metric</label>
                <input
                  type="text"
                  value={currentProject.results}
                  onChange={(e) => setCurrentProject({ ...currentProject, results: e.target.value })}
                  placeholder="Achieved 94% reduction in crop destruction across 300 hectares..."
                  className="w-full p-2.5 rounded-lg border border-[#DCE5DD] text-sm font-lato"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#DCE5DD]">
                <button
                  type="button"
                  onClick={() => setProjectModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#DCE5DD] hover:bg-[#F5F8F3]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-6"
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
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#DCE5DD] my-8">
            <h3 className="text-xl font-bold font-montserrat text-[#173B26] mb-1">
              {currentGallery.id ? 'Edit Gallery Photo' : 'Add Gallery Photo'}
            </h3>
            <p className="text-xs text-[#68756D] mb-6">
              Displayed in the interactive visual archive at <span className="font-mono text-[#087EA4]">/gallery</span>
            </p>

            <form onSubmit={handleSaveGallery} className="space-y-4 text-xs font-poppins">
              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  value={currentGallery.title}
                  onChange={(e) => setCurrentGallery({ ...currentGallery, title: e.target.value })}
                  placeholder="e.g. Forest Headquarters Jharkhand (Van Bhawan)"
                  className="w-full p-2.5 rounded-lg border border-[#DCE5DD] text-sm font-lato"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Category</label>
                <select
                  value={currentGallery.category}
                  onChange={(e) => setCurrentGallery({ ...currentGallery, category: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#DCE5DD] text-xs font-poppins"
                >
                  <option value="Field Presence">Field Presence</option>
                  <option value="Government Partnership">Government Partnership</option>
                  <option value="Field Operations">Field Operations</option>
                  <option value="Credentials">Credentials</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Image URL / Upload *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={currentGallery.imageUrl}
                    onChange={(e) => setCurrentGallery({ ...currentGallery, imageUrl: e.target.value })}
                    placeholder="/img4.jpeg or Cloudinary URL"
                    className="flex-1 p-2.5 rounded-lg border border-[#DCE5DD] text-xs font-mono"
                  />
                  <label className="btn-secondary px-3 cursor-pointer shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'gallery')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Caption / Description</label>
                <textarea
                  rows={3}
                  value={currentGallery.caption}
                  onChange={(e) => setCurrentGallery({ ...currentGallery, caption: e.target.value })}
                  placeholder="Detailed photo description..."
                  className="w-full p-2.5 rounded-lg border border-[#DCE5DD] text-sm font-lato"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#DCE5DD]">
                <button
                  type="button"
                  onClick={() => setGalleryModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#DCE5DD] hover:bg-[#F5F8F3]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-6"
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
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#DCE5DD] my-8">
            <h3 className="text-xl font-bold font-montserrat text-[#173B26] mb-1">
              {currentVideo.id ? 'Edit Demonstration Video' : 'Add Demonstration Video'}
            </h3>
            <p className="text-xs text-[#68756D] mb-6">
              Displayed in the video demonstration gallery at <span className="font-mono text-[#087EA4]">/videos</span>
            </p>

            <form onSubmit={handleSaveVideo} className="space-y-4 text-xs font-poppins">
              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Video Title *</label>
                <input
                  type="text"
                  required
                  value={currentVideo.title}
                  onChange={(e) => setCurrentVideo({ ...currentVideo, title: e.target.value })}
                  placeholder="e.g. ANIDERS | Animal Intrusion Detection and Repellent System"
                  className="w-full p-2.5 rounded-lg border border-[#DCE5DD] text-sm font-lato"
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
                  className="w-full p-2.5 rounded-lg border border-[#DCE5DD] text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Thumbnail Image URL / Upload</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentVideo.thumbnail}
                    onChange={(e) => setCurrentVideo({ ...currentVideo, thumbnail: e.target.value })}
                    placeholder="/img4.jpeg or Cloudinary URL"
                    className="flex-1 p-2.5 rounded-lg border border-[#DCE5DD] text-xs font-mono"
                  />
                  <label className="btn-secondary px-3 cursor-pointer shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'video')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Category</label>
                <select
                  value={currentVideo.category}
                  onChange={(e) => setCurrentVideo({ ...currentVideo, category: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#DCE5DD] text-xs font-poppins"
                >
                  <option value="Product Demonstration">Product Demonstration</option>
                  <option value="Field Operations">Field Operations</option>
                  <option value="Training & Rescue">Training & Rescue</option>
                  <option value="Ranger Safety">Ranger Safety</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Description</label>
                <textarea
                  rows={3}
                  value={currentVideo.description}
                  onChange={(e) => setCurrentVideo({ ...currentVideo, description: e.target.value })}
                  placeholder="Video overview and operational summary..."
                  className="w-full p-2.5 rounded-lg border border-[#DCE5DD] text-sm font-lato"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#DCE5DD]">
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#DCE5DD] hover:bg-[#F5F8F3]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-6"
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
