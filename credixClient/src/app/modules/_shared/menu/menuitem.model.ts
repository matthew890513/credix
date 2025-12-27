export interface MenuItem {
  label: string;
  icon: string;
  path?: string;
  children?: MenuItem[];
  permission?: string; // Clave de permiso para validación
}