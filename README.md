# soykzeta.github.io

Portafolio personal de Emmanuel Villegas Urrea — Ingeniero Full-Stack y Fundador de SaaS.

Sitio estático de una sola página con soporte bilingüe (ES/EN) y descarga de CV.

## Estructura

- `index.html` — el portafolio (página completa).
- `support.js` — runtime que renderiza la página (carga React desde CDN).
- `Emmanuel_Villegas_CV.pdf` — CV descargable.

## Ver en local

```bash
python -m http.server 8000
```

Abre [http://localhost:8000](http://localhost:8000).

## Despliegue

Automático a GitHub Pages en cada push a `main` (ver `.github/workflows/deploy.yml`).
