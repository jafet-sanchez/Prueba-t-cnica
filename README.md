# BeKind Network - Prueba Técnica Frontend React

Aplicación web construida con React + TypeScript que implementa autenticación, dashboard con listado paginado y formulario de creación de acciones.

## 🚀 Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 18.x | Framework principal |
| TypeScript | 5.x | Tipado estático |
| Vite | 7.x | Build tool y dev server |
| Zustand | 5.x | Manejo de estado global |
| React Hook Form | 7.x | Manejo de formularios |
| Zod | 3.x | Validación de esquemas |
| Axios | 1.x | Cliente HTTP |
| React Router DOM | 7.x | Enrutamiento |
| Tailwind CSS | 4.x | Estilos |
| Lucide React | - | Iconos |

## 📁 Estructura del Proyecto

```
src/
├── api/                    # Servicios y configuración de APIs
│   ├── axios.config.ts     # Configuración de Axios con interceptores
│   ├── auth.service.ts     # Servicio de autenticación
│   └── actions.service.ts  # Servicio de acciones CRUD
├── components/
│   ├── ui/                 # Componentes UI reutilizables
│   │   ├── Button.tsx      # Botón con variantes y loading
│   │   ├── Input.tsx       # Input con label, error, password toggle
│   │   ├── Textarea.tsx    # Textarea con contador de caracteres
│   │   ├── Modal.tsx       # Modal reutilizable
│   │   ├── Table.tsx       # Tabla con subcomponentes
│   │   ├── Pagination.tsx  # Paginación completa
│   │   ├── Toggle.tsx      # Switch on/off
│   │   ├── FileUpload.tsx  # Upload de archivos con preview
│   │   ├── ColorInput.tsx  # Selector de color HEX
│   │   ├── Badge.tsx       # Etiquetas de estado
│   │   ├── Alert.tsx       # Alertas (success, error, warning, info)
│   │   ├── Loader.tsx      # Spinner de carga
│   │   ├── SearchInput.tsx # Input de búsqueda
│   │   ├── EmptyState.tsx  # Estado vacío
│   │   └── Logo.tsx        # Logo reutilizable
│   ├── layout/             # Componentes de layout
│   │   ├── Sidebar.tsx     # Menú lateral
│   │   ├── Header.tsx      # Header con ondas decorativas
│   │   └── DashboardLayout.tsx
│   └── forms/              # Componentes de formularios
│       ├── ActionsTable.tsx    # Tabla de acciones
│       └── CreateActionModal.tsx # Modal de crear acción
├── context/                # Stores de Zustand
│   ├── auth.store.ts       # Estado de autenticación
│   └── actions.store.ts    # Estado de acciones
├── pages/                  # Páginas de la aplicación
│   ├── LoginPage.tsx
│   └── DashboardPage.tsx
├── routes/                 # Configuración de rutas
│   ├── PrivateRoute.tsx    # Rutas protegidas
│   ├── PublicRoute.tsx     # Rutas públicas
│   └── index.tsx           # Router principal
├── types/                  # Definiciones de TypeScript
│   ├── auth.types.ts
│   └── action.types.ts
└── styles/
    └── globals.css         # Estilos globales y tema
```

## 🛠️ Instalación y Ejecución

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd bekind-app

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 🔐 Credenciales de Prueba

```
Email: a.berrio@yopmail.com
Password: AmuFK8G4Bh64Q1uX+IxQhw==
```

---

## 📝 Decisiones Técnicas

### ¿Por qué Zustand en lugar de Redux?
- **Menos boilerplate**: Código más limpio y conciso
- **Tamaño del bundle**: Zustand es mucho más ligero (~1KB vs ~40KB)
- **Simplicidad**: No requiere providers ni configuración compleja
- **Ideal para proyectos pequeños/medianos** como esta prueba técnica

### ¿Por qué React Hook Form + Zod?
- **Rendimiento**: Menos re-renders comparado con Formik
- **TypeScript nativo**: Mejor inferencia de tipos con Zod
- **Validación declarativa**: Esquemas reutilizables y fáciles de leer

### ¿Por qué Axios?
- **Interceptores**: Manejo automático del token en cada petición
- **Transformación**: Manejo automático de JSON
- **Múltiples instancias**: Diferentes configuraciones para distintas APIs

### Manejo de dos subdominios diferentes
La aplicación consume dos APIs diferentes:
- `dev.apinetbo.bekindnetwork.com` - Autenticación (Login)
- `dev.api.bekindnetwork.com` - Operaciones CRUD (Acciones)

Se crearon dos instancias de Axios separadas (`authApi` y `api`) para manejar esto correctamente.

---

## 🔍 Inferencia del Payload de Crear Acción

> **Nota**: El API no documenta el payload exacto para crear acciones. Se siguió el proceso de inferirlo explorando la respuesta del endpoint de listado.

### Proceso de Investigación

**1. Consulta al endpoint de listado:**
```
GET /api/v1/actions/admin-list?pageNumber=1&pageSize=10
```

**2. Estructura de respuesta obtenida:**
```json
{
  "data": {
    "pageSize": 10,
    "pageNumber": 0,
    "totalElements": 13,
    "totalPages": 2,
    "data": [
      {
        "id": "691606026700337c97fb7120",
        "name": "Accion con nombre bastante grande para ajuste",
        "description": "esta es una nueva accion",
        "icon": "https://bekindstoragedev.blob.core.windows.net/bekind/action%2F42c6f83c.png",
        "color": "#f28f44",
        "status": 1,
        "createdAt": "2025-11-13T16:23:30.051Z"
      }
    ]
  }
}
```

