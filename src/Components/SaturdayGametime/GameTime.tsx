import { useState, useEffect } from 'react';
import StudentCard from './StudentCard';
import AddStudent from './AddStudent';
import TimesUp from './TimesUp';
import Waitlist from './Waitlist';

const DEFAULT_GAME_MS = 45 * 60 * 1000;

export interface Student {
    id: string;
    name: string;
    endTime: number;
    isPaused: boolean;
    timeLeftMs: number;
}

function getTimeLeft(student: Student): number {
    if (student.isPaused) return student.timeLeftMs;
    return student.endTime - Date.now();
}

function GameTime() {
    const [students, setStudents] = useState<Student[]>([]);
    const [waitlist, setWaitlist] = useState<string[]>([]);
    const [, setTick] = useState(0);
    const [clock, setClock] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => {
            setTick(t => t + 1);
            setClock(new Date());
        }, 1000);
        return () => clearInterval(id);
    }, []);

    const addStudent = (name: string) => {
        const now = Date.now();
        setStudents(prev => [...prev, {
            id: crypto.randomUUID(),
            name,
            endTime: now + DEFAULT_GAME_MS,
            isPaused: false,
            timeLeftMs: DEFAULT_GAME_MS,
        }]);
    };

    const removeStudent = (id: string) => {
        setStudents(prev => prev.filter(s => s.id !== id));
    };

    const pauseStudent = (id: string) => {
        setStudents(prev => prev.map(s => {
            if (s.id !== id || s.isPaused) return s;
            return { ...s, isPaused: true, timeLeftMs: s.endTime - Date.now() };
        }));
    };

    const resumeStudent = (id: string) => {
        setStudents(prev => prev.map(s => {
            if (s.id !== id || !s.isPaused) return s;
            return { ...s, isPaused: false, endTime: Date.now() + s.timeLeftMs };
        }));
    };

    const addToWaitlist = (name: string) => setWaitlist(prev => [...prev, name]);
    const removeFromWaitlist = (index: number) => setWaitlist(prev => prev.filter((_, i) => i !== index));
    const activateFromWaitlist = (name: string, index: number) => {
        addStudent(name);
        removeFromWaitlist(index);
    };

    const activeStudents = students.filter(s => getTimeLeft(s) > 0);
    const timesUpStudents = students.filter(s => getTimeLeft(s) <= 0);

    return (
        <div data-theme="crc" className="min-h-screen bg-base-100 p-4 flex flex-col gap-4">

            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold">Saturday Game Time</h1>
                <div className="text-3xl font-mono font-bold tabular-nums">
                    {clock.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
            </div>

            <div className="flex gap-4 items-start">

                {/* Main area */}
                <div className="flex flex-col gap-4 flex-1 min-w-0">
                    <AddStudent onAdd={addStudent} />

                    {activeStudents.length === 0 && timesUpStudents.length === 0 && (
                        <div className="text-center text-base-content/40 text-2xl py-16">
                            No students yet — add one above!
                        </div>
                    )}

                    {/* Active student grid */}
                    {activeStudents.length > 0 && (
                        <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
                            {activeStudents.map(student => (
                                <StudentCard
                                    key={student.id}
                                    student={student}
                                    timeLeftMs={getTimeLeft(student)}
                                    onPause={() => pauseStudent(student.id)}
                                    onResume={() => resumeStudent(student.id)}
                                    onRemove={() => removeStudent(student.id)}
                                />
                            ))}
                        </div>
                    )}

                </div>

                {/* Sidebar */}
                <div className="w-72 shrink-0 flex flex-col gap-4">
                    <TimesUp students={timesUpStudents} onRemove={removeStudent} />
                    <Waitlist waitlist={waitlist} onAdd={addToWaitlist} onRemove={removeFromWaitlist} onActivate={activateFromWaitlist} />
                </div>

            </div>
        </div>
    );
}

export default GameTime;
