import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, MapPin, Building2, Landmark, BookOpen, GraduationCap, Layers, ArrowRight, CheckCircle2, } from 'lucide-react';
export const OnboardingModal = () => {
    const { modal, closeModal, currentUser, updateUserCoordinates, studyCentres } = useApp();
    const [step, setStep] = useState('form');
    const [formData, setFormData] = useState({
        name: currentUser.name,
        email: currentUser.email || '',
        password: '',
        state: currentUser.state,
        studyCentreId: currentUser.studyCentreId,
        faculty: currentUser.faculty,
        department: currentUser.department,
        programme: currentUser.programme,
        level: currentUser.level,
    });
    if (modal.type !== 'onboarding')
        return null;
    const availableCentres = studyCentres.filter(c => c.state === formData.state);
    const handleStateChange = (newState) => {
        const centresInState = studyCentres.filter(c => c.state === newState);
        const newCentre = centresInState[0] || studyCentres[0];
        setFormData(prev => ({
            ...prev,
            state: newState,
            studyCentreId: newCentre.id,
        }));
    };
    const handleFacultyChange = (newFaculty) => {
        let newDept = 'Computer Science';
        let newProg = 'B.Sc. Computer Science';
        if (newFaculty === 'Faculty of Health Sciences') {
            newDept = 'Nursing Science';
            newProg = 'B.N.Sc. Nursing';
        }
        else if (newFaculty === 'Faculty of Management Sciences') {
            newDept = 'Business Administration';
            newProg = 'B.Sc. Business Administration';
        }
        else if (newFaculty === 'Faculty of Law') {
            newDept = 'Public & Commercial Law';
            newProg = 'LL.B Law';
        }
        else if (newFaculty === 'Faculty of Sciences') {
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
            email: formData.email,
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
    const currentCentreName = studyCentres.find(c => c.id === formData.studyCentreId)?.name ||
        currentUser.studyCentreName;
    return (<div className="modal-overlay animate-fadeIn">
      <div className="modal-panel max-w-xl">
        <div className="p-5 sm:p-6 bg-[#123f33] text-white shrink-0 relative">
          <button onClick={closeModal} className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white cursor-pointer" aria-label="Close">
            <X size={18}/>
          </button>

          <div className="pr-10">
            <span className="chip bg-white/10 text-emerald-100 mb-2 inline-flex">
              Academic onboarding
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white leading-snug mt-2">
              Establish your academic coordinates
            </h2>
            <p className="text-xs text-emerald-100/80 mt-1.5 leading-relaxed">
              Your study centre and academic details help show notices and communities that matter to you.
            </p>
          </div>
        </div>

        <div className="modal-body p-5 sm:p-6 text-left bg-[#fafbfc]">
          {step === 'form' ? (<div className="space-y-4">
              <div>
                <label className="field-label">Full student name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="input" placeholder="e.g. Henry Adeyemi"/>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="field-label">Email address</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="input" placeholder="name@example.com"/>
                </div>
                <div>
                  <label className="field-label">Password</label>
                  <input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="input" placeholder="For this demo only"/>
                </div>
              </div>

              <div className="card p-3.5 space-y-3">
                <h4 className="eyebrow flex items-center gap-1.5">
                  <MapPin size={12} className="text-emerald-700"/>
                  Geography
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="field-label">State</label>
                    <select value={formData.state} onChange={e => handleStateChange(e.target.value)} className="input">
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
                    <label className="field-label">Study centre</label>
                    <select value={formData.studyCentreId} onChange={e => setFormData({ ...formData, studyCentreId: e.target.value })} className="input">
                      {availableCentres.map(c => (<option key={c.id} value={c.id}>
                          {c.name.replace('Lagos Study Centre — ', '')}
                        </option>))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="card p-3.5 space-y-3">
                <h4 className="eyebrow flex items-center gap-1.5">
                  <GraduationCap size={12} className="text-emerald-700"/>
                  Academics
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="field-label">Faculty</label>
                    <select value={formData.faculty} onChange={e => handleFacultyChange(e.target.value)} className="input">
                      <option value="Faculty of Computing">Faculty of Computing</option>
                      <option value="Faculty of Health Sciences">Faculty of Health Sciences</option>
                      <option value="Faculty of Management Sciences">Faculty of Management Sciences</option>
                      <option value="Faculty of Law">Faculty of Law</option>
                      <option value="Faculty of Sciences">Faculty of Sciences</option>
                    </select>
                  </div>

                  <div>
                    <label className="field-label">Department</label>
                    <input type="text" value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} className="input"/>
                  </div>

                  <div>
                    <label className="field-label">Programme</label>
                    <input type="text" value={formData.programme} onChange={e => setFormData({ ...formData, programme: e.target.value })} className="input"/>
                  </div>

                  <div>
                    <label className="field-label">Level</label>
                    <select value={formData.level} onChange={e => setFormData({ ...formData, level: e.target.value })} className="input">
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
            </div>) : (<div className="space-y-4 animate-fadeIn">
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100 text-[13px] text-emerald-900 flex items-start gap-2">
                <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5"/>
                <div>
                  <span className="font-semibold">Community mapping ready.</span> Based on your coordinates, you are linked to these institutional bodies:
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="eyebrow">Your auto-linked communities</h4>

                {[
                { title: `${formData.state} State Community`, type: 'Geographic state community', icon: MapPin },
                { title: currentCentreName, type: 'Study centre hub', icon: Building2 },
                { title: formData.faculty, type: 'Faculty body', icon: Landmark },
                { title: `Department of ${formData.department}`, type: 'Department', icon: BookOpen },
                { title: formData.programme, type: 'Programme cohort', icon: GraduationCap },
                { title: `${formData.level} Cohort`, type: 'Level network', icon: Layers },
            ].map(item => {
                const Icon = item.icon;
                return (<div key={item.title} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white border border-[#e3e8ef]">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                          <Icon size={15}/>
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-[13px] font-semibold text-slate-900 truncate">{item.title}</h5>
                          <span className="text-[11px] text-slate-400">{item.type}</span>
                        </div>
                      </div>
                      <span className="chip chip-brand shrink-0">Connected</span>
                    </div>);
            })}
              </div>
            </div>)}
        </div>

        <div className="px-4 sm:px-6 py-3.5 bg-white border-t border-[#e3e8ef] flex items-center justify-between gap-2 shrink-0">
          {step === 'preview' ? (<button onClick={() => setStep('form')} className="btn btn-ghost">
              Back to edit
            </button>) : (<span className="text-xs text-slate-400">Step 1 of 2</span>)}

          {step === 'form' ? (<button onClick={() => setStep('preview')} className="btn btn-primary">
              <span>Next: communities</span>
              <ArrowRight size={13}/>
            </button>) : (<button onClick={handleComplete} className="btn btn-primary">
              <CheckCircle2 size={14}/>
              <span>Enter NOUN Connect</span>
            </button>)}
        </div>
      </div>
    </div>);
};
