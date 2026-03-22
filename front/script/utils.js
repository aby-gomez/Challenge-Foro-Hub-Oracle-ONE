//utils.js que agrupa todas las funciones utilitarias — 
// funciones pequeñas que transforman o procesan datos y no pertenecen a ninguna responsabilidad especifica.

export function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString("es-AR");
    }