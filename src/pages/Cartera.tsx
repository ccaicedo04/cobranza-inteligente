import { MainLayout } from "@/components/layout/MainLayout";
import { KPICard } from "@/components/ui/KPICard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";
import {
  Wallet,
  Clock,
  AlertTriangle,
  XCircle,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const carteraItems = [
  {
    id: "1",
    concepto: "Pensión Enero 2024",
    estudiante: "Valentina Rodríguez",
    responsable: "Carlos Rodríguez",
    valor: 750000,
    fechaVencimiento: "2024-01-15",
    diasVencido: 10,
    status: "overdue" as const,
  },
  {
    id: "2",
    concepto: "Pensión Febrero 2024",
    estudiante: "Valentina Rodríguez",
    responsable: "Carlos Rodríguez",
    valor: 750000,
    fechaVencimiento: "2024-02-15",
    diasVencido: 0,
    status: "pending" as const,
  },
  {
    id: "3",
    concepto: "Matrícula 2024",
    estudiante: "Camila López",
    responsable: "Ana María López",
    valor: 2500000,
    fechaVencimiento: "2023-12-01",
    diasVencido: 55,
    status: "critical" as const,
  },
  {
    id: "4",
    concepto: "Pensión Enero 2024",
    estudiante: "Camila López",
    responsable: "Ana María López",
    valor: 700000,
    fechaVencimiento: "2024-01-15",
    diasVencido: 10,
    status: "overdue" as const,
  },
  {
    id: "5",
    concepto: "Pensión Diciembre 2023",
    estudiante: "Mateo Sánchez",
    responsable: "Pedro Sánchez",
    valor: 650000,
    fechaVencimiento: "2023-12-15",
    diasVencido: 0,
    status: "paid" as const,
  },
  {
    id: "6",
    concepto: "Pensión Enero 2024",
    estudiante: "Sofía Gómez",
    responsable: "María Fernanda Gómez",
    valor: 800000,
    fechaVencimiento: "2024-01-20",
    diasVencido: 5,
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
  { key: "all", label: "Todos", count: 156 },
  { key: "paid", label: "Pagado", count: 85 },
  { key: "pending", label: "Por vencer", count: 32 },
  { key: "overdue", label: "Vencido", count: 27 },
  { key: "critical", label: "Crítico", count: 12 },
];

const Cartera = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const columns = [
    {
      key: "concepto",
      header: "Concepto",
      render: (item: typeof carteraItems[0]) => (
        <div>
          <p className="font-medium text-foreground">{item.concepto}</p>
          <p className="text-xs text-muted-foreground">{item.estudiante}</p>
        </div>
      ),
    },
    {
      key: "responsable",
      header: "Responsable",
      render: (item: typeof carteraItems[0]) => (
        <span className="text-foreground">{item.responsable}</span>
      ),
    },
    {
      key: "valor",
      header: "Valor",
      render: (item: typeof carteraItems[0]) => (
        <span className="font-semibold text-foreground">
          {formatCurrency(item.valor)}
        </span>
      ),
    },
    {
      key: "fechaVencimiento",
      header: "Vencimiento",
      render: (item: typeof carteraItems[0]) => (
        <span className="text-sm text-muted-foreground">
          {new Date(item.fechaVencimiento).toLocaleDateString("es-CO", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "diasVencido",
      header: "Días Vencido",
      render: (item: typeof carteraItems[0]) => (
        <span className={cn(
          "text-sm font-medium",
          item.diasVencido > 30 ? "text-danger" : 
          item.diasVencido > 0 ? "text-warning" : "text-muted-foreground"
        )}>
          {item.diasVencido > 0 ? `${item.diasVencido} días` : "-"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Estado",
      render: (item: typeof carteraItems[0]) => (
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
    <MainLayout title="Gestión de Cartera">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Cartera Total"
          value={formatCurrency(285000000)}
          icon={Wallet}
          variant="default"
        />
        <KPICard
          title="Por Vencer"
          value={formatCurrency(45000000)}
          subtitle="32 conceptos"
          icon={Clock}
          variant="info"
        />
        <KPICard
          title="Vencido"
          value={formatCurrency(82000000)}
          subtitle="27 conceptos"
          icon={AlertTriangle}
          variant="warning"
        />
        <KPICard
          title="Crítico (+60 días)"
          value={formatCurrency(38000000)}
          subtitle="12 conceptos"
          icon={XCircle}
          variant="danger"
        />
      </div>

      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestión de Cartera</h1>
          <p className="page-subtitle">
            Administra conceptos de deuda, vencimientos y estados
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="action-btn-outline">
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <button className="action-btn-primary">
            <Plus className="w-4 h-4" />
            Nuevo Concepto
          </button>
        </div>
      </div>

      {/* Filters bar */}
      <div className="card-elevated p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por concepto, estudiante o responsable..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted/50 border-0 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

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

          <button className="action-btn-outline">
            <Filter className="w-4 h-4" />
            Más filtros
          </button>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={carteraItems}
        emptyMessage="No se encontraron conceptos de cartera"
      />
    </MainLayout>
  );
};

export default Cartera;
