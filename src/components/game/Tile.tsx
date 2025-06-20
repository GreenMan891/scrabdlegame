import React from 'react';
import { Rule } from '@/data/rules';

const RULE_COLORS = ['#22d3ee', '#d946ef', '#facc15'];

interface TileProps {
    letter: string;
    value: number;
    isDragging?: boolean;
    isFound?: boolean;
    dailyRules?: Rule[];
    appliedRuleIds?: string[];
    tileSize: number;
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
    onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
}

const Tile = React.forwardRef<HTMLDivElement, TileProps>(({ letter, value, isDragging = false, isFound = false, dailyRules = [], appliedRuleIds = [], onTouchStart, tileSize, onMouseDown }, ref) => {

    const mainFontSize = tileSize * 0.55;
    const valueFontSize = tileSize * 0.22;
    const padding = tileSize * 0.08;

    const getBackgroundStyle = () => {
        // If not a found word, use the default color
        if (!isFound) {
            return { backgroundColor: '#919191' }; // Default yellow-200
        }

        // Find which of the daily rules apply to this tile
        const activeRules = dailyRules.filter(rule => appliedRuleIds.includes(rule.id));

        if (activeRules.length === 0) {
            return { backgroundColor: '#4ade80' }; // Default green-400 for found word, no bonus
        }

        if (activeRules.length === 1) {
            const ruleIndex = dailyRules.findIndex(r => r.id === activeRules[0].id);
            return { backgroundColor: RULE_COLORS[ruleIndex] || '#4ade80' };
        }

        // Create a gradient for 2 or 3 rules
        const colorStops = activeRules.map(rule => {
            const ruleIndex = dailyRules.findIndex(r => r.id === rule.id);
            return RULE_COLORS[ruleIndex] || '#4ade80'; // Fallback to green
        });

        if (colorStops.length === 2) {
            return { background: `linear-gradient(to bottom, ${colorStops[0]} 50%, ${colorStops[1]} 50%)` };
        }

        if (colorStops.length === 3) {
            return { background: `linear-gradient(to bottom, ${colorStops[0]} 33.3%, ${colorStops[1]} 33.3%, ${colorStops[1]} 66.6%, ${colorStops[2]} 66.6%)` };
        }

        // Fallback for any other case
        return { backgroundColor: '#4ade80' };
    };

    const backgroundStyle = getBackgroundStyle();
    const textColor = 'text-white';
    return (
        <div
            ref={ref}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            style={backgroundStyle}
            className={`
        w-full h-full border-2 border-black rounded-md 
        flex flex-col items-center justify-center select-none cursor-grab
        shadow-md relative transition-colors duration-200
        touch-none
        ${isDragging ? 'opacity-75' : ''}
      `}
        >
            <span
                className={`font-bold ${textColor}`}
                style={{ fontSize: `${mainFontSize}px`, lineHeight: 1 }}
            >
                {letter}
            </span>
            <span
                className={`absolute font-semibold ${textColor}`}
                style={{
                    fontSize: `${valueFontSize}px`,
                    right: `${padding}px`,
                    bottom: `${padding}px`,
                }}
            >
                {value}
            </span>
        </div>
    );
});


Tile.displayName = 'Tile';
export default Tile;