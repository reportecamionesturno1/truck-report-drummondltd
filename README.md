# 🚛 Sistema de Reporte de Camiones - Drummond LTD

Sistema web de reportes diseñado para la **Gestión de Camiones CAT 793** en Drummond LTD.  
Permite a los operadores registrar datos básicos y realizar chequeos de inspección diaria de manera rápida y sencilla.

---

## 📋 Características

- **Registro de datos básicos**: Nombre del operador, número del camión y tipo de reporte.
- **Checklist de inspección**: Selección múltiple de chequeos técnicos.
- **Campo de observaciones**: Para anotar otros chequeos o comentarios adicionales.
- **Resumen del reporte**: Vista previa antes de enviar.
- **Generación automática de ID** de reporte para seguimiento.
- **Envío automático**: Guarda el reporte en **Google Sheets** y envía notificación al correo de administrador.
- **Diseño responsivo**: Adaptado a dispositivos móviles y de escritorio.
- **Confirmación visual**: Mensaje modal de éxito al enviar reporte.

---

## 🛠️ Tecnologías Usadas

- **HTML5**: Estructura del formulario web.
- **CSS3**: Diseño moderno, colores corporativos, adaptativo (responsive).
- **JavaScript**: Validaciones, navegación de secciones y envío de datos.
- **Google Apps Script (Code.gs)**: Backend para almacenar datos en Google Sheets y enviar correos de notificación.
- **Google Drive**: Almacenamiento de reportes (sin carga de evidencias).

---

## 📤 Flujo de Datos

1. El operador llena el formulario de reporte.
2. Los datos se envían al servidor vía `fetch()` a un **Google Apps Script WebApp**.
3. El **Google Sheet** recibe y almacena automáticamente el reporte.
4. El sistema genera un **ID único de reporte** y notifica al correo del administrador con los datos del reporte.

---

## 📂 Estructura del Proyecto

/index.html -> Estructura principal del formulario
/css/style.css -> Estilos visuales (diseño responsivo y profesional)
/js/main.js -> Lógica de navegación, validaciones y envío
/Code.gs -> Script de Google Apps para gestión de datos


---

## 📧 Notificación de Reportes

Cada reporte enviado genera:
- **Registro** en Google Sheets.
- **Correo automático** al administrador:
  - ID del reporte.
  - Datos del operador.
  - Chequeos seleccionados.
  - Comentarios y observaciones.
  - Link a la carpeta del reporte (evidencias deshabilitadas).

---

## 🚀 Enlace de la Aplicación

**Acceso al formulario en línea:**  
https://reportecamionesturno1.github.io/truck-report-drummondltd/

---

## 👨‍💻 Desarrollado por

**Drummond LTD - Sistema de Gestión de Camiones**

---

## ⚠️ Notas

- El módulo de **carga de fotos/videos** ha sido **deshabilitado** en esta versión, siguiendo requerimientos internos.
- La interfaz está optimizada para evitar errores y garantizar fluidez en el proceso de reporte.

---

Autor: **Diego Fuentes**  
Proyecto Especial - Drummond LTD
