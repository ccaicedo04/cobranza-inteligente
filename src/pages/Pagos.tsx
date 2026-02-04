import { MainLayout } from "@/components/layout/MainLayout";
import { KPICard } from "@/components/ui/KPICard";
import { DataTable } from "@/components/ui/DataTable";
import {
  CreditCard,
  TrendingUp,
  Calendar,
  DollarSign,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  MoreHorizontal,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const pagos = [
  {
    id: "1",
    fecha: "2024-01-25",
    responsable: "Pedro Sánchez",
    estudiante: "Mateo Sánchez",
    concepto: "Pensión Enero 2024",
    valor: 650000,
    metodoPago: "Transferencia",
    referencia: "REF-2024-001",
  },
  {
    id: "2",
    fecha: "2024-01-24",
    responsable: "Laura Jiménez",
    estudiante: "Daniel Jiménez",
    concepto: "Pensión Enero 2024",
    valor: 750000,
    metodoPago: "Efectivo",
    referencia: "REF-2024-002",
  },
  {
    id: "3",
    fecha: "2024-01-23",
    responsable: "María Fernanda Gómez",
    estudiante: "Sofía Gómez",
    concepto: "Abono Matrícula",
    valor: 500000,
    metodoPago: "PSE",
    referencia: "REF-2024-003",
  },
  {
    id: "4",
    fecha: "2024-01-22",
    responsable: "José Martínez",
    estudiante: "Juan Pablo Martínez",
    concepto: "Pensión Diciembre 2023",
    valor: 700000,
    metodoPago: "Transferencia",
    referencia: "REF-2024-004",
  },
  {
    id: "5",
    fecha: "2024-01-20",
    responsable: "Carlos Rodríguez",
    estudiante: "Valentina Rodríguez",
    concepto: "Abono Pensión",
    valor: 300000,
    metodoPago: "Efectivo",
    referencia: "REF-2024-005",
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

const Pagos = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const columns = [
    {
      key: "fecha",
      header: "Fecha",
      render: (item: typeof pagos[0]) => (
        <span className="text-foreground">
          {new Date(item.fecha).toLocaleDateString("es-CO", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "responsable",
      header: "Responsable",
      render: (item: typeof pagos[0]) => (
        <div>
          <p className="font-medium text-foreground">{item.responsable}</p>
          <p className="text-xs text-muted-foreground">{item.estudiante}</p>
        </div>
      ),
    },
    {
      key: "concepto",
      header: "Concepto",
      render: (item: typeof pagos[0]) => (
        <span className="text-foreground">{item.concepto}</span>
      ),
    },
    {
      key: "valor",
      header: "Valor",
      render: (item: typeof pagos[0]) => (
        <span className="font-semibold text-success">
          {formatCurrency(item.valor)}
        </span>
      ),
    },
    {
      key: "metodoPago",
      header: "Método",
      render: (item: typeof pagos[0]) => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground">
          <CreditCard className="w-3 h-3" />
          {item.metodoPago}
        </span>
      ),
    },
    {
      key: "referencia",
      header: "Referencia",
      render: (item: typeof pagos[0]) => (
        <span className="text-sm text-muted-foreground font-mono">
          {item.referencia}
        </span>
      ),
    },
    {
      key: "estado",
      header: "Estado",
      render: () => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-success-light text-success rounded-full text-xs font-medium">
          <CheckCircle2 className="w-3 h-3" />
          Aplicado
        </span>
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
    <MainLayout title="Pagos">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Recaudo del Mes"
          value={formatCurrency(68000000)}
          icon={DollarSign}
          variant="success"
          trend={{ value: 8.2, isPositive: true, label: "vs mes anterior" }}
        />
        <KPICard
          title="Pagos Hoy"
          value={formatCurrency(2900000)}
          subtitle="8 transacciones"
          icon={Calendar}
          variant="info"
        />
        <KPICard
          title="Promedio por Pago"
          value={formatCurrency(580000)}
          icon={TrendingUp}
          variant="default"
        />
        <KPICard
          title="Total Transacciones"
          value="124"
          subtitle="Este mes"
          icon={CreditCard}
          variant="default"
        />
      </div>

      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Historial de Pagos</h1>
          <p className="page-subtitle">
            Registro de todos los pagos recibidos
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="action-btn-outline">
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <button className="action-btn-primary">
            <Plus className="w-4 h-4" />
            Registrar Pago
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
              placeholder="Buscar por responsable, referencia..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted/50 border-0 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="date"
              className="px-3 py-2 bg-muted/50 border-0 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <span className="text-muted-foreground">a</span>
            <input
              type="date"
              className="px-3 py-2 bg-muted/50 border-0 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
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
        data={pagos}
        emptyMessage="No se encontraron pagos"
      />
    </MainLayout>
  );
};

export default Pagos;
