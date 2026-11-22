function showToast(container, toastMessage) {

    if (!container) {
        return;
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = toastMessage;

    container.innerHTML = "";
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);

}

// document.querySelectorAll("[data-toast-trigger]").forEach(trigger => {
//     trigger.addEventListener("click", () => {
//         const container = document.querySelector("[data-toast-container]");
//         showToast(container,"Here's a toast!");
//     });
// });