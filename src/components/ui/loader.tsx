import React from "react"

const Loader: React.FC = () => {
    return (
        <div className="h-screen grid place-items-center">
            <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 766.21 768" className="w-24 h-24 animate-bounce">
                <defs>
                    <linearGradient id="linear-gradient" x1="428.55" y1="436.17" x2="755.23" y2="2.59" gradientUnits="userSpaceOnUse">
                        <stop offset={0} stopColor="#00c6fb" />
                        <stop offset={1} stopColor="#005bea" />
                    </linearGradient>
                    <linearGradient id="linear-gradient-2" x1="773.63" y1="500.98" x2="423.2" y2="759.34" gradientUnits="userSpaceOnUse">
                        <stop offset={0} stopColor="#fa709a" />
                        <stop offset={1} stopColor="#fee140" />
                    </linearGradient>
                    <linearGradient id="linear-gradient-3" x1="-1.68" y1="779.1" x2="351.72" y2="-4.92" gradientUnits="userSpaceOnUse">
                        <stop offset={0} stopColor="#ff0844" />
                        <stop offset={1} stopColor="#ffb199" />
                    </linearGradient>
                </defs>
                <g id="Layer_1-2" data-name="Layer 1">
                    <g>
                        <rect x="413.4" width="352.81" height="444.29" fill="url(#linear-gradient)" />
                        <rect x="413.4" y="505.01" width="352.81" height="262.99" fill="url(#linear-gradient-2)" />
                        <rect width="352.82" height={768} fill="url(#linear-gradient-3)" />
                    </g>
                </g>
            </svg>
        </div>
    )
}

export default Loader
