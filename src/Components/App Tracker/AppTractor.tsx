import React, { useState } from 'react';

interface JobApplication {
    id: string;
    company: string;
    position: string;
    dateApplied: string;
    status: 'applied' | 'interview' | 'rejected' | 'offered';
    notes: string;
}

export const AppTracker: React.FC = () => {
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [filter, setFilter] = useState<string>('all');

    const addApplication = (app: Omit<JobApplication, 'id'>) => {
        const newApp: JobApplication = { ...app, id: Date.now().toString() };
        setApplications([...applications, newApp]);
    };

    const updateApplication = (id: string, app: Partial<JobApplication>) => {
        setApplications(applications.map(a => a.id === id ? { ...a, ...app } : a));
    };

    const deleteApplication = (id: string) => {
        setApplications(applications.filter(a => a.id !== id));
    };

    const filteredApps = filter === 'all' 
        ? applications 
        : applications.filter(a => a.status === filter);

    return (
        <div className="app-tracker">
            <h1>Job Application Tracker</h1>
            
            <div className="filters">
                {/* Filter buttons */}
            </div>

            <div className="form">
                {/* Add application form */}
            </div>

            <div className="applications-list">
                {/* Display applications */}
            </div>
        </div>
    );
};