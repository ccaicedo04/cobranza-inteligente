import { MainLayout } from "@/components/layout/MainLayout";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";
import {
  Search,
  Filter,
  Download,
  Plus,
  Phone,
  Mail,
  MessageCircle,
  MoreHorizontal,
  Eye,
  Users,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const responsables = [
  {
    id: "1",
    nombre: "Carlos Rodríguez",
    documento: "1.023.456.789",
    telefono: "310 234 5678",
    correo: "carlos.rodriguez@email.com",
    estudiantes: 2,
    deudaTotal: 4500000,
    ultimaGestion: "2024-01-15",
    status: "overdue" as const,
  },
  {
    id: "2",
    nombre: "Ana María López",
    documento: "52.345.678",
    telefono: "320 876 5432",
    correo: "ana.lopez@email.com",
    estudiantes: 1,
    deudaTotal: 3200000,
    ultimaGestion: "2024-01-10",
    status: "critical" as const,
  },
  {
    id: "3",
    nombre: "José Martínez",
    documento: "80.123.456",
    telefono: "315 111 2233",
    correo: "jose.martinez@email.com",
    estudiantes: 3,
    deudaTotal: 2800000,
    ultimaGestion: "2024-01-18",
    status: "overdue" as const,
  },
  {
    id: "4",
    nombre: "María Fernanda Gómez",
    documento: "1.098.765.432",
    telefono: "300 555 6677",
    correo: "maria.gomez@email.com",
    estudiantes: 1,
    deudaTotal: 1500000,
    ultimaGestion: "2024-01-20",
    status: "pending" as const,
  },
  {
    id: "5",
    nombre: "Pedro Sánchez",
    documento: "79.654.321",
    telefono: "311 999 8888",
    correo: "pedro.sanchez@email.com",
    estudiantes: 2,
    deudaTotal: 0,
    ultimaGestion: "2024-01-05",
    status: "paid" as const,
  },
  {
    id: "6",
    nombre: "Laura Jiménez",
    documento: "1.045.678.901",
    telefono: "318 222 3344",
    correo: "laura.jimenez@email.com",
    estudiantes: 1,
    deudaTotal: 850000,
    ultimaGestion: "2024-01-22",
    status: "pending" as const,
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

const statusFilters = [
  { key: "all", label: "Todos", count: 284 },
  { key: "paid", label: "Al día", count: 185 },
  { key: "pending", label: "Pendiente", count: 56 },
  { key: "overdue", label: "Vencido", count: 31 },
  { key: "critical", label: "Crítico", count: 12 },
];

const Responsables = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const columns = [
    {
      key: "nombre",
      header: "Responsable",
      render: (item: typeof responsables[0]) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">
              {item.nombre.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </span>
          </div>
          <div>
            <p className="font-medium text-foreground">{item.nombre}</p>
            <p className="text-xs text-muted-foreground">CC: {item.documento}</p>
          </div>
        </div>
      ),
    },
    {
      key: "contacto",
      header: "Contacto",
      render: (item: typeof responsables[0]) => (
        <div className="text-sm">
          <p className="text-foreground">{item.telefono}</p>
          <p className="text-muted-foreground text-xs truncate max-w-[180px]">{item.correo}</p>
        </div>
      ),
    },
    {
      key: "estudiantes",
      header: "Estudiantes",
      render: (item: typeof responsables[0]) => (
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{item.estudiantes}</span>
        </div>
      ),
    },
    {
      key: "deudaTotal",
      header: "Deuda Total",
      render: (item: typeof responsables[0]) => (
        <span className={cn(
          "font-semibold",
          item.deudaTotal > 0 ? "text-foreground" : "text-success"
        )}>
          {item.deudaTotal > 0 ? formatCurrency(item.deudaTotal) : "Sin deuda"}
        </span>
      ),
    },
    {
      key: "ultimaGestion",
      header: "Última Gestión",
      render: (item: typeof responsables[0]) => (
        <span className="text-sm text-muted-foreground">
          {new Date(item.ultimaGestion).toLocaleDateString("es-CO", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "status",
      header: "Estado",
      render: (item: typeof responsables[0]) => (
        <StatusBadge status={item.status} />
      ),
    },
    {
      key: "acciones",
      header: "Acciones",
      render: () => (
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-success-light rounded-lg transition-colors group" title="WhatsApp">
            <MessageCircle className="w-4 h-4 text-muted-foreground group-hover:text-success" />
          </button>
          <button className="p-2 hover:bg-info-light rounded-lg transition-colors group" title="Llamar">
            <Phone className="w-4 h-4 text-muted-foreground group-hover:text-info" />
          </button>
          <button className="p-2 hover:bg-primary-light rounded-lg transition-colors group" title="Email">
            <Mail className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
          </button>
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

  const filteredData = responsables.filter((item) => {
    const matchesSearch = 
      item.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.documento.includes(searchQuery) ||
      item.correo.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === "all" || item.status === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <MainLayout title="Responsables Financieros">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Responsables Financieros</h1>
          <p className="page-subtitle">
            Gestiona los responsables de pago y sus estudiantes asociados
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="action-btn-outline">
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <button className="action-btn-primary">
            <Plus className="w-4 h-4" />
            Nuevo Responsable
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
              placeholder="Buscar por nombre, documento o correo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted/50 border-0 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Status filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            {statusFilters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                  activeFilter === filter.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {filter.label}
                <span className={cn(
                  "px-1.5 py-0.5 rounded-full text-xs",
                  activeFilter === filter.key
                    ? "bg-white/20"
                    : "bg-muted-foreground/20"
                )}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>

          {/* Advanced filters */}
          <button className="action-btn-outline">
            <Filter className="w-4 h-4" />
            Más filtros
          </button>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        emptyMessage="No se encontraron responsables con los filtros seleccionados"
      />

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          Mostrando {filteredData.length} de {responsables.length} responsables
        </p>
        <div className="flex items-center gap-2">
          <button className="action-btn-outline py-1.5 px-3 text-sm">Anterior</button>
          <button className="action-btn-primary py-1.5 px-3 text-sm">1</button>
          <button className="action-btn-outline py-1.5 px-3 text-sm">2</button>
          <button className="action-btn-outline py-1.5 px-3 text-sm">3</button>
          <button className="action-btn-outline py-1.5 px-3 text-sm">Siguiente</button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Responsables;
