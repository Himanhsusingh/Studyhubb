import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  CheckCircle2, 
  Terminal, 
  Globe, 
  Github, 
  Key, 
  Copy, 
  Check, 
  Layers, 
  Server,
  BookOpen
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/initialData';

interface DeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentGuideModal: React.FC<DeploymentGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeStep, setActiveStep] = useState(1);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyCode = (index: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const steps = [
    {
      step: 1,
      title: 'GitHub Pages Frontend Setup',
      desc: 'Build the static bundle and push it to your repository.',
      content: (
        <div className="space-y-3 text-xs text-slate-300">
          <p>
            Your portfolio website is designed to compile into pure static HTML, CSS, and JavaScript that GitHub Pages serves effortlessly from <span className="font-mono text-cyan-400">himanhsusingh.github.io</span>.
          </p>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-mono">
            <div className="text-slate-400"># Step 1: Clone or open your portfolio repository:</div>
            <div className="text-cyan-300">git clone https://github.com/himanhsusingh/himanhsusingh.github.io.git</div>
            <div className="text-slate-400"># Step 2: Install dependencies &amp; compile:</div>
            <div className="text-cyan-300">npm install</div>
            <div className="text-cyan-300">npm run build</div>
          </div>
          <p className="text-slate-400">
            The <code className="text-slate-200">dist/</code> folder contains all static files. Commit the built assets or configure GitHub Actions to deploy <code className="text-slate-200">dist/</code> directly on push.
          </p>
        </div>
      )
    },
    {
      step: 2,
      title: 'Profile Photo & Asset Customization',
      desc: 'How to easily replace the avatar and certificate images with your own files.',
      content: (
        <div className="space-y-3 text-xs text-slate-300">
          <p>
            Your profile photo is managed in <code className="text-cyan-400">src/data/initialData.ts</code>.
          </p>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 font-mono text-[11px]">
            <div className="text-slate-400">// Inside src/data/initialData.ts:</div>
            <div className="text-slate-200">export const AVATAR_IMAGE = '/assets/my_photo.jpg';</div>
          </div>
          <p>
            Simply drop your photo inside <code className="text-slate-200">public/assets/my_photo.jpg</code> (or <code className="text-slate-200">src/assets/images/</code>) and update the reference. The gold ring frame automatically scales and frames your face!
          </p>
        </div>
      )
    },
    {
      step: 3,
      title: 'Connecting Gemini AI Key (Optional Backend)',
      desc: 'How Gemini 3.8 Flash operates without leaking keys in GitHub.',
      content: (
        <div className="space-y-3 text-xs text-slate-300">
          <p>
            Because GitHub Pages is static, your private <code className="text-cyan-400">GEMINI_API_KEY</code> must never be placed in frontend HTML or JavaScript.
          </p>
          <p>
            Here in Google AI Studio, the attached Express server (<code className="text-slate-200">server.ts</code>) calls Gemini automatically. When deploying on GitHub Pages, you can either:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>Deploy the included <code className="text-slate-200">server.ts</code> to Render, Railway, or Google Cloud Run for free and point your frontend to it.</li>
            <li>Or use Vercel Serverless Functions with your secret key configured in dashboard environment variables.</li>
          </ul>
        </div>
      )
    },
    {
      step: 4,
      title: 'Enabling GitHub Pages Settings',
      desc: 'Activate the live site at https://himanhsusingh.github.io.',
      content: (
        <div className="space-y-3 text-xs text-slate-300">
          <ol className="list-decimal pl-5 space-y-2 text-slate-400">
            <li>Go to your GitHub repository: <strong className="text-slate-200">github.com/himanhsusingh/himanhsusingh.github.io</strong></li>
            <li>Click on <strong className="text-slate-200">Settings</strong> &gt; <strong className="text-slate-200">Pages</strong>.</li>
            <li>Under "Build and deployment", select Source: <strong className="text-cyan-400">Deploy from a branch</strong> or <strong className="text-cyan-400">GitHub Actions</strong>.</li>
            <li>Select the branch (<code className="text-slate-200">main</code>) and folder (<code className="text-slate-200">/root</code> or <code className="text-slate-200">/docs</code> if copying build output).</li>
            <li>Click <strong className="text-slate-200">Save</strong>. Within 60 seconds, your site is live!</li>
          </ol>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#091024] border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">GitHub Pages Deployment Guide</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {steps.map((s) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                activeStep === s.step
                  ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="text-[10px] font-mono uppercase text-slate-500">Step {s.step}</div>
              <div className="text-xs font-bold truncate">{s.title.split(' ')[0]}</div>
            </button>
          ))}
        </div>

        {/* Active Step Content */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white">
              {steps[activeStep - 1].title}
            </h4>
            <p className="text-xs text-slate-400">
              {steps[activeStep - 1].desc}
            </p>
          </div>

          <div className="pt-2">
            {steps[activeStep - 1].content}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <div className="text-xs text-slate-400">
            Domain: <span className="text-cyan-400 font-mono">himanhsusingh.github.io</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg shadow-sm"
          >
            Got It, Thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
