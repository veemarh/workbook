function enableDragAndDrop(item) {
    item.addEventListener("mousedown", function (event) {
        let currentDroppable = null;
        let shiftX = event.clientX - item.getBoundingClientRect().left;
        let shiftY = event.clientY - item.getBoundingClientRect().top;

        item.classList.add("dragging", "grabbing");

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            item.style.left = pageX - shiftX + 'px';
            item.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
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

        document.addEventListener('mousemove', onMouseMove);

        item.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            if (currentDroppable) {
                currentDroppable.classList.remove("highlight");
                item.style.backgroundColor = item.getAttribute("data-color");
                // item.setAttribute("data-dragged", true);
            } else {
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

