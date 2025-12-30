'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTimerStore } from '@/stores/timerStore';
import { Pencil, RotateCcw } from 'lucide-react';

export function ObjectiveDisplay() {
  const totalWorkTimeToday = useTimerStore((state) => state.stats.totalWorkTimeToday);
  const objective = useTimerStore((state) => state.objective);
  const setObjective = useTimerStore((state) => state.setObjective);
  const resetObjective = useTimerStore((state) => state.resetObjective);

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(objective.targetHours.toString());

  // Convertir les secondes en heures décimales (ex: 1h30 = 1.5)
  const hoursWorked = totalWorkTimeToday / 3600;
  const progressPercent = Math.min((hoursWorked / objective.targetHours) * 100, 100);

  // Format d'affichage : "1.5" ou "0.25"
  const formatHours = (hours: number) => {
    if (hours < 0.01) return '0';
    return hours.toFixed(2).replace(/\.?0+$/, '');
  };

  const handleSubmit = () => {
    const hours = Number.parseFloat(inputValue);
    if (!Number.isNaN(hours) && hours > 0 && hours <= 24) {
      setObjective(hours);
    }
    setIsEditing(false);
  };

  if (!objective.isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-lg mx-auto mb-6"
    >
      {/* Affichage principal style stream */}
      <div
        className="rounded-2xl p-4 shadow-lg border-2"
        style={{
          background: 'linear-gradient(to right, rgba(101, 67, 33, 0.9), rgba(139, 105, 20, 0.9))',
          borderColor: 'rgba(166, 124, 0, 0.3)'
        }}
      >

        {/* Titre objectif */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium" style={{ color: 'rgba(232, 212, 168, 0.8)' }}>Objectif du stream</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setInputValue(objective.targetHours.toString());
                setIsEditing(true);
              }}
              className="hover:text-cream-light transition-colors p-1"
              style={{ color: 'rgba(232, 212, 168, 0.6)' }}
              title="Modifier l'objectif"
            >
              <Pencil size={16} />
            </button>
            <button
              type="button"
              onClick={resetObjective}
              className="hover:text-cream-light transition-colors p-1"
              style={{ color: 'rgba(232, 212, 168, 0.6)' }}
              title="Réinitialiser (objectif + stats)"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Affichage heures - GRAND FORMAT pour le stream */}
        <div className="text-center mb-3">
          {isEditing ? (
            <div className="flex items-center justify-center gap-2">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-20 text-center text-3xl font-bold rounded-lg px-2 py-1 text-cream-light outline-none focus:ring-2 focus:ring-bamboo-light"
                style={{ background: 'rgba(245, 230, 200, 0.2)' }}
                min="0.5"
                max="24"
                step="0.5"
              />
              <span className="text-3xl font-bold text-cream-light">h</span>
              <button
                type="button"
                onClick={handleSubmit}
                className="ml-2 px-3 py-1 bg-forest-medium hover:bg-forest-light rounded-lg text-cream-light transition-colors"
              >
                OK
              </button>
            </div>
          ) : (
            <motion.div
              key={formatHours(hoursWorked)}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold text-cream-light tracking-wide"
            >
              <span className="text-5xl">{formatHours(hoursWorked)}</span>
              <span className="mx-2" style={{ color: 'rgba(232, 212, 168, 0.8)' }}>/</span>
              <span>{objective.targetHours}h</span>
            </motion.div>
          )}
        </div>

        {/* Barre de progression */}
        <div
          className="relative h-4 rounded-full overflow-hidden"
          style={{ background: 'rgba(232, 212, 168, 0.3)' }}
        >
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ background: 'linear-gradient(to right, #2d5a27, #4a7c45)' }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          {/* Marqueurs chaque heure */}
          <div className="absolute inset-0 flex">
            {Array.from({ length: objective.targetHours - 1 }).map((_, i) => (
              <div
                key={i}
                className="h-full"
                style={{
                  width: `${100 / objective.targetHours}%`,
                  borderRight: '1px solid rgba(232, 212, 168, 0.2)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Pourcentage */}
        <div className="text-center mt-2 text-sm" style={{ color: 'rgba(232, 212, 168, 0.7)' }}>
          {progressPercent.toFixed(0)}% complété
        </div>
      </div>
    </motion.div>
  );
}
