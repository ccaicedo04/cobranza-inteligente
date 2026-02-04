import { MainLayout } from "@/components/layout/MainLayout";
import { KPICard } from "@/components/ui/KPICard";
import {
  MessageCircle,
  Mail,
  Phone,
  Send,
  Search,
  Filter,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const mensajes = [
  {
    id: "1",
    fecha: "2024-01-25 10:30",
    responsable: "Carlos Rodríguez",
    canal: "whatsapp",
    tipo: "Recordatorio",
    mensaje: "Buenos días. Le recordamos que tiene un saldo pendiente de $4,500,000...",
    estado: "enviado",
    usuario: "María García",
  },
  {
    id: "2",
    fecha: "2024-01-25 09:15",
    responsable: "Ana María López",
    canal: "email",
    tipo: "Aviso de Cobro",
    mensaje: "Estimada Ana María, su cuenta presenta un saldo vencido...",
    estado: "enviado",
    usuario: "María García",
  },
  {
    id: "3",
    fecha: "2024-01-24 16:45",
    responsable: "José Martínez",
    canal: "sms",
    tipo: "Recordatorio",
    mensaje: "Recordatorio de pago pendiente. Valor: $2,800,000",
    estado: "error",
    usuario: "Juan Pérez",
  },
  {
    id: "4",
    fecha: "2024-01-24 14:20",
    responsable: "María Fernanda Gómez",
    canal: "whatsapp",
    tipo: "Aviso",
    mensaje: "Le informamos que su próximo vencimiento es el día 20...",
    estado: "enviado",
    usuario: "María García",
  },
  {
    id: "5",
    fecha: "2024-01-24 11:00",
    responsable: "Pedro Sánchez",
    canal: "email",
    tipo: "Agradecimiento",
    mensaje: "Gracias por su pago. Su cuenta se encuentra al día.",
    estado: "enviado",
    usuario: "María García",
  },
];

const plantillas = [
  { id: "1", nombre: "Recordatorio Amable", canal: "whatsapp", usos: 45 },
  { id: "2", nombre: "Aviso de Vencimiento", canal: "email", usos: 32 },
  { id: "3", nombre: "Cobro Urgente", canal: "sms", usos: 28 },
  { id: "4", nombre: "Agradecimiento Pago", canal: "whatsapp", usos: 67 },
];

const canalIcons = {
  whatsapp: MessageCircle,
  email: Mail,
  sms: Phone,
};

const canalColors = {
  whatsapp: "bg-success-light text-success",
  email: "bg-primary-light text-primary",
  sms: "bg-info-light text-info",
};

const estadoConfig = {
  enviado: { icon: CheckCircle2, className: "text-success" },
  error: { icon: XCircle, className: "text-danger" },
  pendiente: { icon: Clock, className: "text-warning" },
};

const Mensajeria = () => {
  const [activeTab, setActiveTab] = useState<"historial" | "plantillas">("historial");

  return (
    <MainLayout title="Centro de Mensajería">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Mensajes Hoy"
          value="45"
          subtitle="12 más que ayer"
          icon={Send}
          variant="default"
        />
        <KPICard
          title="WhatsApp"
          value="28"
          subtitle="62% del total"
          icon={MessageCircle}
          variant="success"
        />
        <KPICard
          title="Correos"
          value="12"
          subtitle="27% del total"
          icon={Mail}
          variant="info"
        />
        <KPICard
          title="SMS"
          value="5"
          subtitle="11% del total"
          icon={Phone}
          variant="warning"
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab("historial")}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-lg transition-all",
            activeTab === "historial"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted"
          )}
        >
          Historial de Envíos
        </button>
        <button
          onClick={() => setActiveTab("plantillas")}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-lg transition-all",
            activeTab === "plantillas"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted"
          )}
        >
          Plantillas
        </button>
      </div>

      {activeTab === "historial" ? (
        <>
          {/* Filters */}
          <div className="card-elevated p-4 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar por responsable..."
                  className="w-full pl-10 pr-4 py-2 bg-muted/50 border-0 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="flex items-center gap-2">
                {["todos", "whatsapp", "email", "sms"].map((canal) => (
                  <button
                    key={canal}
                    className="px-3 py-1.5 rounded-full text-sm font-medium bg-muted text-muted-foreground hover:bg-muted/80 transition-all capitalize"
                  >
                    {canal}
                  </button>
                ))}
              </div>

              <button className="action-btn-outline">
                <Filter className="w-4 h-4" />
                Más filtros
              </button>
            </div>
          </div>

          {/* Messages List */}
          <div className="card-elevated overflow-hidden">
            <div className="divide-y divide-border">
              {mensajes.map((mensaje, index) => {
                const CanalIcon = canalIcons[mensaje.canal as keyof typeof canalIcons];
                const EstadoIcon = estadoConfig[mensaje.estado as keyof typeof estadoConfig].icon;
                const estadoClass = estadoConfig[mensaje.estado as keyof typeof estadoConfig].className;

                return (
                  <div
                    key={mensaje.id}
                    className="p-4 hover:bg-muted/30 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "p-2.5 rounded-xl",
                        canalColors[mensaje.canal as keyof typeof canalColors]
                      )}>
                        <CanalIcon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-foreground">
                                {mensaje.responsable}
                              </p>
                              <span className="px-2 py-0.5 bg-muted rounded-full text-xs text-muted-foreground">
                                {mensaje.tipo}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                              {mensaje.mensaje}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 text-right">
                            <div>
                              <p className="text-xs text-muted-foreground">
                                {mensaje.fecha}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                por {mensaje.usuario}
                              </p>
                            </div>
                            <EstadoIcon className={cn("w-5 h-5", estadoClass)} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Header */}
          <div className="page-header">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Plantillas de Mensajes
              </h2>
              <p className="text-sm text-muted-foreground">
                Crea y administra plantillas para comunicación rápida
              </p>
            </div>
            <button className="action-btn-primary">
              <Plus className="w-4 h-4" />
              Nueva Plantilla
            </button>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plantillas.map((plantilla, index) => {
              const CanalIcon = canalIcons[plantilla.canal as keyof typeof canalIcons];

              return (
                <div
                  key={plantilla.id}
                  className="card-interactive p-5 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={cn(
                      "p-2 rounded-lg",
                      canalColors[plantilla.canal as keyof typeof canalColors]
                    )}>
                      <CanalIcon className="w-4 h-4" />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {plantilla.usos} usos
                    </span>
                  </div>

                  <h3 className="font-medium text-foreground mb-1">
                    {plantilla.nombre}
                  </h3>
                  <p className="text-sm text-muted-foreground capitalize">
                    Canal: {plantilla.canal}
                  </p>

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                    <button className="action-btn-outline py-1.5 px-3 text-xs flex-1">
                      <FileText className="w-3 h-3" />
                      Editar
                    </button>
                    <button className="action-btn-primary py-1.5 px-3 text-xs flex-1">
                      <Send className="w-3 h-3" />
                      Usar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default Mensajeria;
