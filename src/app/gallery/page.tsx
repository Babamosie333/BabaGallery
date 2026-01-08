'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { images } from '@/lib/images';
import { X, ChevronLeft, ChevronRight, Plus, Trash2, Image as ImageIcon, Edit2, Check } from 'lucide-react';

const categories = ['all', 'tech', 'abstract', 'portraits'];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [userImages, setUserImages] = useState<any[]>([]);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from localStorage FIRST (persists across refreshes)
  useEffect(() => {
    const saved = localStorage.getItem('babaGalleryImages');
    if (saved) {
      setUserImages(JSON.parse(saved));
    } else {
      // First visit - use defaults from images.ts
      setUserImages(images);
      localStorage.setItem('babaGalleryImages', JSON.stringify(images));
    }
  }, []);

  // Save to localStorage whenever images change
  useEffect(() => {
    if (userImages.length > 0) {
      localStorage.setItem('babaGalleryImages', JSON.stringify(userImages));
    }
  }, [userImages]);

  // Preview uploaded file
  useEffect(() => {
    if (newImageFile) {
      const reader = new FileReader();
      reader.onload = (e) => setNewImagePreview(e.target?.result as string);
      reader.readAsDataURL(newImageFile);
    }
  }, [newImageFile]);

  const openLightbox = (id: number) => setSelectedImage(id);
  const closeLightbox = () => setSelectedImage(null);
  const nextImage = () => setSelectedImage((prev) => prev ? (prev % userImages.length) + 1 : null);
  const prevImage = () => setSelectedImage((prev) => prev ? (prev === 1 ? userImages.length : prev - 1) : null);

  const addImage = () => {
    if (newImageFile) {
      const newImg = {
        id: Date.now(),
        src: URL.createObjectURL(newImageFile),
        name: newImageFile.name.split('.')[0],
        description: 'Click edit to add description',
        category: 'tech',
        width: 800,
        height: 600,
      };
      setUserImages(prev => [newImg, ...prev]);
      setNewImageFile(null);
      setNewImagePreview('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (id: number) => {
    setUserImages(prev => prev.filter(img => img.id !== id));
    if (selectedImage === id) closeLightbox();
  };

  const startEdit = (img: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(img.id);
    setEditName(img.name || img.alt);
    setEditDesc(img.description || '');
  };

  const saveEdit = () => {
    if (editingId !== null) {
      setUserImages(prev => 
        prev.map(img => 
          img.id === editingId 
            ? { ...img, name: editName, description: editDesc }
            : img
        )
      );
      setEditingId(null);
    }
  };

  const filteredImages = activeCategory === 'all' 
    ? userImages 
    : userImages.filter(img => img.category === activeCategory);

  const currentImage = userImages.find(img => img.id === selectedImage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white px-4 py-10">
      <div className="max-w-6xl mx-auto pt-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Photo <span className="text-cyan-400">Gallery</span>
        </h1>

        {/* Upload Section */}
        <div className="bg-slate-950/50 border border-white/10 rounded-2xl p-6 mb-12">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Photo from Device
          </h2>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => setNewImageFile(e.target.files?.[0] || null)}
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-black font-semibold rounded-2xl shadow-lg shadow-emerald-500/50 hover:shadow-xl mb-4 flex items-center justify-center gap-2 transition-all"
          >
            <ImageIcon className="w-5 h-5" />
            Choose Photo
          </button>

          {newImagePreview && (
            <div className="mb-4 p-4 bg-slate-900/70 rounded-xl border border-emerald-500/30">
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <img
                  src={newImagePreview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-xl shadow-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{newImageFile?.name}</p>
                  <p className="text-xs text-gray-400">{(newImageFile?.size || 0).toLocaleString()} bytes</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={addImage}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-medium rounded-xl shadow-md hover:shadow-lg transition-all whitespace-nowrap"
                  >
                    Add to Gallery
                  </button>
                  <button
                    onClick={() => {
                      setNewImageFile(null);
                      setNewImagePreview('');
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          <p className="text-xs text-gray-500">
            Total: {userImages.length} images • Click ✏️ to edit names • Saved forever
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/50 scale-105'
                  : 'bg-slate-900/50 hover:bg-slate-800 border border-white/20 hover:border-cyan-400/50'
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'all' ? 'All' : cat.toUpperCase()}
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mb-8">
          Showing {filteredImages.length} image{filteredImages.length !== 1 ? 's' : ''}
        </p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((img) => (
            <div key={img.id} className="relative group">
              {editingId === img.id ? (
                // Edit Mode
                <div className="bg-slate-900/90 border border-cyan-400/50 rounded-2xl p-4 space-y-3">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Photo name"
                    className="w-full px-3 py-2 bg-slate-800 border border-white/20 rounded-lg text-sm focus:border-cyan-400 focus:outline-none"
                  />
                  <textarea
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    placeholder="Description"
                    rows={3}
                    className="w-full px-3 py-2 bg-slate-800 border border-white/20 rounded-lg text-sm focus:border-cyan-400 focus:outline-none resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={saveEdit}
                      className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-medium rounded-lg transition-all flex items-center justify-center gap-1"
                    >
                      <Check className="w-4 h-4" /> Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <button
                    className="block w-full relative overflow-hidden rounded-2xl shadow-[0_0_40px_-18px_rgba(34,211,238,0.6)] hover:shadow-cyan-400/80 hover:-translate-y-1 transition-all duration-500"
                    onClick={() => openLightbox(img.id)}
                  >
                    <Image
                      src={img.src}
                      alt={img.name || img.alt}
                      width={img.width}
                      height={img.height}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-4">
                      <p className="font-semibold text-base mb-1">{img.name || img.alt}</p>
                      {img.description && (
                        <p className="text-xs text-gray-300 line-clamp-2">{img.description}</p>
                      )}
                      <span className="text-xs text-cyan-400 mt-2">Click to enlarge</span>
                    </div>
                  </button>
                  
                  {/* Action Buttons */}
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <button
                      onClick={(e) => startEdit(img, e)}
                      className="p-1.5 bg-blue-500/90 hover:bg-blue-600 rounded-full shadow-lg hover:scale-110 transition-all"
                      title="Edit name & description"
                    >
                      <Edit2 className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => removeImage(img.id)}
                      className="p-1.5 bg-red-500/90 hover:bg-red-600 rounded-full shadow-lg hover:scale-110 transition-all"
                      title="Remove image"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox with Name & Description */}
      {selectedImage && currentImage && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-6" onClick={closeLightbox}>
          <button className="absolute top-8 right-8 p-3 rounded-full bg-slate-900/90 hover:bg-slate-800/90 backdrop-blur text-white shadow-2xl" onClick={closeLightbox}>
            <X size={24} />
          </button>
          <button className="absolute left-8 p-4 rounded-full bg-slate-900/90 hover:bg-slate-800/90 backdrop-blur text-white shadow-2xl" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
            <ChevronLeft size={32} />
          </button>
          
          <div className="max-w-6xl w-full flex flex-col items-center">
            <Image
              src={currentImage.src}
              alt={currentImage.name || currentImage.alt}
              width={1400}
              height={1000}
              className="max-w-full max-h-[70vh] object-contain rounded-3xl shadow-4xl mb-6"
            />
            <div className="bg-slate-900/80 backdrop-blur rounded-2xl px-6 py-4 max-w-2xl text-center">
              <h3 className="text-2xl font-bold mb-2">{currentImage.name || currentImage.alt}</h3>
              {currentImage.description && (
                <p className="text-gray-300 text-sm">{currentImage.description}</p>
              )}
            </div>
          </div>
          
          <button className="absolute right-8 p-4 rounded-full bg-slate-900/90 hover:bg-slate-800/90 backdrop-blur text-white shadow-2xl" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </div>
  );
}
