import { useState } from 'react';
import type { Student } from './GameTime';
import { formatTime } from './Timer';

const DEFAULT_GAME_MS = 45 * 60 * 1000;

interface Props {
    student: Student;
    timeLeftMs: number;
    onPause: () => void;
    onResume: () => void;
    onRemove: () => void;
    onSetTime: (ms: number) => void;
    onRename: (name: string) => void;
}

function StudentCard({ student, timeLeftMs, onPause, onResume, onRemove, onSetTime, onRename }: Props) {
    const pct = Math.max(0, Math.min(1, timeLeftMs / DEFAULT_GAME_MS));
    const [editing, setEditing] = useState(false);
    const [sliderMin, setSliderMin] = useState(45);
    const [editName, setEditName] = useState(student.name);

    const openEdit = () => {
        setSliderMin(Math.max(0, Math.round(timeLeftMs / 60000)));
        setEditName(student.name);
        setEditing(true);
    };

    const handleConfirm = () => {
        onSetTime(sliderMin * 60 * 1000);
        const trimmed = editName.trim();
        if (trimmed) onRename(trimmed);
        setEditing(false);
    };

    let barColor = 'bg-success';
    let textColor = 'text-success';
    if (pct < 0.2) {
        barColor = 'bg-error';
        textColor = 'text-error';
    } else if (pct < 0.45) {
        barColor = 'bg-warning';
        textColor = 'text-warning';
    }

    return (
        <>
            <div className="card bg-base-200 border border-base-300 p-4 flex flex-col gap-3">
                <div className="flex justify-between items-start gap-2">
                    <span className="text-2xl font-bold leading-tight min-w-0">{student.name}</span>
                    <div className="flex items-center gap-1 shrink-0">
                        <button
                            className="btn btn-ghost btn-xs text-base-content/40 hover:text-primary"
                            onClick={openEdit}
                            title="Edit"
                        >Edit</button>
                        <button
                            className="btn btn-ghost btn-xs text-base-content/40 hover:text-error"
                            onClick={onRemove}
                            title="Remove student"
                        >✕</button>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <div className="w-full bg-base-300 rounded-full h-4 overflow-hidden">
                        <div
                            className={`h-4 rounded-full transition-all duration-1000 ${barColor}`}
                            style={{ width: `${pct * 100}%` }}
                        />
                    </div>
                    <div
                        className={`text-right text-sm font-mono tabular-nums cursor-pointer hover:underline ${textColor}`}
                        onClick={openEdit}
                        title="Click to edit time"
                    >
                        {formatTime(timeLeftMs)}
                    </div>
                </div>

                <button
                    className={`btn w-full ${student.isPaused ? 'btn-success' : 'btn-warning'}`}
                    onPointerDown={e => e.stopPropagation()}
                    onClick={student.isPaused ? onResume : onPause}
                >
                    {student.isPaused ? '▶ Resume' : '⏸ Pause'}
                </button>

                {student.isPaused && (
                    <div className="text-center text-warning text-xs font-bold tracking-widest">PAUSED</div>
                )}
            </div>

            {/* Edit modal */}
            {editing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="bg-base-200 rounded-box p-6 flex flex-col gap-4 w-full max-w-sm shadow-xl">
                        <h2 className="text-xl font-bold">Edit — {student.name}</h2>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-base-content/60">Name</label>
                            <input
                                className="input input-bordered w-full"
                                value={editName}
                                onChange={e => setEditName(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleConfirm()}
                                autoFocus
                            />
                        </div>

                        <div className="text-5xl font-mono font-bold text-center tabular-nums text-primary">
                            {sliderMin}:00
                        </div>

                        <input
                            type="range"
                            min={0}
                            max={45}
                            value={sliderMin}
                            onChange={e => setSliderMin(Number(e.target.value))}
                            className="range range-primary"
                        />
                        <div className="flex justify-between text-xs text-base-content/50 px-1">
                            <span>0 min</span>
                            <span>45 min</span>
                        </div>

                        <div className="flex gap-2">
                            <button className="btn flex-1" onClick={() => setEditing(false)}>Cancel</button>
                            <button className="btn btn-primary flex-1" onClick={handleConfirm}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default StudentCard;
