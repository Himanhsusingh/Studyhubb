/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { ProjectsView } from './components/ProjectsView';
import { SkillsView } from './components/SkillsView';
import { StudyHubView } from './components/StudyHubView';
import { AILabView } from './components/AILabView';
import { GoalsView } from './components/GoalsView';
import { ContactView } from './components/ContactView';
import { AdminView } from './components/AdminView';
import { DeploymentGuideModal } from './components/DeploymentGuideModal';
import { apiService } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAdmin, setIsAdmin] = useState<boolean>(() => apiService.isAdminAuthenticated());
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [showDeploymentGuide, setShowDeploymentGuide] = useState<boolean>(false);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowAdminModal(false);
        setShowDeploymentGuide(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAdminModal={() => setShowAdminModal(true)}
        isAdmin={isAdmin}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {activeTab === 'home' && <HomeView setActiveTab={setActiveTab} />}
        {activeTab === 'about' && <AboutView setActiveTab={setActiveTab} />}
        {activeTab === 'projects' && <ProjectsView setActiveTab={setActiveTab} />}
        {activeTab === 'skills' && <SkillsView />}
        {activeTab === 'studyhub' && <StudyHubView setActiveTab={setActiveTab} />}
        {activeTab === 'ai-lab' && <AILabView />}
        {activeTab === 'goals' && <GoalsView />}
        {activeTab === 'contact' && <ContactView />}
      </main>

      {/* Bottom Footer */}
      <Footer
        setActiveTab={setActiveTab}
        openDeploymentGuide={() => setShowDeploymentGuide(true)}
        openAdminModal={() => setShowAdminModal(true)}
      />

      {/* Admin Panel Modal */}
      {showAdminModal && (
        <AdminView
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          closeModal={() => setShowAdminModal(false)}
        />
      )}

      {/* GitHub Pages Deployment Guide Modal */}
      <DeploymentGuideModal
        isOpen={showDeploymentGuide}
        onClose={() => setShowDeploymentGuide(false)}
      />
    </div>
  );
}
