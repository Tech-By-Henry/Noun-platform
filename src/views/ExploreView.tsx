import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { StudentCard } from '../components/StudentCard';
import {
  Compass,
  MapPin,
  Building2,
  Users,
  Search,
  Filter,
  ChevronRight,
  GraduationCap,
  Sparkles,
  Layers,
} from 'lucide-react';

export const ExploreView: React.FC = () => {
  const { studyCentres, students, openModal, currentUser } = useApp();

  const [activeTab, setActiveTab] = useState<'centres' | 'students'>('centres');
  const [selectedState, setSelectedState] = useState<string>('All');

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
    if (selectedState === 'All') return studyCentres;
    return studyCentres.filter(c => c.state === selectedState);
  }, [studyCentres, selectedState]);

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      if (selectedState !== 'All' && s.state !== selectedState) return false;
      if (selectedCentre !== 'All' && s.studyCentreId !== selectedCentre) return false;
      if (selectedFaculty !== 'All' && s.faculty !== selectedFaculty) return false;
      if (selectedLevel !== 'All' && s.level !== selectedLevel) return false;

      if (studentSearch.trim()) {
        const q = studentSearch.toLowerCase();
        const matchesName = s.name.toLowerCase().includes(q);
        const matchesProg = s.programme.toLowerCase().includes(q);
        const matchesDept = s.department.toLowerCase().includes(q);
        const matchesCentre = s.studyCentreName.toLowerCase().includes(q);
        const matchesSkill = s.skills.some(sk => sk.toLowerCase().includes(q));
        const matchesInterest = s.interests.some(i => i.toLowerCase().includes(q));
        return (
          matchesName ||
          matchesProg ||
          matchesDept ||
          matchesCentre ||
          matchesSkill ||
          matchesInterest
        );
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

  return (
    <div className="space-y-5 pb-12 max-w-5xl mx-auto text-left animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Compass size={20} className="text-emerald-800" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Explore University Ecosystem
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          Discover study centres across Nigerian states and find coursemates in your programme.
        </p>
      </div>

      {/* Primary Tab Switcher */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('centres')}
          className={`py-2.5 px-4 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'centres'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building2 size={16} />
          <span>Study Centres Directory ({studyCentres.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`py-2.5 px-4 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'students'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users size={16} />
          <span>Student Directory ({students.length})</span>
        </button>
      </div>

      {/* TAB 1: STUDY CENTRES */}
      {activeTab === 'centres' && (
        <div className="space-y-4">
          {/* State Filter Pills */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Filter by Nigerian State
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
              {statesList.map(state => (
                <button
                  key={state}
                  onClick={() => setSelectedState(state)}
                  className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedState === state
                      ? 'bg-emerald-800 text-white shadow-2xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {state === 'All' ? 'All States (Nigeria)' : `${state} State`}
                </button>
              ))}
            </div>
          </div>

          {/* Study Centres Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredCentres.map(centre => (
              <div
                key={centre.id}
                onClick={() => openModal('centre', centre.id)}
                className="group bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-400 p-4 transition-all duration-150 cursor-pointer shadow-2xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                      {centre.code}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {centre.state} State
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-emerald-800 leading-snug">
                    {centre.name}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1.5 flex items-start gap-1">
                    <MapPin size={13} className="shrink-0 text-slate-400 mt-0.5" />
                    <span className="line-clamp-2">{centre.address}</span>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-slate-600 font-medium">
                    <span>{centre.studentCount.toLocaleString()} students</span>
                    <span>•</span>
                    <span>{centre.activeGroupsCount} groups</span>
                  </div>

                  <span className="text-emerald-700 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Explore <ChevronRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: STUDENT DIRECTORY (Finding People) */}
      {activeTab === 'students' && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search students by name, interest (e.g. 'Python', 'UI', 'Audit'), or programme..."
              value={studentSearch}
              onChange={e => setStudentSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
            />
          </div>

          {/* Detailed Filters Bar */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                State
              </label>
              <select
                value={selectedState}
                onChange={e => {
                  setSelectedState(e.target.value);
                  setSelectedCentre('All');
                }}
                className="w-full p-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-800"
              >
                {statesList.map(s => (
                  <option key={s} value={s}>
                    {s === 'All' ? 'All States' : s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                Study Centre
              </label>
              <select
                value={selectedCentre}
                onChange={e => setSelectedCentre(e.target.value)}
                className="w-full p-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-800 truncate"
              >
                <option value="All">All Study Centres</option>
                {studyCentres
                  .filter(c => selectedState === 'All' || c.state === selectedState)
                  .map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name.replace('Lagos Study Centre — ', '')}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                Faculty
              </label>
              <select
                value={selectedFaculty}
                onChange={e => setSelectedFaculty(e.target.value)}
                className="w-full p-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-800 truncate"
              >
                {facultiesList.map(f => (
                  <option key={f} value={f}>
                    {f === 'All' ? 'All Faculties' : f}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                Academic Level
              </label>
              <select
                value={selectedLevel}
                onChange={e => setSelectedLevel(e.target.value)}
                className="w-full p-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-800"
              >
                {levelsList.map(l => (
                  <option key={l} value={l}>
                    {l === 'All' ? 'All Levels' : l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Found <strong>{filteredStudents.length}</strong> students matching criteria
            </span>
            {(selectedState !== 'All' ||
              selectedCentre !== 'All' ||
              selectedFaculty !== 'All' ||
              selectedLevel !== 'All' ||
              studentSearch) && (
              <button
                onClick={() => {
                  setSelectedState('All');
                  setSelectedCentre('All');
                  setSelectedFaculty('All');
                  setSelectedLevel('All');
                  setStudentSearch('');
                }}
                className="text-emerald-700 font-semibold hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Students Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredStudents.length === 0 ? (
              <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
                <Users size={28} className="mx-auto text-slate-300 mb-2" />
                <h4 className="text-sm font-bold text-slate-700">No students found</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Try adjusting or clearing your filters to view more student profiles.
                </p>
              </div>
            ) : (
              filteredStudents.map(student => (
                <StudentCard key={student.id} student={student} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
