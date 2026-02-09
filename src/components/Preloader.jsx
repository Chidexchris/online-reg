import React from 'react';
import { useLoading } from '../context/LoadingContext';

const Preloader = () => {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#ffffff',
                zIndex: 9999,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0.9,
            }}
        >
            <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Preloader;
