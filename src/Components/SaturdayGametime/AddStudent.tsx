import { useState, useRef } from 'react';

interface Props {
    onAdd: (name: string) => void;
}

function AddStudent({ onAdd }: Props) {
    const [name, setName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: { preventDefault(): void }) => {
        e.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) return;
        onAdd(trimmed);
        setName('');
        inputRef.current?.focus();
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                ref={inputRef}
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Student name..."
                className="input input-bordered flex-1 text-base sm:text-xl"
                autoFocus
            />
            <button type="submit" className="btn btn-primary text-base sm:text-xl px-4 sm:px-8">
                + Add
            </button>
        </form>
    );
}

export default AddStudent;
