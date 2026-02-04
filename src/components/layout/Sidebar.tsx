import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Building2,
  CreditCard,
  Receipt,
  MessageSquare,
  FileSpreadsheet,
  BarChart3,
  Shield,
  Settings,
  LogOut,
  ChevronLeft,
  Wallet,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  {
    title: "Principal",
    items: [
      { name: "Dashboard", href: "/", icon: LayoutDashboard },
    ],
  },
  {
    title: "Gestión",
    items: [
      { name: "Responsables", href: "/responsables", icon: Users },
      { name: "Estudiantes", href: "/estudiantes", icon: GraduationCap },
      { name: "Cartera", href: "/cartera", icon: Wallet },
      { name: "Pagos", href: "/pagos", icon: CreditCard },
    ],
  },
  {
    title: "Comunicación",
    items: [
      { name: "Mensajería", href: "/mensajeria", icon: MessageSquare },
    ],
  },
  {
    title: "Configuración",
    items: [
      { name: "Colegios", href: "/colegios", icon: Building2 },
      { name: "Carga Masiva", href: "/carga-masiva", icon: FileSpreadsheet },
      { name: "Reportes", href: "/reportes", icon: BarChart3 },
      { name: "Auditoría", href: "/auditoria", icon: Shield },
    ],
  },
];

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Receipt className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold text-white tracking-tight">
              COBRANZA
            </span>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-sidebar-accent transition-colors"
        >
          <ChevronLeft
            className={cn(
              "w-5 h-5 text-sidebar-foreground transition-transform",
              collapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto h-[calc(100vh-8rem)]">
        {navigation.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <p className="px-3 mb-2 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
                {section.title}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                    title={collapsed ? item.name : undefined}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && (
                      <span className="text-sm font-medium">{item.name}</span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-sidebar-border">
        <div className="space-y-1">
          <NavLink
            to="/configuracion"
            className="nav-item"
            title={collapsed ? "Configuración" : undefined}
          >
            <Settings className="w-5 h-5" />
            {!collapsed && <span className="text-sm">Configuración</span>}
          </NavLink>
          <button
            className="w-full nav-item text-danger hover:bg-danger/10"
            title={collapsed ? "Cerrar Sesión" : undefined}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="text-sm">Cerrar Sesión</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
