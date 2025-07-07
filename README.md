# 🔥 FiloSharp - Cuchillos Artesanales Premium

![imagen](https://github.com/user-attachments/assets/94bce686-54eb-4627-a123-9cc1760efbb4)


<div align="center">
  
  **React 18.x** • **Vite** • **TailwindCSS 3.x** • **TypeScript 5.x** • **JSONBin API**
  
  <p align="center">
    <strong>✨ Donde la tradición artesanal se encuentra con la innovación digital ✨</strong>
  </p>
  
  <p align="center">
    🏆 <strong>Proyecto Final - Desarrollo Web Avanzado</strong> 🏆
  </p>
  
</div>

---

## 🎯 Acerca del Proyecto

**FiloSharp** es una plataforma e-commerce premium especializada en cuchillos artesanales de alta gama. Combina la elegancia del diseño moderno con la funcionalidad robusta de un sistema de administración completo, ofreciendo una experiencia única tanto para compradores como para administradores.

> *"Cada cuchillo es una obra maestra forjada con décadas de experiencia y pasión por la perfección"*

![imagen](https://github.com/user-attachments/assets/c004e36e-91f7-42bc-a7c1-cbbab4eae423)

![imagen](https://github.com/user-attachments/assets/90972b6a-d6ab-4f85-b528-a869817f8954)

![imagen](https://github.com/user-attachments/assets/11f08517-5d0c-4e6c-a6b7-fdaee13cdf08)

![imagen](https://github.com/user-attachments/assets/22202c0f-0818-4b0f-bc6b-646d36303791)




### 🌟 **Demo en Vivo**
- **🌐 Sitio Web:** [https://filo-sharp.vercel.app/](https://filo-sharp.vercel.app/)
- **👤 Credenciales:** `admin` / `admin`

---

## 🚀 Funcionalidades Implementadas

### ✅ **Requerimiento #1: Gestión del Carrito y Autenticación**

<table>
<tr>
<td width="50%">

#### 🛒 **Carrito de Compras Avanzado**
- ✅ **Context API** para estado global
- ✅ Agregar/eliminar productos dinámicamente
- ✅ **Persistencia en localStorage**
- ✅ Cálculo automático de totales
- ✅ Preview dropdown en header
- ✅ Vista detallada del carrito

</td>
<td width="50%">

#### 🔐 **Sistema de Autenticación**
- ✅ **AuthContext** centralizado
- ✅ Login simulado con localStorage
- ✅ **Rutas protegidas** con PrivateRoute
- ✅ Estados de usuario (autenticado/admin)
- ✅ Logout automático y manual

</td>
</tr>
</table>

### ✅ **Requerimiento #2: CRUD Completo con API Externa**

<table>
<tr>
<td width="50%">

#### 📝 **Gestión de Productos**
- ✅ **API JSONBin** para persistencia real
- ✅ Formularios controlados con validación
- ✅ **Creación** de productos con campos obligatorios
- ✅ **Edición** en tiempo real
- ✅ **Eliminación** con confirmación
- ✅ **Listado** dinámico y filtrable

</td>
<td width="50%">

#### ⚡ **Manejo de Estados**
- ✅ Loading states elegantes
- ✅ **Error handling** robusto
- ✅ Notificaciones de éxito/error
- ✅ **Validaciones frontend:**
  - Nombre obligatorio
  - Precio > 0
  - Descripción mín. 10 caracteres
- ✅ Sincronización automática

</td>
</tr>
</table>

### ✅ **Requerimiento #3: Diseño y Optimización Avanzada**

<table>
<tr>
<td width="50%">

#### 🎨 **UI/UX Premium**
- ✅ **TailwindCSS** para diseño consistente
- ✅ **100% Responsive** (móvil-first)
- ✅ Animaciones CSS personalizadas
- ✅ **React Icons** para interfaz moderna
- ✅ **React Toastify** para notificaciones
- ✅ Paleta de colores profesional

</td>
<td width="50%">

#### ♿ **SEO y Accesibilidad**
- ✅ **React Helmet** para meta tags dinámicos
- ✅ **ARIA labels** en páginas críticas
- ✅ SEO optimizado por página
- ✅ Semántica HTML correcta
- ✅ Navegación por teclado

</td>
</tr>
</table>

### ✅ **Requerimiento #4: Preparación para Producción**

<table>
<tr>
<td width="50%">

#### 🚢 **Deploy y Optimización**
- ✅ **Deploy en Vercel** con CI/CD
- ✅ Build optimizado con Vite
- ✅ **TypeScript** para type safety

</td>
<td width="50%">

#### 🧪 **Testing y Calidad**
- ✅ Compatibilidad multi-dispositivo
- ✅ **Cross-browser testing**

</td>
</tr>
</table>

---

## 🔧 **Funcionalidades Extra Implementadas**

### 🎨 **Configurador 3D de Cuchillos Personalizados**
- ✅ **Canvas 2D interactivo** con visualización en tiempo real
- ✅ **6 pasos de personalización:**
  1. Tipo de cuchillo (Chef, Santoku, Paring, etc.)
  2. Material de hoja (Acero, Carbono, Damasco)
  3. Diseño de mango (Madera, Carbono, Hueso, Acero)
  4. Grabado personalizado con colores
  5. Accesorios premium (Funda, Caja, Certificado)
  6. Resumen y compra
- ✅ **Cálculo dinámico de precios**
- ✅ **Rotación 3D** con mouse/touch
- ✅ **Integración completa con carrito**


### 🔍 **Sistema de Filtros Inteligente**
- ✅ **Filtros múltiples:** Categoría, Material, Tipo
- ✅ **Paginación** con navegación

![imagen](https://github.com/user-attachments/assets/d48e1c42-6d27-4f87-bc06-3b2d44622607)


![imagen](https://github.com/user-attachments/assets/cf67ba69-ced0-4d06-89a5-1886ee004f4d)

![imagen](https://github.com/user-attachments/assets/d89fc343-5c94-49fb-aa40-260a54243ecd)


---

## 🏗️ Arquitectura del Proyecto

```
📁 FiloSharp/
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 common/           # Header, Footer, Layout
│   │   ├── 📁 shop/             # ProductGrid, Filters, Pagination
│   ├── 📁 pages/
│   │   ├── Home.tsx             # Landing page + Hero
│   │   ├── Shop.tsx             # Catálogo con filtros
│   │   ├── Cart.tsx             # Carrito de compras
│   │   ├── About.tsx            # Historia y valores
│   │   ├── CustomKnife.tsx      # Configurador 3D
│   │   └── 📁 Admin/            # Páginas Administración
│   ├── 📁 context/
│   │   ├── AuthContext.tsx      # Autenticación global
│   │   └── CartContext.tsx      # Estado del carrito
│   ├── 📁 services/
│   │   └── api.ts               # Configuración JSONBin API
│   ├── 📁 hooks/
│   │   └── useAuth.ts           # Hook de autenticación
│   └── 📁 types/
│       └── index.ts             # TypeScript definitions
├── 📁 public/                   # Assets estáticos
└── 📄 README.md                 # Documentación completa
```

---

## 🚀 Instalación y Configuración

### 📋 **Prerrequisitos**
- Node.js 16+
- npm o yarn
- Git

### ⚡ **Instalación Rápida**

```bash
# 1️⃣ Clona el repositorio
git clone https://github.com/catriel458/FiloSharp.git

# 2️⃣ Ingresa al directorio
cd FiloSharp

# 3️⃣ Instala dependencias
npm install

# 4️⃣ Inicia el servidor de desarrollo
npm run dev

# 🌐 Abre http://localhost:5173
```


## 🔌 **Tecnologías Utilizadas**

<table>
<tr>
<td width="50%">

### **Frontend Core**
- ⚛️ **React 18.x** - UI Library
- 🔷 **TypeScript 5.x** - Type Safety
- ⚡ **Vite** - Build Tool
- 🎨 **TailwindCSS 3.x** - Styling
- 🧭 **React Router 6** - Navigation

</td>
<td width="50%">

### **Estado y Datos**
- 🌐 **Context API** - State Management
- 🗃️ **JSONBin API** - External Database
- 💾 **localStorage** - Persistence
- 🔄 **Axios** - HTTP Client
- 📡 **React Hooks** - Logic Layer

</td>
</tr>
<tr>
<td>

### **UI/UX Avanzado**
- 🎭 **React Icons** - Icon Library
- 🔔 **React Toastify** - Notifications
- 🎪 **Framer Motion** - Animations
- 📱 **Responsive Design** - Mobile First
- ♿ **ARIA Accessibility** - A11y

</td>
<td>

### **SEO y Performance**
- 🪖 **React Helmet** - Meta Management
- 🔍 **SEO Optimization** - Search Engine


</td>
</tr>
</table>

---


## 📱 **Responsive Design**

<table>
<tr>
<td align="center" width="33%">

#### 📱 **Mobile**
320px - 768px
- Navigation drawer
- Touch-optimized
- Single column layout
- Swipe gestures

</td>
<td align="center" width="33%">

#### 📊 **Tablet**
768px - 1024px
- Adaptive grid system
- Mixed layouts
- Touch + mouse support
- Optimized typography

</td>
<td align="center" width="34%">

#### 🖥️ **Desktop**
1024px+
- Multi-column layouts
- Hover interactions
- Keyboard navigation
- Advanced features

</td>
</tr>
</table>

---


## 🤝 **Cómo Contribuir**

<div align="center">



### 📝 **Proceso de Contribución**

1. **Fork** el repositorio
2. **Crea** una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Desarrolla** tu funcionalidad con tests
4. **Commit** siguiendo conventional commits
5. **Push** y abre un **Pull Request**

### 🐛 **Reportar Issues**
- Usa las [plantillas de issues](https://github.com/catriel458/FiloSharp/issues)
- Incluye pasos para reproducir
- Especifica navegador y dispositivo

---



## 📧 **Contacto y Créditos**

<div align="center">

**Desarrollado por Catriel Cabrera**

**🎓 Proyecto Final - Curso React.js Talento Tech **

**📍 La Plata, Buenos Aires, Argentina**

[![GitHub](https://img.shields.io/badge/GitHub-catriel458-black?style=for-the-badge&logo=github)](https://github.com/catriel458)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Catriel_Cabrera-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/catriel-cabrera)

</div>

---


⭐ **Si te gusta el proyecto, no olvides darle una estrella** ⭐


### 🔪 **FiloSharp** - *Donde cada corte cuenta una historia*

**Made with ❤️ in React.js**

