'use client';

import { Timer } from '@/components';

export default function OverlayPage() {
  return (
    <main className="flex items-center justify-center p-6 bg-transparent">
      <div className="scale-90 origin-center">
        <Timer showStats={false} />
      </div>
    </main>
  );
}
