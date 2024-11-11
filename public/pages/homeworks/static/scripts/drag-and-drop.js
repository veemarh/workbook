const b1 = document.getElementById("block-1");

function enableDragAndDrop(item) {
    let isDragging = false;
    let startX, startY;

    item.addEventListener("mousedown", function (event) {
        isDragging = false;
        startX = event.clientX;
        startY = event.clientY;

        let currentDroppable = null;
        let shiftX = event.clientX - item.getBoundingClientRect().left;
        let shiftY = event.clientY - item.getBoundingClientRect().top;

        item.classList.add("grabbing");
        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            item.style.left = pageX - shiftX + 'px';
            item.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            item.removeAttribute("data-click-available", true);

            if (!isDragging) {
                if (Math.abs(event.clientX - startX) > 1 || Math.abs(event.clientY - startY) > 1) {
                    isDragging = true;
                }
            }

            if (isDragging) {
                item.classList.add("dragging");
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
            b1.textContent = item.textContent;
            b1.style.color = item.getAttribute("data-color");
        }

        document.addEventListener('mousemove', onMouseMove);
        item.onclick = function () {
            if (item.hasAttribute('data-click-available')) {
                showItemData();
            }
        }

        item.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            if (isDragging && currentDroppable) {
                currentDroppable.classList.remove("highlight");
                item.style.backgroundColor = item.getAttribute("data-color");
                setTimeout(() => {
                    item.setAttribute("data-click-available", true);
                }, 10)
            } else if (isDragging) {
                item.classList.remove("dragging");
                item.style.left = '';
                item.style.top = '';
                item.style.backgroundColor = '';
            }
            item.classList.remove("grabbing");
            currentDroppable = null;
            item.onmouseup = null;
        };
    });

    item.ondragstart = function () {
        return false;
    };
}

function clearItemData() {
    b1.textContent = '';
    b1.style.color = '';
}
