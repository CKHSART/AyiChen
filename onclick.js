document.addEventListener('keydown', function(event) {
    // 檢查按下的鍵是否為 ESC (Escape)
    if (event.key === 'Escape') {
        const myModal = document.getElementById('introBox');
        const body = document.body;
        myModal.close(); // 原生方法：關閉視窗
        body.classList.remove('modal-open'); // 解除背景滾動鎖定
    }
});

document.getElementById('introBox').onclick = function(event) {
    // 取得 dialog 實體方塊的四個邊界座標
    const rect = myModal.getBoundingClientRect();
    
    // 判斷滑鼠點擊的位置是否在 dialog 實體方塊外面
    const isClickOutside = (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
    );
    
    // 如果點在外面，就執行關閉
    if (isClickOutside) {
        closeIntroBox();
    }
};
