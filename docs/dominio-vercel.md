# Configuración de dominio en Vercel

Dominio de producción canónico: **`https://www.huntersolutions.tech`** (con `www`, sin barra final).

En el código ya quedó todo alineado a la base con `www`:

- `content/brand.ts` → `domain: "https://www.huntersolutions.tech"` (fuente para sitemap, robots, llms.txt y JSON-LD).
- `lib/seo.ts` → `SITE_URL` usa `NEXT_PUBLIC_SITE_URL` con fallback `https://www.huntersolutions.tech`; `metadataBase` deriva de aquí (canonical y `og:url` absolutos con `www`).
- `next.config.mjs` → redirect 301 de `huntersolutions.tech/*` (apex) a `https://www.huntersolutions.tech/*`.

Lo que sigue **solo se puede configurar en el panel de Vercel** (no desde el código):

## Checklist en el panel de Vercel

### 1. Variable de entorno
- [ ] En **Project → Settings → Environment Variables**, definir `NEXT_PUBLIC_SITE_URL = https://www.huntersolutions.tech` (sin barra final) en los entornos **Production** (y **Preview** si aplica).
- [ ] Redeploy para que la variable tome efecto.

### 2. Dominios
- [ ] En **Project → Settings → Domains**, agregar `www.huntersolutions.tech` y marcarlo como **dominio de producción** (Production Domain / "Set as Primary").
- [ ] Agregar el apex `huntersolutions.tech` y configurarlo como **Redirect 301 → `www.huntersolutions.tech`** (opción "Redirect to www.huntersolutions.tech", código 308/301).
- [ ] Verificar que `www` es el que muestra el check "Valid Configuration" y que el apex aparece como "Redirect".

### 3. DNS
Según cómo esté delegado el dominio:

- **Si el DNS lo gestiona Vercel (nameservers de Vercel):** los registros se crean solos al agregar los dominios. Solo verificar que existan.
- **Si el DNS está en un proveedor externo (registrador):**
  - [ ] `www` → registro **CNAME** apuntando a `cname.vercel-dns.com`.
  - [ ] Apex `huntersolutions.tech` → registro **A** a `76.76.21.21` (o el registro **ALIAS/ANAME** a `cname.vercel-dns.com` si el proveedor lo soporta).
  - [ ] Esperar propagación DNS (puede tardar de minutos a 48 h) y confirmar que Vercel marca ambos como verificados.

### 4. Promover a producción
- [ ] Hacer **Deploy** de la rama de producción (o **Promote to Production** desde un deployment existente) para que el dominio `www` sirva la última versión.
- [ ] Confirmar que el deployment de producción está asignado al alias `www.huntersolutions.tech`.

### 5. Verificación final
- [ ] `https://huntersolutions.tech` responde **301** hacia `https://www.huntersolutions.tech` (probar `curl -I https://huntersolutions.tech`).
- [ ] `https://www.huntersolutions.tech` responde **200**.
- [ ] La etiqueta `<link rel="canonical">` y `og:url` de cada página usan `https://www.huntersolutions.tech/...` (sin `https://https` ni sin `www`).
- [ ] `https://www.huntersolutions.tech/sitemap.xml` y `/robots.txt` listan URLs con `www`.
- [ ] `https://www.huntersolutions.tech/llms.txt` usa enlaces con `www`.
