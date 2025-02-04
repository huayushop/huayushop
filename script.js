// 添加移动端触摸事件支持
chatHeader.addEventListener('touchstart', function (e) {
    const touch = e.touches[0];
    startDrag(touch);
});

document.addEventListener('touchmove', function (e) {
    const touch = e.touches[0];
    drag(touch);
});

document.addEventListener('touchend', endDrag);