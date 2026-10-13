import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Plus, 
  Target, 
  Calendar, 
  Sparkles, 
  Compass, 
  ArrowRight,
  TrendingUp,
  X
} from 'lucide-react';
import { LearningGoal } from '../types';
import { INITIAL_GOALS } from '../data/initialData';

const GOALS_STORAGE_KEY = 'hs_learning_goals_data_v1';

export const GoalsView: React.FC = () => {
  const [goals, setGoals] = useState<LearningGoal[]>(() => {
    const saved = localStorage.getItem(GOALS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_GOALS;
  });

  const [filterType, setFilterType] = useState<'all' | 'short-term' | 'long-term' | 'pending' | 'completed'>('all');
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Computer Science');
  const [newType, setNewType] = useState<'short-term' | 'long-term'>('short-term');
  const [newTargetDate, setNewTargetDate] = useState('');
  const [newDesc, setNewDesc] = useState('');

  useEffect(() => {
    localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(goals));
  }, [goals]);

  const toggleGoalCompletion = (id: string) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newGoal: LearningGoal = {
      id: 'goal-' + Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      type: newType,
      targetDate: newTargetDate || '2026',
      completed: false,
      description: newDesc.trim() || 'Custom student learning milestone.'
    };

    setGoals([newGoal, ...goals]);
    setShowAddGoalModal(false);
    setNewTitle('');
    setNewDesc('');
    setNewTargetDate('');
  };

  const completedCount = goals.filter(g => g.completed).length;
  const progressPercent = Math.round((completedCount / (goals.length || 1)) * 100);

  const filteredGoals = goals.filter(g => {
    if (filterType === 'short-term') return g.type === 'short-term';
    if (filterType === 'long-term') return g.type === 'long-term';
    if (filterType === 'completed') return g.completed;
    if (filterType === 'pending') return !g.completed;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">Continuous Evolution</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Learning Goals &amp; Engineering Roadmap
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Tracking curriculum mastery, open-source milestones, and technical ambitions across Computer Science, Web Engineering, and AI.
        </p>
      </div>

      {/* Progress Metric Banner */}
      <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#091024] via-slate-900 to-[#0c1633] border border-slate-800 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>Current Roadmap Progress</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              {completedCount} of {goals.length} Milestones Completed
            </h2>
          </div>

          <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono tabular-nums">
            {progressPercent}%
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-1">
          <span>Short-term goals prioritize coding competitions and StudyHub platform features.</span>
          <button
            onClick={() => setShowAddGoalModal(true)}
            className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Custom Goal</span>
          </button>
        </div>
      </section>

      {/* Filters and Goals Checklist */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-white tracking-tight">Active Milestone Checklist</h3>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-900/60 rounded-xl border border-slate-800">
            {(['all', 'short-term', 'long-term', 'pending', 'completed'] as const).map((ft) => (
              <button
                key={ft}
                onClick={() => setFilterType(ft)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-colors cursor-pointer ${
                  filterType === ft
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {ft.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Goals List */}
        <div className="space-y-4">
          {filteredGoals.map((goal) => (
            <div
              key={goal.id}
              onClick={() => toggleGoalCompletion(goal.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                goal.completed
                  ? 'bg-slate-950/50 border-slate-800/60 opacity-75'
                  : 'bg-[#091024] border-slate-800 hover:border-cyan-500/40 shadow-lg'
              }`}
            >
              <div className="pt-0.5 text-cyan-400 shrink-0">
                {goal.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-500 hover:text-cyan-400 transition-colors" />
                )}
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className={`font-semibold ${goal.type === 'short-term' ? 'text-cyan-400' : 'text-indigo-400'}`}>
                    {goal.type === 'short-term' ? 'Short Term' : 'Long Term Target'}
                  </span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-slate-400">{goal.category}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="font-mono text-slate-500">Target: {goal.targetDate}</span>
                </div>

                <h4 className={`text-base font-bold ${goal.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                  {goal.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {goal.description}
                </p>
              </div>

              <div className="shrink-0 self-center hidden sm:block">
                <span className={`px-2.5 py-1 rounded text-[11px] font-medium font-mono ${
                  goal.completed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  {goal.completed ? 'Completed' : 'In Progress'}
                </span>
              </div>
            </div>
          ))}

          {filteredGoals.length === 0 && (
            <div className="text-center py-12 p-6 rounded-2xl bg-slate-900/30 border border-slate-800 text-slate-400">
              No milestones found in this category.
            </div>
          )}
        </div>
      </section>

      {/* Motivational Philosophy Section */}
      <section className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-4">
        <Sparkles className="w-6 h-6 text-cyan-400 mx-auto" />
        <blockquote className="text-base sm:text-lg font-medium text-slate-200 italic max-w-2xl mx-auto leading-relaxed">
          “The only way to build enduring software is by turning curiosity into daily deliberate practice. First understand the fundamentals, then craft the future.”
        </blockquote>
        <div className="text-xs text-slate-400 font-mono">
          — Himanshu Singh · Engineering Philosophy
        </div>
      </section>

      {/* Add Goal Modal */}
      {showAddGoalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#091024] border border-slate-700 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Create New Learning Milestone</h3>
              <button
                onClick={() => setShowAddGoalModal(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddGoal} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Milestone Objective</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Implement Red-Black Tree in C++"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Time Horizon</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  >
                    <option value="short-term">Short Term (1-3 mos)</option>
                    <option value="long-term">Long Term (Yearly)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Target Date</label>
                  <input
                    type="text"
                    placeholder="e.g. August 2026"
                    value={newTargetDate}
                    onChange={(e) => setNewTargetDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Domain Category</label>
                <input
                  type="text"
                  placeholder="e.g. Algorithms / Web / AI"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  placeholder="Steps required, metrics for completion..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddGoalModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
