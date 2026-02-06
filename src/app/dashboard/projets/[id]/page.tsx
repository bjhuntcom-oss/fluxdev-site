"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { 
  ArrowLeft, Calendar, Clock, Edit, Trash2, CheckCircle, AlertCircle, Archive,
  Plus, Check, Circle, Target, Euro, CalendarDays, ListTodo, X, GripVertical
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { useLocale } from '@/contexts';
import Link from 'next/link';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  order: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'active' | 'completed' | 'archived';
  created_at: string;
  updated_at: string;
  budget_min?: number;
  budget_max?: number;
  deadline?: string;
  priority?: 'low' | 'medium' | 'high';
  tasks?: Task[];
}

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  const { locale, t } = useLocale();
  const dateFnsLocale = locale === 'fr' ? fr : enUS;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [userRole, setUserRole] = useState<string>('user');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ 
    title: '', 
    description: '',
    budget_min: '',
    budget_max: '',
    deadline: '',
    priority: 'medium'
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    if (params.id && user) {
      loadProject();
    }
  }, [params.id, user]);

  const loadProject = async () => {
    try {
      // Get current user's role and ID
      const { data: userData } = await supabase
        .from('users')
        .select('id, role')
        .eq('clerk_id', user?.id)
        .single();

      if (!userData) {
        // If we can't determine the user, show a retry-able error
        console.error('Could not fetch user data for project authorization');
        setLoadError(true);
        setLoading(false);
        return;
      }

      const role = userData.role || 'user';
      setUserRole(role);

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) throw error;

      // Check authorization: admin/staff/dev can see all, users only their own
      if (!['admin', 'staff', 'dev'].includes(role) && data.user_id !== userData.id) {
        setUnauthorized(true);
        return;
      }

      setProject(data);
      setEditForm({ 
        title: data.title, 
        description: data.description || '',
        budget_min: data.budget_min?.toString() || '',
        budget_max: data.budget_max?.toString() || '',
        deadline: data.deadline || '',
        priority: data.priority || 'medium'
      });
      // Load tasks from JSON field or initialize empty
      setTasks(data.tasks || []);
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async () => {
    if (!project) return;
    try {
      const { error } = await supabase
        .from('projects')
        .update({
          title: editForm.title,
          description: editForm.description,
          budget_min: editForm.budget_min ? parseFloat(editForm.budget_min) : null,
          budget_max: editForm.budget_max ? parseFloat(editForm.budget_max) : null,
          deadline: editForm.deadline || null,
          priority: editForm.priority,
          updated_at: new Date().toISOString()
        })
        .eq('id', project.id);

      if (error) throw error;
      setIsEditing(false);
      loadProject();
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const updateStatus = async (newStatus: string) => {
    if (!project) return;
    try {
      const { error } = await supabase
        .from('projects')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', project.id);

      if (error) throw error;
      loadProject();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const addTask = async () => {
    if (!newTaskTitle.trim() || !project) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: newTaskTitle.trim(),
      completed: false,
      order: tasks.length
    };
    const updatedTasks = [...tasks, newTask];
    await saveTasks(updatedTasks);
    setNewTaskTitle('');
    setShowAddTask(false);
  };

  const toggleTask = async (taskId: string) => {
    const updatedTasks = tasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    await saveTasks(updatedTasks);
  };

  const deleteTask = async (taskId: string) => {
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    await saveTasks(updatedTasks);
  };

  const saveTasks = async (updatedTasks: Task[]) => {
    if (!project) return;
    try {
      const { error } = await supabase
        .from('projects')
        .update({ tasks: updatedTasks, updated_at: new Date().toISOString() })
        .eq('id', project.id);
      if (error) throw error;
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const deleteProject = async () => {
    if (!project || !confirm(t('dash.projDetail.deleteConfirm'))) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', project.id);
      if (error) throw error;
      router.push('/dashboard/projets');
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'low': return 'bg-white/5 text-white/50 border-white/10';
      default: return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return t('dash.projDetail.priority.high');
      case 'low': return t('dash.projDetail.priority.low');
      default: return t('dash.projDetail.priority.medium');
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
      case 'active': return t('dash.proj.status.active');
      case 'completed': return t('dash.proj.status.completed');
      case 'archived': return t('dash.proj.status.archived');
      default: return t('dash.proj.status.draft');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border border-white/20 border-t-white/60 rounded-full animate-spin" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-white/20 mx-auto mb-4" />
        <p className="text-white/60">{t('dash.projDetail.loadError')}</p>
        <div className="flex gap-4 justify-center mt-4">
          <button onClick={() => { setLoadError(false); setLoading(true); loadProject(); }} className="text-white/60 hover:text-white text-sm underline">
            {t('dash.common.retry')}
          </button>
          <Link href="/dashboard/projets" className="text-white/40 hover:text-white/60 text-sm">
            {t('dash.projDetail.backToProjects')}
          </Link>
        </div>
      </div>
    );
  }

  if (unauthorized) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-red-400/40 mx-auto mb-4" />
        <p className="text-white/60">{t('dash.projDetail.unauthorized')}</p>
        <p className="text-white/40 text-sm mt-1">{t('dash.projDetail.unauthorizedDesc')}</p>
        <Link href="/dashboard/projets" className="text-white/40 hover:text-white/60 text-sm mt-4 inline-block">
          {t('dash.projDetail.backToProjects')}
        </Link>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-white/20 mx-auto mb-4" />
        <p className="text-white/60">{t('dash.projDetail.notFound')}</p>
        <Link href="/dashboard/projets" className="text-white/40 hover:text-white/60 text-sm mt-2 inline-block">
          {t('dash.projDetail.backToProjects')}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/projets" className="p-2 hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5 text-white/60" />
          </Link>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wider">{t('dash.projDetail.label')}</p>
            <h1 className="text-xl font-light text-white/90">{project.title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {project.priority && (
            <span className={`text-xs px-2 py-1 border ${getPriorityStyle(project.priority)}`}>
              {getPriorityLabel(project.priority)}
            </span>
          )}
          <span className={`text-xs px-3 py-1 border ${getStatusStyle(project.status)}`}>
            {getStatusLabel(project.status)}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 hover:bg-white/5 transition-colors"
          >
            <Edit className="w-4 h-4 text-white/40" />
          </button>
          <button
            onClick={deleteProject}
            className="p-2 hover:bg-red-500/10 transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-400/60" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      {tasks.length > 0 && (
        <div className="border border-white/10 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/40 text-xs uppercase tracking-wider">{t('dash.projDetail.progress')}</span>
            <span className="text-white/60 text-sm">{progress}%</span>
          </div>
          <div className="h-2 bg-white/5 w-full">
            <div 
              className="h-full bg-white/60 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/40 text-xs mt-2">{completedTasks} / {tasks.length} {t('dash.projDetail.tasksCompleted')}</p>
        </div>
      )}

      {/* Info Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-white/40" />
            <span className="text-white/40 text-xs">{t('dash.projDetail.createdAt')}</span>
          </div>
          <p className="text-white/80 text-sm">{format(new Date(project.created_at), 'dd MMM yyyy', { locale: dateFnsLocale })}</p>
        </div>
        <div className="border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-white/40" />
            <span className="text-white/40 text-xs">{t('dash.projDetail.updatedAt')}</span>
          </div>
          <p className="text-white/80 text-sm">{format(new Date(project.updated_at), 'dd MMM yyyy', { locale: dateFnsLocale })}</p>
        </div>
        <div className="border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <CalendarDays className="w-4 h-4 text-white/40" />
            <span className="text-white/40 text-xs">Deadline</span>
          </div>
          <p className="text-white/80 text-sm">
            {project.deadline ? format(new Date(project.deadline), 'dd MMM yyyy', { locale: dateFnsLocale }) : '—'}
          </p>
        </div>
        <div className="border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Euro className="w-4 h-4 text-white/40" />
            <span className="text-white/40 text-xs">Budget</span>
          </div>
          <p className="text-white/80 text-sm">
            {project.budget_min || project.budget_max 
              ? `${project.budget_min || '?'} - ${project.budget_max || '?'} €`
              : '—'}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="border border-white/10 p-6">
        <p className="text-white/40 text-xs uppercase tracking-wider mb-4">{t('dash.projDetail.description')}</p>
        <p className="text-white/70 text-sm leading-relaxed">
          {project.description || t('dash.projDetail.noDescription')}
        </p>
      </div>

      {/* Tasks Section */}
      <div className="border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ListTodo className="w-4 h-4 text-white/40" />
            <p className="text-white/40 text-xs uppercase tracking-wider">{t('dash.projDetail.tasks')}</p>
          </div>
          <button
            onClick={() => setShowAddTask(true)}
            className="flex items-center gap-1 text-xs text-white/60 hover:text-white/80 transition-colors"
          >
            <Plus className="w-3 h-3" />
            {t('dash.projDetail.add')}
          </button>
        </div>

        {tasks.length === 0 ? (
          <div className="text-center py-8">
            <Circle className="w-8 h-8 text-white/10 mx-auto mb-2" />
            <p className="text-white/40 text-sm">{t('dash.projDetail.noTask')}</p>
            <button
              onClick={() => setShowAddTask(true)}
              className="text-white/60 text-xs hover:text-white/80 mt-2"
            >
              {t('dash.projDetail.addTask')}
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {tasks.map((task) => (
              <div 
                key={task.id}
                className={`flex items-center gap-3 p-3 border border-white/5 group hover:bg-white/[0.02] transition-colors ${task.completed ? 'opacity-50' : ''}`}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className="flex-shrink-0"
                >
                  {task.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-white/30 hover:text-white/50" />
                  )}
                </button>
                <span className={`flex-1 text-sm ${task.completed ? 'text-white/40 line-through' : 'text-white/70'}`}>
                  {task.title}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/10 transition-all"
                >
                  <X className="w-4 h-4 text-red-400/60" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add Task Input */}
        {showAddTask && (
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              placeholder={t('dash.projDetail.newTaskPlaceholder')}
              className="flex-1 bg-white/5 border border-white/10 px-3 py-2 text-sm text-white/80 focus:outline-none focus:border-white/20"
              autoFocus
            />
            <button
              onClick={addTask}
              className="px-4 py-2 bg-white/10 text-white/80 text-sm hover:bg-white/15 transition-colors"
            >
              {t('dash.projDetail.add')}
            </button>
            <button
              onClick={() => { setShowAddTask(false); setNewTaskTitle(''); }}
              className="px-3 py-2 text-white/40 hover:text-white/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="border border-white/10 p-6">
        <p className="text-white/40 text-xs uppercase tracking-wider mb-4">{t('dash.projDetail.changeStatus')}</p>
        <div className="flex flex-wrap gap-2">
          {project.status !== 'active' && (
            <button
              onClick={() => updateStatus('active')}
              className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 text-green-400 text-sm hover:bg-green-500/20 transition-colors"
            >
              <Target className="w-4 h-4" />
              {t('dash.proj.status.active')}
            </button>
          )}
          {project.status !== 'completed' && (
            <button
              onClick={() => updateStatus('completed')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm hover:bg-blue-500/20 transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              {t('dash.proj.status.completed')}
            </button>
          )}
          {project.status !== 'archived' && (
            <button
              onClick={() => updateStatus('archived')}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white/60 text-sm hover:bg-white/10 transition-colors"
            >
              <Archive className="w-4 h-4" />
              {t('dash.proj.archive')}
            </button>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-lg">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-white/90 font-medium">{t('dash.projDetail.editProject')}</h2>
              <button onClick={() => setIsEditing(false)} className="p-1 hover:bg-white/5">
                <X className="w-4 h-4 text-white/40" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-white/40 text-xs mb-2">{t('dash.projDetail.titleLabel')}</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 px-3 py-2 text-white/90 text-sm focus:outline-none focus:border-white/20"
                />
              </div>
              <div>
                <label className="block text-white/40 text-xs mb-2">{t('dash.projDetail.description')}</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 px-3 py-2 text-white/90 text-sm focus:outline-none focus:border-white/20 resize-none h-24"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/40 text-xs mb-2">{t('dash.projDetail.budgetMin')}</label>
                  <input
                    type="number"
                    value={editForm.budget_min}
                    onChange={(e) => setEditForm({ ...editForm, budget_min: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 px-3 py-2 text-white/90 text-sm focus:outline-none focus:border-white/20"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-white/40 text-xs mb-2">{t('dash.projDetail.budgetMax')}</label>
                  <input
                    type="number"
                    value={editForm.budget_max}
                    onChange={(e) => setEditForm({ ...editForm, budget_max: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 px-3 py-2 text-white/90 text-sm focus:outline-none focus:border-white/20"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/40 text-xs mb-2">Deadline</label>
                  <input
                    type="date"
                    value={editForm.deadline}
                    onChange={(e) => setEditForm({ ...editForm, deadline: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 px-3 py-2 text-white/90 text-sm focus:outline-none focus:border-white/20"
                  />
                </div>
                <div>
                  <label className="block text-white/40 text-xs mb-2">{t('dash.projDetail.priorityLabel')}</label>
                  <select
                    value={editForm.priority}
                    onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 px-3 py-2 text-white/90 text-sm focus:outline-none focus:border-white/20"
                  >
                    <option value="low" className="bg-black">{t('dash.projDetail.priority.low')}</option>
                    <option value="medium" className="bg-black">{t('dash.projDetail.priority.medium')}</option>
                    <option value="high" className="bg-black">{t('dash.projDetail.priority.high')}</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditForm({
                    title: project.title,
                    description: project.description || '',
                    budget_min: project.budget_min?.toString() || '',
                    budget_max: project.budget_max?.toString() || '',
                    deadline: project.deadline || '',
                    priority: project.priority || 'medium'
                  });
                }}
                className="px-4 py-2 text-sm text-white/60 hover:text-white/80 transition-colors"
              >
                {t('dash.proj.cancel')}
              </button>
              <button
                onClick={updateProject}
                className="px-4 py-2 bg-white text-black text-sm hover:bg-white/90 transition-colors"
              >
                {t('dash.projDetail.save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
