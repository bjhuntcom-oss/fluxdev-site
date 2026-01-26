'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Folder, Plus, Calendar, Users, ExternalLink, MoreVertical, Clock, Trash2, Edit, Filter } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'active' | 'completed' | 'archived';
  created_at: string;
  updated_at: string;
}

export default function ProjetsPage() {
  const { user } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editProject, setEditProject] = useState<Project | null>(null);

  useEffect(() => {
    if (user) {
      loadProjects();
    }
  }, [user]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      // Get current user and role from Supabase
      const { data: userData } = await supabase
        .from('users')
        .select('id, role')
        .eq('clerk_id', user?.id)
        .single();

      const isStaffOrAdmin = userData?.role === 'admin' || userData?.role === 'staff' || userData?.role === 'dev';

      let query = supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      // Users only see their own projects, Staff/Admin/Dev see all
      if (!isStaffOrAdmin && userData?.id) {
        query = query.eq('user_id', userData.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async () => {
    if (!newProject.name.trim()) return;

    try {
      const { data: userData } = await supabase
        .from('users')
        .select('id')
        .eq('clerk_id', user?.id)
        .single();

      const { error } = await supabase.from('projects').insert({
        title: newProject.name,
        description: newProject.description,
        status: 'draft',
        user_id: userData?.id
      });

      if (error) throw error;

      setShowModal(false);
      setNewProject({ name: '', description: '' });
      loadProjects();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'completed': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'archived': return 'bg-white/5 text-white/40 border-white/10';
      default: return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'completed': return 'Termine';
      case 'archived': return 'Archive';
      default: return 'Brouillon';
    }
  };

  const updateProjectStatus = async (projectId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ status: newStatus })
        .eq('id', projectId);
      if (error) throw error;
      setProjects(prev => prev.map(p => p.id === projectId ? { ...p, status: newStatus as Project['status'] } : p));
      setOpenMenuId(null);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const deleteProject = async (projectId: string) => {
    if (!confirm('Supprimer ce projet ?')) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', projectId);
      if (error) throw error;
      setProjects(prev => prev.filter(p => p.id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const filteredProjects = filterStatus === 'all' 
    ? projects 
    : projects.filter(p => p.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-wider">Espace de travail</p>
          <h1 className="text-xl font-light text-white/90">Projets</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-white/40" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white/5 border border-white/10 px-3 py-2 text-sm text-white/70 focus:outline-none"
            >
              <option value="all" className="bg-black">Tous</option>
              <option value="draft" className="bg-black">Brouillon</option>
              <option value="active" className="bg-black">Actif</option>
              <option value="completed" className="bg-black">Termine</option>
              <option value="archived" className="bg-black">Archive</option>
            </select>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm text-white/70"
          >
            <Plus className="w-4 h-4" />
            Nouveau projet
          </button>
        </div>
      </div>

      {loading ? (
        <div className="border border-white/10 p-12 text-center">
          <Clock className="w-8 h-8 text-white/20 mx-auto mb-3 animate-pulse" />
          <p className="text-white/40">Chargement...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="border border-white/10 p-12 text-center">
          <Folder className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/60 mb-2">{filterStatus === 'all' ? 'Aucun projet' : 'Aucun projet avec ce statut'}</p>
          <p className="text-white/40 text-sm mb-4">Creez votre premier projet pour commencer</p>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm text-white/70"
          >
            Creer un projet
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="border border-white/10 p-4 hover:bg-white/[0.02] transition-colors group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center">
                    <Folder className="w-5 h-5 text-white/40" />
                  </div>
                  <div>
                    <h3 className="text-white/80 font-medium">{project.title}</h3>
                    <span className={`text-xs px-2 py-0.5 border ${getStatusStyle(project.status)}`}>
                      {getStatusLabel(project.status)}
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <button 
                    onClick={() => setOpenMenuId(openMenuId === project.id ? null : project.id)}
                    className="p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="w-4 h-4 text-white/40" />
                  </button>
                  {openMenuId === project.id && (
                    <div className="absolute right-0 top-full mt-1 bg-[#0a0a0a] border border-white/10 min-w-[140px] z-10">
                      {project.status !== 'active' && (
                        <button
                          onClick={() => updateProjectStatus(project.id, 'active')}
                          className="w-full px-3 py-2 text-left text-xs text-white/60 hover:bg-white/5"
                        >
                          Marquer Actif
                        </button>
                      )}
                      {project.status !== 'completed' && (
                        <button
                          onClick={() => updateProjectStatus(project.id, 'completed')}
                          className="w-full px-3 py-2 text-left text-xs text-white/60 hover:bg-white/5"
                        >
                          Marquer Termine
                        </button>
                      )}
                      {project.status !== 'archived' && (
                        <button
                          onClick={() => updateProjectStatus(project.id, 'archived')}
                          className="w-full px-3 py-2 text-left text-xs text-white/60 hover:bg-white/5"
                        >
                          Archiver
                        </button>
                      )}
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="w-full px-3 py-2 text-left text-xs text-red-400/70 hover:bg-white/5 border-t border-white/5"
                      >
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {project.description && (
                <p className="text-white/50 text-sm mb-4 line-clamp-2">{project.description}</p>
              )}

              <div className="flex items-center justify-between text-xs text-white/30">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {format(new Date(project.created_at), 'dd MMM yyyy', { locale: fr })}
                </div>
                <Link
                  href={`/dashboard/projets/${project.id}`}
                  className="flex items-center gap-1 text-white/40 hover:text-white/60 transition-colors"
                >
                  Ouvrir <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-md">
            <div className="p-4 border-b border-white/10">
              <h2 className="text-white/90 font-medium">Nouveau projet</h2>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-white/40 text-xs mb-2">Nom du projet</label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 px-3 py-2 text-white/90 text-sm focus:outline-none focus:border-white/20"
                  placeholder="Mon projet"
                />
              </div>
              <div>
                <label className="block text-white/40 text-xs mb-2">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 px-3 py-2 text-white/90 text-sm focus:outline-none focus:border-white/20 resize-none h-24"
                  placeholder="Description du projet..."
                />
              </div>
            </div>
            <div className="p-4 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm text-white/60 hover:text-white/80 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={createProject}
                className="px-4 py-2 bg-white/10 text-sm text-white/90 hover:bg-white/15 transition-colors"
              >
                Creer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
