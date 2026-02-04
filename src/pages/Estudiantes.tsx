import { MainLayout } from "@/components/layout/MainLayout";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";
import {
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const estudiantes = [
  {
    id: "1",
    nombre: "Valentina Rodríguez",
    grado: "5° Primaria",
    responsable: "Carlos Rodríguez",
    sede: "Sede Principal",
    deuda: 2250000,
    status: "overdue" as const,
  },
  {
    id: "2",
    nombre: "Sebastián Rodríguez",
    grado: "8° Bachillerato",
    responsable: "Carlos Rodríguez",
    sede: "Sede Principal",
    deuda: 2250000,
    status: "overdue" as const,
  },
  {
    id: "3",
    nombre: "Camila López",
    grado: "11° Bachillerato",
    responsable: "Ana María López",
    sede: "Sede Norte",
    deuda: 3200000,
    status: "critical" as const,
  },
  {
    id: "4",
    nombre: "Juan Pablo Martínez",
    grado: "3° Primaria",
    responsable: "José Martínez",
    sede: "Sede Principal",
    deuda: 933333,
    status: "overdue" as const,
  },
  {
    id: "5",
    nombre: "Laura Martínez",
    grado: "7° Bachillerato",
    responsable: "José Martínez",
    sede: "Sede Principal",
    deuda: 933333,
    status: "overdue" as const,
  },
  {
    id: "6",
    nombre: "Andrés Martínez",
    grado: "10° Bachillerato",
    responsable: "José Martínez",
    sede: "Sede Norte",
    deuda: 933334,
    status: "overdue" as const,
  },
  {
    id: "7",
    nombre: "Sofía Gómez",
    grado: "9° Bachillerato",
    responsable: "María Fernanda Gómez",
    sede: "Sede Principal",
    deuda: 1500000,
    status: "pending" as const,
  },
  {
    id: "8",
    nombre: "Mateo Sánchez",
    grado: "2° Primaria",
    responsable: "Pedro Sánchez",
    sede: "Sede Principal",
    deuda: 0,
    status: "paid" as const,
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

const grados = [
  { key: "all", label: "Todos los grados" },
  { key: "primaria", label: "Primaria" },
  { key: "bachillerato", label: "Bachillerato" },
];

const Estudiantes = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const columns = [
    {
      key: "nombre",
      header: "Estudiante",
      render: (item: typeof estudiantes[0]) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-info/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-info">
              {item.nombre.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </span>
          </div>
          <div>
            <p className="font-medium text-foreground">{item.nombre}</p>
            <p className="text-xs text-muted-foreground">{item.grado}</p>
          </div>
        </div>
      ),
    },
    {
      key: "responsable",
      header: "Responsable Financiero",
      render: (item: typeof estudiantes[0]) => (
        <span className="text-foreground">{item.responsable}</span>
      ),
    },
    {
      key: "sede",
      header: "Sede",
      render: (item: typeof estudiantes[0]) => (
        <span className="text-sm text-muted-foreground">{item.sede}</span>
      ),
    },
    {
      key: "deuda",
      header: "Deuda",
      render: (item: typeof estudiantes[0]) => (
        <span className={cn(
          "font-semibold",
          item.deuda > 0 ? "text-foreground" : "text-success"
        )}>
          {item.deuda > 0 ? formatCurrency(item.deuda) : "Al día"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Estado",
      render: (item: typeof estudiantes[0]) => (
        <StatusBadge status={item.status} />
      ),
    },
    {
      key: "acciones",
      header: "Acciones",
      render: () => (
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Ver detalle">
            <Eye className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <MainLayout title="Estudiantes">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Estudiantes</h1>
          <p className="page-subtitle">
            Visualiza información de estudiantes y su estado de cartera
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="action-btn-outline">
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <button className="action-btn-primary">
            <Plus className="w-4 h-4" />
            Nuevo Estudiante
          </button>
        </div>
      </div>

      {/* Filters bar */}
      <div className="card-elevated p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nombre o responsable..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted/50 border-0 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Grado filters */}
          <div className="flex items-center gap-2">
            {grados.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                  activeFilter === filter.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <button className="action-btn-outline">
            <Filter className="w-4 h-4" />
            Más filtros
          </button>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={estudiantes}
        emptyMessage="No se encontraron estudiantes"
      />
    </MainLayout>
  );
};

export default Estudiantes;