**3. Campos identificados para crear acción:**

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| `name` | string | Nombre de la acción | ✅ Sí |
| `description` | string | Descripción de la acción | ✅ Sí |
| `icon` | File | Archivo de imagen (se sube y devuelve URL) | ✅ Sí |
| `color` | string | Código de color HEX (ej: #f28f44) | ✅ Sí |
| `status` | number | Estado: 1 = Activo, 0 = Inactivo | ✅ Sí |

**4. Payload final implementado:**
```typescript
const formData = new FormData();
formData.append('name', data.name);           // string
formData.append('description', data.description); // string
formData.append('color', data.color);         // string
formData.append('status', data.isActive ? '1' : '0'); // "1" o "0"
formData.append('icon', data.logo);           // File
```

### Decisiones tomadas:

1. **FormData en lugar de JSON**: Se detectó que el endpoint requiere un archivo (icon), por lo que se usa `multipart/form-data`.

2. **Campo `status` como número**: En el listado el estado aparece como `status: 1`, no como booleano. Se mapea el toggle "Activo" a `1` o `0`.

3. **Campo `icon` para la imagen**: El campo en la respuesta se llama `icon` (no `logo` ni `image`), por lo que se usa ese nombre al enviar el archivo.

4. **Content-Type**: Se establece explícitamente `'Content-Type': 'multipart/form-data'` en la petición.

---

## 📤 Implementación de Upload de Archivos

El endpoint de crear acción **requiere un archivo de imagen** (icon). Se implementó de la siguiente manera:

### Componente FileUpload

```typescript
// Características implementadas:
- Selección de archivo con input type="file"
- Preview de la imagen seleccionada
- Mostrar nombre y tamaño del archivo
- Botón para eliminar el archivo seleccionado
- Validación de tipo de archivo (accept="image/*")
- Integración con React Hook Form mediante Controller
```

### Envío del archivo

```typescript
// En actions.service.ts
const formData = new FormData();
// ... otros campos
if (data.logo) {
  formData.append('icon', data.logo); // El campo se llama 'icon' en el API
}

const response = await api.post('/api/v1/actions/admin-add', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
```

### Si el upload no fuera posible:

Si por alguna razón no se pudiera implementar el upload (ej: CORS, permisos), la solución alternativa sería:

1. **Placeholder en UI**: Mantener el componente FileUpload visual pero deshabilitado
2. **Mensaje informativo**: Mostrar al usuario que la funcionalidad de subir imagen no está disponible
3. **Campo opcional**: Enviar la petición sin el campo `icon` si el API lo permite
4. **URL directa**: Permitir al usuario ingresar una URL de imagen en lugar de subir archivo

---

## 🔄 Estructura de Respuesta del API

### Login Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Listado de Acciones Response
```json
{
  "data": {
    "pageSize": 10,
    "pageNumber": 0,
    "totalElements": 13,
    "totalPages": 2,
    "data": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "icon": "string (URL)",
        "color": "string (HEX)",
        "status": 1,
        "createdAt": "string (ISO date)"
      }
    ]
  }
}
```

> **Nota**: La paginación usa índice base 0 (`pageNumber: 0` = página 1)

---

## 🎨 Componentes UI Implementados

| Componente | Descripción |
|------------|-------------|
| `Button` | Variantes (primary, secondary, outline, ghost), tamaños, loading state |
| `Input` | Labels, iconos, toggle password, mensajes de error |
| `Textarea` | Con contador de caracteres (ej: 150/500) |
| `Modal` | Cierre con ESC, overlay, animación |
| `Table` | Componentes: Table, TableHead, TableBody, TableRow, TableHeader, TableCell |
| `Pagination` | Selector de página, tamaño, navegación completa |
| `Toggle` | Switch animado para estados on/off |
| `FileUpload` | Upload con preview de imagen |
| `ColorInput` | Color picker + input HEX |
| `Badge` | Etiquetas de estado (success, warning, error) |
| `Alert` | Mensajes dismissibles (success, error, warning, info) |
| `Loader` | Spinner con texto, modo fullscreen |
| `SearchInput` | Input con icono de búsqueda |
| `EmptyState` | Mensaje cuando no hay datos |
| `Logo` | Logo reutilizable con variantes (light/dark) |

---

## 🔒 Protección de Rutas

- **PrivateRoute**: Redirige a `/login` si no hay token
- **PublicRoute**: Redirige a `/dashboard` si ya hay sesión activa

---

## ⚠️ Manejo de Errores

1. **Errores de autenticación**: Muestra mensaje claro en el formulario de login
2. **Errores de API**: Captura y muestra mensajes descriptivos del servidor
3. **Token expirado**: Interceptor de Axios redirige automáticamente al login
4. **Validación de formularios**: Mensajes de error en tiempo real con Zod

---

## 📱 Responsive

La aplicación es responsive y se adapta a diferentes tamaños de pantalla utilizando Tailwind CSS.

---

## 🧪 Testing

Ver archivo `QA_CHECKLIST.md` para las pruebas funcionales del flujo completo.

---