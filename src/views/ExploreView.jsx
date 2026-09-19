import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { StudentCard } from '../components/StudentCard';
import { MapPin, Building2, Users, Search, ChevronRight, } from 'lucide-react';
export const ExploreView = () => {
    const { studyCentres, students, openModal } = useApp();
    const [activeTab, setActiveTab] = useState('centres');
    const [selectedState, setSelectedState] = useState('All');
    // Student Directory Filters
    const [studentSearch, setStudentSearch] = useState('');
    const [selectedFaculty, setSelectedFaculty] = useState('All');
    const [selectedCentre, setSelectedCentre] = useState('All');
    const [selectedLevel, setSelectedLevel] = useState('All');
    // Distinct states from centres
    const statesList = useMemo(() => {
        const states = Array.from(new Set(studyCentres.map(c => c.state)));
        return ['All', ...states];
    }, [studyCentres]);
    // Distinct faculties from students
    const facultiesList = useMemo(() => {
        const faculties = Array.from(new Set(students.map(s => s.faculty)));
        return ['All', ...faculties];
    }, [students]);
    // Distinct levels from students
    const levelsList = useMemo(() => {
        const levels = Array.from(new Set(students.map(s => s.level)));
        return ['All', ...levels];
    }, [students]);
    // Filtered Study Centres
    const filteredCentres = useMemo(() => {
        if (selectedState === 'All')
            return studyCentres;
        return studyCentres.filter(c => c.state === selectedState);
    }, [studyCentres, selectedState]);
    // Filtered Students
    const filteredStudents = useMemo(() => {
        return students.filter(s => {
            if (selectedState !== 'All' && s.state !== selectedState)
                return false;
            if (selectedCentre !== 'All' && s.studyCentreId !== selectedCentre)
                return false;
            if (selectedFaculty !== 'All' && s.faculty !== selectedFaculty)
                return false;
            if (selectedLevel !== 'All' && s.level !== selectedLevel)
                return false;
            if (studentSearch.trim()) {
                const q = studentSearch.toLowerCase();
                const matchesName = s.name.toLowerCase().includes(q);
                const matchesProg = s.programme.toLowerCase().includes(q);
                const matchesDept = s.department.toLowerCase().includes(q);
                const matchesCentre = s.studyCentreName.toLowerCase().includes(q);
                const matchesSkill = s.skills.some(sk => sk.toLowerCase().includes(q));
                const matchesInterest = s.interests.some(i => i.toLowerCase().includes(q));
                return (matchesName ||
                    matchesProg ||
                    matchesDept ||
                    matchesCentre ||
                    matchesSkill ||
                    matchesInterest);
            }
            return true;
        });
    }, [
        students,
        selectedState,
        selectedCentre,
        selectedFaculty,
        selectedLevel,
        studentSearch,
    ]);
    const hasActiveFilters = selectedState !== 'All' ||
        selectedCentre !== 'All' ||
        selectedFaculty !== 'All' ||
        selectedLevel !== 'All' ||
        studentSearch;
    return (<div className="space-y-5 pb-10 max-w-5xl mx-auto text-left animate-fadeIn">
      {/* Page header */}
      <div>
        <h1 className="page-title">Explore</h1>
        <p className="page-subtitle">
          Discover study centres across Nigeria and find coursemates in your programme.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-[#e3e8ef] overflow-x-auto no-scrollbar">
        <button onClick={() => setActiveTab('centres')} className={`tab-underline ${activeTab === 'centres' ? 'is-active' : ''}`}>
          <Building2 size={15}/>
          <span>Study centres</span>
          <span className="text-xs text-slate-400">({studyCentres.length})</span>
        </button>

        <button onClick={() => setActiveTab('students')} className={`tab-underline ${activeTab === 'students' ? 'is-active' : ''}`}>
          <Users size={15}/>
          <span>Students</span>
          <span className="text-xs text-slate-400">({students.length})</span>
        </button>
      </div>

      {/* TAB 1: STUDY CENTRES */}
      {activeTab === 'centres' && (<div className="space-y-4">
          {/* State filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
            {statesList.map(state => (<button key={state} onClick={() => setSelectedState(state)} className={`pill-tab shrink-0 ${selectedState === state ? 'is-active' : ''}`}>
                {state === 'All' ? 'All states' : state}
              </button>))}
          </div>

          {/* Study centres grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredCentres.map(centre => (<div key={centre.id} onClick={() => openModal('centre', centre.id)} className="group card card-hover p-4 cursor-pointer flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="chip chip-brand">{centre.code}</span>
                    <span className="text-xs text-slate-500">
                      {centre.state} State
                    </span>
                  </div>

                  <h3 className="font-semibold text-slate-900 text-sm sm:text-[15px] group-hover:text-emerald-900 leading-snug">
                    {centre.name}
                  </h3>

                  <p className="text-[13px] text-slate-500 mt-1.5 flex items-start gap-1.5">
                    <MapPin size={13} className="shrink-0 text-slate-400 mt-0.5"/>
                    <span className="line-clamp-2">{centre.address}</span>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#eef2f6] flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    {centre.studentCount.toLocaleString()} students · {centre.activeGroupsCount} groups
                  </span>

                  <span className="text-emerald-800 font-semibold flex items-center gap-0.5">
                    Explore <ChevronRight size={13}/>
                  </span>
                </div>
              </div>))}
          </div>
        </div>)}

      {/* TAB 2: STUDENT DIRECTORY */}
      {activeTab === 'students' && (<div className="space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
            <input type="text" placeholder="Search by name, interest (e.g. ‘Python’), or programme…" value={studentSearch} onChange={e => setStudentSearch(e.target.value)} className="input pl-11"/>
          </div>

          {/* Filters */}
          <div className="card p-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="min-w-0">
              <label className="field-label">State</label>
              <select value={selectedState} onChange={e => {
                setSelectedState(e.target.value);
                setSelectedCentre('All');
            }} className="input input-sm">
                {statesList.map(s => (<option key={s} value={s}>
                    {s === 'All' ? 'All states' : s}
                  </option>))}
              </select>
            </div>

            <div className="min-w-0">
              <label className="field-label">Study centre</label>
              <select value={selectedCentre} onChange={e => setSelectedCentre(e.target.value)} className="input input-sm">
                <option value="All">All study centres</option>
                {studyCentres
                .filter(c => selectedState === 'All' || c.state === selectedState)
                .map(c => (<option key={c.id} value={c.id}>
                      {c.name.replace('Lagos Study Centre — ', '')}
                    </option>))}
              </select>
            </div>

            <div className="min-w-0">
              <label className="field-label">Faculty</label>
              <select value={selectedFaculty} onChange={e => setSelectedFaculty(e.target.value)} className="input input-sm">
                {facultiesList.map(f => (<option key={f} value={f}>
                    {f === 'All' ? 'All faculties' : f}
                  </option>))}
              </select>
            </div>

            <div className="min-w-0">
              <label className="field-label">Level</label>
              <select value={selectedLevel} onChange={e => setSelectedLevel(e.target.value)} className="input input-sm">
                {levelsList.map(l => (<option key={l} value={l}>
                    {l === 'All' ? 'All levels' : l}
                  </option>))}
              </select>
            </div>
          </div>

          {/* Results summary */}
          <div className="flex items-center justify-between text-[13px] text-slate-500 px-1">
            <span>
              <strong className="text-slate-800">{filteredStudents.length}</strong> students found
            </span>
            {hasActiveFilters && (<button onClick={() => {
                    setSelectedState('All');
                    setSelectedCentre('All');
                    setSelectedFaculty('All');
                    setSelectedLevel('All');
                    setStudentSearch('');
                }} className="text-emerald-800 font-semibold hover:underline cursor-pointer">
                Reset filters
              </button>)}
          </div>

          {/* Students grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredStudents.length === 0 ? (<div className="col-span-full card text-center py-14 px-6">
                <div className="w-12 h-12 rounded-full bg-[#eef2f6] flex items-center justify-center mx-auto mb-3">
                  <Users size={20} className="text-slate-400"/>
                </div>
                <h4 className="text-sm font-semibold text-slate-800">No students found</h4>
                <p className="text-[13px] text-slate-500 mt-1">
                  Try adjusting or clearing your filters to view more student profiles.
                </p>
              </div>) : (filteredStudents.map(student => (<StudentCard key={student.id} student={student}/>)))}
          </div>
        </div>)}
    </div>);
};
