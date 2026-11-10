const form = document.querySelector('#reserva');
const fecha = document.querySelector('#fecha');
const hoy = new Date();
const localDate = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;
fecha.min = localDate;
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (fecha.value < localDate) {
    fecha.setCustomValidity('Selecciona una fecha actual o futura.');
    fecha.reportValidity();
    return;
  }
  document.querySelector('#resultado').textContent = 'Simulación completada. No se ha creado una reserva real ni se han guardado datos.';
});
fecha.addEventListener('input', () => fecha.setCustomValidity(''));
