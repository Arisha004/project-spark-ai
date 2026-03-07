import { ReactNode } from "react";

export function MobileWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted flex items-start justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-background relative shadow-2xl">
        {children}
      </div>
    </div>
  );
}
