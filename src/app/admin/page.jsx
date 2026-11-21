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
  Search,
  Users
} from 'lucide-react';
import ArticleEditor from '@/components/admin/ArticleEditor';
import ServiceEditor from '@/components/admin/ServiceEditor';
import ProductEditor from '@/components/admin/ProductEditor';
import PartnerEditor from '@/components/admin/PartnerEditor';
import CertificateEditor from '@/components/admin/CertificateEditor';
import ClientEditor from '@/components/admin/ClientEditor';
import AboutImageEditor from '@/components/admin/AboutImageEditor';
import TeamEditor from '@/components/admin/TeamEditor';
import GalleryEditor from '@/components/admin/GalleryEditor';
import VideoEditor from '@/components/admin/VideoEditor';
import CareerEditor from '@/components/admin/CareerEditor';
import EnquiryManagement from '@/components/admin/EnquiryManagement';

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
  const [aboutPagePhoto, setAboutPagePhoto] = useState({ imageUrl: '', caption: '' });
  const [savingAboutPagePhoto, setSavingAboutPagePhoto] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Team Member Modal
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [savingTeamMember, setSavingTeamMember] = useState(false);
  const [currentTeamMember, setCurrentTeamMember] = useState({
    id: '',
    name: '',
    designation: '',
    role: '',
    photoUrl: '',
    qualifications: '',
    experience: '',
    bio: '',
    highlightsText: '',
    displayOrder: 0
  });

  // About Us Carousel Modal
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [savingAboutImage, setSavingAboutImage] = useState(false);
  const [currentAboutImage, setCurrentAboutImage] = useState({
    id: '',
    title: '',
    description: '',
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

  // Helper to apply dashboard data in a single batch
  const applyDashboardData = (data) => {
    if (!data) return;
    if (data.services) setServices(data.services);
    if (data.blogs) setBlogs(data.blogs);
    if (data.gallery) setGallery(data.gallery);
    if (data.videos) setVideos(data.videos);
    if (data.enquiries) setEnquiries(data.enquiries);
    if (data.clients) setClients(data.clients);
    if (data.products) setProducts(data.products);
    if (data.partners) setPartners(data.partners);
    if (data.certificates) setCertificates(data.certificates);
    if (data.careers) setCareers(data.careers);
    if (data.careerApplications) setCareerApplications(data.careerApplications);
    if (data.aboutImages) setAboutImages(data.aboutImages);
    if (data.aboutPagePhoto) setAboutPagePhoto(data.aboutPagePhoto);
    if (data.team) setTeamMembers(data.team);

    // Derive categories instantly from data without extra round-trips
    if (data.videos && Array.isArray(data.videos)) {
      const mergedVideos = Array.from(new Set(data.videos.map((v) => v.category).filter(Boolean))).sort();
      if (mergedVideos.length > 0) setVideoCategories(mergedVideos);
    }
    if (data.services && Array.isArray(data.services)) {
      const mergedServices = Array.from(new Set(data.services.map((s) => s.category).filter(Boolean))).sort();
      if (mergedServices.length > 0) setServiceCategories(mergedServices);
    }
    if (data.gallery && Array.isArray(data.gallery)) {
      const mergedGallery = Array.from(new Set(data.gallery.map((g) => g.category).filter(Boolean))).sort();
      if (mergedGallery.length > 0) setGalleryCategories(mergedGallery);
    }
  };

  // Ultra-fast single-request data loader with fallback
  const fetchData = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      // 1. High-speed single bundle request (replaces 18 separate HTTP round-trips)
      const res = await fetch('/api/admin/dashboard', { cache: 'no-store' });
      if (res.status === 401) {
        router.push('/admin-login');
        return;
      }

      if (res.ok) {
        const payload = await res.json();
        applyDashboardData(payload);
        try {
          localStorage.setItem('kr_admin_dashboard_cache', JSON.stringify(payload));
        } catch (e) {}
        return;
      }

      // Fallback: Individual endpoints if bundle endpoint encounters an unexpected issue
      const authRes = await fetch('/api/auth/me');
      if (!authRes.ok) {
        router.push('/admin-login');
        return;
      }

      const [srvRes, blgRes, galRes, vidRes, enqRes, cliRes, prodRes, partRes, certRes, carRes, appRes, abtRes, abtPageRes, teamRes] = await Promise.all([
        fetch('/api/services', { cache: 'no-store' }),
        fetch('/api/blogs', { cache: 'no-store' }),
        fetch('/api/gallery', { cache: 'no-store' }),
        fetch('/api/videos', { cache: 'no-store' }),
        fetch('/api/enquiries', { cache: 'no-store' }),
        fetch('/api/clients', { cache: 'no-store' }),
        fetch('/api/products', { cache: 'no-store' }),
        fetch('/api/partners', { cache: 'no-store' }),
        fetch('/api/certificates', { cache: 'no-store' }),
        fetch('/api/careers?all=true', { cache: 'no-store' }),
        fetch('/api/career-applications', { cache: 'no-store' }),
        fetch('/api/about-images', { cache: 'no-store' }),
        fetch('/api/about-page-photo', { cache: 'no-store' }),
        fetch('/api/team', { cache: 'no-store' })
      ]);

      const [srvData, blgData, galData, vidData, enqData, cliData, prodData, partData, certData, carData, appData, abtData, abtPageData, teamData] = await Promise.all([
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
        abtRes.json(),
        abtPageRes.json(),
        teamRes.json()
      ]);

      const fallbackBundle = {
        services: srvData.services || [],
        blogs: blgData.blogs || [],
        gallery: galData.gallery || [],
        videos: vidData.videos || [],
        enquiries: enqData.enquiries || [],
        clients: cliData.clients || [],
        products: prodData.products || [],
        partners: partData.partners || [],
        certificates: certData.certificates || [],
        careers: carData.careers || [],
        careerApplications: appData.applications || [],
        aboutImages: abtData.images || [],
        aboutPagePhoto: abtPageData.photo || null,
        team: teamData.members || []
      };

      applyDashboardData(fallbackBundle);
      try {
        localStorage.setItem('kr_admin_dashboard_cache', JSON.stringify(fallbackBundle));
      } catch (e) {}
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Instant local cache hydration on mount (0ms perceived load time)
  useEffect(() => {
    let isMounted = true;
    try {
      const cached = localStorage.getItem('kr_admin_dashboard_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        queueMicrotask(() => {
          if (isMounted) {
            applyDashboardData(parsed);
          }
        });
      }
    } catch (e) {}

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error(e);
    }
    router.push('/admin-login');
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
      } else if (targetForm === 'aboutPagePhoto') {
        setAboutPagePhoto((prev) => ({ ...prev, imageUrl: data.url }));
      } else if (targetForm === 'team') {
        setCurrentTeamMember((prev) => ({ ...prev, photoUrl: data.url }));
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
      if (e?.target) e.target.value = '';
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
      const res = await fetch(`/api/services?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        cache: 'no-store'
      });
      if (!res.ok) throw new Error('Delete failed');
      setMessage({ text: `Service deleted`, type: 'success' });
      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleSetServiceOrder = async (srv, slotNum) => {
    const targetId = srv.id || srv._id || srv.slug;
    const nextOrder = Number(srv.homeOrder) === slotNum ? 0 : slotNum;
    const ordLabels = { 1: '1st', 2: '2nd', 3: '3rd', 4: '4th' };

    setServices((prev) => {
      const updated = prev.map((item) => {
        const itemId = item.id || item._id || item.slug;
        if (itemId === targetId) {
          return { ...item, homeOrder: nextOrder };
        }
        if (nextOrder >= 1 && Number(item.homeOrder) === nextOrder) {
          return { ...item, homeOrder: 0 };
        }
        return item;
      });
      return [...updated].sort((a, b) => {
        const ao = a.homeOrder >= 1 && a.homeOrder <= 4 ? a.homeOrder : 999;
        const bo = b.homeOrder >= 1 && b.homeOrder <= 4 ? b.homeOrder : 999;
        return ao - bo;
      });
    });

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...srv, id: srv.id || srv._id, homeOrder: nextOrder })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to update order');
      setMessage({
        text: nextOrder
          ? `"${srv.title}" set to ${ordLabels[nextOrder]} position (Top 4).`
          : `"${srv.title}" removed from Top 4 positions.`,
        type: 'success'
      });
      fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
      fetchData();
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

  const handleUpdateEnquiry = (enquiryId, updatedFields) => {
    setEnquiries((prev) =>
      prev.map((item) =>
        item._id === enquiryId || item.id === enquiryId
          ? { ...item, ...updatedFields }
          : item
      )
    );
    try {
      const cached = localStorage.getItem('kr_admin_dashboard_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.enquiries) {
          parsed.enquiries = parsed.enquiries.map((item) =>
            item._id === enquiryId || item.id === enquiryId
              ? { ...item, ...updatedFields }
              : item
          );
          localStorage.setItem('kr_admin_dashboard_cache', JSON.stringify(parsed));
        }
      }
    } catch (e) {}
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
        logoUrl: partner.logoUrl || '/logo.jpeg',
        websiteUrl: partner.websiteUrl || '',
        collaborationType: partner.collaborationType || '',
        description: partner.description || '',
        displayOrder: partner.displayOrder || 0
      });
    } else {
      setCurrentPartner({
        id: '',
        name: '',
        logoUrl: '',
        websiteUrl: '',
        collaborationType: '',
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
        description: img.description || '',
        imageUrl: img.imageUrl || '',
        displayOrder: img.displayOrder ?? 0
      });
    } else {
      setCurrentAboutImage({
        id: '',
        title: '',
        description: '',
        imageUrl: '',
        displayOrder: aboutImages.length
      });
    }
    setAboutModalOpen(true);
  };

  const handleSaveAboutImage = async (e) => {
    e.preventDefault();
    if (!currentAboutImage.imageUrl.trim()) {
      setMessage({ text: 'Please upload an image or enter a valid image URL.', type: 'error' });
      return;
    }

    setSavingAboutImage(true);
    try {
      const payload = {
        ...(currentAboutImage.id ? { id: currentAboutImage.id } : {}),
        title: (currentAboutImage.title || '').trim(),
        description: (currentAboutImage.description || '').trim(),
        imageUrl: currentAboutImage.imageUrl.trim(),
        displayOrder: Number.isFinite(Number(currentAboutImage.displayOrder))
          ? Number(currentAboutImage.displayOrder)
          : 0
      };

      const res = await fetch('/api/about-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to save About Us slide');

      if (data.image) {
        const savedId = data.image.id || data.image._id;
        setAboutImages((prev) => {
          const exists = prev.some((item) => (item.id || item._id) === savedId);
          const next = exists
            ? prev.map((item) => ((item.id || item._id) === savedId ? data.image : item))
            : [...prev, data.image];
          return next.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
        });
      }

      setMessage({ text: 'About Us carousel slide saved.', type: 'success' });
      setAboutModalOpen(false);
      await fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setSavingAboutImage(false);
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

  // ---------------- ABOUT US PAGE PHOTO HANDLERS ----------------
  const handleSaveAboutPagePhoto = async (e) => {
    e.preventDefault();
    if (!aboutPagePhoto.imageUrl?.trim()) {
      setMessage({ text: 'Please upload an image or enter an image URL.', type: 'error' });
      return;
    }

    setSavingAboutPagePhoto(true);
    try {
      const res = await fetch('/api/about-page-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify({
          imageUrl: aboutPagePhoto.imageUrl.trim(),
          caption: (aboutPagePhoto.caption || '').trim()
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to save About Us page photo');

      if (data.photo) setAboutPagePhoto(data.photo);
      setMessage({ text: 'About Us page right-side photo updated successfully.', type: 'success' });
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setSavingAboutPagePhoto(false);
    }
  };

  const handleDeleteAboutPagePhoto = async () => {
    if (!confirm('Remove the right-side photo from the About Us page?')) return;
    setSavingAboutPagePhoto(true);
    try {
      const res = await fetch('/api/about-page-photo', {
        method: 'DELETE',
        cache: 'no-store'
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to remove About Us page photo');

      setAboutPagePhoto({ imageUrl: '', caption: '' });
      setMessage({ text: 'About Us page photo removed.', type: 'success' });
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setSavingAboutPagePhoto(false);
    }
  };

  // ---------------- TEAM MEMBERS HANDLERS ----------------
  const handleOpenTeamModal = (member = null) => {
    if (member) {
      setCurrentTeamMember({
        id: member.id || member._id || '',
        name: member.name || '',
        designation: member.designation || '',
        role: member.role || '',
        photoUrl: member.photoUrl || '',
        qualifications: member.qualifications || '',
        experience: member.experience || '',
        bio: member.bio || '',
        highlightsText: Array.isArray(member.highlights) ? member.highlights.join('\n') : '',
        displayOrder: member.displayOrder ?? 0
      });
    } else {
      setCurrentTeamMember({
        id: '',
        name: '',
        designation: '',
        role: '',
        photoUrl: '',
        qualifications: '',
        experience: '',
        bio: '',
        highlightsText: '',
        displayOrder: teamMembers.length
      });
    }
    setTeamModalOpen(true);
  };

  const handleSaveTeamMember = async (e) => {
    e.preventDefault();
    if (!currentTeamMember.name.trim()) {
      setMessage({ text: 'Team member name is required.', type: 'error' });
      return;
    }

    setSavingTeamMember(true);
    try {
      const highlights = (currentTeamMember.highlightsText || '')
        .split(/\r?\n/)
        .map((line) => line.replace(/^[•\-*]\s*/, '').trim())
        .filter(Boolean);

      const payload = {
        ...(currentTeamMember.id ? { id: currentTeamMember.id } : {}),
        name: currentTeamMember.name.trim(),
        designation: (currentTeamMember.designation || '').trim(),
        role: (currentTeamMember.role || '').trim(),
        photoUrl: (currentTeamMember.photoUrl || '').trim(),
        qualifications: (currentTeamMember.qualifications || '').trim(),
        experience: (currentTeamMember.experience || '').trim(),
        bio: (currentTeamMember.bio || '').trim(),
        highlights,
        displayOrder: Number.isFinite(Number(currentTeamMember.displayOrder))
          ? Number(currentTeamMember.displayOrder)
          : 0
      };

      const res = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to save team member');

      if (data.member) {
        const savedId = data.member.id || data.member._id;
        setTeamMembers((prev) => {
          const exists = prev.some((m) => (m.id || m._id) === savedId);
          const next = exists
            ? prev.map((m) => ((m.id || m._id) === savedId ? data.member : m))
            : [...prev, data.member];
          return next.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
        });
      }

      setMessage({ text: 'Team member saved successfully.', type: 'success' });
      setTeamModalOpen(false);
      await fetchData();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setSavingTeamMember(false);
    }
  };

  const handleDeleteTeamMember = async (id, name) => {
    if (!confirm(`Delete team member "${name || 'Member'}"?`)) return;
    try {
      const res = await fetch(`/api/team?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        cache: 'no-store'
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to delete team member');

      setTeamMembers((prev) => prev.filter((item) => item.id !== id && item._id !== id));
      setMessage({ text: 'Team member deleted.', type: 'success' });
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
    aboutPagePhoto: 'About Page Photo',
    team: 'Team Members',
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
    aboutPagePhoto: aboutPagePhoto?.imageUrl ? 1 : 0,
    team: teamMembers.length,
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
    aboutImages: 'Homepage About Us right-side slides & bottom text',
    aboutPagePhoto: 'Right-side feature photo displayed on /about-us page',
    team: 'Leadership & team profiles shown on /about-us page',
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
    { id: 'aboutPagePhoto', label: 'About Page Photo', count: aboutPagePhoto?.imageUrl ? 1 : 0, icon: Camera },
    { id: 'team', label: 'Team', count: teamMembers.length, icon: Users },
    { id: 'blogs', label: 'Blogs', count: blogs.length, icon: BookOpen },
    { id: 'gallery', label: 'Gallery', count: gallery.length, icon: Camera },
    { id: 'videos', label: 'Videos', count: videos.length, icon: Tv },
    { id: 'careers', label: 'Careers', count: careers.length, icon: Briefcase },
    { id: 'applications', label: 'Applications', count: careerApplications.length, icon: GraduationCap },
    { id: 'enquiries', label: 'Inquiries', count: enquiries.length, icon: Mail }
  ];

  const closeAllEditors = () => {
    setIsEditingBlog(false);
    setIsEditingService(false);
    setProductModalOpen(false);
    setPartnerModalOpen(false);
    setCertificateModalOpen(false);
    setClientModalOpen(false);
    setAboutModalOpen(false);
    setTeamModalOpen(false);
    setGalleryModalOpen(false);
    setVideoModalOpen(false);
    setCareerModalOpen(false);
  };

  const isAnyEditorOpen =
    isEditingBlog ||
    isEditingService ||
    (activeTab === 'products' && productModalOpen) ||
    (activeTab === 'partners' && partnerModalOpen) ||
    (activeTab === 'certificates' && certificateModalOpen) ||
    (activeTab === 'clients' && clientModalOpen) ||
    (activeTab === 'aboutImages' && aboutModalOpen) ||
    (activeTab === 'team' && teamModalOpen) ||
    (activeTab === 'gallery' && galleryModalOpen) ||
    (activeTab === 'videos' && videoModalOpen) ||
    (activeTab === 'careers' && careerModalOpen);

  return (
    <div className="min-h-screen bg-[#F5F8F3] flex flex-col md:flex-row w-full font-normal">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-white border-b border-[#DCE5DD] px-3 py-2 flex items-center justify-between sticky top-0 z-40 shadow-xs">
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
            className="p-1.5 text-[#216B35] hover:bg-[#F5F8F3] rounded border border-[#216B35]/30"
            title="Live Site"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={fetchData}
            className="p-1.5 text-[#173B26] hover:bg-[#F5F8F3] rounded border border-[#DCE5DD]"
            title="Refresh Data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleLogout}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded border border-red-200"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile Sticky Horizontal Tab Strip */}
      <div className="md:hidden bg-white border-b border-[#DCE5DD] px-2 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar sticky top-[41px] z-30">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                closeAllEditors();
              }}
              className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#123820] text-white font-semibold border border-[#0d2a18] shadow-xs'
                  : 'text-[#374151] bg-[#F8FAF8] hover:bg-[#EEF3ED] hover:text-[#173B26] border border-[#DCE5DD] shadow-[0_1px_1px_rgba(0,0,0,0.03)]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#86EFAC]' : 'text-[#68756D]'}`} />
              <span>{item.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                  isActive ? 'bg-black/25 text-white border border-white/20' : 'bg-white text-[#68756D] border border-[#DCE5DD]'
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
        <div className="p-3 border-b border-[#DCE5DD] flex items-center gap-2.5">
          <img
            src="/logo.jpeg"
            alt="KR Environ Solutions Logo"
            className="w-7 h-7 rounded-lg object-contain bg-white border border-[#DCE5DD] p-0.5 shadow-xs shrink-0"
          />
          <div className="min-w-0">
            <span className="font-bold text-xs sm:text-sm text-[#173B26] block leading-tight truncate">
              KR Environ Solutions
            </span>
            <span className="text-[10px] text-[#216B35] font-semibold tracking-wide block truncate">
              Management Portal
            </span>
          </div>
        </div>

        {/* Sidebar Navigation Items - Compact Button Styling */}
        <div className="p-2 flex-1 overflow-y-auto space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  closeAllEditors();
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 sm:py-1.5 rounded-lg text-xs sm:text-[12.5px] font-medium transition-all text-left shadow-[0_1px_1px_rgba(0,0,0,0.03)] active:scale-[0.99] ${
                  isActive
                    ? 'bg-[#123820] text-white font-semibold border border-[#0d2a18] shadow-xs'
                    : 'bg-[#F8FAF8] border border-[#DCE5DD] text-[#374151] hover:bg-[#EEF3ED] hover:border-[#CBD8CC] hover:text-[#173B26]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#86EFAC]' : 'text-[#68756D]'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold shrink-0 ${
                    isActive
                      ? 'bg-black/25 text-white border border-white/20'
                      : 'bg-white text-[#68756D] border border-[#DCE5DD]'
                  }`}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-2 border-t border-[#DCE5DD] bg-white space-y-1">
          <div className="flex items-center gap-1.5">
            <button
              onClick={fetchData}
              className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs text-[#173B26] hover:text-[#216B35] font-medium py-1.5 px-2 rounded-lg border border-[#DCE5DD] bg-[#F8FAF8] hover:bg-[#EEF3ED] transition-colors"
              title="Refresh Data from MongoDB Atlas"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Refresh</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs text-[#216B35] hover:text-[#174D28] font-medium py-1.5 px-2 rounded-lg border border-[#216B35]/30 bg-[#F8FAF8] hover:bg-[#EEF3ED] transition-colors"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="w-full inline-flex items-center justify-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-medium py-1.5 px-2 rounded-lg border border-red-200 bg-red-50/50 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-3 h-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 min-w-0 bg-[#F5F8F3] flex flex-col min-h-screen w-full">
        {/* Content Area Sticky Top Bar (Hidden during full-width editing) */}
        {!isAnyEditorOpen && (
        <header className="bg-white border-b border-[#DCE5DD] px-3.5 py-2.5 sticky top-[74px] md:top-0 z-20 shadow-xs flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h1 className="text-xs sm:text-sm font-semibold text-[#173B26] leading-tight flex items-center gap-1.5">
              <span>{tabTitles[activeTab]}</span>
              <span className="text-[10px] font-normal text-[#216B35] bg-[#F5F8F3] px-2 py-0.5 rounded-full border border-[#216B35]/20 font-semibold">
                {tabCounts[activeTab]} records
              </span>
            </h1>
            <span className="hidden sm:inline text-[#DCE5DD]">|</span>
            <p className="hidden sm:inline text-xs text-[#68756D] font-normal truncate max-w-xs">
              {tabDescriptions[activeTab]}
            </p>
          </div>

          <div>
            {activeTab === 'services' && (
              isEditingService ? (
                <button
                  onClick={() => setIsEditingService(false)}
                  className="inline-flex items-center gap-1.5 bg-[#F5F8F3] hover:bg-[#EAEFE8] text-[#173B26] px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold border border-[#DCE5DD] shadow-xs transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
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
                      homeOrder: 0,
                      specs: []
                    });
                    setIsEditingService(true);
                  }}
                  className="inline-flex items-center gap-1.5 bg-[#216B35] hover:bg-[#174D28] text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-sm hover:shadow active:scale-95 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Service</span>
                </button>
              )
            )}

            {activeTab === 'products' && (
              <button
                onClick={() => handleOpenProductModal()}
                className="inline-flex items-center gap-1.5 bg-[#216B35] hover:bg-[#174D28] text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-sm hover:shadow active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            )}

            {activeTab === 'partners' && (
              <button
                onClick={() => handleOpenPartnerModal()}
                className="inline-flex items-center gap-1.5 bg-[#216B35] hover:bg-[#174D28] text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-sm hover:shadow active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Partner</span>
              </button>
            )}

            {activeTab === 'certificates' && (
              <button
                onClick={() => handleOpenCertificateModal()}
                className="inline-flex items-center gap-1.5 bg-[#216B35] hover:bg-[#174D28] text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-sm hover:shadow active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Certificate</span>
              </button>
            )}

            {activeTab === 'clients' && (
              <button
                onClick={() => handleOpenClientModal()}
                className="inline-flex items-center gap-1.5 bg-[#216B35] hover:bg-[#174D28] text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-sm hover:shadow active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Client Logo</span>
              </button>
            )}

            {activeTab === 'aboutImages' && (
              <button
                onClick={() => handleOpenAboutModal()}
                className="inline-flex items-center gap-1.5 bg-[#216B35] hover:bg-[#174D28] text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-sm hover:shadow active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Slide</span>
              </button>
            )}

            {activeTab === 'team' && (
              <button
                onClick={() => handleOpenTeamModal()}
                className="inline-flex items-center gap-1.5 bg-[#216B35] hover:bg-[#174D28] text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-sm hover:shadow active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Team Member</span>
              </button>
            )}

            {activeTab === 'blogs' && (
              isEditingBlog ? (
                <button
                  onClick={() => setIsEditingBlog(false)}
                  className="inline-flex items-center gap-1.5 bg-[#F5F8F3] hover:bg-[#EAEFE8] text-[#173B26] px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold border border-[#DCE5DD] shadow-xs transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
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
                  className="inline-flex items-center gap-1.5 bg-[#216B35] hover:bg-[#174D28] text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-sm hover:shadow active:scale-95 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Article</span>
                </button>
              )
            )}

            {activeTab === 'gallery' && (
              <div className="flex items-center gap-2">
                <label className="inline-flex items-center gap-1.5 bg-[#216B35] hover:bg-[#174D28] text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer">
                  {uploadingImage ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  <span>{uploadingImage ? 'Uploading...' : 'Upload Photo'}</span>
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
                  className="inline-flex items-center gap-1.5 bg-[#173B26] hover:bg-[#123820] text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-sm hover:shadow active:scale-95 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Photo</span>
                </button>
              </div>
            )}

            {activeTab === 'videos' && (
              <button
                onClick={() => handleOpenVideoModal()}
                className="inline-flex items-center gap-1.5 bg-[#216B35] hover:bg-[#174D28] text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-sm hover:shadow active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Video</span>
              </button>
            )}

            {activeTab === 'careers' && (
              <button
                onClick={() => handleOpenCareerModal()}
                className="inline-flex items-center gap-1.5 bg-[#216B35] hover:bg-[#174D28] text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-sm hover:shadow active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
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
                className="inline-flex items-center gap-1.5 bg-[#F5F8F3] hover:bg-[#EAEFE8] text-[#173B26] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold border border-[#DCE5DD] shadow-xs hover:shadow transition-all"
              >
                <span>Reset Filters</span>
              </button>
            )}

            {activeTab === 'aboutPagePhoto' && (
              <Link
                href="/about-us"
                target="_blank"
                className="inline-flex items-center gap-1.5 bg-[#F5F8F3] hover:bg-[#EAEFE8] text-[#173B26] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold border border-[#DCE5DD] shadow-xs hover:shadow transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View About Page</span>
              </Link>
            )}

            {activeTab === 'enquiries' && (
              <button
                onClick={() => fetchData(true)}
                className="inline-flex items-center gap-1.5 bg-[#F5F8F3] hover:bg-[#EAEFE8] text-[#173B26] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold border border-[#DCE5DD] shadow-xs hover:shadow transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh Inquiries</span>
              </button>
            )}
          </div>
        </header>
        )}

        {/* Content Body: Exactly max 3px left/right space (or 0 when editing full-width) */}
        <div className={`w-full flex-1 ${isAnyEditorOpen ? 'p-0' : 'px-[3px] py-1'}`}>
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
            <div className="w-full space-y-3">
              {/* Best 4 Summary Bar */}
              <div className="bg-white rounded-lg border border-[#DCE5DD] p-2.5 shadow-xs flex flex-wrap items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-bold text-[#173B26]">Featured Top 4 Services:</span>
                  <span className="text-[#68756D] ml-2 text-[11px]">Select 1st, 2nd, 3rd, or 4th below to feature on homepage.</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { num: 1, label: '1st' },
                    { num: 2, label: '2nd' },
                    { num: 3, label: '3rd' },
                    { num: 4, label: '4th' }
                  ].map((slot) => {
                    const matched = services.find((s) => Number(s.homeOrder) === slot.num);
                    return (
                      <span
                        key={slot.num}
                        className={`px-2 py-0.5 rounded border text-[11px] font-medium max-w-[170px] truncate ${
                          matched
                            ? 'bg-emerald-50 border-[#216B35]/30 text-[#173B26]'
                            : 'bg-[#F8FAF8] border-[#DCE5DD] text-[#68756D]'
                        }`}
                        title={matched ? `${slot.label}: ${matched.title}` : `${slot.label}: Not set`}
                      >
                        <strong className="text-[#216B35]">{slot.label}:</strong>{' '}
                        {matched ? matched.title : 'Not set'}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Services Card Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {services.map((srv) => {
                  const rank = Number(srv.homeOrder) || 0;
                  const isFeatured = rank >= 1 && rank <= 4;
                  return (
                    <div
                      key={srv.id || srv.slug}
                      className={`bg-white rounded-lg border overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#CBD8CC] transition-all ${
                        isFeatured ? 'border-[#216B35]/50 ring-1 ring-[#216B35]/20' : 'border-[#DCE5DD]'
                      }`}
                    >
                      <div>
                        {/* Image Banner */}
                        <div className="relative aspect-[16/10] bg-[#F5F8F3] border-b border-[#DCE5DD] overflow-hidden">
                          <img
                            src={srv.featuredImage || '/img4.jpeg'}
                            alt={srv.title}
                            className="w-full h-full object-cover"
                          />
                          {isFeatured && (
                            <div className="absolute top-2 left-2">
                              <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#123820] text-white text-[10px] font-bold shadow-xs">
                                #{rank} Featured
                              </span>
                            </div>
                          )}
                          <div className="absolute top-2 right-2">
                            <span className="text-[10px] bg-white/95 backdrop-blur-xs text-[#216B35] px-2 py-0.5 rounded font-semibold border border-[#DCE5DD] shadow-xs">
                              {srv.category}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-3 space-y-1.5">
                          <h4 className="font-bold text-xs sm:text-sm text-[#173B26] line-clamp-2 leading-snug">
                            {srv.title}
                          </h4>
                          {srv.shortDescription && (
                            <p className="text-[11px] text-[#68756D] line-clamp-2 leading-relaxed">
                              {srv.shortDescription}
                            </p>
                          )}

                          {/* Order Selector (1st - 4th) */}
                          <div className="pt-2">
                            <span className="text-[10px] font-medium text-[#68756D] block mb-1">
                              Homepage Feature Order:
                            </span>
                            <div className="grid grid-cols-4 gap-1">
                              {[
                                { num: 1, label: '1st' },
                                { num: 2, label: '2nd' },
                                { num: 3, label: '3rd' },
                                { num: 4, label: '4th' }
                              ].map((slot) => {
                                const isChecked = rank === slot.num;
                                return (
                                  <button
                                    key={slot.num}
                                    type="button"
                                    onClick={() => handleSetServiceOrder(srv, slot.num)}
                                    className={`py-1 text-[11px] font-semibold rounded border transition-colors ${
                                      isChecked
                                        ? 'bg-[#123820] text-white border-[#123820]'
                                        : 'bg-[#F8FAF8] text-[#4B5563] border-[#DCE5DD] hover:bg-[#EEF3ED] hover:text-[#173B26]'
                                    }`}
                                  >
                                    {slot.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="p-2.5 bg-[#FAFBF9] border-t border-[#DCE5DD] flex items-center justify-between gap-1.5">
                        <Link
                          href={`/services/${srv.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-[11px] text-[#4B5563] hover:text-[#216B35] font-medium py-1 px-2 rounded hover:bg-white border border-transparent hover:border-[#DCE5DD] transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>View</span>
                        </Link>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setCurrentService(srv);
                              setIsEditingService(true);
                            }}
                            className="inline-flex items-center gap-1 text-[11px] text-[#216B35] font-semibold py-1 px-2.5 rounded bg-white border border-[#DCE5DD] hover:bg-[#F5F8F3] shadow-2xs transition-colors"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteService(srv.id || srv.slug, srv.title)}
                            className="p-1 rounded text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors"
                            title="Delete Service"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        )}

        {/* ================= TAB: PRODUCTS ================= */}
        {activeTab === 'products' && (
          productModalOpen ? (
            <ProductEditor
              key={currentProduct.id || currentProduct._id || 'new-product'}
              product={currentProduct}
              setProduct={setCurrentProduct}
              onSave={handleSaveProduct}
              onCancel={() => setProductModalOpen(false)}
              onUploadImage={(e) => handleImageUpload(e, 'product')}
              uploadingImage={uploadingImage}
              onAddSpec={handleAddProductSpec}
              onRemoveSpec={handleRemoveProductSpec}
              onSpecChange={handleProductSpecChange}
            />
          ) : (
            <div className="w-full">
            {products.length === 0 ? (
              <div className="bg-white rounded-xl border border-[#DCE5DD] p-10 text-center text-xs text-[#68756D] space-y-2">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
                {products.map((prod) => {
                  const prodId = prod.id || prod._id || prod.slug;
                  return (
                    <div
                      key={prodId}
                      className="bg-white rounded-xl border border-[#DCE5DD] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
                    >
                      <div>
                        {/* Image Banner */}
                        <div className="relative aspect-[16/10] bg-[#F5F8F3] border-b border-[#DCE5DD] overflow-hidden">
                          <img
                            src={prod.featuredImage || '/details.jpeg'}
                            alt={prod.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 right-2">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide border shadow-xs ${
                              prod.status === 'published'
                                ? 'bg-emerald-600 text-white border-emerald-700'
                                : 'bg-amber-500 text-white border-amber-600'
                            }`}>
                              {prod.status === 'published' ? 'Published' : 'Draft'}
                            </span>
                          </div>
                          {prod.modelCode && (
                            <div className="absolute bottom-2 left-2">
                              <span className="text-[10px] font-mono font-bold bg-black/75 text-white px-2 py-0.5 rounded border border-white/20 backdrop-blur-xs">
                                {prod.modelCode}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="p-3 space-y-1.5">
                          <span className="text-[11px] font-semibold text-[#216B35] tracking-wide block truncate">
                            {prod.category || 'Conservation Hardware'}
                          </span>
                          <h4 className="font-bold text-xs sm:text-sm text-[#173B26] line-clamp-2 leading-snug">
                            {prod.title}
                          </h4>
                          {prod.price && (
                            <p className="text-[11px] text-[#4B5563] truncate">
                              <strong>Framework:</strong> {prod.price}
                            </p>
                          )}
                          <div className="pt-1 flex items-center justify-between text-[11px] text-[#68756D]">
                            <span className="bg-[#F5F8F3] text-[#173B26] px-2 py-0.5 rounded border border-[#DCE5DD] text-[10px] font-semibold">
                              {prod.specs ? prod.specs.length : 0} Technical Specs
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="p-2.5 bg-[#FAFBF9] border-t border-[#DCE5DD] flex items-center justify-between gap-1.5">
                        <Link
                          href={prod.slug ? `/products/${prod.slug}` : '/products'}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-[11px] text-[#4B5563] hover:text-[#216B35] font-medium py-1 px-2 rounded hover:bg-white border border-transparent hover:border-[#DCE5DD] transition-colors"
                          title="View on site"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>View</span>
                        </Link>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenProductModal(prod)}
                            className="inline-flex items-center gap-1 text-[11px] text-[#216B35] hover:text-[#174D28] font-semibold py-1 px-2.5 rounded bg-white border border-[#DCE5DD] hover:bg-[#F5F8F3] shadow-2xs transition-colors"
                            title="Edit Product"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod._id || prod.id || prod.slug, prod.title)}
                            className="p-1 rounded text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            </div>
          )
        )}

        {/* ================= TAB: PARTNERS ================= */}
        {activeTab === 'partners' && (
          partnerModalOpen ? (
            <PartnerEditor
              key={currentPartner.id || currentPartner._id || 'new-partner'}
              partner={currentPartner}
              setPartner={setCurrentPartner}
              onSave={handleSavePartner}
              onCancel={() => setPartnerModalOpen(false)}
              onUploadImage={(e) => handleImageUpload(e, 'partner')}
              uploadingImage={uploadingImage}
            />
          ) : (
          <div className="w-full">
            {partners.length === 0 ? (
              <div className="bg-white rounded-xl border border-[#DCE5DD] p-10 text-center text-xs text-[#68756D] space-y-2">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
                {partners.map((part) => {
                  const partId = part.id || part._id || part.name;
                  return (
                    <div
                      key={partId}
                      className="bg-white rounded-xl border border-[#DCE5DD] p-3 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
                    >
                      <div>
                        {/* Logo Container with Order Badge */}
                        <div className="h-24 bg-[#FAFBF9] rounded-lg border border-[#E8EEE8] flex items-center justify-center p-2.5 mb-2.5 relative">
                          <img
                            src={part.logoUrl || '/logo.jpeg'}
                            alt={part.name}
                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-1.5 right-1.5 text-[10px] font-mono font-bold bg-[#173B26] text-white px-1.5 py-0.2 rounded">
                            #{part.displayOrder ?? 0}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="space-y-1">
                          {part.collaborationType && (
                            <span className="text-[10px] font-semibold text-[#216B35] bg-[#F5F8F3] px-2 py-0.5 rounded border border-[#216B35]/20 inline-block truncate max-w-full">
                              {part.collaborationType}
                            </span>
                          )}
                          <h4 className="font-bold text-xs sm:text-sm text-[#173B26] line-clamp-2 leading-snug">
                            {part.name}
                          </h4>
                          {part.description && (
                            <p className="text-[11px] text-[#4B5563] line-clamp-2 leading-relaxed pt-0.5">
                              {part.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-3 mt-2 border-t border-[#DCE5DD] flex items-center justify-between gap-1.5">
                        {part.websiteUrl ? (
                          <a
                            href={part.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-[#216B35] hover:underline font-medium"
                          >
                            <span>Website</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        ) : (
                          <span className="text-[10px] text-[#68756D]">No website link</span>
                        )}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenPartnerModal(part)}
                            className="inline-flex items-center gap-1 text-[11px] text-[#216B35] font-semibold py-1 px-2.5 rounded bg-white border border-[#DCE5DD] hover:bg-[#F5F8F3] shadow-2xs transition-colors"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeletePartner(part._id || part.id || part.name, part.name)}
                            className="p-1 rounded text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors"
                            title="Delete Partner"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          )
        )}

        {/* ================= TAB: CERTIFICATES ================= */}
        {activeTab === 'certificates' && (
          certificateModalOpen ? (
            <CertificateEditor
              key={currentCertificate.id || currentCertificate._id || 'new-certificate'}
              certificate={currentCertificate}
              setCertificate={setCurrentCertificate}
              onSave={handleSaveCertificate}
              onCancel={() => setCertificateModalOpen(false)}
            />
          ) : (
          <div className="w-full">
            {certificates.length === 0 ? (
              <div className="bg-white rounded-xl border border-[#DCE5DD] p-10 text-center text-xs text-[#68756D] space-y-2">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
                {certificates.map((cert) => {
                  const certId = cert.id || cert._id || cert.title;
                  const link = cert.pdfUrl || cert.pdfLink || cert.imageUrl || '';
                  return (
                    <div
                      key={certId}
                      className="bg-white rounded-xl border border-[#DCE5DD] p-3.5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
                    >
                      <div>
                        {/* Certificate Header Banner */}
                        <div className="h-20 bg-gradient-to-br from-red-50 via-white to-[#F5F8F3] rounded-lg border border-red-100 flex items-center justify-between p-3 mb-2.5 relative">
                          <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-md bg-white border border-red-200 flex items-center justify-center text-red-600 shadow-xs shrink-0">
                              <FileText className="w-6 h-6" />
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-red-700 bg-red-100/60 px-1.5 py-0.2 rounded inline-block">
                                PDF Document
                              </span>
                              <span className="text-[10px] text-[#68756D] block mt-0.5">Official Credentials</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono font-bold bg-[#173B26] text-white px-2 py-0.5 rounded shadow-xs">
                            #{cert.displayOrder ?? 0}
                          </span>
                        </div>

                        {/* Title & Authority */}
                        <div className="space-y-1">
                          <h4 className="font-bold text-xs sm:text-sm text-[#173B26] line-clamp-2 leading-snug">
                            {cert.title}
                          </h4>
                          {cert.issuingAuthority && (
                            <p className="text-[11px] text-[#216B35] font-semibold">
                              {cert.issuingAuthority}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-3 mt-2 border-t border-[#DCE5DD] flex items-center justify-between gap-1.5">
                        {link ? (
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-[#216B35] hover:underline font-semibold"
                            title="Open Google Drive or PDF document"
                          >
                            <span>Open PDF</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        ) : (
                          <span className="text-[10px] text-amber-600">No link set</span>
                        )}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenCertificateModal(cert)}
                            className="inline-flex items-center gap-1 text-[11px] text-[#216B35] font-semibold py-1 px-2.5 rounded bg-white border border-[#DCE5DD] hover:bg-[#F5F8F3] shadow-2xs transition-colors"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteCertificate(cert.id || cert._id, cert.title)}
                            className="p-1 rounded text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors"
                            title="Delete Certificate"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          )
        )}

        {/* ================= TAB: CLIENTS ================= */}
        {activeTab === 'clients' && (
          clientModalOpen ? (
            <ClientEditor
              key={currentClient.id || currentClient._id || 'new-client'}
              client={currentClient}
              setClient={setCurrentClient}
              onSave={handleSaveClient}
              onCancel={() => setClientModalOpen(false)}
              onUploadImage={(e) => handleImageUpload(e, 'client')}
              uploadingImage={uploadingImage}
            />
          ) : (
          <div className="w-full">
            {clients.length === 0 ? (
              <div className="bg-white rounded-xl border border-[#DCE5DD] p-10 text-center text-xs text-[#68756D] space-y-2">
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {clients.map((cli) => {
                  const cliId = cli.id || cli._id || cli.name;
                  return (
                    <div
                      key={cliId}
                      className="bg-white rounded-xl border border-[#DCE5DD] p-2.5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
                    >
                      <div>
                        {/* Logo Container */}
                        <div className="h-20 bg-[#FAFBF9] rounded-lg border border-[#E8EEE8] flex items-center justify-center p-2 mb-2 relative">
                          <img
                            src={cli.logoUrl}
                            alt={cli.name}
                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-1 right-1 text-[9px] font-mono font-bold bg-[#173B26] text-white px-1.5 py-0.2 rounded">
                            #{cli.displayOrder ?? 0}
                          </span>
                        </div>

                        {/* Client Name */}
                        <h4 className="font-semibold text-xs text-[#173B26] text-center truncate">
                          {cli.name}
                        </h4>
                      </div>

                      {/* Actions */}
                      <div className="pt-2 mt-2 border-t border-[#DCE5DD] flex items-center justify-between">
                        {cli.websiteUrl ? (
                          <a
                            href={cli.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-[#216B35] hover:underline inline-flex items-center gap-0.5"
                          >
                            <span>Link</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        ) : (
                          <span className="text-[10px] text-[#68756D]">Marquee</span>
                        )}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenClientModal(cli)}
                            className="p-1 rounded text-[#216B35] hover:bg-[#F5F8F3]"
                            title="Edit Client"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteClient(cli.id || cli._id, cli.name)}
                            className="p-1 rounded text-red-600 hover:bg-red-50"
                            title="Delete Client"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          )
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
            <div className="w-full">
            {blogs.length === 0 ? (
              <div className="bg-white rounded-xl border border-[#DCE5DD] p-10 text-center text-xs text-[#68756D] space-y-2">
                <BookOpen className="w-8 h-8 text-[#216B35]/40 mx-auto" />
                <p className="font-semibold text-sm text-[#173B26]">No Articles Published Yet</p>
                <button
                  onClick={() => {
                    setCurrentBlog({ id: '', title: '', slug: '', category: 'Wildlife Technology', content: '', featuredImage: '/img4.jpeg' });
                    setIsEditingBlog(true);
                  }}
                  className="btn-primary text-xs px-3.5 py-1.5 inline-flex items-center gap-1.5 mt-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create First Article</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {blogs.map((blg) => {
                  const blogId = blg.id || blg.slug;
                  return (
                    <div
                      key={blogId}
                      className="bg-white rounded-xl border border-[#DCE5DD] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
                    >
                      <div>
                        {/* Article Image Banner */}
                        <div className="relative aspect-video bg-[#F5F8F3] border-b border-[#DCE5DD] overflow-hidden">
                          <img
                            src={blg.featuredImage || '/img4.jpeg'}
                            alt={blg.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 left-2">
                            <span className="text-[10px] font-bold bg-[#173B26] text-white px-2 py-0.5 rounded shadow-xs">
                              {blg.category || 'Article'}
                            </span>
                          </div>
                          {blg.date && (
                            <div className="absolute bottom-2 right-2">
                              <span className="text-[10px] font-mono bg-black/70 text-white px-2 py-0.5 rounded backdrop-blur-xs">
                                {blg.date}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-3 space-y-1.5">
                          <h4 className="font-bold text-xs sm:text-sm text-[#173B26] line-clamp-2 leading-snug">
                            {blg.title}
                          </h4>
                          {blg.excerpt && (
                            <p className="text-[11px] text-[#4B5563] line-clamp-2 leading-relaxed">
                              {blg.excerpt}
                            </p>
                          )}
                          <div className="text-[10px] font-mono text-[#216B35] truncate pt-0.5">
                            /blog/{blg.slug}
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="p-2.5 bg-[#FAFBF9] border-t border-[#DCE5DD] flex items-center justify-between gap-1.5">
                        <Link
                          href={`/blog/${blg.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-[11px] text-[#4B5563] hover:text-[#216B35] font-medium py-1 px-2 rounded hover:bg-white border border-transparent hover:border-[#DCE5DD] transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Read</span>
                        </Link>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setCurrentBlog(blg);
                              setIsEditingBlog(true);
                            }}
                            className="inline-flex items-center gap-1 text-[11px] text-[#216B35] font-semibold py-1 px-2.5 rounded bg-white border border-[#DCE5DD] hover:bg-[#F5F8F3] shadow-2xs transition-colors"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(blg.id || blg.slug, blg.title)}
                            className="p-1 rounded text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors"
                            title="Delete Article"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            </div>
          )
        )}

        {/* ================= TAB 4: GALLERY ================= */}
        {activeTab === 'gallery' && (
          galleryModalOpen ? (
            <GalleryEditor
              key={currentGallery.id || currentGallery._id || 'new-gallery'}
              gallery={currentGallery}
              setGallery={setCurrentGallery}
              categories={galleryCategories}
              showAddCategory={showAddGalleryCategory}
              setShowAddCategory={setShowAddGalleryCategory}
              newCategoryName={newGalleryCategoryName}
              setNewCategoryName={setNewGalleryCategoryName}
              savingCategory={savingGalleryCategory}
              onCreateCategory={handleCreateGalleryCategory}
              onSave={handleSaveGallery}
              onCancel={() => setGalleryModalOpen(false)}
              onUploadImage={(e) => handleImageUpload(e, 'gallery')}
              uploadingImage={uploadingImage}
            />
          ) : (
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
          )
        )}

        {/* ================= TAB 5: VIDEOS ================= */}
        {activeTab === 'videos' && (
          videoModalOpen ? (
            <VideoEditor
              key={currentVideo.id || currentVideo._id || 'new-video'}
              video={currentVideo}
              setVideo={setCurrentVideo}
              onSave={handleSaveVideo}
              onCancel={() => setVideoModalOpen(false)}
              onUploadImage={(e) => handleImageUpload(e, 'video')}
              uploadingImage={uploadingImage}
            />
          ) : (
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
          )
        )}

        {/* ================= TAB: ABOUT US IMAGES ================= */}
        {activeTab === 'aboutImages' && (
          aboutModalOpen ? (
            <AboutImageEditor
              key={currentAboutImage.id || currentAboutImage._id || 'new-about'}
              slide={currentAboutImage}
              setSlide={setCurrentAboutImage}
              onSave={handleSaveAboutImage}
              onCancel={() => setAboutModalOpen(false)}
              onUploadImage={(e) => handleImageUpload(e, 'about')}
              uploadingImage={uploadingImage}
            />
          ) : (
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
                        <div className="p-1.5 bg-white border-t border-[#DCE5DD]/60 space-y-0.5">
                          <h4 className="font-semibold text-[#173B26] text-[11px] truncate">
                            {img.title || 'Carousel Slide'}
                          </h4>
                          {img.description && (
                            <p className="text-[10px] text-[#68756D] line-clamp-2 leading-snug">
                              {img.description}
                            </p>
                          )}
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
          )
        )}
        {activeTab === 'aboutPagePhoto' && (
          <div className="bg-white rounded border border-[#DCE5DD] shadow-xs overflow-hidden p-4 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Upload / Edit Form */}
              <form onSubmit={handleSaveAboutPagePhoto} className="lg:col-span-7 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-[#DCE5DD] pb-2">
                  <div>
                    <h3 className="text-sm font-bold text-[#173B26]">About Us Page Right-Side Photo</h3>
                    <p className="text-[11px] text-[#68756D]">
                      Displayed on the right side of the &ldquo;Who We Are&rdquo; section on the About Us page.
                    </p>
                  </div>
                  <Link
                    href="/about-us"
                    target="_blank"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#F5F8F3] hover:bg-[#EAEFE8] text-[#216B35] border border-[#DCE5DD] text-[11px] font-semibold shrink-0"
                  >
                    <span>View About Us</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-semibold text-[#173B26]">Photo Image *</label>
                    <label className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#F5F8F3] hover:bg-[#EAEFE8] text-[#216B35] border border-[#216B35]/40 font-semibold cursor-pointer">
                      <Upload className="w-3 h-3" />
                      <span>{uploadingImage ? 'Uploading...' : 'Upload Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        onChange={(e) => handleImageUpload(e, 'aboutPagePhoto')}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    required
                    value={aboutPagePhoto.imageUrl || ''}
                    onChange={(e) => setAboutPagePhoto((prev) => ({ ...prev, imageUrl: e.target.value }))}
                    placeholder="Upload image or paste Cloudinary image URL"
                    className="w-full p-2 rounded border border-[#DCE5DD] font-mono text-[11px] focus:border-[#216B35] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">
                    Caption / Short Note (Optional)
                  </label>
                  <input
                    type="text"
                    value={aboutPagePhoto.caption || ''}
                    onChange={(e) => setAboutPagePhoto((prev) => ({ ...prev, caption: e.target.value }))}
                    placeholder="Optional caption shown below the About Us photo"
                    className="w-full p-2 rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={uploadingImage || savingAboutPagePhoto}
                    className="btn-primary px-4 py-1.5 rounded text-xs font-semibold disabled:opacity-60 inline-flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{savingAboutPagePhoto ? 'Saving...' : 'Save About Page Photo'}</span>
                  </button>

                  {aboutPagePhoto.imageUrl && (
                    <button
                      type="button"
                      disabled={savingAboutPagePhoto}
                      onClick={handleDeleteAboutPagePhoto}
                      className="px-3 py-1.5 rounded border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold disabled:opacity-60 inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Photo</span>
                    </button>
                  )}
                </div>
              </form>

              {/* Live Right-Side Card Preview */}
              <div className="lg:col-span-5">
                <p className="text-[11px] font-semibold text-[#173B26] mb-1.5">Live Preview (/about-us Right Side)</p>
                {aboutPagePhoto.imageUrl ? (
                  <div className="rounded-2xl overflow-hidden shadow-md border-2 border-[#DCE5DD] bg-white">
                    <div className="aspect-[4/3] bg-[#F5F8F3] overflow-hidden">
                      <img
                        src={aboutPagePhoto.imageUrl}
                        alt={aboutPagePhoto.caption || 'About Us Page Photo Preview'}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    {aboutPagePhoto.caption && (
                      <div className="px-3 py-2 bg-[#F5F8F3]/70 border-t border-[#DCE5DD] text-[11px] text-[#173B26] font-medium">
                        {aboutPagePhoto.caption}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="aspect-[4/3] rounded-2xl border-2 border-dashed border-[#DCE5DD] bg-[#F5F8F3]/60 flex flex-col items-center justify-center p-4 text-center text-xs text-[#68756D]">
                    <Camera className="w-6 h-6 text-[#216B35]/50 mb-1.5" />
                    <p className="font-semibold text-[#173B26]">No Photo Set Yet</p>
                    <p className="text-[11px] mt-0.5">Upload an image on the left and save.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: TEAM MEMBERS ================= */}
        {activeTab === 'team' && (
          teamModalOpen ? (
            <TeamEditor
              key={currentTeamMember.id || currentTeamMember._id || 'new-team'}
              member={currentTeamMember}
              setMember={setCurrentTeamMember}
              onSave={handleSaveTeamMember}
              onCancel={() => setTeamModalOpen(false)}
              onUploadImage={(e) => handleImageUpload(e, 'team')}
              uploadingImage={uploadingImage}
            />
          ) : (
          <div className="w-full">
            {teamMembers.length === 0 ? (
              <div className="bg-white rounded-xl border border-[#DCE5DD] p-8 text-center text-xs text-[#68756D] space-y-2">
                <Users className="w-8 h-8 text-[#216B35]/50 mx-auto" />
                <p className="font-semibold text-sm text-[#173B26]">No Team Members Added Yet</p>
                <button
                  onClick={() => handleOpenTeamModal()}
                  className="btn-primary text-xs px-3.5 py-1.5 rounded-lg inline-flex items-center gap-1.5 mt-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add First Team Member</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {teamMembers.map((member) => {
                  const memberId = member.id || member._id;
                  return (
                    <div
                      key={memberId}
                      className="rounded-lg border border-[#DCE5DD] overflow-hidden bg-white flex flex-col justify-between shadow-2xs"
                    >
                      <div>
                        <div className="relative aspect-[4/3] bg-[#F5F8F3] border-b border-[#DCE5DD] overflow-hidden">
                          {member.photoUrl ? (
                            <img
                              src={member.photoUrl}
                              alt={member.name || 'Team Member'}
                              className="w-full h-full object-cover object-top"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#216B35]/60 text-xs font-semibold">
                              No Photo Set
                            </div>
                          )}
                          <span className="absolute top-1.5 left-1.5 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                            #{member.displayOrder ?? 0}
                          </span>
                        </div>

                        <div className="p-2.5 space-y-1">
                          {member.designation && (
                            <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-[#216B35] bg-[#F5F8F3] px-1.5 py-0.5 rounded border border-[#DCE5DD]">
                              {member.designation}
                            </span>
                          )}
                          <h4 className="font-bold text-[#173B26] text-xs truncate">{member.name}</h4>
                          {member.role && (
                            <p className="text-[11px] font-medium text-[#216B35] truncate">{member.role}</p>
                          )}
                          {member.bio && (
                            <p className="text-[10px] text-[#68756D] line-clamp-2 leading-snug">{member.bio}</p>
                          )}
                        </div>
                      </div>

                      <div className="px-2.5 py-1.5 bg-[#F5F8F3]/60 border-t border-[#DCE5DD] flex justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenTeamModal(member)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold text-[#216B35] hover:bg-white border border-transparent hover:border-[#DCE5DD]"
                          title="Edit Team Member"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteTeamMember(memberId, member.name)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold text-red-600 hover:bg-red-50"
                          title="Delete Team Member"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          )
        )}

        {/* ================= TAB: CAREERS ================= */}
        {activeTab === 'careers' && (
          careerModalOpen ? (
            <CareerEditor
              key={currentCareer.id || currentCareer._id || 'new-career'}
              career={currentCareer}
              setCareer={setCurrentCareer}
              onSave={handleSaveCareer}
              onCancel={() => setCareerModalOpen(false)}
            />
          ) : (
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {careers.map((car) => {
                  const carId = car.id || car._id;
                  const applicantCount = careerApplications.filter(
                    (a) => (a.careerId && a.careerId === carId) || a.careerTitle === car.title
                  ).length;
                  return (
                    <div
                      key={carId}
                      className="bg-white rounded-lg border border-[#DCE5DD] p-3.5 shadow-xs hover:border-[#CBD8CC] transition-all flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-bold text-xs sm:text-sm text-[#173B26]">
                              {car.title}
                            </h4>
                            <span className="text-[11px] text-[#68756D]">{car.department}</span>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase shrink-0 ${
                              car.status === 'open'
                                ? 'bg-emerald-50 text-[#216B35] border border-emerald-200'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}
                          >
                            {car.status || 'open'}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                          <span className="px-2 py-0.5 rounded bg-[#F5F8F3] border border-[#DCE5DD] text-[#173B26] font-medium">
                            {car.employmentType}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#F5F8F3] border border-[#DCE5DD] text-[#4B5563]">
                            {car.location}
                          </span>
                        </div>

                        <div className="text-[11px] text-[#4B5563] space-y-0.5 pt-1 border-t border-[#F0F4F0]">
                          <div><strong>Qualification:</strong> {car.qualification || '—'}</div>
                          <div><strong>Experience:</strong> {car.experience}{car.stipendOrSalary ? ` • ${car.stipendOrSalary}` : ''}</div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#F0F4F0] flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setAppFilterCareer(car.title);
                            setActiveTab('applications');
                          }}
                          className="px-2.5 py-1 rounded bg-[#F8FAF8] hover:bg-[#216B35] hover:text-white text-[#216B35] border border-[#DCE5DD] text-xs font-semibold transition-colors"
                        >
                          {applicantCount} Applied
                        </button>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenCareerModal(car)}
                            className="inline-flex items-center gap-1 text-[11px] text-[#216B35] font-semibold py-1 px-2.5 rounded bg-white border border-[#DCE5DD] hover:bg-[#F5F8F3] shadow-2xs transition-colors"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteCareer(carId, car.title)}
                            className="p-1 rounded text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors"
                            title="Delete Opening"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          )
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
                    {filteredApps.map((app) => {
                      const appId = app.id || app._id;
                      return (
                        <div
                          key={appId}
                          className="bg-white rounded-lg border border-[#DCE5DD] p-3.5 shadow-xs hover:border-[#CBD8CC] transition-all flex flex-col justify-between space-y-2.5"
                        >
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="font-bold text-xs sm:text-sm text-[#173B26]">
                                  {app.applicantName}
                                </h4>
                                <span className="text-[11px] text-[#68756D]">
                                  {app.qualification || '—'}{app.passingYear ? ` (${app.passingYear})` : ''}
                                  {app.collegeOrUniversity ? ` • ${app.collegeOrUniversity}` : ''}
                                </span>
                              </div>
                              <select
                                value={app.status || 'New'}
                                onChange={(e) => handleUpdateApplicationStatus(appId, e.target.value)}
                                className="px-1.5 py-0.5 rounded border border-[#DCE5DD] text-[11px] font-semibold bg-[#F8FAF8] text-[#173B26] focus:border-[#216B35] focus:outline-none shrink-0"
                              >
                                <option value="New">New</option>
                                <option value="Reviewed">Reviewed</option>
                                <option value="Shortlisted">Shortlisted</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                            </div>

                            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-[#173B26] border border-emerald-200 font-semibold">
                                {app.careerTitle}
                              </span>
                              {app.createdAt && (
                                <span className="text-[10px] text-[#68756D] font-mono">
                                  {new Date(app.createdAt).toLocaleDateString()}
                                </span>
                              )}
                            </div>

                            {/* Contact Details */}
                            <div className="text-[11px] text-[#4B5563] space-y-0.5 pt-1 border-t border-[#F0F4F0]">
                              <div>
                                <strong>Phone:</strong>{' '}
                                <a href={`tel:${app.phone}`} className="text-[#216B35] hover:underline font-mono">
                                  {app.phone}
                                </a>
                              </div>
                              <div>
                                <strong>Email:</strong>{' '}
                                <a href={`mailto:${app.email}`} className="text-[#216B35] hover:underline">
                                  {app.email}
                                </a>
                              </div>
                              {app.city && <div><strong>City:</strong> {app.city}</div>}
                            </div>

                            {app.experienceSummary && (
                              <div className="text-[11px] text-[#173B26] pt-1">
                                <strong>Skills:</strong> {app.experienceSummary}
                              </div>
                            )}

                            {app.coverNote && (
                              <p className="text-[11px] text-[#4B5563] bg-[#F8FAF8] p-2 rounded border border-[#E8EEE8] line-clamp-2">
                                {app.coverNote}
                              </p>
                            )}
                          </div>

                          <div className="pt-2 border-t border-[#F0F4F0] flex items-center justify-between gap-2">
                            {app.resumeUrl ? (
                              <a
                                href={app.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#216B35] hover:bg-[#174D28] text-white text-xs font-semibold"
                              >
                                <FileText className="w-3 h-3" />
                                <span>View CV</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            ) : (
                              <span className="text-[11px] text-[#68756D]">No CV attached</span>
                            )}
                            <button
                              onClick={() => handleDeleteApplication(appId, app.applicantName)}
                              className="p-1 rounded text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors"
                              title="Delete Application"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* ================= TAB 6: ENQUIRIES ================= */}
        {activeTab === 'enquiries' && (
          <EnquiryManagement
            enquiries={enquiries}
            onDeleteEnquiry={handleDeleteEnquiry}
            onUpdateEnquiry={handleUpdateEnquiry}
          />
        )}
        </div>
      </main>

    </div>
  );
}
