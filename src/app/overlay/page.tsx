'use client';

import { Timer } from '@/components';

export default function OverlayPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-transparent">
      <Timer showStats={false} />
    </main>
  );
}
