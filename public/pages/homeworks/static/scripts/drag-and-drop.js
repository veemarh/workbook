const b1 = document.getElementById("block-1");

function enableDragAndDrop(item) {
    let isDragging = false;
    let startX, startY;
    let currentDroppable = null;

    item.addEventListener("mousedown", function (event) {
        isDragging = false;
        startX = event.clientX;
        startY = event.clientY;
        let shiftX = event.clientX - item.getBoundingClientRect().left;
        let shiftY = event.clientY - item.getBoundingClientRect().top;

        item.classList.add("grabbing");

        function moveAt(pageX, pageY) {
            const left = pageX - shiftX;
            const top = pageY - shiftY;
            item.style.setProperty('--left', `${left}px`);
            item.style.setProperty('--top', `${top}px`);
        }

        function onMouseMove(event) {
            item.removeAttribute("data-click-available", true);
            if (!isDragging && (Math.abs(event.clientX - startX) > 0 || Math.abs(event.clientY - startY) > 0)) {
                isDragging = true;
                item.classList.add("dragging");
            }

            if (isDragging) {
                moveAt(event.pageX, event.pageY);

                item.hidden = true;
                let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
                item.hidden = false;

                if (!elemBelow) return;

                let droppableBelow = elemBelow.closest('#block-2');

                if (currentDroppable !== droppableBelow) {
                    if (currentDroppable) {
                        currentDroppable.classList.remove("highlight");
                    }
                    currentDroppable = droppableBelow;
                    if (currentDroppable) {
                        currentDroppable.classList.add("highlight");
                    }
                }
            }
        }

        function showItemData() {
            b1.value = item.textContent;
            b1.style.setProperty('--color', item.getAttribute("data-color"));
        }

        document.addEventListener('mousemove', onMouseMove);
        item.onclick = function () {
            if (item.hasAttribute('data-click-available')) {
                showItemData();
            }
        }

        document.addEventListener("mouseup", function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);

            if (isDragging) {
                if (currentDroppable) {
                    currentDroppable.classList.remove("highlight");
                    item.style.setProperty('--color', item.getAttribute("data-color"));
                    setTimeout(() => {
                        item.setAttribute("data-click-available", true);
                    }, 10)
                } else {
                    resetItemStyle(item);
                }
            }

            item.classList.remove("grabbing");
            currentDroppable = null;
        }, {once: true});
    });

    item.ondragstart = () => false;
}

function clearItemData() {
    b1.value = '';
    b1.style.removeProperty('--color');
}

function resetItemStyle(item) {
    item.classList.remove("dragging");
    item.style.removeProperty('--left');
    item.style.removeProperty('--top');
    item.style.removeProperty('--color');
}

function resetAllItems() {
    const items = document.querySelectorAll('.word');
    items.forEach(item => {
        resetItemStyle(item);
        item.removeAttribute("data-click-available");
    });
    clearItemData();
}
