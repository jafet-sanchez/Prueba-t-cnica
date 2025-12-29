# QA Checklist - Pruebas Funcionales

Este documento contiene las pruebas funcionales para validar el flujo completo.

---

## 🔐 Módulo de Autenticación (Login)

### ✅ Prueba 1: Login exitoso con credenciales válidas
- **Pasos**:
  1. Navegar a `/login`
  2. Ingresar email: `a.berrio@yopmail.com`
  3. Ingresar contraseña: `AmuFK8G4Bh64Q1uX+IxQhw==`
  4. Hacer clic en "Ingresar"
- **Resultado esperado**: 
  - Se muestra loader mientras autentica
  - Redirección automática al Dashboard
  - Token guardado en localStorage

### ✅ Prueba 2: Login fallido con credenciales inválidas
- **Pasos**:
  1. Navegar a `/login`
  2. Ingresar email: `usuario@invalido.com`
  3. Ingresar contraseña: `contraseña_incorrecta`
  4. Hacer clic en "Ingresar"
- **Resultado esperado**: 
  - Se muestra mensaje de error claro
  - Usuario permanece en la página de login
  - No se guarda token

### ✅ Prueba 3: Validación de campos requeridos
- **Pasos**:
  1. Navegar a `/login`
  2. Dejar campos vacíos
  3. Hacer clic en "Ingresar"
- **Resultado esperado**: 
  - Mensaje de error: "El correo electrónico es requerido"
  - Mensaje de error: "La contraseña es requerida"

### ✅ Prueba 4: Validación de formato de email
- **Pasos**:
  1. Navegar a `/login`
  2. Ingresar email inválido: `correo-sin-arroba`
  3. Ingresar cualquier contraseña
  4. Hacer clic en "Ingresar"
- **Resultado esperado**: 
  - Mensaje de error: "Ingresa un correo electrónico válido"

---

## 📊 Módulo de Dashboard

### ✅ Prueba 5: Carga inicial del listado de acciones
- **Pasos**:
  1. Iniciar sesión correctamente
  2. Esperar carga del Dashboard
- **Resultado esperado**: 
  - Se muestra loader mientras carga
  - Se muestra tabla con acciones
  - Se muestra información de paginación (ej: "1-10 de 13")

### ✅ Prueba 6: Paginación - Cambiar de página
- **Pasos**:
  1. En el Dashboard, hacer clic en "Siguiente página" (>)
- **Resultado esperado**: 
  - Se carga la página 2
  - La información de paginación se actualiza
  - Los datos de la tabla cambian

### ✅ Prueba 7: Paginación - Cambiar resultados por página
- **Pasos**:
  1. En el Dashboard, cambiar el selector de "10" a "20"
- **Resultado esperado**: 
  - Se recarga la tabla con 20 resultados
  - Se regresa a la página 1
  - La información de paginación se actualiza

### ✅ Prueba 8: Búsqueda/Filtro de acciones
- **Pasos**:
  1. En el Dashboard, escribir "Accion" en el campo de búsqueda
- **Resultado esperado**: 
  - La tabla se filtra mostrando solo acciones que contengan "Accion"
  - El filtro es en tiempo real

---

## ➕ Módulo de Crear Acción

### ✅ Prueba 9: Abrir y cerrar modal de crear acción
- **Pasos**:
  1. Hacer clic en "Crear tipo de categoría"
  2. Verificar que el modal se abre
  3. Hacer clic en "Cancelar" o presionar ESC
- **Resultado esperado**: 
  - Modal se abre correctamente
  - Modal se cierra sin errores
  - Formulario se resetea al cerrar

### ✅ Prueba 10: Crear acción con datos válidos
- **Pasos**:
  1. Hacer clic en "Crear tipo de categoría"
  2. Ingresar nombre: "Nueva Acción de Prueba"
  3. Ingresar descripción: "Esta es una descripción de prueba para la nueva acción"
  4. Seleccionar una imagen para el logo
  5. Ingresar color: "#FF5733"
  6. Activar el toggle "Activo"
  7. Hacer clic en "Crear"
- **Resultado esperado**: 
  - Se muestra loader mientras crea
  - Modal se cierra automáticamente
  - Se muestra mensaje de éxito
  - El listado se refresca mostrando la nueva acción

---

## 🔄 Flujo Completo

### Prueba de Integración
1. ✅ Abrir la aplicación → Redirige a Login
2. ✅ Iniciar sesión → Redirige a Dashboard
3. ✅ Ver listado de acciones → Datos cargados correctamente
4. ✅ Navegar entre páginas → Paginación funcional
5. ✅ Crear nueva acción → Formulario y validaciones funcionan
6. ✅ Cerrar sesión → Redirige a Login, token eliminado
7. ✅ Intentar acceder a Dashboard sin sesión → Redirige a Login

---

## 📋 Estados de UI Verificados

| Estado | Verificado |
|--------|------------|
| Loading state en Login | ✅ |
| Loading state en Dashboard | ✅ |
| Loading state en Crear Acción | ✅ |
| Error state en Login | ✅ |
| Error state en Dashboard | ✅ |
| Error state en Crear Acción | ✅ |
| Empty state (sin datos) | ✅ |
| Success state (acción creada) | ✅ |

---

