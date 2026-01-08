'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Plus, Trash2, Edit2, Check, Image as ImageIcon } from 'lucide-react';

const defaultProjects = [
  { 
    id: 1, 
    name: 'Babazon E-commerce', 
    screenshot: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop', 
    description: 'Amazon-like app with MongoDB + Stripe integration for payments',
    tech: ['Next.js', 'Tailwind', 'MongoDB']
  },
  { 
    id: 2, 
    name: 'AI Tools Directory', 
    screenshot: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
    description: 'Curated AI tools with search filters and category organization',
    tech: ['Next.js', 'Tailwind']
  },
  { 
    id: 3, 
    name: 'Baba_Quotes_Gen', 
    screenshot: 'https://images.unsplash.com/photo-1618063814375-f4d7e63dd1d3?w=800&h=500&fit=crop',
    description: 'Quote generator with smooth animations and unlimited generations',
    tech: ['React', 'Tailwind']
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('babaGalleryProjects');
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      setProjects(defaultProjects);
      localStorage.setItem('babaGalleryProjects', JSON.stringify(defaultProjects));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('babaGalleryProjects', JSON.stringify(projects));
    }
  }, [projects]);

  // Preview uploaded file
  useEffect(() => {
    if (newImageFile) {
      const reader = new FileReader();
      reader.onload = (e) => setNewImagePreview(e.target?.result as string);
      reader.readAsDataURL(newImageFile);
    }
  }, [newImageFile]);

  const addProject = () => {
    if (newImageFile) {
      const newProject = {
        id: Date.now(),
        name: newImageFile.name.split('.')[0],
        screenshot: URL.createObjectURL(newImageFile),
        description: 'Click edit to add description',
        tech: ['Custom'],
      };
      setProjects(prev => [newProject, ...prev]);
      setNewImageFile(null);
      setNewImagePreview('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeProject = (id: number) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    if (selectedProject === id) setSelectedProject(null);
  };

  const startEdit = (project: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(project.id);
    setEditName(project.name);
    setEditDesc(project.description);
  };

  const saveEdit = () => {
    if (editingId !== null) {
      setProjects(prev =>
        prev.map(p =>
          p.id === editingId
            ? { ...p, name: editName, description: editDesc }
            : p
        )
      );
      setEditingId(null);
    }
  };

  const currentProject = projects.find(p => p.id === selectedProject);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Featured <span className="text-blue-400">Projects</span>
        </h1>
        <p className="text-sm text-gray-400 mb-12">Real-world apps built during BCA and personal learning journeys.</p>

        {/* Add Project Section */}
        <div className="bg-slate-950/50 border border-white/10 rounded-2xl p-6 mb-12">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Project Screenshot
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
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/50 hover:shadow-xl mb-4 flex items-center justify-center gap-2 transition-all"
          >
            <ImageIcon className="w-5 h-5" />
            Choose Screenshot
          </button>

          {newImagePreview && (
            <div className="mb-4 p-4 bg-slate-900/70 rounded-xl border border-blue-500/30">
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <img
                  src={newImagePreview}
                  alt="Preview"
                  className="w-32 h-20 object-cover rounded-xl shadow-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{newImageFile?.name}</p>
                  <p className="text-xs text-gray-400">{(newImageFile?.size || 0).toLocaleString()} bytes</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={addProject}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all whitespace-nowrap"
                  >
                    Add Project
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
            Total: {projects.length} projects • Click ✏️ to edit details
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="relative group">
              {editingId === project.id ? (
                // Edit Mode
                <div className="bg-slate-900/90 border border-blue-400/50 rounded-2xl p-4 space-y-3">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Project name"
                    className="w-full px-3 py-2 bg-slate-800 border border-white/20 rounded-lg text-sm focus:border-blue-400 focus:outline-none"
                  />
                  <textarea
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    placeholder="Project description"
                    rows={4}
                    className="w-full px-3 py-2 bg-slate-800 border border-white/20 rounded-lg text-sm focus:border-blue-400 focus:outline-none resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={saveEdit}
                      className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-1"
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
                  <div
                    className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 cursor-pointer hover:-translate-y-1"
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <Image
                      src={project.screenshot}
                      alt={project.name}
                      width={800}
                      height={500}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                      <h3 className="font-bold text-lg mb-1">{project.name}</h3>
                      <p className="text-sm text-gray-300 mb-2 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.tech.map((tech: string) => (
                          <span key={tech} className="text-xs bg-blue-500/20 px-2 py-1 rounded-full border border-blue-500/40">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <button
                      onClick={(e) => startEdit(project, e)}
                      className="p-1.5 bg-blue-500/90 hover:bg-blue-600 rounded-full shadow-lg hover:scale-110 transition-all"
                      title="Edit project details"
                    >
                      <Edit2 className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => removeProject(project.id)}
                      className="p-1.5 bg-red-500/90 hover:bg-red-600 rounded-full shadow-lg hover:scale-110 transition-all"
                      title="Remove project"
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

      {/* Fullscreen Modal */}
      {selectedProject && currentProject && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <button
            className="absolute top-8 right-8 p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white shadow-2xl"
            onClick={() => setSelectedProject(null)}
          >
            <X size={24} />
          </button>
          <div className="max-w-5xl w-full flex flex-col items-center">
            <Image
              src={currentProject.screenshot}
              alt={currentProject.name}
              width={1200}
              height={800}
              className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl mb-6"
            />
            <div className="bg-slate-900/80 backdrop-blur rounded-2xl px-6 py-4 max-w-2xl text-center">
              <h3 className="text-2xl font-bold mb-2">{currentProject.name}</h3>
              <p className="text-gray-300 text-sm mb-3">{currentProject.description}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {currentProject.tech.map((tech: string) => (
                  <span key={tech} className="text-xs bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/40">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
