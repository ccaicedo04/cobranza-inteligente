import { MainLayout } from "@/components/layout/MainLayout";
import { KPICard } from "@/components/ui/KPICard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";
import {
  DollarSign,
  Wallet,
  TrendingUp,
  AlertTriangle,
  Users,
  MoreHorizontal,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data
const recaudoData = [
  { mes: "Jul", recaudo: 45000000, meta: 50000000 },
  { mes: "Ago", recaudo: 52000000, meta: 50000000 },
  { mes: "Sep", recaudo: 48000000, meta: 55000000 },
  { mes: "Oct", recaudo: 61000000, meta: 55000000 },
  { mes: "Nov", recaudo: 55000000, meta: 60000000 },
  { mes: "Dic", recaudo: 68000000, meta: 65000000 },
];

const carteraPorEstado = [
  { name: "Al día", value: 65, color: "hsl(142, 76%, 36%)" },
  { name: "Pendiente", value: 20, color: "hsl(38, 92%, 50%)" },
  { name: "Vencido", value: 10, color: "hsl(0, 84%, 60%)" },
  { name: "Crítico", value: 5, color: "hsl(0, 84%, 45%)" },
];

const topDeudores = [
  {
    id: "1",
    nombre: "Carlos Rodríguez",
    documento: "1.023.456.789",
    estudiantes: 2,
    deuda: 4500000,
    diasVencido: 45,
    status: "overdue" as const,
  },
  {
    id: "2",
    nombre: "Ana María López",
    documento: "52.345.678",
    estudiantes: 1,
    deuda: 3200000,
    diasVencido: 60,
    status: "critical" as const,
  },
  {
    id: "3",
    nombre: "José Martínez",
    documento: "80.123.456",
    estudiantes: 3,
    deuda: 2800000,
    diasVencido: 30,
    status: "overdue" as const,
  },
  {
    id: "4",
    nombre: "María Fernanda Gómez",
    documento: "1.098.765.432",
    estudiantes: 1,
    deuda: 1500000,
    diasVencido: 15,
    status: "pending" as const,
  },
  {
    id: "5",
    nombre: "Pedro Sánchez",
    documento: "79.654.321",
    estudiantes: 2,
    deuda: 950000,
    diasVencido: 10,
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

const Dashboard = () => {
  const columns = [
    {
      key: "nombre",
      header: "Responsable",
      render: (item: typeof topDeudores[0]) => (
        <div>
          <p className="font-medium text-foreground">{item.nombre}</p>
          <p className="text-xs text-muted-foreground">CC: {item.documento}</p>
        </div>
      ),
    },
    {
      key: "estudiantes",
      header: "Estudiantes",
      render: (item: typeof topDeudores[0]) => (
        <span className="text-foreground">{item.estudiantes}</span>
      ),
    },
    {
      key: "deuda",
      header: "Deuda Total",
      render: (item: typeof topDeudores[0]) => (
        <span className="font-semibold text-foreground">
          {formatCurrency(item.deuda)}
        </span>
      ),
    },
    {
      key: "diasVencido",
      header: "Días Vencido",
      render: (item: typeof topDeudores[0]) => (
        <span className="text-foreground">{item.diasVencido} días</span>
      ),
    },
    {
      key: "status",
      header: "Estado",
      render: (item: typeof topDeudores[0]) => (
        <StatusBadge status={item.status} />
      ),
    },
    {
      key: "acciones",
      header: "Acciones",
      render: () => (
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-success-light rounded-lg transition-colors group">
            <MessageCircle className="w-4 h-4 text-muted-foreground group-hover:text-success" />
          </button>
          <button className="p-2 hover:bg-info-light rounded-lg transition-colors group">
            <Phone className="w-4 h-4 text-muted-foreground group-hover:text-info" />
          </button>
          <button className="p-2 hover:bg-primary-light rounded-lg transition-colors group">
            <Mail className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <MainLayout title="Dashboard">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Cartera Total"
          value={formatCurrency(285000000)}
          icon={Wallet}
          variant="default"
          trend={{ value: 12.5, isPositive: false, label: "vs mes anterior" }}
        />
        <KPICard
          title="Recaudo del Mes"
          value={formatCurrency(68000000)}
          icon={DollarSign}
          variant="success"
          trend={{ value: 8.2, isPositive: true, label: "vs mes anterior" }}
        />
        <KPICard
          title="% Morosidad"
          value="35%"
          subtitle="99 responsables en mora"
          icon={AlertTriangle}
          variant="warning"
          trend={{ value: 2.3, isPositive: false, label: "vs mes anterior" }}
        />
        <KPICard
          title="Responsables Activos"
          value="284"
          subtitle="12 nuevos este mes"
          icon={Users}
          variant="info"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recaudo Chart */}
        <div className="lg:col-span-2 card-elevated p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Tendencia de Recaudo
              </h3>
              <p className="text-sm text-muted-foreground">
                Últimos 6 meses vs meta
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">Recaudo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                <span className="text-muted-foreground">Meta</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={recaudoData}>
              <defs>
                <linearGradient id="colorRecaudo" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
              <XAxis
                dataKey="mes"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }}
                tickFormatter={(value) => `${value / 1000000}M`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(214, 32%, 91%)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px hsl(222 47% 11% / 0.1)",
                }}
                formatter={(value: number) => [formatCurrency(value), ""]}
              />
              <Area
                type="monotone"
                dataKey="meta"
                stroke="hsl(215, 16%, 77%)"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="none"
              />
              <Area
                type="monotone"
                dataKey="recaudo"
                stroke="hsl(221, 83%, 53%)"
                strokeWidth={3}
                fill="url(#colorRecaudo)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Estado de Cartera Pie */}
        <div className="card-elevated p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">
              Estado de Cartera
            </h3>
            <p className="text-sm text-muted-foreground">
              Distribución por estado
            </p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={carteraPorEstado}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {carteraPorEstado.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(214, 32%, 91%)",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`${value}%`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {carteraPorEstado.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">{item.name}</span>
                <span className="text-sm font-medium text-foreground ml-auto">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Deudores Table */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Top 5 Responsables con Mayor Deuda
            </h3>
            <p className="text-sm text-muted-foreground">
              Requieren atención prioritaria
            </p>
          </div>
          <button className="action-btn-outline">Ver todos</button>
        </div>
        <DataTable columns={columns} data={topDeudores} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-interactive p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-success-light">
              <MessageCircle className="w-6 h-6 text-success" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Enviar Recordatorios</h4>
              <p className="text-sm text-muted-foreground">
                45 pendientes de envío
              </p>
            </div>
          </div>
        </div>
        <div className="card-interactive p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-warning-light">
              <AlertTriangle className="w-6 h-6 text-warning" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Cartera Crítica</h4>
              <p className="text-sm text-muted-foreground">
                12 casos requieren escalamiento
              </p>
            </div>
          </div>
        </div>
        <div className="card-interactive p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary-light">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Generar Reporte</h4>
              <p className="text-sm text-muted-foreground">
                Exportar análisis mensual
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
