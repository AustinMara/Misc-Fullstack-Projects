import { useState } from 'react';

interface Props {
    waitlist: string[];
    onAdd: (name: string) => void;
    onRemove: (index: number) => void;
    onActivate: (name: string, index: number) => void;
}

function Waitlist({ waitlist, onAdd, onRemove, onActivate }: Props) {
    const [name, setName] = useState('');

    const handleSubmit = (e: { preventDefault(): void }) => {
        e.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) return;
        onAdd(trimmed);
        setName('');
    };

    return (
        <div className="bg-base-200 rounded-box p-4 flex flex-col gap-3 h-fit">
            <h2 className="text-2xl font-bold">Waitlist</h2>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Add to waitlist..."
                    className="input input-bordered flex-1"
                />
                <button type="submit" className="btn btn-secondary">+</button>
            </form>

            <ol className="flex flex-col gap-2">
                {waitlist.length === 0 && (
                    <li className="text-base-content/50 text-center py-4">No one waiting</li>
                )}
                {waitlist.map((n, i) => (
                    <li key={i} className="flex items-center gap-2 bg-base-300 rounded-box px-3 py-2">
                        <span className="font-bold text-lg w-6 shrink-0">{i + 1}.</span>
                        <button
                            onClick={() => onActivate(n, i)}
                            className="text-xl flex-1 text-left hover:text-success font-medium"
                            title="Add to active"
                        >{n}</button>
                        <button
                            onClick={() => onRemove(i)}
                            className="btn btn-ghost btn-xs text-base-content/50 hover:text-error"
                            title="Remove from waitlist"
                        >✕</button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default Waitlist;
