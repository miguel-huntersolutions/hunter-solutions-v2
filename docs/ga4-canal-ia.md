# GA4 — Grupo de canales personalizado "Referencia IA"

Guía para capturar el tráfico proveniente de asistentes de IA (ChatGPT, Perplexity, Claude, Gemini) como un canal propio en Google Analytics 4.

> **Importante:** todo esto es configuración en el **panel de GA4**. No es código ni se despliega con el sitio. Necesitas permiso de **Editor** o **Administrador** sobre la propiedad de GA4.

---

## Contexto

Por defecto, GA4 agrupa el tráfico de `chatgpt.com`, `perplexity.ai`, etc. dentro de **Referral (Referencia)** genérico o, en el caso de apps móviles, dentro de **Direct (Directo)**. Crear un grupo de canales personalizado permite aislar y medir el tráfico originado en asistentes de IA de forma separada.

Los **grupos de canales personalizados** reprocesan los datos históricos (hasta la fecha de creación de la propiedad) y también aplican al tráfico futuro.

---

## Paso a paso

### 1. Abrir la configuración de grupos de canales

1. Entra a [analytics.google.com](https://analytics.google.com) y selecciona la propiedad correcta.
2. Ve a **Administrar** (icono de engranaje, abajo a la izquierda).
3. En la columna **Propiedad**, abre **Configuración de datos → Grupos de canales** (Data settings → Channel groups).
4. Haz clic en **Crear nuevo grupo de canales**.

### 2. Nombrar el grupo

- **Nombre:** `Referencia IA`
- **Descripción (opcional):** `Tráfico originado en asistentes de IA (ChatGPT, Perplexity, Claude, Gemini).`

### 3. Crear el canal "Referencia IA"

Dentro del nuevo grupo, **Añadir nuevo canal** y colócalo **en la parte superior** del orden (los canales se evalúan de arriba hacia abajo; el primero que coincide gana).

- **Nombre del canal:** `Referencia IA`
- **Condición:** define la regla con **Source / Medium** o **Source**. Configura:

  > `Source` **coincide con la expresión regular (matches regex)`:
  >
  > ```
  > ^(chatgpt\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|android-app://com\.openai\.chatgpt)$
  > ```

  Alternativamente, si prefieres condiciones simples en lugar de regex, añade una condición **OR** por cada dominio con el operador **contains**:

  - `Source` contains `chatgpt.com`
  - **OR** `Source` contains `perplexity.ai`
  - **OR** `Source` contains `claude.ai`
  - **OR** `Source` contains `gemini.google.com`
  - **OR** `Source` contains `android-app://com.openai.chatgpt`

### 4. Guardar y ordenar

1. Asegúrate de que **Referencia IA** quede **antes** de los canales por defecto (Referral, Organic, Direct) para que capture primero esas coincidencias.
2. Deja el resto de canales por defecto tras él.
3. Haz clic en **Guardar**.

### 5. Verificar

- El reprocesamiento puede tardar **24–48 horas** en reflejarse en los informes.
- Verifícalo en **Informes → Adquisición → Adquisición de tráfico**, cambiando el selector de grupo de canales (arriba de la tabla) a **Referencia IA**.
- Para una validación más rápida, usa **Explorar (Explorations)** con la dimensión *Grupo de canales personalizado* y filtra por `Referencia IA`.

---

## Dominios y esquema capturados

| Fuente (source)                     | Asistente         |
| ----------------------------------- | ----------------- |
| `chatgpt.com`                       | ChatGPT (web)     |
| `perplexity.ai`                     | Perplexity        |
| `claude.ai`                         | Claude            |
| `gemini.google.com`                 | Gemini            |
| `android-app://com.openai.chatgpt`  | ChatGPT (app Android) |

---

## Nota sobre el tráfico "Directo"

Una parte del tráfico proveniente de **apps móviles de IA llegará clasificado como "Directo" (Direct)**, no como "Referencia IA". Esto ocurre porque:

- Muchas apps móviles (iOS especialmente) **no envían el header `referer`** por privacidad, así que GA4 no puede identificar el origen y lo atribuye a Directo.
- El esquema `android-app://com.openai.chatgpt` solo aparece cuando la app Android **sí** propaga el referrer; no está garantizado en todas las versiones ni plataformas.

**Implicación:** el canal "Referencia IA" capturará el tráfico identificable, pero **subestimará** el volumen real de visitas originadas en asistentes de IA. Trátalo como un piso (mínimo), no como la cifra total. Para dimensionar el impacto completo, complementa con encuestas de "¿cómo nos conociste?" o parámetros UTM cuando sea posible enlazar desde contenido propio.
