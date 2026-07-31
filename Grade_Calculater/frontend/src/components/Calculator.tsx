import { useState, useEffect } from 'react';
import { DEPARTMENT_SUBJECTS, Department, SubjectTemplate } from '../data/subjects';
import { CustomSelect } from './ui/CustomSelect';

// Anna University R2021 Grade Points
const GRADES: Record<string, number> = {
  'O': 10,
  'A+': 9,
  'A': 8,
  'B+': 7,
  'B': 6,
  'C': 5,
  'RA': 0,
  'SA': 0,
  'W': 0
};
interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
  isCustom: boolean;
}

type SemesterData = Record<number, Course[]>;

export const Calculator = () => {
  const [department, setDepartment] = useState<Department>('CSE');
  const [activeSemester, setActiveSemester] = useState<number>(1);
  const [semesterData, setSemesterData] = useState<SemesterData>({
    1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: []
  });

  // Initialize default courses when department or semester changes
  useEffect(() => {
    const newData = { ...semesterData };
    if (department !== 'Custom') {
      const templates = DEPARTMENT_SUBJECTS[department][activeSemester] || [];
      newData[activeSemester] = templates.map((t, idx) => ({
        id: `default-${activeSemester}-${idx}`,
        name: t.name,
        credits: t.credits,
        grade: 'A',
        isCustom: false
      }));
    } else {
      if (!newData[activeSemester] || newData[activeSemester].length === 0) {
        newData[activeSemester] = [
          { id: `custom-${activeSemester}-1`, name: 'Subject 1', credits: 3, grade: 'A', isCustom: true }
        ];
      }
    }
    setSemesterData(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [department, activeSemester]);

  const currentCourses = semesterData[activeSemester] || [];

  const addCourse = () => {
    const newCourse: Course = {
      id: Math.random().toString(36).substring(7),
      name: `New Subject ${currentCourses.length + 1}`,
      credits: 3,
      grade: 'A',
      isCustom: true
    };
    setSemesterData({
      ...semesterData,
      [activeSemester]: [...currentCourses, newCourse]
    });
  };

  const updateCourse = (id: string, field: keyof Course, value: string | number | boolean) => {
    const updatedCourses = currentCourses.map(c => c.id === id ? { ...c, [field]: value } : c);
    setSemesterData({
      ...semesterData,
      [activeSemester]: updatedCourses
    });
  };

  const handleSubjectSelect = (id: string, subjectName: string) => {
    if (subjectName === 'Custom') {
      updateCourse(id, 'isCustom', true);
      updateCourse(id, 'name', 'Custom Subject');
      return;
    }

    const template = DEPARTMENT_SUBJECTS[department][activeSemester]?.find((t: SubjectTemplate) => t.name === subjectName);
    if (template) {
      updateCourse(id, 'name', template.name);
      updateCourse(id, 'credits', template.credits);
      updateCourse(id, 'isCustom', false);
    }
  };

  const removeCourse = (id: string) => {
    const updatedCourses = currentCourses.filter(c => c.id !== id);
    setSemesterData({
      ...semesterData,
      [activeSemester]: updatedCourses
    });
  };

  const calculateSemesterGPA = (semNumber: number) => {
    let totalCredits = 0;
    let totalPoints = 0;
    
    const courses = semesterData[semNumber] || [];
    courses.forEach(course => {
      const points = GRADES[course.grade];
      if (points > 0) { 
        totalCredits += course.credits;
        totalPoints += course.credits * points;
      } else if (['RA', 'SA', 'W'].includes(course.grade)) {
        totalCredits += course.credits; 
      }
    });

    if (totalCredits === 0) return 0;
    return totalPoints / totalCredits;
  };

  const calculateCGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;

    Object.values(semesterData).forEach(courses => {
      courses.forEach(course => {
        const points = GRADES[course.grade];
        if (points > 0) {
          totalCredits += course.credits;
          totalPoints += course.credits * points;
        } else if (['RA', 'SA', 'W'].includes(course.grade)) {
          totalCredits += course.credits; 
        }
      });
    });

    if (totalCredits === 0) return 0;
    return (totalPoints / totalCredits).toFixed(3);
  };

  const currentGPA = calculateSemesterGPA(activeSemester).toFixed(3);
  const overallCGPA = calculateCGPA();

  return (
    <div className="flex flex-col gap-6 relative min-h-[600px] pb-24">
      
      {/* Top Controls Toolbar */}
      <div className="bg-slate-800/40 border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-lg">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Department</label>
            <CustomSelect 
              value={department}
              onChange={(val) => setDepartment(val as Department)}
              className="w-full sm:w-[220px]"
              options={[
                { value: 'CSE', label: 'Computer Science' },
                { value: 'IT', label: 'Information Tech' },
                { value: 'AIDS', label: 'AI & Data Science' },
                { value: 'CIVIL', label: 'Civil Engineering' },
                { value: 'Custom', label: 'Custom / Other' }
              ]}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Semester</label>
            <CustomSelect 
              value={activeSemester}
              onChange={(val) => setActiveSemester(parseInt(val))}
              className="w-full sm:w-[140px]"
              options={[1, 2, 3, 4, 5, 6, 7, 8].map(sem => ({
                value: sem,
                label: `Semester ${sem}`
              }))}
            />
          </div>
        </div>
        
        <div className="flex flex-col items-center md:items-end w-full md:w-auto mt-2 md:mt-0">
           <button 
            onClick={addCourse}
            className="w-full md:w-auto px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-medium rounded-lg transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Subject
          </button>
          <span className="text-xs text-slate-500 mt-2 font-medium">{currentCourses.length} subjects added</span>
        </div>
      </div>

      {/* Data Grid */}
      <div className="flex flex-col">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_100px_100px_48px] gap-4 px-4 py-3 bg-slate-800/40 border border-white/5 rounded-t-xl text-xs font-semibold uppercase tracking-wider text-slate-400">
          <div>Subject</div>
          <div className="text-center">Credits</div>
          <div className="text-center">Grade</div>
          <div className="text-center">Action</div>
        </div>

        {/* Course Rows */}
        <div className="flex flex-col border-x border-b border-white/5 bg-slate-900/20 rounded-b-xl min-h-[300px]">
          {currentCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 py-16 animate-in fade-in duration-300">
              <svg className="w-16 h-16 text-slate-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="font-medium text-lg text-slate-400">No subjects in Semester {activeSemester}</p>
              <button onClick={addCourse} className="mt-2 text-indigo-400 hover:text-indigo-300 font-medium">Add a subject</button>
            </div>
          ) : (
            currentCourses.map((course) => (
              <div 
                key={course.id} 
                className="group flex flex-col md:grid md:grid-cols-[1fr_100px_100px_48px] gap-3 md:gap-4 p-4 border-b border-white/5 items-center hover:bg-slate-800/40 transition-colors animate-in fade-in slide-in-from-left-4 duration-300"
              >
                
                {/* Subject Name */}
                <div className="w-full">
                  <div className="md:hidden text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Subject</div>
                  {course.isCustom ? (
                    <input 
                      type="text" 
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                      className="w-full bg-slate-900/50 border border-white/10 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 px-3 py-2 rounded-lg outline-none text-slate-200 text-sm transition-all shadow-inner"
                      placeholder="Enter subject name"
                    />
                  ) : (
                    <CustomSelect
                      value={course.name}
                      onChange={(val) => handleSubjectSelect(course.id, val)}
                      className="w-full"
                      options={[
                        ...(DEPARTMENT_SUBJECTS[department][activeSemester] || []).map((t: SubjectTemplate) => {
                          const match = t.name.match(/^([A-Z0-9]+):\s*(.+)$/);
                          return {
                            value: t.name,
                            label: match ? match[2] : t.name,
                            code: match ? match[1] : undefined
                          };
                        }),
                        { value: 'Custom', label: 'Custom Subject', isCustom: true }
                      ]}
                    />
                  )}
                </div>
                
                {/* Credits & Grade */}
                <div className="w-full flex gap-3 md:contents">
                  <div className="flex-1 md:flex-none">
                    <div className="md:hidden text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Credits</div>
                    <input 
                      type="number" 
                      min="1" max="10"
                      value={course.credits}
                      onChange={(e) => updateCourse(course.id, 'credits', parseInt(e.target.value) || 0)}
                      className="w-full text-center bg-slate-900/50 border border-white/10 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 px-3 py-2 rounded-lg outline-none text-slate-200 font-semibold text-sm transition-all shadow-inner"
                    />
                  </div>

                  <div className="flex-1 md:flex-none relative">
                    <div className="md:hidden text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Grade</div>
                    <CustomSelect 
                      value={course.grade}
                      onChange={(val) => updateCourse(course.id, 'grade', val)}
                      className="w-full"
                      options={Object.keys(GRADES).map(grade => ({
                        value: grade,
                        label: grade
                      }))}
                    />
                  </div>

                  {/* Delete Action */}
                  <div className="flex items-end md:items-center justify-center">
                    <button 
                      onClick={() => removeCourse(course.id)}
                      className="p-2 md:opacity-0 md:group-hover:opacity-100 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all focus:opacity-100"
                      title="Remove Course"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Sticky Floating Summary Bar */}
      <div className="absolute bottom-0 left-0 right-0 w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
        <div className="bg-slate-800/90 backdrop-blur-xl p-4 sm:p-6 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-white/10 relative z-10">
          
          <div className="flex-1 flex items-center justify-between sm:justify-center gap-6 px-4 py-2 sm:py-0">
            <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">Sem {activeSemester} GPA</span>
            <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              {currentGPA}
            </span>
          </div>

          <div className="flex-1 flex items-center justify-between sm:justify-center gap-6 px-4 py-2 sm:py-0 mt-2 sm:mt-0 pt-2 sm:pt-0">
            <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">Overall CGPA</span>
            <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              {overallCGPA}
            </span>
          </div>
          
        </div>
      </div>

    </div>
  );
};
