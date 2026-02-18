import React, { useState, useEffect } from 'react';

const ProcessingStatus = () => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('Processing...');

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev < 100) {
                    return prev + 10;
                } else {
                    clearInterval(interval);
                    setStatus('Processed!');
                    return prev;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Processing Status</h1>
            <progress value={progress} max="100" />
            <p>{progress}% - {status}</p>
        </div>
    );
};

export default ProcessingStatus;