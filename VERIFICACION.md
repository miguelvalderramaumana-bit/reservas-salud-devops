# Verificación local del proyecto

Fecha: 10 de noviembre de 2026, aproximadamente 14:28, America/Santiago.

Entorno real: macOS Intel, Docker Desktop con cliente y servidor Docker 29.9.3, Compose v5.7.0. La imagen se construyó con nginx:alpine. Código funcional probado: commit 541965c.

| Comprobación | Resultado observado |
| --- | --- |
| docker compose build --pull | Imagen construida |
| docker compose config --quiet | Código de salida 0 |
| docker compose up -d | Contenedor creado e iniciado |
| nginx -t dentro del contenedor | Configuración válida |
| docker compose ps | healthy, 127.0.0.1:8080 hacia 80 |
| GET / | HTTP 200 |
| GET /health | HTTP 200, cuerpo ok |
| GET /no-existe | HTTP 404 esperado |
| GET /favicon.svg | HTTP 200 |
| Formulario vacío | Navegador exige el alias obligatorio |
| Fecha 2026-11-09 con mínimo 2026-11-10 | rangeUnderflow=true, valid=false |
| Reserva ficticia para 2026-11-11 a las 11:00 | Mensaje de simulación, sin reserva real |
| Editar después de confirmar | Borra la confirmación anterior |
| docker logs | Solicitudes GET con estados 200, 304 y 404 |
| docker stats --no-stream | CPU 0.00%, memoria 12.48 MiB de 7.75 GiB, 0.16%, 13 procesos |
| docker compose stop y ps -a | Exited (0) |
| docker compose start | Contenedor reiniciado |

La muestra de recursos corresponde a solicitudes manuales y reposo; no es una prueba de carga. El 304 de los estilos corresponde a la validación de caché del navegador. El 404 de /no-existe fue provocado para comprobar el registro de errores de acceso.

Durante las pruebas se observó que faltaba el favicon y que una confirmación podía permanecer al editar el formulario. Se incorporó un icono local y se restableció el mensaje al cambiar un campo. Ambas correcciones se revisaron en el navegador tras reconstruir la imagen.

La imagen local comprobada tiene ID sha256:98f8f10b1c58319d9b5d5aea0e39ac534a8ad3646dd915104cefcff68a70490e. Este identificador local no equivale al digest de publicación de un registro remoto.

Las capturas de navegador y GitHub y los resultados de comandos se integran al informe. Trabajo individual con autorrevisión. No se ejecutó GitHub Actions, que es complementario en la pauta.
