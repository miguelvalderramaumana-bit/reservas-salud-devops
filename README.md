# Servicio de reserva de horas médicas

Proyecto académico de Miguel Valderrama, Ingeniería Informática. Centro Salud Horizonte es una organización ficticia. La página es estática: simula una reserva y no envía, guarda ni procesa datos de pacientes. No contiene API ni base de datos.

## Requisitos

Git, Docker Desktop iniciado, Docker Compose v2, navegador e Internet para descargar nginx:alpine. Se ejecuta localmente, sin servicios cloud.

## Instalación y ejecución

Clona el repositorio o descomprime el proyecto y abre una terminal en esta carpeta.

```sh
cp .env.example .env
docker version
docker compose version
docker compose config
docker compose build --pull
docker compose up -d
docker compose ps
```

Abre http://localhost:8080. Completa el formulario con un alias ficticio, especialidad, fecha actual o futura y hora. Al pulsar el botón debe aparecer un mensaje de simulación, sin una reserva real. Comprueba que los campos obligatorios y las fechas anteriores se rechacen.

## Verificación y monitoreo

```sh
curl -i http://localhost:8080/
curl -i http://localhost:8080/health
docker compose exec web nginx -t
docker compose logs --tail=50 web
docker logs "$(docker compose ps -q web)" --tail=50
docker stats --no-stream "$(docker compose ps -q web)"
```

Se espera HTTP 200 para la página y /health; 404 para una ruta inexistente. El estado healthy demuestra respuesta HTTP del contenedor, no disponibilidad clínica. CPU y memoria son medidas puntuales; no equivalen a una prueba de carga. Nginx escribe los logs en stdout y stderr y Docker conserva hasta dos archivos de 5 MB.

## Detención y recuperación

```sh
docker compose stop
docker compose ps -a
docker compose start
docker compose down
```

`stop` conserva el contenedor; `down` lo elimina junto con la red del proyecto. Para recuperar una versión revisada, selecciona el commit o tag correspondiente y reconstruye con `docker compose up -d --build`. No ejecutar comandos de limpieza global de Docker.

## Estructura y decisiones

- `src/index.html`, `src/styles.css` y `src/app.js`: interfaz y simulación local.
- `Dockerfile`: imagen oficial nginx:alpine, copia de archivos y healthcheck.
- `nginx.conf`: servidor estático, /health y cabeceras de seguridad.
- `docker-compose.yml`: puerto 8080 enlazado solo a 127.0.0.1, sistema de archivos de solo lectura y directorios temporales.
- `.env.example`: puerto de demostración, sin secretos.
- `.gitignore` y `.dockerignore`: exclusión de configuración privada y archivos innecesarios.

La etiqueta nginx:alpine cumple la pauta, pero es mutable: una mejora es fijar el digest tras validar la imagen. Nginx conserva su modelo predeterminado de proceso maestro y workers; no se afirma ejecución íntegra como usuario no privilegiado.

## Seguridad

No introducir datos personales ni credenciales, tampoco en commits, capturas o issues. `.gitignore` no elimina secretos que ya están en el historial. Si se expone uno, revocarlo y revisar el historial. Las variables de entorno no protegen secretos que se copian al HTML. Este servicio no los necesita. No se habilita HTTPS local ni autenticación porque no existe un sistema clínico real.

## Flujo de trabajo propuesto

Usar un tablero Kanban con Pendiente, En curso, Revisión y Terminado; limitar En curso a una tarea. Crear ramas `feature/formulario` o `fix/validacion-fecha` desde main, commits pequeños, pull request con explicación y pruebas, revisión del diff y fusión. Si trabaja una sola persona, registrar autorrevisión sin atribuir aprobación a un tercero. Etiquetar la versión comprobada como v1.0.0. Asociar cada tarea al commit y al pull request real.

## Problemas frecuentes

- `docker: command not found`: instalar Docker Desktop y verificar su CLI.
- No conecta con el daemon: abrir Docker Desktop y esperar a que el motor esté listo.
- Puerto ocupado: liberar 8080 para la evaluación o cambiar APP_PORT y documentar la diferencia.
- Error al descargar imagen: comprobar Internet y proxy; no desactivar TLS.

## Evidencias

Consultar `evidencias/README.md`. Deben integrarse al informe las capturas reales de GitHub, Docker Desktop, navegador y terminal. No se incluyen resultados ficticios.
