import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Sparkles,
  MapPin,
  Building2,
  Landmark,
  BookOpen,
  GraduationCap,
  Layers,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { modal, closeModal, currentUser, updateUserCoordinates, studyCentres } = useApp();

  const [step, setStep] = useState<'form' | 'preview'>('form');
  const [formData, setFormData] = useState({
    name: currentUser.name,
    state: currentUser.state,
    studyCentreId: currentUser.studyCentreId,
    faculty: currentUser.faculty,
    department: currentUser.department,
    programme: currentUser.programme,
    level: currentUser.level,
  });

  if (modal.type !== 'onboarding') return null;

  // Filter study centres based on chosen state
  const availableCentres = studyCentres.filter(c => c.state === formData.state);

  const handleStateChange = (newState: string) => {
    const centresInState = studyCentres.filter(c => c.state === newState);
    const newCentre = centresInState[0] || studyCentres[0];
    setFormData(prev => ({
      ...prev,
      state: newState,
      studyCentreId: newCentre.id,
    }));
  };

  const handleFacultyChange = (newFaculty: string) => {
    let newDept = 'Computer Science';
    let newProg = 'B.Sc. Computer Science';

    if (newFaculty === 'Faculty of Health Sciences') {
      newDept = 'Nursing Science';
      newProg = 'B.N.Sc. Nursing';
    } else if (newFaculty === 'Faculty of Management Sciences') {
      newDept = 'Business Administration';
      newProg = 'B.Sc. Business Administration';
    } else if (newFaculty === 'Faculty of Law') {
      newDept = 'Public & Commercial Law';
      newProg = 'LL.B Law';
    } else if (newFaculty === 'Faculty of Sciences') {
      newDept = 'Environmental Science';
      newProg = 'B.Sc. Environmental Science';
    }

    setFormData(prev => ({
      ...prev,
      faculty: newFaculty,
      department: newDept,
      programme: newProg,
    }));
  };

  const handleComplete = () => {
    const chosenCentre = studyCentres.find(c => c.id === formData.studyCentreId) || studyCentres[0];
    updateUserCoordinates({
      name: formData.name,
      state: formData.state,
      studyCentreId: chosenCentre.id,
      studyCentreName: chosenCentre.name,
      faculty: formData.faculty,
      department: formData.department,
      programme: formData.programme,
      level: formData.level,
    });
    closeModal();
  };

  const currentCentreName =
    studyCentres.find(c => c.id === formData.studyCentreId)?.name ||
    currentUser.studyCentreName;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-900 to-emerald-800 text-white shrink-0 relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white cursor-pointer"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-700 text-emerald-100 border border-emerald-600">
              Academic Onboarding
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Establish Your Academic Coordinates
          </h2>
          <p className="text-xs text-emerald-100/90 mt-1 leading-relaxed">
            Your study centre and academic information help us show you information, official circulars, and student communities that are strictly relevant to you.
          </p>
        </div>

        {/* Body Content */}
        <div className="overflow-y-auto p-5 sm:p-6 flex-1 text-left">
          {step === 'form' ? (
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Student Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  placeholder="e.g. Henry Adeyemi"
                />
              </div>

              {/* Geographic Coordinates Grid */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin size={12} className="text-emerald-700" />
                  Geographical Coordinates (State & Study Centre)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      State of Residence / Study
                    </label>
                    <select
                      value={formData.state}
                      onChange={e => handleStateChange(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Lagos">Lagos State</option>
                      <option value="Abuja FCT">Abuja FCT</option>
                      <option value="Oyo">Oyo State</option>
                      <option value="Rivers">Rivers State</option>
                      <option value="Enugu">Enugu State</option>
                      <option value="Kano">Kano State</option>
                      <option value="Kaduna">Kaduna State</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Assigned Study Centre
                    </label>
                    <select
                      value={formData.studyCentreId}
                      onChange={e => setFormData({ ...formData, studyCentreId: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 truncate"
                    >
                      {availableCentres.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name.replace('Lagos Study Centre — ', '')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Academic Coordinates Grid */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap size={13} className="text-emerald-700" />
                  Academic Coordinates (Faculty, Programme & Level)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Faculty
                    </label>
                    <select
                      value={formData.faculty}
                      onChange={e => handleFacultyChange(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Faculty of Computing">Faculty of Computing</option>
                      <option value="Faculty of Health Sciences">Faculty of Health Sciences</option>
                      <option value="Faculty of Management Sciences">Faculty of Management Sciences</option>
                      <option value="Faculty of Law">Faculty of Law</option>
                      <option value="Faculty of Sciences">Faculty of Sciences</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={e => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Programme of Study
                    </label>
                    <input
                      type="text"
                      value={formData.programme}
                      onChange={e => setFormData({ ...formData, programme: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Current Academic Level
                    </label>
                    <select
                      value={formData.level}
                      onChange={e => setFormData({ ...formData, level: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="100 Level">100 Level (Freshman)</option>
                      <option value="200 Level">200 Level (Sophomore)</option>
                      <option value="300 Level">300 Level (Junior)</option>
                      <option value="400 Level">400 Level (Senior)</option>
                      <option value="500 Level">500 Level (Final Year)</option>
                      <option value="PGD">Postgraduate Diploma (PGD)</option>
                      <option value="M.Sc.">Master of Science (M.Sc.)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Step 2: Auto-Created Communities Preview */
            <div className="space-y-4 animate-fadeIn">
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
                <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Automated Community Mapping Complete:</span> Based on your academic coordinates, the platform automatically links you to these 6 core institutional bodies:
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Your Auto-Generated Communities
                </h4>

                {[
                  { title: `${formData.state} State Community`, type: 'Geographic State Community', icon: MapPin },
                  { title: currentCentreName, type: 'Study Centre Official Hub', icon: Building2 },
                  { title: formData.faculty, type: 'Academic Faculty Body', icon: Landmark },
                  { title: `Department of ${formData.department}`, type: 'Academic Department', icon: BookOpen },
                  { title: formData.programme, type: 'Degree Programme Cohort', icon: GraduationCap },
                  { title: `${formData.level} Cohort`, type: 'Academic Level Network', icon: Layers },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 shadow-2xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                          <Icon size={16} />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-slate-900">{item.title}</h5>
                          <span className="text-[10px] text-slate-500">{item.type}</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Connected
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          {step === 'preview' ? (
            <button
              onClick={() => setStep('form')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 cursor-pointer"
            >
              Back to Edit
            </button>
          ) : (
            <span className="text-xs text-slate-400">Step 1 of 2</span>
          )}

          {step === 'form' ? (
            <button
              onClick={() => setStep('preview')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <span>Next: View Communities</span>
              <ArrowRight size={13} />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <CheckCircle2 size={14} />
              <span>Enter NOUN Connect</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
