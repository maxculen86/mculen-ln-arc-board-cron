# Domain Knowledge - LN Content Platform

## 🎯 Project Type
Multi-brand content delivery platform powered by Arc XP Fusion Engine

## 🌐 Site Architecture

### **la-nacion-ar (Default/Implicit)**
- **Output Types:** `default.js/jsx` files
  - `components/output-types/default.jsx`
  - `components/output-types/criticalCss/default.jsx`
- **Layouts:** `LN-*` or `Api-LN-*`
  - Examples: `LN-nota-video`, `Api-LN-Home_Main`
- **Features:** `components/features/LN/` or `LN-*` prefixed
  - `LN/`, `LN-acumulado/`, `LN-nota/`, `LN-common/`, `LN-10-global/`
- **Arc-site value:** `la-nacion-ar`

### **foodit (Explicit/Specific)**
- **Output Types:** `foodit.jsx` files (explicit)
  - `components/output-types/foodit.jsx`
  - `components/output-types/criticalCss/foodit.jsx`
  - `components/output-types/fontPreload/foodit.jsx`
- **Layouts:** `Foodit-*` prefixed
  - Examples: `Foodit-home`, `Foodit-ficha-receta`, `Foodit-chef`
- **Features:** `components/features/foodit-global/` or `foodit/`
  - Explicit foodit components
- **Arc-site value:** `foodit`

## ⚠️ Critical Distinction

**NEVER mix sites:**
- `default.js` = **la-nacion-ar** only
- `foodit.jsx` = **foodit** only
- When dev intention unclear, check file naming:
  - Has `Foodit-` or in `foodit-global/` → foodit
  - Has `LN-` or `default.jsx` → la-nacion-ar

## 📺 Content Types by Site

### la-nacion-ar
- `nota` - News articles
- `nota-video` - Video articles
- `acumulado` - Aggregated content
- `videoPlaylist` - Video playlists
- `buscador` - Search results

### foodit
- `ficha-receta` - Recipe cards
- `ficha-nota` - Food articles
- `chef` - Chef profiles
- `menu-semanal` - Weekly menu
- `recetario` - Recipe collection
- `acumulado-chef` - Chef aggregated content

## 🔌 API Patterns
- `Api-LN-{Page}_{Section}` → la-nacion-ar API layouts
- Content fetched via Fusion content sources
- Check `query['arc-site']` to determine site

## 📱 Output Types (CRITICAL - Site Specific!)

**DO NOT modify without explicit site context**

### la-nacion-ar (default.jsx)
- `output-types/default.jsx`
- `output-types/criticalCss/default.jsx`

### foodit (foodit.jsx)
- `output-types/foodit.jsx`
- `output-types/criticalCss/foodit.jsx`
- `output-types/fontPreload/foodit.jsx`

## 🎬 Common Features
- Video playback
- Article reading
- User bookmarks (DS-Toolbar)
- Comments (DS-Toolbar)
- IA Summary (DS-Toolbar)
- Search functionality
