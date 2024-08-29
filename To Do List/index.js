// Selección de elementos del DOM
const notTasks = document.getElementById("notTasks");
const deletesTasks = document.getElementById("deletesTasks");
const messageTasksSucess = document.getElementById("messageTasksSucess");
const detailTaskModal = document.getElementById("detailTaskModal");
const modalEdit = document.getElementById("modalEdit");
const clearSuccess = document.getElementById('clearSuccess');
const tableTrash = document.getElementById('tableTrash');
var id = 0; // Identificador único para cada tarea
var tasks = []; // Array que almacena las tareas activas
var tasksDeletes = []; // Array que almacena las tareas eliminadas
var tasksSuccess = []; // Array que almacena las tareas completadas
var showAlertTaskExistss = document.getElementById("alertTaskExists");
const inputTask = document.getElementById("inputTask");
const cardDeletes = document.getElementById("cardDeletes");
const cardSuccess = document.getElementById("tastSuccess");
var detailDelete = "";

// Mostrar los detalles de cada tarjeta cuando el DOM está cargado
document.addEventListener("DOMContentLoaded", showMessageNotTasks());

/**
 * Elimina una tarea y la mueve a la sección de tareas eliminadas.
 * @param {Event} event - El evento que dispara la eliminación.
 */
function deleteTask(event) {
  const idCard = event.target.id.replace(/\D+/g, ""); // Obtiene el ID de la tarea
  const detail = document.getElementById("textContent-" + idCard).textContent; // Obtiene el detalle de la tarea
  let band = confirm(`Estas seguro que deseas elimianr "${detail}"` );
  if (band) {
    detailDelete = detail;
    tasks = tasks.filter((t) => t !== detail); // Elimina la tarea del array de tareas

    createCardDelete();
    showMessageNotTasks();
    return document.getElementById("taskCard-" + idCard).remove(); // Elimina la tarjeta del DOM
  }
}

/**
 * Limpia las tablas de tareas completadas o eliminadas.
 * @param {string} icon - Tipo de tabla a limpiar ('trash' o 'success').
 */
function cleanTable(icon) {
    if (icon == 'trash') {
        let cardDeletes = document.getElementById('cardDeletes');
        let childs = cardDeletes.querySelectorAll('.tableSucess');
        childs.forEach(c => {
            c.remove();
        });
        tasksDeletes = [];
        showMessageNotTasks();
    } else {
        let tastSuccess = document.getElementById('tastSuccess');
        let childs = tastSuccess.querySelectorAll('.tableSucess');
        childs.forEach(c => {
            c.remove();
        });
        tasksSuccess = [];
        showMessageNotTasks();
    }
}

/**
 * Muestra u oculta el botón de limpiar tareas completadas según la cantidad de tareas.
 */
function showClearSuccess() {
    if (tasksSuccess.length == 0) {
        clearSuccess.style.display = 'none';
    } else {
        clearSuccess.style.display = 'block';
    }
}

/**
 * Muestra u oculta el botón de limpiar tareas eliminadas según la cantidad de tareas.
 */
function showClearTrash() {
    if (tasksDeletes.length == 0) {
        tableTrash.style.display = 'none';
    } else {
        tableTrash.style.display = 'block';
    }
}

/**
 * Crea una tarjeta en la sección de tareas eliminadas.
 */
function createCardDelete() {
    let cardText = document.createElement("p");
    cardText.innerText = detailDelete;
    tasksDeletes.push(detailDelete);
    detailDelete = "";
    cardText.className = "card-text tranistionTask tableSucess";

    let hr = document.createElement("hr");
    hr.className = 'tableSucess';
    requestAnimationFrame(() => {
        cardText.classList.add("show");
    });
    cardDeletes.appendChild(cardText);
    cardDeletes.appendChild(hr);
}

/**
 * Crea una tarjeta en la sección de tareas completadas.
 * @param {number} idCard - El ID de la tarjeta a mover.
 */
function createSuccess(idCard) {
    let detail = document.getElementById("textContent-" + idCard).textContent;
    let cardText = document.createElement("p");
    cardText.innerText = detail;
    cardText.className = "card-text tranistionTask tableSucess";
    let hr = document.createElement("hr");
    hr.className = 'tableSucess';
    requestAnimationFrame(() => {
        cardText.classList.add("show");
    });
    tasks = tasks.filter( t => t !== detail );
    tasksSuccess.push(detail);
    cardSuccess.appendChild(cardText);
    cardSuccess.appendChild(hr);
    return document.getElementById("taskCard-" + idCard).remove();
}

/**
 * Marca una tarea como completada y la mueve a la sección de tareas completadas.
 * @param {Event} event - El evento que dispara la acción.
 */
function finishTask(event) {
    let idCard = event.target.id.replace(/\D+/g, "");
    createSuccess(idCard);
    showMessageNotTasks();
}

/**
 * Selecciona todo el texto de un área de texto cuando se enfoca.
 * @param {HTMLElement} area - El área de texto a seleccionar.
 */
function selectArea(area) {
    area.addEventListener('focus', () => {
        area.select();
    });
}

/**
 * Edita una tarea existente.
 * @param {Event} event - El evento que dispara la acción.
 */
