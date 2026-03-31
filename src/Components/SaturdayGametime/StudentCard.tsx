import type { Student } from './GameTime';
import { formatTime } from './Timer';

const DEFAULT_GAME_MS = 45 * 60 * 1000;

interface Props {
    student: Student;
    timeLeftMs: number;
    onPause: () => void;
    onResume: () => void;
    onRemove: () => void;
}

function StudentCard({ student, timeLeftMs, onPause, onResume, onRemove }: Props) {
    const pct = timeLeftMs / DEFAULT_GAME_MS;

    let borderColor = 'border-success';
    let timeColor = 'text-success';
    if (pct < 0.2) {
        borderColor = 'border-error';
        timeColor = 'text-error';
    } else if (pct < 0.45) {
        borderColor = 'border-warning';
        timeColor = 'text-warning';
    }

    return (
        <div className={`card bg-base-200 border-4 ${borderColor} p-4 flex flex-col gap-2`}>
            <div className="flex justify-between items-start gap-2">
                <span className="text-2xl font-bold leading-tight break-words min-w-0">{student.name}</span>
                <button
                    className="btn btn-ghost btn-xs shrink-0 text-base-content/50 hover:text-error"
                    onClick={onRemove}
                    title="Remove student"
                >✕</button>
            </div>

            <div className={`text-5xl font-mono font-bold text-center tabular-nums ${timeColor}`}>
                {formatTime(timeLeftMs)}
            </div>

            <button
                className={`btn btn-sm w-full ${student.isPaused ? 'btn-success' : 'btn-warning'}`}
                onClick={student.isPaused ? onResume : onPause}
            >
                {student.isPaused ? '▶ Resume' : '⏸ Pause'}
            </button>

            {student.isPaused && (
                <div className="text-center text-warning text-xs font-bold tracking-widest">PAUSED</div>
            )}
        </div>
    );
}

export default StudentCard;
