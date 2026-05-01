import type { Student } from './GameTime';

interface Props {
    students: Student[];
    onRemove: (id: string) => void;
    onClearAll: () => void;
}

function TimesUp({ students, onRemove, onClearAll }: Props) {
    return (
        <div className="bg-error/20 border-2 border-error rounded-box p-4">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-bold text-error">Time's Up!</h2>
                {students.length > 1 && (
                    <button onClick={onClearAll} className="btn btn-error btn-xs">
                        Clear All
                    </button>
                )}
            </div>

            {students.length === 0 ? (
                <p className="text-base-content/40 text-sm">No students yet</p>
            ) : (
                <ul className="flex flex-col gap-1">
                    {students.map((s) => (
                        <li key={s.id} className="flex items-center gap-3 py-1.5 border-b border-error/20 last:border-0">
                            <span className="font-semibold text-base flex-1">{s.name}</span>
                            <button
                                onClick={() => onRemove(s.id)}
                                className="btn btn-ghost btn-xs text-error"
                                title="Dismiss"
                            >✕</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TimesUp;
