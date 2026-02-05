import React from 'react';
import { Stethoscope, Utensils } from 'lucide-react';

export function AnimatedScissors({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            {/* Upper Blade */}
            <path d="M6 6L20 20" className="origin-center hover-trigger-target group-hover:animate-snip-upper" />
            <circle cx="6" cy="6" r="3" className="origin-center hover-trigger-target group-hover:animate-snip-upper" />

            {/* Lower Blade */}
            <path d="M6 18L20 4" className="origin-center hover-trigger-target group-hover:animate-snip-lower" />
            <circle cx="6" cy="18" r="3" className="origin-center hover-trigger-target group-hover:animate-snip-lower" />
        </svg>
    );
}

export function AnimatedStethoscope({ className }: { className?: string }) {
    return (
        <div className="group-hover:animate-heartbeat origin-center">
            <Stethoscope className={className} />
        </div>
    );
}

export function AnimatedUtensils({ className }: { className?: string }) {
    return (
        <div className="group-hover:animate-wiggle origin-center">
            <Utensils className={className} />
        </div>
    );
}
