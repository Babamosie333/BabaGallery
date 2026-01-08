'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';

const defaultPosts = [
  { 
    id: 1,
    title: 'Building BabaGallery with Next.js 15', 
    excerpt: 'How this photo gallery + landing page was designed for a techy, dark aesthetic.',
    date: '2026-01-08'
  },
  { 
    id: 2,
    title: 'Babazon – Planning an Amazon-like App', 
    excerpt: 'Breaking a huge idea into small, buildable features for BCA students.',
    date: '2026-01-05'
  },
  { 
    id: 3,
    title: 'Organizing BCA Projects in a Portfolio', 
    excerpt: 'Tips to turn your semester projects into a professional online presence.',
    date: '2026-01-03'
  },
];

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editExcerpt, setEditExcerpt] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newExcerpt, setNewExcerpt] = useState('');

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('babaGalleryBlogPosts');
    if (saved) {
      setPosts(JSON.parse(saved));
    } else {
      setPosts(defaultPosts);
      localStorage.setItem('babaGalleryBlogPosts', JSON.stringify(defaultPosts));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('babaGalleryBlogPosts', JSON.stringify(posts));
    }
  }, [posts]);

  const addPost = () => {
    if (newTitle.trim() && newExcerpt.trim()) {
      const newPost = {
        id: Date.now(),
        title: newTitle,
        excerpt: newExcerpt,
        date: new Date().toISOString().split('T')[0],
      };
      setPosts(prev => [newPost, ...prev]);
      setNewTitle('');
      setNewExcerpt('');
      setShowAddForm(false);
    }
  };

  const removePost = (id: number) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  const startEdit = (post: any) => {
    setEditingId(post.id);
    setEditTitle(post.title);
    setEditExcerpt(post.excerpt);
  };

  const saveEdit = () => {
    if (editingId !== null) {
      setPosts(prev =>
        prev.map(p =>
          p.id === editingId
            ? { ...p, title: editTitle, excerpt: editExcerpt }
            : p
        )
      );
      setEditingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Blog <span className="text-purple-400">Posts</span>
        </h1>
        <p className="text-sm text-gray-400 mb-12">
          Short write-ups about your projects, learning, and web dev experiments.
        </p>

        {/* Add Post Button/Form */}
        <div className="bg-slate-950/50 border border-white/10 rounded-2xl p-6 mb-12">
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/50 hover:shadow-xl flex items-center justify-center gap-2 transition-all"
            >
              <Plus className="w-5 h-5" />
              New Blog Post
            </button>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Plus className="w-5 h-5" /> Create New Post
              </h2>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Post title"
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/20 rounded-xl focus:border-purple-400 focus:outline-none text-sm"
              />
              <textarea
                value={newExcerpt}
                onChange={(e) => setNewExcerpt(e.target.value)}
                placeholder="Post excerpt/summary"
                rows={3}
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/20 rounded-xl focus:border-purple-400 focus:outline-none text-sm resize-none"
              />
              <div className="flex gap-3">
                <button
                  onClick={addPost}
                  disabled={!newTitle.trim() || !newExcerpt.trim()}
                  className="flex-1 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Publish Post
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewTitle('');
                    setNewExcerpt('');
                  }}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          <p className="text-xs text-gray-500 mt-4">
            Total: {posts.length} posts • Click ✏️ to edit
          </p>
        </div>

        {/* Blog Posts List */}
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.id} className="group relative">
              {editingId === post.id ? (
                // Edit Mode
                <div className="bg-slate-900/90 border border-purple-400/50 rounded-2xl p-5 space-y-3">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Post title"
                    className="w-full px-3 py-2 bg-slate-800 border border-white/20 rounded-lg text-base focus:border-purple-400 focus:outline-none"
                  />
                  <textarea
                    value={editExcerpt}
                    onChange={(e) => setEditExcerpt(e.target.value)}
                    placeholder="Post excerpt"
                    rows={3}
                    className="w-full px-3 py-2 bg-slate-800 border border-white/20 rounded-lg text-sm focus:border-purple-400 focus:outline-none resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={saveEdit}
                      className="flex-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-1"
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
                <div className="rounded-2xl border border-white/5 bg-slate-950/80 p-5 hover:border-purple-500/60 transition-all relative">
                  <h2 className="text-xl font-bold mb-2 hover:text-purple-400 transition-colors pr-20">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 mb-3">{post.excerpt}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <button
                      onClick={() => startEdit(post)}
                      className="p-2 bg-purple-500/90 hover:bg-purple-600 rounded-lg shadow-lg hover:scale-110 transition-all"
                      title="Edit post"
                    >
                      <Edit2 className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => removePost(post.id)}
                      className="p-2 bg-red-500/90 hover:bg-red-600 rounded-lg shadow-lg hover:scale-110 transition-all"
                      title="Delete post"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
