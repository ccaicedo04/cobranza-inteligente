import { Bell, Search, Building2, ChevronDown, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title?: string;
}

export function Header({ title = "Dashboard" }: HeaderProps) {
  const [selectedSchool] = useState("Colegio San José");
  const [selectedBranch] = useState("Sede Principal");

  return (
    <header className="sticky top-0 z-30 h-16 bg-card/95 backdrop-blur border-b border-border">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left section - Title and breadcrumb */}
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        </div>

        {/* Center section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar responsables, estudiantes..."
              className="w-full pl-10 pr-4 py-2 bg-muted/50 border-0 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Right section - School selector and user */}
        <div className="flex items-center gap-3">
          {/* School/Branch Selector */}
          <button className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors">
            <Building2 className="w-4 h-4 text-muted-foreground" />
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">{selectedSchool}</p>
              <p className="text-xs text-muted-foreground">{selectedBranch}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-danger rounded-full border-2 border-card" />
          </button>

          {/* User menu */}
          <button className="flex items-center gap-3 pl-3 pr-1 py-1 rounded-lg hover:bg-muted transition-colors">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-foreground">María García</p>
              <p className="text-xs text-muted-foreground">Administrador</p>
            </div>
            <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
