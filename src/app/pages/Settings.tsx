import { Settings as SettingsIcon } from "lucide-react";

export function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 md:pb-0 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-primary" /> Settings
        </h1>
        <p className="text-muted-foreground">Manage your account and platform preferences.</p>
      </div>
      <div className="bg-card border border-border rounded-2xl p-6 shadow-xl flex items-center justify-center h-64 text-muted-foreground">
        Settings module is currently under development for the next Plan-IT release.
      </div>
    </div>
  );
}