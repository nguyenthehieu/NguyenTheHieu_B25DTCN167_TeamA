let queue = [];
let isShowing = false;

const data = {
    success: "Thành công!",
    error: "Có lỗi xảy ra!",
    info: "Thông tin mới!",
    warning: "Cảnh báo!"
};

function triggerToast(type) {
    queue.push({
        type: type,
        message: data[type],
        duration: 3000
    });

    runQueue();
}

function runQueue() {
    if (isShowing || queue.length === 0) return;

    isShowing = true;

    const toastData = queue.shift();
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${toastData.type}`;

    toast.innerHTML = `
    <span>${toastData.message}</span>
    <span class="close">&times;</span>
  `;

    container.appendChild(toast);

    const remove = () => {
        toast.classList.add("hide");

        setTimeout(() => {
            toast.remove();
            isShowing = false;
            runQueue();
        }, 300);
    };

    toast.querySelector(".close").onclick = remove;

    setTimeout(remove, toastData.duration);
}