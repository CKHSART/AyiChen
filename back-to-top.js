const backToTopBtn = document.getElementById('backToTop');

// 監聽滾動事件
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show'); // 顯示按鈕
  } else {
    backToTopBtn.classList.remove('show'); // 隱藏按鈕
  }
});

// 監聽點擊事件
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // 平滑滾動效果
  });
});
