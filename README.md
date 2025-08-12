# 🧮 Propinas YA - Calculadora de Propinas Argentina

![Propinas YA Logo](/public/propinasya.svg)

Calculadora de propinas inteligente diseñada específicamente para Argentina. Calcula propinas de forma rápida, precisa y con desglose detallado por persona.

## ✨ Características

### 🎯 Funcionalidades Principales
- **Cálculo dinámico** de propinas con porcentajes personalizables
- **División inteligente** de cuentas entre múltiples personas
- **Desglose detallado** por persona (monto base + propina)
- **Interfaz responsive** para todos los dispositivos
- **Diseño moderno** con paleta de colores argentina

### 🔧 Herramientas Avanzadas
- **Calculadora de préstamos** integrada
- **Formato de moneda ARS** con separadores de miles
- **Validación inteligente** de inputs
- **Sin registro** ni datos personales requeridos

## 🚀 Tecnologías Utilizadas

| Tecnología | Propósito |
|------------|-----------|
| **Next.js 15** | Framework React de última generación |
| **TypeScript** | Tipado seguro y mejor desarrollo |
| **Tailwind CSS** | Estilos rápidos y responsive |
| **Shadcn/ui** | Componentes accesibles y personalizables |
| **Turbopack** | Compilación ultrarrápida |

## 📦 Instalación

### Requisitos Previos
- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/propinas-ya.git

# Entrar al directorio
cd propinas-ya

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Variables de Entorno
No se requieren variables de entorno para el funcionamiento básico.

## 🎯 Uso

### Cálculo Básico de Propina
1. Ingresa el monto total de la cuenta
2. Selecciona el porcentaje de propina (10%, 15%, 20% o personalizado)
3. Indica entre cuántas personas se divide
4. Obtén el desglose detallado instantáneamente

### Ejemplo de Resultado
```
Monto original: $5,000.00
Propina (10%): $500.00
Total a pagar: $5,500.00

Desglose por persona (4 personas):
- Monto base por persona: $1,250.00
- Propina por persona: $125.00
- Total por persona: $1,375.00
```

## 🎨 Personalización

### Paleta de Colores
- **Primario**: `#f25e54` (rojo coral)
- **Secundario**: `#FFC93C` (amarillo)
- **Acento**: `#4CAF50` (verde éxito)
- **Fondo**: `#FFF8F0` (crema suave)

### Modificación de Colores
Edita los valores en `src/app/globals.css`:

```css
:root {
  --primary: #f25e54;
  --secondary: #FFC93C;
  /* ... más variables */
}
```

## 📱 Responsive Design

- **Desktop**: Experiencia completa con sidebar
- **Tablet**: Diseño optimizado para pantallas medianas
- **Mobile**: Interfaz táctil intuitiva
- **Print**: Versión imprimible de resultados

## 🔧 Scripts Disponibles

```bash
npm run dev          # Desarrollo con hot-reload
npm run build        # Build para producción
npm run start        # Servidor de producción
npm run lint         # Análisis de código
```

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! 

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Agradecimientos

- Comunidad de desarrollo argentino
- Contribuidores de código abierto
- Usuarios que confían en Propinas YA

## 📞 Contacto

- **Web**: [propinas-ya.vercel.app](https://propinas-ya.vercel.app)
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/propinas-ya/issues)
- **Email**: hola@propinas-ya.com

---

<div align="center">
  <strong>Hecho con ❤️ en Argentina</strong>
</div>
