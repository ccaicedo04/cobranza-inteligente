import { MainLayout } from "@/components/layout/MainLayout";
import { DataTable } from "@/components/ui/DataTable";
import {
  Building2,
  MapPin,
  Plus,
  Eye,
  MoreHorizontal,
  Edit2,
  Users,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";

const colegios = [
  {
    id: "1",
    nombre: "Colegio San José",
    nit: "900.123.456-7",
    ciudad: "Bogotá",
    sedes: 3,
    estudiantes: 1250,
    responsables: 890,
    activo: true,
  },
  {
    id: "2",
    nombre: "Instituto Pedagógico Nacional",
    nit: "800.234.567-8",
    ciudad: "Medellín",
    sedes: 2,
    estudiantes: 850,
    responsables: 620,
    activo: true,
  },
  {
    id: "3",
    nombre: "Colegio Santa María",
    nit: "900.345.678-9",
    ciudad: "Cali",
    sedes: 1,
    estudiantes: 450,
    responsables: 380,
    activo: true,
  },
];

const sedes = [
  {
    id: "1",
    nombre: "Sede Principal",
    colegio: "Colegio San José",
    direccion: "Calle 100 #15-20",
    ciudad: "Bogotá",
    estudiantes: 650,
    activo: true,
  },
  {
    id: "2",
    nombre: "Sede Norte",
    colegio: "Colegio San José",
    direccion: "Carrera 7 #180-45",
    ciudad: "Bogotá",
    estudiantes: 400,
    activo: true,
  },
  {
    id: "3",
    nombre: "Sede Occidente",
    colegio: "Colegio San José",
    direccion: "Avenida 68 #35-80",
    ciudad: "Bogotá",
    estudiantes: 200,
    activo: true,
  },
];

const Colegios = () => {
  const [activeTab, setActiveTab] = useState<"colegios" | "sedes">("colegios");

  const colegioColumns = [
    {
      key: "nombre",
      header: "Colegio",
      render: (item: typeof colegios[0]) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">{item.nombre}</p>
            <p className="text-xs text-muted-foreground">NIT: {item.nit}</p>
          </div>
        </div>
      ),
    },
    {
      key: "ciudad",
      header: "Ciudad",
      render: (item: typeof colegios[0]) => (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{item.ciudad}</span>
        </div>
      ),
    },
    {
      key: "sedes",
      header: "Sedes",
      render: (item: typeof colegios[0]) => (
        <span className="text-foreground">{item.sedes}</span>
      ),
    },
    {
      key: "estudiantes",
      header: "Estudiantes",
      render: (item: typeof colegios[0]) => (
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{item.estudiantes.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: "responsables",
      header: "Responsables",
      render: (item: typeof colegios[0]) => (
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{item.responsables.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: "activo",
      header: "Estado",
      render: (item: typeof colegios[0]) => (
        <span className={`status-badge ${item.activo ? "status-paid" : "status-overdue"}`}>
          {item.activo ? "Activo" : "Inactivo"}
        </span>
      ),
    },
    {
      key: "acciones",
      header: "Acciones",
      render: () => (
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Eye className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Edit2 className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      ),
    },
  ];

  const sedeColumns = [
    {
      key: "nombre",
      header: "Sede",
      render: (item: typeof sedes[0]) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-info" />
          </div>
          <div>
            <p className="font-medium text-foreground">{item.nombre}</p>
            <p className="text-xs text-muted-foreground">{item.colegio}</p>
          </div>
        </div>
      ),
    },
    {
      key: "direccion",
      header: "Dirección",
      render: (item: typeof sedes[0]) => (
        <span className="text-foreground">{item.direccion}</span>
      ),
    },
    {
      key: "ciudad",
      header: "Ciudad",
      render: (item: typeof sedes[0]) => (
        <span className="text-muted-foreground">{item.ciudad}</span>
      ),
    },
    {
      key: "estudiantes",
      header: "Estudiantes",
      render: (item: typeof sedes[0]) => (
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{item.estudiantes}</span>
        </div>
      ),
    },
    {
      key: "activo",
      header: "Estado",
      render: (item: typeof sedes[0]) => (
        <span className={`status-badge ${item.activo ? "status-paid" : "status-overdue"}`}>
          {item.activo ? "Activa" : "Inactiva"}
        </span>
      ),
    },
    {
      key: "acciones",
      header: "Acciones",
      render: () => (
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Edit2 className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <MainLayout title="Gestión Institucional">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestión Institucional</h1>
          <p className="page-subtitle">
            Administra colegios y sus sedes
          </p>
        </div>
        <button className="action-btn-primary">
          <Plus className="w-4 h-4" />
          {activeTab === "colegios" ? "Nuevo Colegio" : "Nueva Sede"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setActiveTab("colegios")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            activeTab === "colegios"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          Colegios
        </button>
        <button
          onClick={() => setActiveTab("sedes")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            activeTab === "sedes"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          Sedes
        </button>
      </div>

      {/* Table */}
      {activeTab === "colegios" ? (
        <DataTable
          columns={colegioColumns}
          data={colegios}
          emptyMessage="No hay colegios registrados"
        />
      ) : (
        <DataTable
          columns={sedeColumns}
          data={sedes}
          emptyMessage="No hay sedes registradas"
        />
      )}
    </MainLayout>
  );
};

export default Colegios;