function editTask(event) {
    let idCard = event.target.id.replace(/\D+/g, "");
    let detail = document.getElementById("textContent-" + idCard);
    let detailTaskModal = document.getElementById("detailTaskModal");
    detailTaskModal.value = detail.textContent;
    selectArea(detailTaskModal);
    let saveData = document.getElementById("saveData");
    saveData.addEventListener(
        "click",
        () => {
            tasks = updateTaks(detail.textContent);
            tasks.push(detailTaskModal.value);
            console.log(tasks);
            detail.innerText = detailTaskModal.value;
        },
        { once: true }
    );
}

/**
 * Actualiza el array de tareas eliminando la tarea dada.
 * @param {string} task - La tarea a eliminar.
 * @returns {Array} - El array de tareas actualizado.
 */
function updateTaks(task) {
    tasks = tasks.filter((t) => t !== task);
    return tasks;
}

/**
 * Muestra u oculta los mensajes de "no hay tareas" según la cantidad de tareas en cada sección.
 */
function showMessageNotTasks() {
    showAlertTaskExistss.style.display = "none";
    notTasks.style.display = tasks.length === 0 ? "block" : "none";
    messageTasksSucess.style.display =
        tasksSuccess.length === 0 ? "block" : "none";
    tasksSuccess.length === 0 ? "block" : "none";
    deletesTasks.style.display = tasksDeletes.length === 0 ? "block" : "none";
    showClearSuccess();
    showClearTrash();
}

/**
 * Crea una nueva tarea y la agrega al listado de tareas.
 */
function createTask() {
    if (inputTask.value.trim() === "") {
        inputTask.value = "";
        inputTask.focus();
    } else {
        let task = inputTask.value;
        task = deleteSpaces(task);
        let band = isExists(tasks, task);
        if (band) {
            showAlertTaskExistss.style.display = "block";
            requestAnimationFrame(() => {
                showAlertTaskExistss.classList.add("show");
            });
            setTimeout(() => {
                showAlertTaskExistss.style.display = "none";
                showAlertTaskExistss.classList.remove("show");
            }, 2000);
        } else {
            createCardTask(inputTask);
            inputTask.value = "";
            showAlertTaskExistss.style.display = "none";
            showMessageNotTasks()
        }
    }
}

/**
 * Crea una tarjeta de tarea y la agrega al DOM.
 * @param {HTMLElement} taskDetails - El elemento de entrada con el detalle de la tarea.
 */
function createCardTask(taskDetails) {
    task = document.getElementById("task");

    taskCard = document.createElement("div");
    taskCard.className = "task-content mb-3 border border-1 shadow rounded";
    taskCard.id = "taskCard-" + id;

    textContent = document.createElement("p");
    textContent.className = "card-text mx-3 text-dark";
    textContent.id = "textContent-" + id;
    taskDetails.value = deleteSpaces(taskDetails.value);
    textContent.textContent = taskDetails.value;

    taskActions = document.createElement("div");
    taskActions.id = "taskActions-" + id;
    taskActions.className = "d-flex justify-content-end mb-2";

    actionEdit = document.createElement("a");
    actionEdit.id = "actionEdit-" + id;
    actionEdit.className = "btn btn-warning mx-2";
    actionEdit.setAttribute("onclick", "editTask(event)");
    actionEdit.setAttribute("data-bs-toggle", "modal");
    actionEdit.setAttribute("data-bs-target", "#modalEdit");
    iconEdit = document.createElement("i");
    iconEdit.id = "iconEdit-" + id;
    iconEdit.className = "fa-regular fa-pen-to-square";
    actionEdit.appendChild(iconEdit);

    actionTrash = document.createElement("a");
    actionTrash.id = "actionTrash" + id;
    actionTrash.className = "btn btn-danger mx-2 ";
    actionTrash.setAttribute("onclick", "deleteTask(event)");
    iconTrash = document.createElement("i");
    iconTrash.id = id;
    iconTrash.className = "fa-solid fa-trash";
    actionTrash.appendChild(iconTrash);

    actionSuccess = document.createElement("a");
    actionSuccess.id = "actionSuccess-" + id;
    actionSuccess.className = "btn btn-success mx-2";
    actionSuccess.setAttribute("onclick", "finishTask(event)");
    iconSuccess = document.createElement("i");
    iconSuccess.id = "iconSuccess-" + id;
    iconSuccess.className = "fa-solid fa-check iconSuccess";
    actionSuccess.appendChild(iconSuccess);

    taskActions.appendChild(actionTrash);
    taskActions.appendChild(actionEdit);
    taskActions.appendChild(actionSuccess);

    taskCard.appendChild(textContent);
    taskCard.appendChild(taskActions);

    task.appendChild(taskCard);
    taskDetails.value.toLowerCase();
    tasks.push(taskDetails.value);
    ++id;
}

/**
 * Verifica si una tarea ya existe en el listado.
 * @param {Array} tasks - El array de tareas existentes.
 * @param {string} task - La tarea a verificar.
 * @returns {boolean} - True si la tarea existe, false en caso contrario.
 */
function isExists(tasks, task) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i] === task.toLowerCase()) {
            return true;
        }
    }
    return false;
}

/**
 * Elimina los espacios en blanco al principio y al final de una cadena, y reduce los espacios múltiples a uno solo.
 * @param {string} task - La cadena a limpiar.
 * @returns {string} - La cadena limpiada.
 */
function deleteSpaces(task) {
    let res = "";
    task = task.split(" ");
    for (let i = 0; i < task.length; i++) {
        if (task[i].trim() !== "") {
            res = res + task[i] + " ";
        }
    }
    return res;
}
