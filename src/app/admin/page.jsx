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
  Camera,
  Tv,
  MapPin,
  Calendar,
  ArrowLeft,
  X,
  Building2,
  Package,
  Handshake,
  Award,
  FileCheck2,
  FileText,
  Download,
  Eye,
  Play,
  Video,
  Briefcase,
  GraduationCap,
  Search
} from 'lucide-react';
import ArticleEditor from '@/components/admin/ArticleEditor';
import ServiceEditor from '@/components/admin/ServiceEditor';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('services'); // 'services' | 'blogs' | 'gallery' | 'videos' | 'enquiries'
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [videos, setVideos] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [partners, setPartners] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [careers, setCareers] = useState([]);
  const [careerApplications, setCareerApplications] = useState([]);
  const [aboutImages, setAboutImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  // About Us Carousel Modal
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [currentAboutImage, setCurrentAboutImage] = useState({
    id: '',
    title: '',
    imageUrl: '',
    displayOrder: 0
  });

  // Career Modal & Applications Filters
  const [careerModalOpen, setCareerModalOpen] = useState(false);
  const [currentCareer, setCurrentCareer] = useState({
    id: '',
    title: '',
    department: 'Environmental & Forestry',
    employmentType: 'Full-Time',
    location: 'Ranchi, Jharkhand',
    experience: 'Freshers / 0–2 Years',
    qualification: '',
    stipendOrSalary: '',
    deadline: '',
    status: 'open',
    summary: '',
    responsibilitiesText: '',
    displayOrder: 0
  });
  const [appFilterCareer, setAppFilterCareer] = useState('All');
  const [appFilterStatus, setAppFilterStatus] = useState('All');
  const [appSearch, setAppSearch] = useState('');

  // Product modal state
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: '',
    title: '',
    slug: '',
    modelCode: '',
    category: 'Bird Diverters & Avian Protection',
    shortDescription: '',
    featuredImage: '',
    price: 'Custom Forest Dept Quote',
    status: 'published',
    specs: [{ label: '', value: '' }],
    content: ''
  });

  // Partner modal state
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [currentPartner, setCurrentPartner] = useState({
    id: '',
    name: '',
    category: 'Technology & Hardware Alliance',
    logoUrl: '',
    websiteUrl: '',
    collaborationType: 'Strategic Implementation & Supply',
    description: '',
    displayOrder: 0
  });

  // Certificate modal state
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [currentCertificate, setCurrentCertificate] = useState({
    id: '',
    title: '',
    originalTitle: '',
    pdfUrl: '',
    displayOrder: 0
  });

  // Client modal state
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState({
    id: '',
    name: '',
    logoUrl: '',
    websiteUrl: '',
    displayOrder: 0
  });

  // Service embedded editor state (Right-side full-width embedded)
  const [isEditingService, setIsEditingService] = useState(false);

  // Article embedded editor state (Right-side full-width embedded)
  const [isEditingBlog, setIsEditingBlog] = useState(false);

  // Modals state
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

  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [currentGallery, setCurrentGallery] = useState({
    id: '',
    title: '',
    category: 'Field Presence',
    imageUrl: '',
    caption: '',
    showOnHome: false,
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

      const [srvRes, blgRes, galRes, vidRes, enqRes, cliRes, prodRes, partRes, certRes, carRes, appRes, abtRes] = await Promise.all([
        fetch('/api/services'),
        fetch('/api/blogs'),
        fetch('/api/gallery'),
        fetch('/api/videos'),
        fetch('/api/enquiries'),
        fetch('/api/clients'),
        fetch('/api/products', { cache: 'no-store' }),
        fetch('/api/partners', { cache: 'no-store' }),
        fetch('/api/certificates', { cache: 'no-store' }),
        fetch('/api/careers?all=true'),
        fetch('/api/career-applications'),
        fetch('/api/about-images')
      ]);

      const [srvData, blgData, galData, vidData, enqData, cliData, prodData, partData, certData, carData, appData, abtData] = await Promise.all([
        srvRes.json(),
        blgRes.json(),
        galRes.json(),
        vidRes.json(),
        enqRes.json(),
        cliRes.json(),
        prodRes.json(),
        partRes.json(),
        certRes.json(),
        carRes.json(),
        appRes.json(),
        abtRes.json()
      ]);

      setServices(srvData.services || []);
      setBlogs(blgData.blogs || []);
      setGallery(galData.gallery || []);
      setVideos(vidData.videos || []);
      setEnquiries(enqData.enquiries || []);
      setClients(cliData.clients || []);
      setProducts(prodData.products || []);
      setPartners(partData.partners || []);
      setCertificates(certData.certificates || []);
      setCareers(carData.careers || []);
      setCareerApplications(appData.applications || []);
      setAboutImages(abtData.images || []);

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
      } else if (targetForm === 'gallery') {
        setCurrentGallery((prev) => ({ ...prev, imageUrl: data.url }));
      } else if (targetForm === 'video') {
        setCurrentVideo((prev) => ({ ...prev, thumbnail: data.url }));
      } else if (targetForm === 'client') {
        setCurrentClient((prev) => ({ ...prev, logoUrl: data.url }));
      } else if (targetForm === 'product') {
        setCurrentProduct((prev) => ({ ...prev, featuredImage: data.url }));
      } else if (targetForm === 'partner') {
        setCurrentPartner((prev) => ({ ...prev, logoUrl: data.url }));
      } else if (targetForm === 'certificate') {
        setCurrentCertificate((prev) => ({ ...prev, imageUrl: data.url }));
      } else if (targetForm === 'about') {
        setCurrentAboutImage((prev) => ({ ...prev, imageUrl: data.url }));
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

  const handleSaveService = async (servicePayload) => {
    try {
      const payload = servicePayload && servicePayload.title ? servicePayload : currentService;
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to save service');

      setMessage({ text: `Service '${payload.title}' saved successfully!`, type: 'success' });
      setIsEditingService(false);
      fetchData();
      return data;
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
      throw err;
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
      const targetId = currentGallery.id || currentGallery._id;
      if (currentGallery.showOnHome) {
        const selectedOthers = gallery.filter(
          (g) => Boolean(g.showOnHome) && (g.id || g._id) !== targetId
        );
        if (selectedOthers.length >= 4) {
          setMessage({
            text: 'Maximum 4 gallery photos can be shown on the homepage. Untick one first.',
            type: 'error'
          });
          return;
        }
      }

      const payload = {
        ...currentGallery,
        id: targetId,
        showOnHome: Boolean(currentGallery.showOnHome)
      };
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
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

  const handleToggleGalleryHome = async (gal) => {
    const targetId = gal._id || gal.id;
    const nextVal = !Boolean(gal.showOnHome);

    if (nextVal) {
      const currentSelected = gallery.filter((g) => Boolean(g.showOnHome)).length;
      if (currentSelected >= 4) {
        setMessage({
          text: 'Only 4 gallery images can be ticked for Homepage. Untick an existing one first.',
          type: 'error'
        });
        return;
      }
    }

    setGallery((prev) =>
      prev.map((item) =>
        (item._id || item.id) === targetId ? { ...item, showOnHome: nextVal } : item
      )
    );

    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...gal, id: targetId, showOnHome: nextVal })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to update homepage selection');
      setMessage({
        text: nextVal ? `"${gal.title}" added to Homepage (Survey Team at Work).` : `"${gal.title}" removed from Homepage.`,
        type: 'success'
      });
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
      fetchData();
    }
  };

  const handleDeleteGallery = async (id, title) => {
    if (!id || id === 'undefined' || id === 'null') {
      setMessage({ text: 'Cannot delete photo: Photo ID is missing.', type: 'error' });
      return;
    }
    if (!confirm(`Are you sure you want to delete photo "${title}"?`)) return;
    try {
      const res = await fetch(`/api/gallery?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Delete failed');
      }
      setMessage({ text: `Gallery photo deleted successfully`, type: 'success' });
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

  const handleOpenVideoModal = (video = null) => {
    if (video) {
      setCurrentVideo({
        id: video._id || video.id || '',
        title: video.title || '',
        category: video.category || 'Product Demonstration',
        thumbnail: video.thumbnail || '',
        embedUrl: video.embedUrl || '',
        description: video.description || '',
        displayOrder: typeof video.displayOrder === 'number' ? video.displayOrder : 0
      });
    } else {
      setCurrentVideo({
        id: '',
        title: '',
        category: 'Product Demonstration',
        thumbnail: '',
        embedUrl: '',
        description: '',
        displayOrder: (videos && videos.length) ? videos.length + 1 : 1
      });
    }
    setVideoModalOpen(true);
  };

  const handleSaveVideo = async (e) => {
    e.preventDefault();
    if (!currentVideo.title.trim()) {
      alert('Please enter video title');
      return;
    }
    if (!currentVideo.embedUrl.trim()) {
      alert('Please enter YouTube Video URL or Embed URL');
      return;
    }

    try {
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentVideo)
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to save video');

      setMessage({ text: `Video '${currentVideo.title}' saved successfully!`, type: 'success' });
      setVideoModalOpen(false);

      if (data.video) {
        setVideos((prev) => {
          const matchIndex = prev.findIndex(
            (v) =>
              (data.video.id && (v.id === data.video.id || v._id === data.video.id)) ||
              (currentVideo.title && v.title === currentVideo.title)
          );
          if (matchIndex >= 0) {
            const next = [...prev];
            next[matchIndex] = data.video;
            return next;
          }
          return [...prev, data.video];
        });
      }

      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleDeleteVideo = async (id, title) => {
    if (!id && !title) {
      setMessage({ text: 'Cannot delete video: Video identifier is missing.', type: 'error' });
      return;
    }
    if (!confirm(`Are you sure you want to delete video "${title}"?`)) return;
    try {
      const targetId = id || '';
      const res = await fetch(`/api/videos?id=${encodeURIComponent(targetId)}&title=${encodeURIComponent(title || '')}`, {
        method: 'DELETE'
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Delete failed');
      }
      setMessage({ text: `Video "${title}" deleted successfully`, type: 'success' });

      // Optimistically remove from state immediately
      setVideos((prev) =>
        prev.filter((v) => {
          if (targetId && (v.id === targetId || v._id === targetId)) return false;
          if (title && v.title === title) return false;
          return true;
        })
      );

      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  // ---------------- ENQUIRIES HANDLERS ----------------
  const handleDeleteEnquiry = async (id, name) => {
    if (!id || id === 'undefined' || id === 'null') {
      setMessage({ text: 'Cannot delete enquiry: Enquiry ID is missing.', type: 'error' });
      return;
    }
    if (!confirm(`Are you sure you want to delete enquiry from "${name}"?`)) return;
    try {
      const res = await fetch(`/api/enquiries?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Delete failed');
      }
      setMessage({ text: `Enquiry removed successfully`, type: 'success' });
      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  // ---------------- CLIENTS HANDLERS ----------------
  const handleOpenClientModal = (cli = null) => {
    if (cli) {
      setCurrentClient({
        id: cli._id || cli.id || '',
        name: cli.name || '',
        logoUrl: cli.logoUrl || '',
        websiteUrl: cli.websiteUrl || '',
        displayOrder: cli.displayOrder || 0
      });
    } else {
      setCurrentClient({
        id: '',
        name: '',
        logoUrl: '',
        websiteUrl: '',
        displayOrder: clients.length + 1
      });
    }
    setClientModalOpen(true);
  };

  const handleSaveClient = async (e) => {
    e.preventDefault();
    if (!currentClient.name.trim()) {
      alert('Please enter client or organization name');
      return;
    }
    if (!currentClient.logoUrl.trim()) {
      alert('Please upload or provide client logo image URL');
      return;
    }

    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentClient)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save client');
      }

      setMessage({ text: `Client '${currentClient.name}' saved successfully!`, type: 'success' });
      setClientModalOpen(false);
      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleDeleteClient = async (id, name) => {
    if (!confirm(`Are you sure you want to delete client logo "${name}"?`)) return;
    try {
      const res = await fetch(`/api/clients?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete client');
      }
      setMessage({ text: `Client logo removed`, type: 'success' });
      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  // ---------------- PRODUCTS HANDLERS ----------------
  const handleOpenProductModal = (product = null) => {
    if (product) {
      setCurrentProduct({
        id: product.id || product._id || '',
        title: product.title || '',
        slug: product.slug || '',
        modelCode: product.modelCode || '',
        category: product.category || 'Bird Diverters & Avian Protection',
        shortDescription: product.shortDescription || '',
        featuredImage: product.featuredImage || '/details.jpeg',
        price: product.price || 'Custom Forest Dept Quote',
        status: product.status || 'published',
        specs: (product.specs && product.specs.length > 0) ? product.specs : [{ label: '', value: '' }],
        content: product.content || ''
      });
    } else {
      setCurrentProduct({
        id: '',
        title: '',
        slug: '',
        modelCode: '',
        category: 'Bird Diverters & Avian Protection',
        shortDescription: '',
        featuredImage: '/details.jpeg',
        price: 'Custom Forest Dept Quote',
        status: 'published',
        specs: [{ label: '', value: '' }],
        content: ''
      });
    }
    setProductModalOpen(true);
  };

  const handleAddProductSpec = () => {
    setCurrentProduct((prev) => ({
      ...prev,
      specs: [...(prev.specs || []), { label: '', value: '' }]
    }));
  };

  const handleRemoveProductSpec = (index) => {
    setCurrentProduct((prev) => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index)
    }));
  };

  const handleProductSpecChange = (index, field, value) => {
    setCurrentProduct((prev) => {
      const updatedSpecs = [...prev.specs];
      updatedSpecs[index] = { ...updatedSpecs[index], [field]: value };
      return { ...prev, specs: updatedSpecs };
    });
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!currentProduct.title.trim()) {
      alert('Please enter product title');
      return;
    }

    try {
      const cleanSpecs = (currentProduct.specs || []).filter(s => s.label.trim() && s.value.trim());
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...currentProduct, specs: cleanSpecs })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save product');
      }

      setMessage({ text: `Product '${currentProduct.title}' saved successfully!`, type: 'success' });
      setProductModalOpen(false);
      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleDeleteProduct = async (id, title) => {
    if (!confirm(`Are you sure you want to delete product "${title}"?`)) return;
    try {
      const res = await fetch(`/api/products?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete product');
      }
      setMessage({ text: `Product '${title}' removed successfully`, type: 'success' });
      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  // ---------------- PARTNERS HANDLERS ----------------
  const handleOpenPartnerModal = (partner = null) => {
    if (partner) {
      setCurrentPartner({
        id: partner.id || partner._id || '',
        name: partner.name || '',
        category: partner.category || 'Technology & Hardware Alliance',
        logoUrl: partner.logoUrl || '/logo.jpeg',
        websiteUrl: partner.websiteUrl || '',
        collaborationType: partner.collaborationType || 'Strategic Implementation & Supply',
        description: partner.description || '',
        displayOrder: partner.displayOrder || 0
      });
    } else {
      setCurrentPartner({
        id: '',
        name: '',
        category: 'Technology & Hardware Alliance',
        logoUrl: '',
        websiteUrl: '',
        collaborationType: 'Strategic Implementation & Supply',
        description: '',
        displayOrder: partners.length + 1
      });
    }
    setPartnerModalOpen(true);
  };

  const handleSavePartner = async (e) => {
    e.preventDefault();
    if (!currentPartner.name.trim()) {
      alert('Please enter partner name');
      return;
    }
    if (!currentPartner.logoUrl.trim()) {
      alert('Please upload partner logo');
      return;
    }

    try {
      const res = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentPartner)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save partner');
      }

      setMessage({ text: `Partner '${currentPartner.name}' saved successfully!`, type: 'success' });
      setPartnerModalOpen(false);
      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleDeletePartner = async (id, name) => {
    if (!confirm(`Are you sure you want to delete partner "${name}"?`)) return;
    try {
      const res = await fetch(`/api/partners?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete partner');
      }
      setMessage({ text: `Partner '${name}' removed successfully`, type: 'success' });
      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  // ---------------- CERTIFICATES HANDLERS ----------------
  const handleOpenCertificateModal = (cert = null) => {
    if (cert) {
      setCurrentCertificate({
        id: cert.id || cert._id || '',
        title: cert.title || '',
        originalTitle: cert.title || '',
        pdfUrl: cert.pdfUrl || cert.pdfLink || cert.imageUrl || '',
        displayOrder: cert.displayOrder ?? 0
      });
    } else {
      setCurrentCertificate({
        id: '',
        title: '',
        originalTitle: '',
        pdfUrl: '',
        displayOrder: certificates.length + 1
      });
    }
    setCertificateModalOpen(true);
  };

  const handleSaveCertificate = async (e) => {
    e.preventDefault();
    if (!currentCertificate.title.trim()) {
      alert('Please enter certificate / PDF title');
      return;
    }
    if (!currentCertificate.pdfUrl.trim()) {
      alert('Please enter PDF link or Google Drive URL');
      return;
    }

    try {
      const res = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentCertificate)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save certificate');
      }

      setMessage({ text: `Certificate '${currentCertificate.title}' saved successfully!`, type: 'success' });
      setCertificateModalOpen(false);

      if (data.certificate) {
        setCertificates((prev) => {
          const matchIndex = prev.findIndex(
            (c) =>
              (data.certificate.id && (c.id === data.certificate.id || c._id === data.certificate.id)) ||
              (currentCertificate.originalTitle && c.title === currentCertificate.originalTitle) ||
              c.title === currentCertificate.title
          );
          if (matchIndex >= 0) {
            const next = [...prev];
            next[matchIndex] = data.certificate;
            return next;
          }
          return [...prev, data.certificate];
        });
      }

      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleDeleteCertificate = async (id, title) => {
    if (!confirm(`Are you sure you want to delete certificate "${title}"?`)) return;
    try {
      const targetId = id || '';
      const res = await fetch(`/api/certificates?id=${encodeURIComponent(targetId)}&title=${encodeURIComponent(title || '')}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete certificate');
      }

      setMessage({ text: `Certificate "${title}" removed successfully`, type: 'success' });

      // Optimistically remove from React state immediately
      setCertificates((prev) =>
        prev.filter((c) => {
          if (targetId && (c.id === targetId || c._id === targetId)) return false;
          if (title && c.title === title) return false;
          return true;
        })
      );

      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  // ---------------- CAREERS & STUDENT APPLICATIONS HANDLERS ----------------
  const handleOpenCareerModal = (career = null) => {
    if (career) {
      setCurrentCareer({
        id: career.id || career._id || '',
        title: career.title || '',
        department: career.department || 'Environmental & Forestry',
        employmentType: career.employmentType || 'Full-Time',
        location: career.location || 'Ranchi, Jharkhand',
        experience: career.experience || 'Freshers / 0–2 Years',
        qualification: career.qualification || '',
        stipendOrSalary: career.stipendOrSalary || '',
        deadline: career.deadline || '',
        status: career.status || 'open',
        summary: career.summary || '',
        responsibilitiesText: Array.isArray(career.responsibilities) ? career.responsibilities.join('\n') : '',
        displayOrder: career.displayOrder ?? 0
      });
    } else {
      setCurrentCareer({
        id: '',
        title: '',
        department: 'Environmental & Forestry',
        employmentType: 'Full-Time',
        location: 'Ranchi, Jharkhand',
        experience: 'Freshers / 0–2 Years',
        qualification: '',
        stipendOrSalary: '',
        deadline: '',
        status: 'open',
        summary: '',
        responsibilitiesText: '',
        displayOrder: careers.length
      });
    }
    setCareerModalOpen(true);
  };

  const handleSaveCareer = async (e) => {
    e.preventDefault();
    if (!currentCareer.title.trim()) return;

    try {
      const payload = {
        ...currentCareer,
        responsibilities: currentCareer.responsibilitiesText
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean)
      };
      delete payload.responsibilitiesText;

      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to save career opening');

      setMessage({ text: `Career "${currentCareer.title}" saved.`, type: 'success' });
      setCareerModalOpen(false);
      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleDeleteCareer = async (id, title) => {
    if (!confirm(`Delete career opening "${title}"?`)) return;
    try {
      const res = await fetch(`/api/careers?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to delete career');
      setMessage({ text: `Removed "${title}".`, type: 'success' });
      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleUpdateApplicationStatus = async (id, status) => {
    setCareerApplications((prev) =>
      prev.map((a) => ((a.id === id || a._id === id) ? { ...a, status } : a))
    );
    try {
      const res = await fetch('/api/career-applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Status update failed');
      setMessage({ text: `Application status set to ${status}.`, type: 'success' });
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
      fetchData();
    }
  };

  const handleDeleteApplication = async (id, applicantName) => {
    if (!confirm(`Delete application from "${applicantName}"?`)) return;
    try {
      const res = await fetch(`/api/career-applications?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Delete failed');
      setCareerApplications((prev) => prev.filter((a) => a.id !== id && a._id !== id));
      setMessage({ text: `Deleted application from "${applicantName}".`, type: 'success' });
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  // ---------------- ABOUT US CAROUSEL HANDLERS ----------------
  const handleOpenAboutModal = (img = null) => {
    if (img) {
      setCurrentAboutImage({
        id: img.id || img._id || '',
        title: img.title || '',
        imageUrl: img.imageUrl || '',
        displayOrder: img.displayOrder ?? 0
      });
    } else {
      setCurrentAboutImage({
        id: '',
        title: '',
        imageUrl: '',
        displayOrder: aboutImages.length
      });
    }
    setAboutModalOpen(true);
  };

  const handleSaveAboutImage = async (e) => {
    e.preventDefault();
    if (!currentAboutImage.imageUrl.trim()) return;

    try {
      const res = await fetch('/api/about-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentAboutImage)
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to save About Us image');

      setMessage({ text: 'About Us carousel image saved.', type: 'success' });
      setAboutModalOpen(false);
      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleDeleteAboutImage = async (id, title) => {
    if (!confirm(`Delete carousel image "${title || 'Slide'}"?`)) return;
    try {
      const res = await fetch(`/api/about-images?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to delete image');

      setAboutImages((prev) => prev.filter((item) => item.id !== id && item._id !== id));
      setMessage({ text: 'About Us carousel image removed.', type: 'success' });
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const tabTitles = {
    services: 'Services',
    products: 'Products',
    partners: 'Partners',
    certificates: 'Certificates',
    clients: 'Client Logos',
    aboutImages: 'About Us Images',
    blogs: 'Blogs',
    gallery: 'Gallery',
    videos: 'Videos',
    careers: 'Careers',
    applications: 'Student Applications',
    enquiries: 'Inquiries'
  };

  const tabCounts = {
    services: services.length,
    products: products.length,
    partners: partners.length,
    certificates: certificates.length,
    clients: clients.length,
    aboutImages: aboutImages.length,
    blogs: blogs.length,
    gallery: gallery.length,
    videos: videos.length,
    careers: careers.length,
    applications: careerApplications.length,
    enquiries: enquiries.length
  };

  const tabDescriptions = {
    services: 'Consulting & field solutions',
    products: 'Conservation hardware & specs',
    partners: 'Institutional partner records',
    certificates: 'ISO, MSME & empanelment PDFs',
    clients: 'Homepage & clients marquee logos',
    aboutImages: 'Homepage About Us right-side auto carousel slides',
    blogs: 'Published articles & updates',
    gallery: 'Field photos & Cloudinary assets',
    videos: 'YouTube demo links',
    careers: 'Post job & internship openings',
    applications: 'Review student & candidate CVs',
    enquiries: 'Inbound contact requests'
  };

  const navItems = [
    { id: 'services', label: 'Services', count: services.length, icon: Layers },
    { id: 'products', label: 'Products', count: products.length, icon: Package },
    { id: 'partners', label: 'Partners', count: partners.length, icon: Handshake },
    { id: 'certificates', label: 'Certificates', count: certificates.length, icon: Award },
    { id: 'clients', label: 'Clients', count: clients.length, icon: Building2 },
    { id: 'aboutImages', label: 'About Us Images', count: aboutImages.length, icon: ImageIcon },
    { id: 'blogs', label: 'Blogs', count: blogs.length, icon: BookOpen },
    { id: 'gallery', label: 'Gallery', count: gallery.length, icon: Camera },
    { id: 'videos', label: 'Videos', count: videos.length, icon: Tv },
    { id: 'careers', label: 'Careers', count: careers.length, icon: Briefcase },
    { id: 'applications', label: 'Applications', count: careerApplications.length, icon: GraduationCap },
    { id: 'enquiries', label: 'Inquiries', count: enquiries.length, icon: Mail }
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
              onClick={() => {
                setActiveTab(item.id);
                if (item.id !== 'blogs') setIsEditingBlog(false);
                if (item.id !== 'services') setIsEditingService(false);
              }}
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
                  if (item.id !== 'services') setIsEditingService(false);
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
        {/* Content Area Sticky Top Bar (Hidden during full-width editing) */}
        {!isEditingBlog && !isEditingService && (
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
              isEditingService ? (
                <button
                  onClick={() => setIsEditingService(false)}
                  className="inline-flex items-center gap-1 bg-[#F5F8F3] hover:bg-[#EAEFE8] text-[#173B26] px-2 py-0.5 rounded text-xs font-medium border border-[#DCE5DD] shadow-xs transition-colors"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Back to Services</span>
                </button>
              ) : (
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
                      content: '',
                      seoTitle: '',
                      metaDescription: '',
                      specs: []
                    });
                    setIsEditingService(true);
                  }}
                  className="inline-flex items-center gap-1 bg-[#216B35] hover:bg-[#174D28] text-white px-2 py-0.5 rounded text-xs font-medium shadow-xs transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Service</span>
                </button>
              )
            )}

            {activeTab === 'products' && (
              <button
                onClick={() => handleOpenProductModal()}
                className="inline-flex items-center gap-1 bg-[#216B35] hover:bg-[#174D28] text-white px-2 py-0.5 rounded text-xs font-medium shadow-xs transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Add Product</span>
              </button>
            )}

            {activeTab === 'partners' && (
              <button
                onClick={() => handleOpenPartnerModal()}
                className="inline-flex items-center gap-1 bg-[#216B35] hover:bg-[#174D28] text-white px-2 py-0.5 rounded text-xs font-medium shadow-xs transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Add Partner</span>
              </button>
            )}

            {activeTab === 'certificates' && (
              <button
                onClick={() => handleOpenCertificateModal()}
                className="inline-flex items-center gap-1 bg-[#216B35] hover:bg-[#174D28] text-white px-2 py-0.5 rounded text-xs font-medium shadow-xs transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Add Certificate</span>
              </button>
            )}

            {activeTab === 'clients' && (
              <button
                onClick={() => handleOpenClientModal()}
                className="inline-flex items-center gap-1 bg-[#216B35] hover:bg-[#174D28] text-white px-2 py-0.5 rounded text-xs font-medium shadow-xs transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Add Client Logo</span>
              </button>
            )}

            {activeTab === 'aboutImages' && (
              <button
                onClick={() => handleOpenAboutModal()}
                className="inline-flex items-center gap-1 bg-[#216B35] hover:bg-[#174D28] text-white px-2 py-0.5 rounded text-xs font-medium shadow-xs transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Add Slide</span>
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
                          showOnHome: false,
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
                      showOnHome: false,
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
                onClick={() => handleOpenVideoModal()}
                className="inline-flex items-center gap-1 bg-[#216B35] hover:bg-[#174D28] text-white px-2 py-0.5 rounded text-xs font-medium shadow-xs transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Add Video</span>
              </button>
            )}

            {activeTab === 'careers' && (
              <button
                onClick={() => handleOpenCareerModal()}
                className="inline-flex items-center gap-1 bg-[#216B35] hover:bg-[#174D28] text-white px-2 py-0.5 rounded text-xs font-medium shadow-xs transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Add Opening</span>
              </button>
            )}

            {activeTab === 'applications' && careerApplications.length > 0 && (
              <button
                onClick={() => {
                  setAppFilterCareer('All');
                  setAppFilterStatus('All');
                  setAppSearch('');
                }}
                className="inline-flex items-center gap-1 bg-[#F5F8F3] hover:bg-[#EAEFE8] text-[#173B26] px-2 py-0.5 rounded text-xs font-medium border border-[#DCE5DD]"
              >
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </header>
        )}

        {/* Content Body: Exactly max 3px left/right space (or 0 when editing) */}
        <div className={`w-full flex-1 ${isEditingService || isEditingBlog ? 'p-0' : 'px-[3px] py-1'}`}>
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
          isEditingService ? (
            <div className="w-full">
              <ServiceEditor
                key={currentService.id || currentService.slug || 'new-service'}
                initialService={currentService}
                categories={serviceCategories}
                onSave={handleSaveService}
                onCancel={() => setIsEditingService(false)}
                onUploadImage={handleImageUpload}
                onAddCategory={async (name) => {
                  const res = await fetch('/api/categories', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, type: 'service' })
                  });
                  const data = await res.json();
                  if (!res.ok || !data.success) throw new Error(data.error || 'Failed');
                  setServiceCategories((prev) => Array.from(new Set([...prev, name])).sort());
                }}
              />
            </div>
          ) : (
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
                              setIsEditingService(true);
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
          )
        )}

        {/* ================= TAB: PRODUCTS ================= */}
        {activeTab === 'products' && (
          <div className="bg-white rounded border border-[#DCE5DD] shadow-xs overflow-hidden w-full">
            {products.length === 0 ? (
              <div className="p-10 text-center text-xs text-[#68756D] space-y-2">
                <Package className="w-8 h-8 text-[#216B35]/40 mx-auto" />
                <p className="font-semibold text-sm text-[#173B26]">No Products Added Yet</p>
                <p className="max-w-md mx-auto text-[#68756D]">
                  Click the button below to add your first conservation technology or hardware product.
                </p>
                <button
                  onClick={() => handleOpenProductModal()}
                  className="btn-primary text-xs px-3.5 py-1.5 inline-flex items-center gap-1.5 mt-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add First Product</span>
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#4B5563]">
                  <thead className="bg-[#F5F8F3] text-[10px] uppercase tracking-wider text-[#173B26] border-b border-[#DCE5DD]">
                    <tr>
                      <th className="px-3 py-2 font-semibold w-16">Image</th>
                      <th className="px-3 py-2 font-semibold">Product Title &amp; Category</th>
                      <th className="px-3 py-2 font-semibold">Pricing / Framework</th>
                      <th className="px-3 py-2 font-semibold">Specs Count</th>
                      <th className="px-3 py-2 font-semibold">Status</th>
                      <th className="px-3 py-2 font-semibold text-right w-28">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCE5DD]">
                    {products.map((prod) => (
                      <tr key={prod.id || prod._id || prod.slug} className="hover:bg-[#F5F8F3]/50 transition-colors">
                        <td className="px-3 py-2">
                          <div className="w-12 h-10 rounded bg-[#F5F8F3] border border-[#DCE5DD] flex items-center justify-center p-0.5 overflow-hidden">
                            <img
                              src={prod.featuredImage || '/details.jpeg'}
                              alt={prod.title}
                              className="w-full h-full object-cover rounded-xs"
                            />
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-[#173B26]">{prod.title}</span>
                            {prod.modelCode && (
                              <span className="text-[9px] font-mono font-bold bg-[#F5F8F3] text-[#216B35] px-1.5 py-0.2 rounded border border-[#DCE5DD]">
                                {prod.modelCode}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#216B35] block">{prod.category}</span>
                        </td>
                        <td className="px-3 py-2 text-[11px] text-[#4B5563]">
                          {prod.price || 'Official Quote'}
                        </td>
                        <td className="px-3 py-2 text-[11px]">
                          <span className="bg-[#F5F8F3] text-[#173B26] px-2 py-0.5 rounded border border-[#DCE5DD]">
                            {prod.specs ? prod.specs.length : 0} specs
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <span className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-medium border ${
                            prod.status === 'published'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}>
                            {prod.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-right whitespace-nowrap space-x-1">
                          <Link
                            href={prod.slug ? `/products/${prod.slug}` : '/products'}
                            target="_blank"
                            className="p-1 rounded text-[#4B5563] hover:text-[#216B35] inline-block"
                            title="View on site"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleOpenProductModal(prod)}
                            className="p-1 rounded text-[#216B35] hover:bg-[#F5F8F3]"
                            title="Edit Product"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod._id || prod.id || prod.slug, prod.title)}
                            className="p-1 rounded text-red-600 hover:bg-red-50"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB: PARTNERS ================= */}
        {activeTab === 'partners' && (
          <div className="bg-white rounded border border-[#DCE5DD] shadow-xs overflow-hidden w-full">
            {partners.length === 0 ? (
              <div className="p-10 text-center text-xs text-[#68756D] space-y-2">
                <Handshake className="w-8 h-8 text-[#216B35]/40 mx-auto" />
                <p className="font-semibold text-sm text-[#173B26]">No Partners Added Yet</p>
                <p className="max-w-md mx-auto text-[#68756D]">
                  Click the button below to add your first official institutional partner or MoU collaboration.
                </p>
                <button
                  onClick={() => handleOpenPartnerModal()}
                  className="btn-primary text-xs px-3.5 py-1.5 inline-flex items-center gap-1.5 mt-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add First Partner</span>
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#4B5563]">
                  <thead className="bg-[#F5F8F3] text-[10px] uppercase tracking-wider text-[#173B26] border-b border-[#DCE5DD]">
                    <tr>
                      <th className="px-3 py-2 font-semibold w-16">Logo</th>
                      <th className="px-3 py-2 font-semibold">Partner / Entity Name</th>
                      <th className="px-3 py-2 font-semibold">Category</th>
                      <th className="px-3 py-2 font-semibold">Collaboration Scope</th>
                      <th className="px-3 py-2 font-semibold w-20">Order</th>
                      <th className="px-3 py-2 font-semibold text-right w-24">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCE5DD]">
                    {partners.map((part) => (
                      <tr key={part.id || part._id || part.name} className="hover:bg-[#F5F8F3]/50 transition-colors">
                        <td className="px-3 py-2">
                          <div className="w-12 h-10 rounded bg-[#F5F8F3] border border-[#DCE5DD] flex items-center justify-center p-1 overflow-hidden">
                            <img
                              src={part.logoUrl || '/logo.jpeg'}
                              alt={part.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <span className="font-semibold text-[#173B26] block">{part.name}</span>
                          {part.websiteUrl && (
                            <a
                              href={part.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-[#216B35] hover:underline inline-flex items-center gap-0.5"
                            >
                              <span>Website</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </td>
                        <td className="px-3 py-2 text-[11px] font-medium text-[#173B26]">
                          {part.category}
                        </td>
                        <td className="px-3 py-2 text-[11px] text-[#4B5563] max-w-xs truncate">
                          {part.collaborationType || part.description}
                        </td>
                        <td className="px-3 py-2 text-[11px] text-[#68756D]">
                          {part.displayOrder || 0}
                        </td>
                        <td className="px-3 py-2 text-right whitespace-nowrap space-x-1">
                          <button
                            onClick={() => handleOpenPartnerModal(part)}
                            className="p-1 rounded text-[#216B35] hover:bg-[#F5F8F3]"
                            title="Edit Partner"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeletePartner(part._id || part.id || part.name, part.name)}
                            className="p-1 rounded text-red-600 hover:bg-red-50"
                            title="Delete Partner"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB: CERTIFICATES ================= */}
        {activeTab === 'certificates' && (
          <div className="bg-white rounded border border-[#DCE5DD] shadow-xs overflow-hidden w-full">
            {certificates.length === 0 ? (
              <div className="p-10 text-center text-xs text-[#68756D] space-y-2">
                <FileText className="w-8 h-8 text-red-500/50 mx-auto" />
                <p className="font-semibold text-sm text-[#173B26]">No PDF Certificates Added Yet</p>
                <p className="max-w-md mx-auto text-[#68756D]">
                  Add your ISO certificates, statutory approvals, and credentials with their Google Drive or direct PDF link.
                </p>
                <button
                  onClick={() => handleOpenCertificateModal()}
                  className="btn-primary text-xs px-3.5 py-1.5 inline-flex items-center gap-1.5 mt-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add First PDF Certificate</span>
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#4B5563]">
                  <thead className="bg-[#F5F8F3] text-[10px] uppercase tracking-wider text-[#173B26] border-b border-[#DCE5DD]">
                    <tr>
                      <th className="px-3 py-2 font-semibold w-16 text-center">Format</th>
                      <th className="px-3 py-2 font-semibold">Certificate / PDF Title</th>
                      <th className="px-3 py-2 font-semibold">Google Drive / PDF Link</th>
                      <th className="px-3 py-2 font-semibold w-16 text-center">Order</th>
                      <th className="px-3 py-2 font-semibold text-right w-28">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCE5DD]">
                    {certificates.map((cert) => {
                      const link = cert.pdfUrl || cert.pdfLink || cert.imageUrl || '';
                      return (
                        <tr key={cert.id || cert._id || cert.title} className="hover:bg-[#F5F8F3]/50 transition-colors">
                          <td className="px-3 py-2 text-center">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-red-100 text-red-700 border border-red-200 px-1.5 py-0.5 rounded">
                              <FileText className="w-3 h-3 text-red-600" />
                              PDF
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <span className="font-semibold text-[#173B26] block text-xs">{cert.title}</span>
                            <span className="text-[10px] text-[#216B35]">Square Card Display</span>
                          </td>
                          <td className="px-3 py-2 font-mono text-[11px] text-[#68756D] max-w-xs truncate">
                            {link ? (
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#216B35] hover:underline inline-flex items-center gap-1 max-w-xs truncate"
                                title={link}
                              >
                                <span className="truncate">{link}</span>
                                <ExternalLink className="w-3 h-3 shrink-0" />
                              </a>
                            ) : (
                              <span className="text-gray-400">No link set</span>
                            )}
                          </td>
                          <td className="px-3 py-2 text-center text-[11px] font-mono text-[#173B26]">
                            {cert.displayOrder ?? 0}
                          </td>
                          <td className="px-3 py-2 text-right whitespace-nowrap space-x-1">
                            <Link
                              href="/certificates"
                              target="_blank"
                              className="p-1 rounded text-[#68756D] hover:text-[#173B26] hover:bg-[#F5F8F3] inline-block"
                              title="View on Public Certificates Page"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                            <button
                              onClick={() => handleOpenCertificateModal(cert)}
                              className="p-1 rounded text-[#216B35] hover:bg-[#F5F8F3]"
                              title="Edit Certificate"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteCertificate(cert.id || cert._id, cert.title)}
                              className="p-1 rounded text-red-600 hover:bg-red-50"
                              title="Delete Certificate"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB: CLIENTS ================= */}
        {activeTab === 'clients' && (
          <div className="bg-white rounded border border-[#DCE5DD] shadow-xs overflow-hidden w-full">
            {clients.length === 0 ? (
              <div className="p-10 text-center text-xs text-[#68756D] space-y-2">
                <Building2 className="w-8 h-8 text-[#216B35]/40 mx-auto" />
                <p className="font-semibold text-sm text-[#173B26]">No Client Logos Added Yet</p>
                <p className="max-w-md mx-auto text-[#68756D]">
                  Click the button below to upload your first official client or partner logo.
                </p>
                <button
                  onClick={() => handleOpenClientModal()}
                  className="btn-primary text-xs px-3.5 py-1.5 inline-flex items-center gap-1.5 mt-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add First Client</span>
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#4B5563]">
                  <thead className="bg-[#F5F8F3] text-[10px] uppercase tracking-wider text-[#173B26] border-b border-[#DCE5DD]">
                    <tr>
                      <th className="px-3 py-2 font-semibold w-16">Logo</th>
                      <th className="px-3 py-2 font-semibold">Client / Partner Name</th>
                      <th className="px-3 py-2 font-semibold">Website Link</th>
                      <th className="px-3 py-2 font-semibold w-24">Display Order</th>
                      <th className="px-3 py-2 font-semibold text-right w-24">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCE5DD]">
                    {clients.map((cli) => (
                      <tr key={cli.id || cli._id} className="hover:bg-[#F5F8F3]/50 transition-colors">
                        <td className="px-3 py-2">
                          <div className="w-12 h-10 rounded bg-white border border-[#DCE5DD] flex items-center justify-center p-1 overflow-hidden">
                            <img
                              src={cli.logoUrl}
                              alt={cli.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <span className="font-semibold text-[#173B26]">{cli.name}</span>
                        </td>
                        <td className="px-3 py-2">
                          {cli.websiteUrl ? (
                            <a
                              href={cli.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#216B35] hover:underline flex items-center gap-1 max-w-xs truncate font-mono text-[11px]"
                            >
                              <span>{cli.websiteUrl}</span>
                              <ExternalLink className="w-3 h-3 shrink-0" />
                            </a>
                          ) : (
                            <span className="text-[#9CA3AF] text-[11px]">—</span>
                          )}
                        </td>
                        <td className="px-3 py-2">
                          <span className="px-2 py-0.5 rounded bg-[#F5F8F3] text-[#173B26] border border-[#DCE5DD] font-mono text-[11px]">
                            #{cli.displayOrder ?? 0}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleOpenClientModal(cli)}
                              className="p-1 rounded text-[#216B35] hover:bg-[#F5F8F3]"
                              title="Edit Client Logo"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteClient(cli.id || cli._id, cli.name)}
                              className="p-1 rounded text-red-600 hover:bg-red-50"
                              title="Delete Client Logo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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

        {/* ================= TAB 4: GALLERY ================= */}
        {activeTab === 'gallery' && (
          <div className="bg-white rounded border border-[#DCE5DD] shadow-xs overflow-hidden p-2 w-full space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 px-2 py-1.5 rounded bg-[#F5F8F3] border border-[#DCE5DD] text-[11px]">
              <span className="font-semibold text-[#173B26]">
                Homepage (&quot;Survey Team at Work&quot;): {gallery.filter((g) => Boolean(g.showOnHome)).length} / 4 ticked
              </span>
              <span className="text-[#68756D]">
                Tick up to 4 images below to display in 1 row on the homepage.
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {/* Cloudinary Quick Upload Card */}
              <label className="rounded border-2 border-dashed border-[#216B35]/40 hover:border-[#216B35] bg-[#F5F8F3]/50 hover:bg-[#F5F8F3] p-2.5 flex flex-col items-center justify-center text-center cursor-pointer transition-all group min-h-[120px]">
                <div className="w-8 h-8 rounded bg-white text-[#216B35] flex items-center justify-center shadow-xs mb-1 border border-[#216B35]/20">
                  {uploadingImage ? (
                    <div className="w-4 h-4 border-2 border-[#216B35] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                </div>
                <span className="text-[11px] font-bold text-[#173B26] block">
                  {uploadingImage ? 'Uploading...' : 'Upload Image'}
                </span>
                <span className="text-[9px] text-[#68756D] mt-0.5">Cloudinary CDN</span>
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
                        showOnHome: false,
                        displayOrder: 0
                      });
                      setGalleryModalOpen(true);
                    }
                  }}
                />
              </label>

              {gallery.map((gal) => (
                <div
                  key={gal.id || gal._id}
                  className={`rounded border overflow-hidden flex flex-col justify-between group ${
                    gal.showOnHome
                      ? 'border-[#216B35] bg-emerald-50/40'
                      : 'border-[#DCE5DD] bg-slate-50'
                  }`}
                >
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
                  <div className="p-1.5 border-t border-[#DCE5DD]/60 bg-white flex items-center justify-between gap-1">
                    <label className="inline-flex items-center gap-1 cursor-pointer select-none text-[10px] font-semibold text-[#173B26]">
                      <input
                        type="checkbox"
                        checked={Boolean(gal.showOnHome)}
                        onChange={() => handleToggleGalleryHome(gal)}
                        className="w-3.5 h-3.5 accent-[#216B35] rounded cursor-pointer"
                      />
                      <span className={gal.showOnHome ? 'text-[#216B35]' : 'text-[#68756D]'}>
                        Home
                      </span>
                    </label>
                    <div className="flex items-center gap-0.5">
                      <button
                        onClick={() => {
                          setCurrentGallery({
                            ...gal,
                            showOnHome: Boolean(gal.showOnHome),
                            id: gal._id || gal.id
                          });
                          setGalleryModalOpen(true);
                        }}
                        className="p-0.5 rounded text-[#216B35] hover:bg-[#F5F8F3]"
                        title="Edit Photo"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteGallery(gal._id || gal.id || gal.imageUrl, gal.title)}
                        className="p-0.5 rounded text-red-600 hover:bg-red-50"
                        title="Delete Photo"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 5: VIDEOS ================= */}
        {activeTab === 'videos' && (
          <div className="bg-white rounded border border-[#DCE5DD] shadow-xs overflow-hidden p-3 w-full">
            {videos.length === 0 ? (
              <div className="p-10 text-center text-xs text-[#68756D] space-y-2">
                <Video className="w-8 h-8 text-[#216B35]/40 mx-auto" />
                <p className="font-semibold text-sm text-[#173B26]">No Demonstration Videos Found</p>
                <p className="max-w-md mx-auto text-[#68756D]">
                  Add YouTube tech demos, field operational tests, and equipment reviews.
                </p>
                <button
                  onClick={() => handleOpenVideoModal()}
                  className="btn-primary text-xs px-3.5 py-1.5 inline-flex items-center gap-1.5 mt-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add First Video</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
                {videos.map((vid) => (
                  <div key={vid._id || vid.id} className="rounded border border-[#DCE5DD] overflow-hidden bg-white hover:border-[#216B35]/50 transition-all flex flex-col justify-between">
                    <div>
                      <div className="relative h-28 w-full bg-slate-900 group overflow-hidden">
                        <img
                          src={vid.thumbnail || '/img4.jpeg'}
                          alt={vid.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="w-7 h-7 rounded bg-[#216B35] text-white flex items-center justify-center shadow-sm">
                            <Play className="w-3.5 h-3.5 fill-current" />
                          </div>
                        </div>
                        {vid.category && (
                          <span className="absolute top-2 left-2 text-[10px] font-semibold text-[#173B26] bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded shadow-xs border border-[#DCE5DD]">
                            {vid.category}
                          </span>
                        )}
                      </div>

                      <div className="p-3 space-y-1.5">
                        <h4 className="font-bold text-[#173B26] text-xs leading-snug line-clamp-2" title={vid.title}>
                          {vid.title}
                        </h4>
                        <p className="text-[11px] text-[#68756D] line-clamp-2 leading-relaxed">
                          {vid.description || 'No description provided.'}
                        </p>
                        <div className="pt-1 flex items-center gap-1 text-[10px] text-[#216B35] font-mono truncate">
                          <ExternalLink className="w-3 h-3 shrink-0" />
                          <span className="truncate">{vid.embedUrl}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 pt-2 border-t border-[#DCE5DD]/60 bg-[#F5F8F3]/40 flex items-center justify-between">
                      <span className="text-[10px] text-[#68756D] font-mono">
                        Order: {vid.displayOrder || 0}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenVideoModal(vid)}
                          className="p-1.5 rounded text-[#216B35] hover:bg-white border border-transparent hover:border-[#DCE5DD] transition-colors"
                          title="Edit Video"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(vid._id || vid.id, vid.title)}
                          className="p-1.5 rounded text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Video"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB: ABOUT US IMAGES ================= */}
        {activeTab === 'aboutImages' && (
          <div className="bg-white rounded border border-[#DCE5DD] shadow-xs overflow-hidden p-2.5 w-full">
            {aboutImages.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#68756D] space-y-2">
                <ImageIcon className="w-6 h-6 text-[#216B35]/50 mx-auto" />
                <p className="font-semibold text-[#173B26]">No About Us Carousel Slides Yet</p>
                <button
                  onClick={() => handleOpenAboutModal()}
                  className="btn-primary text-xs px-3 py-1 rounded inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add First Slide</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {aboutImages.map((img) => {
                  const imgId = img.id || img._id;
                  return (
                    <div key={imgId} className="rounded border border-[#DCE5DD] overflow-hidden bg-slate-50 flex flex-col justify-between">
                      <div className="relative">
                        <img
                          src={img.imageUrl}
                          alt={img.title || 'About Us Slide'}
                          className="w-full h-28 object-cover"
                        />
                        <span className="absolute top-1 left-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                          #{img.displayOrder ?? 0}
                        </span>
                        <div className="p-1.5 bg-white border-t border-[#DCE5DD]/60">
                          <h4 className="font-semibold text-[#173B26] text-[11px] truncate">
                            {img.title || 'Carousel Slide'}
                          </h4>
                        </div>
                      </div>
                      <div className="p-1 bg-white border-t border-[#DCE5DD]/60 flex justify-end gap-1">
                        <button
                          onClick={() => handleOpenAboutModal(img)}
                          className="p-0.5 rounded text-[#216B35] hover:bg-[#F5F8F3]"
                          title="Edit Slide"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteAboutImage(imgId, img.title)}
                          className="p-0.5 rounded text-red-600 hover:bg-red-50"
                          title="Delete Slide"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB: CAREERS ================= */}
        {activeTab === 'careers' && (
          <div className="bg-white rounded border border-[#DCE5DD] shadow-xs overflow-hidden w-full">
            {careers.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#68756D] space-y-2">
                <Briefcase className="w-6 h-6 text-[#216B35]/50 mx-auto" />
                <p className="font-semibold text-[#173B26]">No Career Openings Added</p>
                <button
                  onClick={() => handleOpenCareerModal()}
                  className="btn-primary text-xs px-3 py-1 rounded inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Opening</span>
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#4B5563]">
                  <thead className="bg-[#F5F8F3] text-[10px] uppercase tracking-wider text-[#173B26] border-b border-[#DCE5DD]">
                    <tr>
                      <th className="px-2.5 py-1.5 font-semibold">Position &amp; Department</th>
                      <th className="px-2.5 py-1.5 font-semibold">Type &amp; Location</th>
                      <th className="px-2.5 py-1.5 font-semibold">Qualification / Pay</th>
                      <th className="px-2.5 py-1.5 font-semibold text-center">Status</th>
                      <th className="px-2.5 py-1.5 font-semibold text-center">Applications</th>
                      <th className="px-2.5 py-1.5 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCE5DD]">
                    {careers.map((car) => {
                      const carId = car.id || car._id;
                      const applicantCount = careerApplications.filter(
                        (a) => (a.careerId && a.careerId === carId) || a.careerTitle === car.title
                      ).length;
                      return (
                        <tr key={carId} className="hover:bg-[#F5F8F3]/60 transition-colors">
                          <td className="px-2.5 py-1.5">
                            <span className="font-semibold text-[#173B26] block">{car.title}</span>
                            <span className="text-[10px] text-[#68756D]">{car.department}</span>
                          </td>
                          <td className="px-2.5 py-1.5">
                            <span className="inline-block px-1.5 py-0.5 rounded bg-[#F5F8F3] border border-[#DCE5DD] text-[#173B26] text-[10px] font-medium">
                              {car.employmentType}
                            </span>
                            <span className="block text-[10px] text-[#68756D] mt-0.5">{car.location}</span>
                          </td>
                          <td className="px-2.5 py-1.5 max-w-xs">
                            <span className="block text-[11px] text-[#173B26] truncate">{car.qualification || '—'}</span>
                            <span className="block text-[10px] text-[#68756D] truncate">
                              {car.experience}{car.stipendOrSalary ? ` • ${car.stipendOrSalary}` : ''}
                            </span>
                          </td>
                          <td className="px-2.5 py-1.5 text-center">
                            <span
                              className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase ${
                                car.status === 'open'
                                  ? 'bg-emerald-50 text-[#216B35] border border-emerald-200'
                                  : 'bg-slate-100 text-slate-600 border border-slate-200'
                              }`}
                            >
                              {car.status || 'open'}
                            </span>
                          </td>
                          <td className="px-2.5 py-1.5 text-center">
                            <button
                              type="button"
                              onClick={() => {
                                setAppFilterCareer(car.title);
                                setActiveTab('applications');
                              }}
                              className="px-2 py-0.5 rounded bg-[#F5F8F3] hover:bg-[#216B35] hover:text-white text-[#216B35] border border-[#DCE5DD] text-[11px] font-semibold transition-colors"
                              title="View Student Applications for this Role"
                            >
                              {applicantCount} Applied
                            </button>
                          </td>
                          <td className="px-2.5 py-1.5 text-right whitespace-nowrap space-x-1">
                            <button
                              onClick={() => handleOpenCareerModal(car)}
                              className="p-1 rounded text-[#216B35] hover:bg-[#F5F8F3]"
                              title="Edit Opening"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteCareer(carId, car.title)}
                              className="p-1 rounded text-red-600 hover:bg-red-50"
                              title="Delete Opening"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB: STUDENT APPLICATIONS ================= */}
        {activeTab === 'applications' && (
          <div className="space-y-2 w-full">
            {/* Compact Filter Bar */}
            <div className="bg-white rounded border border-[#DCE5DD] p-2 flex flex-wrap items-center gap-2">
              <div className="relative flex-1 min-w-[180px]">
                <Search className="w-3.5 h-3.5 text-[#68756D] absolute left-2 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={appSearch}
                  onChange={(e) => setAppSearch(e.target.value)}
                  placeholder="Search student, college, city, email..."
                  className="w-full pl-7 pr-2 py-1 rounded border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                />
              </div>
              <select
                value={appFilterCareer}
                onChange={(e) => setAppFilterCareer(e.target.value)}
                className="px-2 py-1 rounded border border-[#DCE5DD] text-xs bg-white focus:border-[#216B35] focus:outline-none max-w-[220px]"
              >
                <option value="All">All Positions</option>
                {Array.from(new Set(careerApplications.map((a) => a.careerTitle).filter(Boolean))).map((title) => (
                  <option key={title} value={title}>{title}</option>
                ))}
              </select>
              <select
                value={appFilterStatus}
                onChange={(e) => setAppFilterStatus(e.target.value)}
                className="px-2 py-1 rounded border border-[#DCE5DD] text-xs bg-white focus:border-[#216B35] focus:outline-none"
              >
                <option value="All">All Status</option>
                <option value="New">New</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Applications List */}
            <div className="bg-white rounded border border-[#DCE5DD] shadow-xs overflow-hidden w-full">
              {(() => {
                const filteredApps = careerApplications.filter((a) => {
                  const matchRole = appFilterCareer === 'All' || a.careerTitle === appFilterCareer;
                  const matchStatus = appFilterStatus === 'All' || (a.status || 'New') === appFilterStatus;
                  const q = appSearch.trim().toLowerCase();
                  const matchQ =
                    !q ||
                    a.applicantName?.toLowerCase().includes(q) ||
                    a.collegeOrUniversity?.toLowerCase().includes(q) ||
                    a.qualification?.toLowerCase().includes(q) ||
                    a.city?.toLowerCase().includes(q) ||
                    a.email?.toLowerCase().includes(q) ||
                    a.careerTitle?.toLowerCase().includes(q);
                  return matchRole && matchStatus && matchQ;
                });

                if (filteredApps.length === 0) {
                  return (
                    <div className="p-6 text-center text-xs text-[#68756D] space-y-1">
                      <GraduationCap className="w-6 h-6 text-[#216B35]/50 mx-auto" />
                      <p className="font-semibold text-[#173B26]">No Matching Student Applications</p>
                      <p>Applications submitted on /careers appear here automatically.</p>
                    </div>
                  );
                }

                return (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-[#4B5563]">
                      <thead className="bg-[#F5F8F3] text-[10px] uppercase tracking-wider text-[#173B26] border-b border-[#DCE5DD]">
                        <tr>
                          <th className="px-2.5 py-1.5 font-semibold">Candidate / College</th>
                          <th className="px-2.5 py-1.5 font-semibold">Position Applied</th>
                          <th className="px-2.5 py-1.5 font-semibold">Contact &amp; City</th>
                          <th className="px-2.5 py-1.5 font-semibold">Resume / Note</th>
                          <th className="px-2.5 py-1.5 font-semibold">Status</th>
                          <th className="px-2.5 py-1.5 font-semibold text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#DCE5DD]">
                        {filteredApps.map((app) => {
                          const appId = app.id || app._id;
                          return (
                            <tr key={appId} className="hover:bg-[#F5F8F3]/60 align-top">
                              <td className="px-2.5 py-2">
                                <span className="font-semibold text-[#173B26] block">{app.applicantName}</span>
                                <span className="text-[11px] text-[#4B5563] block">
                                  {app.qualification || '—'}{app.passingYear ? ` (${app.passingYear})` : ''}
                                </span>
                                {app.collegeOrUniversity && (
                                  <span className="text-[10px] text-[#68756D] block">{app.collegeOrUniversity}</span>
                                )}
                              </td>
                              <td className="px-2.5 py-2">
                                <span className="inline-block px-1.5 py-0.5 rounded bg-[#F5F8F3] border border-[#DCE5DD] text-[#173B26] font-medium text-[11px]">
                                  {app.careerTitle}
                                </span>
                                <span className="block text-[10px] text-[#68756D] mt-0.5 font-mono">
                                  {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : ''}
                                </span>
                              </td>
                              <td className="px-2.5 py-2">
                                <a href={`mailto:${app.email}`} className="text-[#216B35] hover:underline block text-[11px]">
                                  {app.email}
                                </a>
                                <a href={`tel:${app.phone}`} className="text-[#173B26] hover:underline block text-[11px] font-mono">
                                  {app.phone}
                                </a>
                                {app.city && <span className="text-[10px] text-[#68756D] block">{app.city}</span>}
                              </td>
                              <td className="px-2.5 py-2 max-w-xs space-y-1">
                                {app.resumeUrl ? (
                                  <a
                                    href={app.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#216B35] hover:bg-[#174D28] text-white text-[10px] font-semibold"
                                  >
                                    <FileText className="w-3 h-3" />
                                    <span>View CV</span>
                                    <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                ) : (
                                  <span className="text-[10px] text-[#68756D]">No file attached</span>
                                )}
                                {app.experienceSummary && (
                                  <span className="block text-[10px] text-[#173B26]">Skills: {app.experienceSummary}</span>
                                )}
                                {app.coverNote && (
                                  <p className="text-[10px] text-[#4B5563] bg-[#F5F8F3] px-1.5 py-1 rounded border border-[#DCE5DD] line-clamp-2" title={app.coverNote}>
                                    {app.coverNote}
                                  </p>
                                )}
                              </td>
                              <td className="px-2.5 py-2">
                                <select
                                  value={app.status || 'New'}
                                  onChange={(e) => handleUpdateApplicationStatus(appId, e.target.value)}
                                  className="px-1.5 py-0.5 rounded border border-[#DCE5DD] text-[11px] font-semibold bg-white text-[#173B26] focus:border-[#216B35] focus:outline-none"
                                >
                                  <option value="New">New</option>
                                  <option value="Reviewed">Reviewed</option>
                                  <option value="Shortlisted">Shortlisted</option>
                                  <option value="Rejected">Rejected</option>
                                </select>
                              </td>
                              <td className="px-2.5 py-2 text-right">
                                <button
                                  onClick={() => handleDeleteApplication(appId, app.applicantName)}
                                  className="p-1 rounded text-red-600 hover:bg-red-50"
                                  title="Delete Application"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
              })()}
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
                  <div key={enq._id || enq.id} className="p-2 hover:bg-[#F5F8F3]/50 transition-colors">
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
                          onClick={() => handleDeleteEnquiry(enq._id || enq.id, enq.name)}
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

      {/* ================= MODAL: ADD / EDIT ABOUT US SLIDE ================= */}
      {aboutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2.5 overflow-y-auto">
          <div className="bg-white rounded max-w-md w-full p-3.5 sm:p-4 shadow-xl border border-[#DCE5DD] my-3">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#DCE5DD]">
              <h3 className="text-sm font-bold text-[#173B26]">
                {currentAboutImage.id ? 'Edit About Us Slide' : 'Add About Us Slide'}
              </h3>
              <button
                type="button"
                onClick={() => setAboutModalOpen(false)}
                className="text-[#68756D] hover:text-[#173B26] p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveAboutImage} className="space-y-2.5 text-xs">
              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Slide Title / Alt Caption</label>
                <input
                  type="text"
                  value={currentAboutImage.title}
                  onChange={(e) => setCurrentAboutImage({ ...currentAboutImage, title: e.target.value })}
                  placeholder="e.g. D.F.O. Ranchi Consultation Meeting"
                  className="w-full p-1.5 rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-semibold text-[#173B26]">Image *</label>
                  <label className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#F5F8F3] hover:bg-[#EAEFE8] text-[#216B35] border border-[#216B35]/40 font-semibold cursor-pointer">
                    <Upload className="w-3 h-3" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingImage}
                      onChange={(e) => handleImageUpload(e, 'about')}
                      className="hidden"
                    />
                  </label>
                </div>
                <input
                  type="text"
                  required
                  value={currentAboutImage.imageUrl}
                  onChange={(e) => setCurrentAboutImage({ ...currentAboutImage, imageUrl: e.target.value })}
                  placeholder="/img1.jpeg or Cloudinary URL"
                  className="w-full p-1.5 rounded border border-[#DCE5DD] font-mono text-[11px] focus:border-[#216B35] focus:outline-none"
                />
                {currentAboutImage.imageUrl && (
                  <div className="mt-2 rounded overflow-hidden border border-[#DCE5DD] bg-slate-100 h-36 flex items-center justify-center">
                    <img
                      src={currentAboutImage.imageUrl}
                      alt="Slide preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Display Order</label>
                <input
                  type="number"
                  value={currentAboutImage.displayOrder ?? 0}
                  onChange={(e) => setCurrentAboutImage({ ...currentAboutImage, displayOrder: parseInt(e.target.value, 10) || 0 })}
                  className="w-24 p-1.5 rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2.5 border-t border-[#DCE5DD]">
                <button
                  type="button"
                  onClick={() => setAboutModalOpen(false)}
                  className="px-3 py-1.5 rounded border border-[#DCE5DD] hover:bg-[#F5F8F3] text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingImage}
                  className="btn-primary px-4 py-1.5 rounded text-xs font-semibold disabled:opacity-60"
                >
                  {currentAboutImage.id ? 'Save Slide' : 'Add Slide'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD / EDIT CAREER OPENING ================= */}
      {careerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2.5 overflow-y-auto">
          <div className="bg-white rounded max-w-xl w-full p-3.5 sm:p-4 shadow-xl border border-[#DCE5DD] my-3 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#DCE5DD]">
              <h3 className="text-sm font-bold text-[#173B26]">
                {currentCareer.id ? 'Edit Career Opening' : 'Post New Career / Internship'}
              </h3>
              <button
                type="button"
                onClick={() => setCareerModalOpen(false)}
                className="text-[#68756D] hover:text-[#173B26] p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCareer} className="space-y-2.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#173B26] mb-1">Role / Title *</label>
                  <input
                    type="text"
                    required
                    value={currentCareer.title}
                    onChange={(e) => setCurrentCareer({ ...currentCareer, title: e.target.value })}
                    placeholder="e.g. GIS & Drone Mapping Intern"
                    className="w-full p-1.5 rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">Type</label>
                  <select
                    value={currentCareer.employmentType}
                    onChange={(e) => setCurrentCareer({ ...currentCareer, employmentType: e.target.value })}
                    className="w-full p-1.5 rounded border border-[#DCE5DD] bg-white focus:border-[#216B35] focus:outline-none"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                    <option value="Part-Time">Part-Time</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">Department</label>
                  <input
                    type="text"
                    value={currentCareer.department}
                    onChange={(e) => setCurrentCareer({ ...currentCareer, department: e.target.value })}
                    placeholder="Environmental & GIS"
                    className="w-full p-1.5 rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">Location</label>
                  <input
                    type="text"
                    value={currentCareer.location}
                    onChange={(e) => setCurrentCareer({ ...currentCareer, location: e.target.value })}
                    placeholder="Ranchi / Lucknow"
                    className="w-full p-1.5 rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">Experience</label>
                  <input
                    type="text"
                    value={currentCareer.experience}
                    onChange={(e) => setCurrentCareer({ ...currentCareer, experience: e.target.value })}
                    placeholder="Freshers / 0–2 Yrs"
                    className="w-full p-1.5 rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#173B26] mb-1">Qualification</label>
                  <input
                    type="text"
                    value={currentCareer.qualification}
                    onChange={(e) => setCurrentCareer({ ...currentCareer, qualification: e.target.value })}
                    placeholder="B.Sc / M.Sc Environmental Science, GIS, Forestry"
                    className="w-full p-1.5 rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">Stipend / Salary</label>
                  <input
                    type="text"
                    value={currentCareer.stipendOrSalary}
                    onChange={(e) => setCurrentCareer({ ...currentCareer, stipendOrSalary: e.target.value })}
                    placeholder="Optional"
                    className="w-full p-1.5 rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">Closing Date</label>
                  <input
                    type="text"
                    value={currentCareer.deadline}
                    onChange={(e) => setCurrentCareer({ ...currentCareer, deadline: e.target.value })}
                    placeholder="e.g. 2026-12-31"
                    className="w-full p-1.5 rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">Status</label>
                  <select
                    value={currentCareer.status}
                    onChange={(e) => setCurrentCareer({ ...currentCareer, status: e.target.value })}
                    className="w-full p-1.5 rounded border border-[#DCE5DD] bg-white focus:border-[#216B35] focus:outline-none"
                  >
                    <option value="open">Open (Live)</option>
                    <option value="closed">Closed (Hidden)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">Display Order</label>
                  <input
                    type="number"
                    value={currentCareer.displayOrder ?? 0}
                    onChange={(e) => setCurrentCareer({ ...currentCareer, displayOrder: parseInt(e.target.value, 10) || 0 })}
                    className="w-full p-1.5 rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Role Summary</label>
                <textarea
                  rows={2}
                  value={currentCareer.summary}
                  onChange={(e) => setCurrentCareer({ ...currentCareer, summary: e.target.value })}
                  placeholder="Concise summary of the position..."
                  className="w-full p-1.5 rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Key Responsibilities (one per line)</label>
                <textarea
                  rows={3}
                  value={currentCareer.responsibilitiesText}
                  onChange={(e) => setCurrentCareer({ ...currentCareer, responsibilitiesText: e.target.value })}
                  placeholder="Assist with EIA/FC field data&#10;Prepare KML/GIS maps"
                  className="w-full p-1.5 rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2.5 border-t border-[#DCE5DD]">
                <button
                  type="button"
                  onClick={() => setCareerModalOpen(false)}
                  className="px-3 py-1.5 rounded border border-[#DCE5DD] hover:bg-[#F5F8F3] text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-4 py-1.5 rounded text-xs font-semibold"
                >
                  {currentCareer.id ? 'Save Opening' : 'Publish Opening'}
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
                  <div className="mt-2 p-2.5 bg-emerald-50/70 rounded border border-emerald-200 space-y-2 animate-in fade-in duration-150">
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
                    <div className="relative rounded overflow-hidden border border-[#DCE5DD] bg-slate-100 h-36 flex items-center justify-center">
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

              <label className="flex items-center gap-2 p-2 rounded bg-[#F5F8F3] border border-[#DCE5DD] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={Boolean(currentGallery.showOnHome)}
                  onChange={(e) => setCurrentGallery({ ...currentGallery, showOnHome: e.target.checked })}
                  className="w-4 h-4 accent-[#216B35] rounded cursor-pointer"
                />
                <span className="font-semibold text-[#173B26]">
                  Show on Homepage (&quot;Survey Team at Work&quot; — max 4 photos)
                </span>
              </label>

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
          <div className="bg-white rounded-md max-w-lg w-full p-4 sm:p-5 shadow-xl border border-[#DCE5DD] my-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#DCE5DD]">
              <div>
                <h3 className="text-base font-bold text-[#173B26]">
                  {currentVideo.id ? 'Edit Demonstration Video' : 'Add Demonstration Video'}
                </h3>
                <p className="text-[11px] text-[#68756D]">
                  Displayed in the video demonstration gallery at <span className="font-mono text-[#216B35]">/videos</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="text-[#68756D] hover:text-[#173B26] p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveVideo} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Video Title *</label>
                <input
                  type="text"
                  required
                  value={currentVideo.title}
                  onChange={(e) => setCurrentVideo({ ...currentVideo, title: e.target.value })}
                  placeholder="e.g. ANIDERS | Animal Intrusion Detection and Repellent System"
                  className="w-full p-2 rounded border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">
                  YouTube Video or Embed URL *
                </label>
                <input
                  type="text"
                  required
                  value={currentVideo.embedUrl}
                  onChange={(e) => {
                    let val = e.target.value;
                    const match = val.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([a-zA-Z0-9_-]{11})/);
                    if (match && match[1]) {
                      val = `https://www.youtube.com/embed/${match[1]}`;
                      if (!currentVideo.thumbnail) {
                        setCurrentVideo(prev => ({
                          ...prev,
                          embedUrl: val,
                          thumbnail: `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
                        }));
                        return;
                      }
                    }
                    setCurrentVideo(prev => ({ ...prev, embedUrl: val }));
                  }}
                  placeholder="https://www.youtube.com/watch?v=sKlBSzb0TUA (auto-embeds)"
                  className="w-full p-2 rounded border border-[#DCE5DD] text-xs font-mono focus:border-[#216B35] focus:outline-none"
                />
                <span className="text-[10px] text-[#68756D] mt-0.5 block">
                  Paste any YouTube link: watch, youtu.be, shorts, or embed URL (auto-normalizes).
                </span>
              </div>

              {/* Live Video Preview if URL valid */}
              {currentVideo.embedUrl && currentVideo.embedUrl.includes('embed') && (
                <div className="rounded overflow-hidden border border-[#DCE5DD] aspect-video w-full bg-black">
                  <iframe
                    src={currentVideo.embedUrl}
                    title="Video Preview"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Thumbnail Image URL / Upload</label>
                <div className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentVideo.thumbnail}
                      onChange={(e) => setCurrentVideo({ ...currentVideo, thumbnail: e.target.value })}
                      placeholder="/img4.jpeg or Cloudinary URL (auto-generated from YouTube if blank)"
                      className="flex-1 p-2 rounded border border-[#DCE5DD] text-xs font-mono focus:border-[#216B35] focus:outline-none"
                    />
                    <label className="btn-secondary px-3 py-1.5 rounded cursor-pointer shrink-0 text-xs inline-flex items-center gap-1 font-semibold text-[#216B35] border-[#216B35]/40 hover:bg-[#F5F8F3]">
                      {uploadingImage ? (
                        <div className="w-3.5 h-3.5 border-2 border-[#216B35] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
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
                    <div className="relative rounded overflow-hidden border border-[#DCE5DD] bg-slate-100 h-28 flex items-center justify-center">
                      <img
                        src={currentVideo.thumbnail}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                </div>

                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">Display Order</label>
                  <input
                    type="number"
                    value={currentVideo.displayOrder || 0}
                    onChange={(e) => setCurrentVideo({ ...currentVideo, displayOrder: parseInt(e.target.value, 10) || 0 })}
                    className="w-full p-2 rounded border border-[#DCE5DD] text-xs font-mono focus:border-[#216B35] focus:outline-none"
                  />
                </div>
              </div>

              {showAddVideoCategory && (
                <div className="mt-2 p-2.5 bg-emerald-50/70 rounded border border-emerald-200 space-y-2 animate-in fade-in duration-150">
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

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={currentVideo.description}
                  onChange={(e) => setCurrentVideo({ ...currentVideo, description: e.target.value })}
                  placeholder="Video overview and operational summary..."
                  className="w-full p-2 rounded border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
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
                  {currentVideo.id ? 'Save Changes' : 'Add Video'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ================= MODAL: CLIENT LOGO ================= */}
      {clientModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-white rounded-md max-w-md w-full p-4 sm:p-5 shadow-xl border border-[#DCE5DD] my-4">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#DCE5DD]">
              <h3 className="text-base font-bold text-[#173B26]">
                {currentClient.id ? 'Edit Client / Partner Logo' : 'Add New Client / Partner Logo'}
              </h3>
              <button
                type="button"
                onClick={() => setClientModalOpen(false)}
                className="text-[#68756D] hover:text-[#173B26] p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveClient} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#173B26] mb-1">
                  Client / Organization Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={currentClient.name}
                  onChange={(e) => setCurrentClient({ ...currentClient, name: e.target.value })}
                  placeholder="e.g. Jharkhand State Forest Department, Wildlife Institute of India..."
                  className="w-full p-2 rounded border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">
                  Logo Image <span className="text-red-500">*</span>
                </label>
                
                {/* Upload or Direct URL */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 bg-[#216B35] hover:bg-[#174D28] text-white px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-colors shadow-xs">
                      {uploadingImage ? (
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      <span>{uploadingImage ? 'Uploading...' : 'Upload Logo File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        className="hidden"
                        onChange={async (e) => {
                          await handleImageUpload(e, 'client');
                        }}
                      />
                    </label>
                    <span className="text-[11px] text-[#68756D]">PNG, SVG, JPG (transparent recommended)</span>
                  </div>

                  <input
                    type="text"
                    required
                    value={currentClient.logoUrl}
                    onChange={(e) => setCurrentClient({ ...currentClient, logoUrl: e.target.value })}
                    placeholder="or paste direct logo image URL..."
                    className="w-full p-2 rounded border border-[#DCE5DD] text-xs font-mono focus:border-[#216B35] focus:outline-none"
                  />

                  {currentClient.logoUrl && (
                    <div className="mt-2 p-2 rounded border border-[#DCE5DD] bg-[#F5F8F3] flex items-center gap-3">
                      <div className="w-16 h-12 rounded bg-white border border-[#DCE5DD] flex items-center justify-center p-1 shrink-0 overflow-hidden">
                        <img
                          src={currentClient.logoUrl}
                          alt="Logo Preview"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-[10px] uppercase font-bold text-[#216B35] block">Logo Preview</span>
                        <span className="text-[11px] text-[#68756D] truncate block">{currentClient.logoUrl}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">
                  Website URL <span className="text-[11px] font-normal text-[#68756D]">(Optional)</span>
                </label>
                <input
                  type="url"
                  value={currentClient.websiteUrl}
                  onChange={(e) => setCurrentClient({ ...currentClient, websiteUrl: e.target.value })}
                  placeholder="https://example.gov.in"
                  className="w-full p-2 rounded border border-[#DCE5DD] text-xs font-mono focus:border-[#216B35] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={currentClient.displayOrder}
                  onChange={(e) => setCurrentClient({ ...currentClient, displayOrder: parseInt(e.target.value) || 0 })}
                  className="w-24 p-2 rounded border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                />
                <span className="text-[10px] text-[#68756D] ml-2">Lower numbers appear first</span>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#DCE5DD]">
                <button
                  type="button"
                  onClick={() => setClientModalOpen(false)}
                  className="px-3 py-1.5 rounded border border-[#DCE5DD] hover:bg-[#F5F8F3] text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-4 py-1.5 rounded text-xs"
                >
                  {currentClient.id ? 'Save Changes' : 'Add Client Logo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: PRODUCT ================= */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-white rounded-md max-w-lg w-full p-4 sm:p-5 shadow-xl border border-[#DCE5DD] my-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#DCE5DD]">
              <h3 className="text-base font-bold text-[#173B26]">
                {currentProduct.id ? 'Edit Product & Hardware' : 'Add New Product & Hardware'}
              </h3>
              <button
                type="button"
                onClick={() => setProductModalOpen(false)}
                className="text-[#68756D] hover:text-[#173B26] p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#173B26] mb-1">
                    Product Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={currentProduct.title}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, title: e.target.value })}
                    placeholder="e.g. Dynamic Solar-Powered LED Bird Flight Diverter, ANIDERS..."
                    className="w-full p-2 rounded border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">
                    Model Code
                  </label>
                  <input
                    type="text"
                    value={currentProduct.modelCode || ''}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, modelCode: e.target.value })}
                    placeholder="e.g. KR-BFD-SLED-100"
                    className="w-full p-2 rounded border border-[#DCE5DD] text-xs font-mono focus:border-[#216B35] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">Category</label>
                  <select
                    value={currentProduct.category}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                    className="w-full p-2 rounded border border-[#DCE5DD] text-xs bg-white focus:border-[#216B35] focus:outline-none"
                  >
                    <option value="Bird Diverters & Avian Protection">Bird Diverters &amp; Avian Protection</option>
                    <option value="Wildlife Deterrence & Smart Sensors">Wildlife Deterrence &amp; Smart Sensors</option>
                    <option value="Frontline Ranger Gear">Frontline Ranger Gear</option>
                    <option value="Humane Capture & Rescue">Humane Capture &amp; Rescue</option>
                    <option value="Perimeter Security & Ground Deterrents">Perimeter Security &amp; Ground Deterrents</option>
                    <option value="Wildlife Monitoring & AI Sentinels">Wildlife Monitoring &amp; AI Sentinels</option>
                    <option value="Eco & Smart Green Solutions">Eco &amp; Smart Green Solutions</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">Pricing / Framework</label>
                  <input
                    type="text"
                    value={currentProduct.price}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                    placeholder="e.g. GeM Listed / Bulk Utility Tender Supply"
                    className="w-full p-2 rounded border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">
                  URL Slug <span className="text-[10px] text-[#68756D] font-normal">(optional, auto-generated from title if blank)</span>
                </label>
                <input
                  type="text"
                  value={currentProduct.slug || ''}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, slug: e.target.value })}
                  placeholder="e.g. dynamic-solar-led-bird-flight-diverter"
                  className="w-full p-2 rounded border border-[#DCE5DD] text-xs font-mono focus:border-[#216B35] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">
                  Featured Product Image
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 bg-[#216B35] hover:bg-[#174D28] text-white px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-colors shadow-xs">
                      {uploadingImage ? (
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        className="hidden"
                        onChange={async (e) => {
                          await handleImageUpload(e, 'product');
                        }}
                      />
                    </label>
                    <span className="text-[11px] text-[#68756D]">JPG, PNG, WebP</span>
                  </div>

                  <input
                    type="text"
                    value={currentProduct.featuredImage}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, featuredImage: e.target.value })}
                    placeholder="or paste image URL..."
                    className="w-full p-2 rounded border border-[#DCE5DD] text-xs font-mono focus:border-[#216B35] focus:outline-none"
                  />

                  {currentProduct.featuredImage && (
                    <div className="mt-2 p-2 rounded border border-[#DCE5DD] bg-[#F5F8F3] flex items-center gap-3">
                      <div className="w-16 h-12 rounded bg-white border border-[#DCE5DD] flex items-center justify-center p-0.5 shrink-0 overflow-hidden">
                        <img
                          src={currentProduct.featuredImage}
                          alt="Product Preview"
                          className="max-h-full max-w-full object-cover"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-[10px] uppercase font-bold text-[#216B35] block">Image Preview</span>
                        <span className="text-[11px] text-[#68756D] truncate block">{currentProduct.featuredImage}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={currentProduct.shortDescription}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, shortDescription: e.target.value })}
                  placeholder="Concise technical overview of this product..."
                  className="w-full p-2 rounded border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                />
              </div>

              {/* Technical Specifications Key-Value Builder */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block font-semibold text-[#173B26]">Technical Specifications</label>
                  <button
                    type="button"
                    onClick={handleAddProductSpec}
                    className="text-[11px] text-[#216B35] hover:text-[#174D28] font-semibold inline-flex items-center gap-1 bg-[#F5F8F3] border border-[#DCE5DD] px-2 py-0.5 rounded"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Spec Row</span>
                  </button>
                </div>

                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {(currentProduct.specs || []).map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={spec.label}
                        onChange={(e) => handleProductSpecChange(idx, 'label', e.target.value)}
                        placeholder="Label (e.g. Power Source)"
                        className="w-1/2 p-1.5 rounded border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                      />
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) => handleProductSpecChange(idx, 'value', e.target.value)}
                        placeholder="Value (e.g. Solar / 12V LiFePO4)"
                        className="w-1/2 p-1.5 rounded border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveProductSpec(idx)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                        title="Remove spec"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">
                  In-Depth Overview &amp; Field Context
                </label>
                <textarea
                  rows={3}
                  value={currentProduct.content || ''}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, content: e.target.value })}
                  placeholder="Comprehensive technical breakdown, deployment methodology, and field notes..."
                  className="w-full p-2 rounded border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Status</label>
                <select
                  value={currentProduct.status}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, status: e.target.value })}
                  className="w-32 p-2 rounded border border-[#DCE5DD] text-xs bg-white focus:border-[#216B35] focus:outline-none"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#DCE5DD]">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-3 py-1.5 rounded border border-[#DCE5DD] hover:bg-[#F5F8F3] text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-4 py-1.5 rounded text-xs"
                >
                  {currentProduct.id ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: PARTNER ================= */}
      {partnerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-white rounded-md max-w-md w-full p-4 sm:p-5 shadow-xl border border-[#DCE5DD] my-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#DCE5DD]">
              <h3 className="text-base font-bold text-[#173B26]">
                {currentPartner.id ? 'Edit Partner / Alliance' : 'Add New Partner / Alliance'}
              </h3>
              <button
                type="button"
                onClick={() => setPartnerModalOpen(false)}
                className="text-[#68756D] hover:text-[#173B26] p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePartner} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#173B26] mb-1">
                  Partner / Entity Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={currentPartner.name}
                  onChange={(e) => setCurrentPartner({ ...currentPartner, name: e.target.value })}
                  placeholder="e.g. Yugantar Bharati, PRAKRITIS Technology, Naman Enterprises, Arcturus..."
                  className="w-full p-2 rounded border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">Category</label>
                  <select
                    value={currentPartner.category}
                    onChange={(e) => setCurrentPartner({ ...currentPartner, category: e.target.value })}
                    className="w-full p-2 rounded border border-[#DCE5DD] text-xs bg-white focus:border-[#216B35] focus:outline-none"
                  >
                    <option value="Analytical & Environmental Testing Laboratory">Analytical &amp; Environmental Testing Laboratory</option>
                    <option value="Environmental Technology & Engineering Solutions">Environmental Technology &amp; Engineering Solutions</option>
                    <option value="GIS Mapping & Survey Logistics Partner">GIS Mapping &amp; Survey Logistics Partner</option>
                    <option value="Heavy Engineering & Infrastructure Consultancy">Heavy Engineering &amp; Infrastructure Consultancy</option>
                    <option value="Technology & Hardware Alliance">Technology &amp; Hardware Alliance</option>
                    <option value="State & Central Government Alliance">State &amp; Central Government Alliance</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">Collaboration Type</label>
                  <input
                    type="text"
                    value={currentPartner.collaborationType}
                    onChange={(e) => setCurrentPartner({ ...currentPartner, collaborationType: e.target.value })}
                    placeholder="e.g. Co-Development & Supply"
                    className="w-full p-2 rounded border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">
                  Partner Logo <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 bg-[#216B35] hover:bg-[#174D28] text-white px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-colors shadow-xs">
                      {uploadingImage ? (
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      <span>{uploadingImage ? 'Uploading...' : 'Upload Logo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        className="hidden"
                        onChange={async (e) => {
                          await handleImageUpload(e, 'partner');
                          e.target.value = '';
                        }}
                      />
                    </label>
                    <span className="text-[11px] text-[#68756D]">PNG or SVG recommended</span>
                  </div>

                  <input
                    type="text"
                    required
                    value={currentPartner.logoUrl}
                    onChange={(e) => setCurrentPartner({ ...currentPartner, logoUrl: e.target.value })}
                    placeholder="or paste logo URL..."
                    className="w-full p-2 rounded border border-[#DCE5DD] text-xs font-mono focus:border-[#216B35] focus:outline-none"
                  />

                  {currentPartner.logoUrl && (
                    <div className="mt-2 p-2 rounded border border-[#DCE5DD] bg-[#F5F8F3] flex items-center gap-3">
                      <div className="w-16 h-12 rounded bg-white border border-[#DCE5DD] flex items-center justify-center p-1 shrink-0 overflow-hidden">
                        <img
                          src={currentPartner.logoUrl}
                          alt="Logo Preview"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-[10px] uppercase font-bold text-[#216B35] block">Logo Preview</span>
                        <span className="text-[11px] text-[#68756D] truncate block">{currentPartner.logoUrl}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Website URL</label>
                <input
                  type="url"
                  value={currentPartner.websiteUrl}
                  onChange={(e) => setCurrentPartner({ ...currentPartner, websiteUrl: e.target.value })}
                  placeholder="https://example.gov.in"
                  className="w-full p-2 rounded border border-[#DCE5DD] text-xs font-mono focus:border-[#216B35] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Partnership Scope / Description</label>
                <textarea
                  rows={2}
                  value={currentPartner.description}
                  onChange={(e) => setCurrentPartner({ ...currentPartner, description: e.target.value })}
                  placeholder="Briefly describe the MoU, equipment deployment, or joint field initiative..."
                  className="w-full p-2 rounded border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Display Order</label>
                <input
                  type="number"
                  value={currentPartner.displayOrder}
                  onChange={(e) => setCurrentPartner({ ...currentPartner, displayOrder: parseInt(e.target.value) || 0 })}
                  className="w-24 p-2 rounded border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#DCE5DD]">
                <button
                  type="button"
                  onClick={() => setPartnerModalOpen(false)}
                  className="px-3 py-1.5 rounded border border-[#DCE5DD] hover:bg-[#F5F8F3] text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-4 py-1.5 rounded text-xs"
                >
                  {currentPartner.id ? 'Save Changes' : 'Add Partner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: CERTIFICATE ================= */}
      {certificateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-white rounded-md max-w-md w-full p-4 sm:p-5 shadow-xl border border-[#DCE5DD] my-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#DCE5DD]">
              <div>
                <h3 className="text-base font-bold text-[#173B26]">
                  {currentCertificate.id ? 'Edit Certificate PDF' : 'Add New Certificate PDF'}
                </h3>
                <p className="text-[11px] text-[#68756D] mt-0.5">
                  Enter certificate title and Google Drive or direct PDF link
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCertificateModalOpen(false)}
                className="text-[#68756D] hover:text-[#173B26] p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCertificate} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#173B26] mb-1">
                  Certificate / PDF Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={currentCertificate.title}
                  onChange={(e) => setCurrentCertificate({ ...currentCertificate, title: e.target.value })}
                  placeholder="e.g. ISO 9001:2015 Quality Management System Certification"
                  className="w-full p-2 rounded border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">
                  PDF Link or Google Drive Share Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={currentCertificate.pdfUrl}
                  onChange={(e) => setCurrentCertificate({ ...currentCertificate, pdfUrl: e.target.value })}
                  placeholder="https://drive.google.com/file/d/1.../view?usp=sharing or direct .pdf link"
                  className="w-full p-2 rounded border border-[#DCE5DD] text-xs font-mono focus:border-[#216B35] focus:outline-none"
                />
                <p className="text-[11px] text-[#68756D] mt-1.5 bg-[#F5F8F3] p-2.5 rounded border border-[#DCE5DD]/70 leading-relaxed">
                  <span className="font-semibold text-[#173B26]">Google Drive Tip:</span> Simply paste the Google Drive share link (e.g. from Google Drive &gt; Share &gt; Anyone with the link). On the certificates page, it will display as a square card with a PDF emblem, viewable directly inside the page without redirecting, and downloadable with 1 click.
                </p>
              </div>

              <div>
                <label className="block font-semibold text-[#173B26] mb-1">Display Order</label>
                <input
                  type="number"
                  value={currentCertificate.displayOrder ?? 0}
                  onChange={(e) => setCurrentCertificate({ ...currentCertificate, displayOrder: parseInt(e.target.value) || 0 })}
                  className="w-24 p-2 rounded border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                />
              </div>

              {currentCertificate.pdfUrl && (
                <div className="p-2.5 rounded bg-[#F5F8F3] border border-[#DCE5DD] flex items-center justify-between">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FileText className="w-4 h-4 text-red-600 shrink-0" />
                    <span className="text-[11px] text-[#173B26] font-mono truncate">
                      {currentCertificate.pdfUrl}
                    </span>
                  </div>
                  <a
                    href={currentCertificate.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-[#216B35] hover:underline flex items-center gap-1 shrink-0 ml-2"
                  >
                    <span>Test Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t border-[#DCE5DD]">
                <button
                  type="button"
                  onClick={() => setCertificateModalOpen(false)}
                  className="px-3 py-1.5 rounded border border-[#DCE5DD] hover:bg-[#F5F8F3] text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-4 py-1.5 rounded text-xs"
                >
                  {currentCertificate.id ? 'Save Changes' : 'Add Certificate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
