import type { Student } from './GameTime';

interface Props {
    students: Student[];
    onRemove: (id: string) => void;
}

function TimesUp({ students, onRemove }: Props) {
    if (students.length === 0) return null;

    return (
        <div className="bg-error/20 border-2 border-error rounded-box p-4">
            <h2 className="text-2xl font-bold text-error mb-3">Time's Up!</h2>
            <div className="flex flex-wrap gap-2">
                {students.map(s => (
                    <div key={s.id} className="flex items-center gap-2 bg-error text-error-content rounded-full px-4 py-2">
                        <span className="text-xl font-bold">{s.name}</span>
                        <button
                            onClick={() => onRemove(s.id)}
                            className="btn btn-ghost btn-xs"
                            title="Dismiss"
                        >✕</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TimesUp;
