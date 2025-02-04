// 轮播图功能
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = slider.querySelector('.slides');
    const slideElements = slides.querySelectorAll('.slide');
    const nav = slider.querySelector('.slider-nav');
    const prevButton = slider.querySelector('.prev');
    const nextButton = slider.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;
    let isAutoPlaying = true;

    // 创建导航按钮
    slideElements.forEach((_, index) => {
        const button = document.createElement('button');
        button.setAttribute('aria-label', `切换到第${index + 1}张图片`);
        button.addEventListener('click', () => {
            goToSlide(index);
            resetInterval();
        });
        nav.appendChild(button);
    });

    const navButtons = nav.querySelectorAll('button');
    navButtons[0].classList.add('active');

    // 切换到指定幻灯片
    function goToSlide(index) {
        slides.style.transform = `translateX(-${index * 100}%)`;
        currentSlide = index;
        updateNavButtons();
    }

    // 更新导航按钮状态
    function updateNavButtons() {
        navButtons.forEach((btn, idx) => {
            btn.classList.toggle('active', idx === currentSlide);
        });
    }

    // 下一张幻灯片
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideElements.length;
        goToSlide(currentSlide);
    }

    // 上一张幻灯片
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideElements.length) % slideElements.length;
        goToSlide(currentSlide);
    }

    // 重置自动播放计时器
    function resetInterval() {
        if (isAutoPlaying) {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }
    }

    // 开始自动播放
    function startAutoPlay() {
        if (!isAutoPlaying) {
            isAutoPlaying = true;
            slideInterval = setInterval(nextSlide, 5000);
        }
    }

    // 停止自动播放
    function stopAutoPlay() {
        if (isAutoPlaying) {
            isAutoPlaying = false;
            clearInterval(slideInterval);
        }
    }

    // 绑定按钮事件
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    // 鼠标悬停时暂停自动播放
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);

    // 触摸事件处理
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        stopAutoPlay();
    });

    slider.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', () => {
        const difference = touchStartX - touchEndX;
        if (Math.abs(difference) > 50) { // 最小滑动距离
            if (difference > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        startAutoPlay();
    });

    // 键盘控制
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetInterval();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetInterval();
        }
    });

    // 初始化自动播放
    startAutoPlay();
}); 