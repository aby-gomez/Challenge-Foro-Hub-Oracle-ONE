export const mostrarToast = (mensaje, tipo) => {
    const toast = document.getElementById("toast");
    toast.textContent = mensaje;
    toast.className = `toast ${tipo} active`;

    setTimeout(() => {
        toast.classList.remove("active");
    }, 3000);
}


