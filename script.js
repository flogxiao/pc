document.addEventListener('DOMContentLoaded', function() {
    // 轮播图逻辑
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // 如果只有一张幻灯片，隐藏导航按钮和指示器
    if (slideCount <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        document.querySelector('.slider-indicators').style.display = 'none';
    }
    
    // 设置幻灯片初始位置
    function setSlidePosition() {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
        });
    }
    
    // 更新活动幻灯片的类和指示器
    function updateActiveClass() {
        // 更新幻灯片活动类
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // 更新指示器活动类
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // 下一张幻灯片
    function nextSlide() {
        if (currentSlide === slideCount - 1) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
        
        setSlidePosition();
        updateActiveClass();
    }
    
    // 上一张幻灯片
    function prevSlide() {
        if (currentSlide === 0) {
            currentSlide = slideCount - 1;
        } else {
            currentSlide--;
        }
        
        setSlidePosition();
        updateActiveClass();
    }
    
    // 跳转到特定幻灯片
    function goToSlide(index) {
        currentSlide = index;
        setSlidePosition();
        updateActiveClass();
        resetAutoSlide();
    }
    
    // 绑定事件
    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            resetAutoSlide();
        });
        
        prevBtn.addEventListener('click', function() {
            prevSlide();
            resetAutoSlide();
        });
    }
    
    // 为指示器添加点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            goToSlide(index);
        });
    });
    
    // 添加触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(slideInterval);
    }, {passive: true});
    
    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        resetAutoSlide();
    }, {passive: true});
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // 向左滑动
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // 向右滑动
            prevSlide();
        }
    }
    
    // 自动轮播
    let slideInterval = setInterval(nextSlide, 5000);
    
    // 重置自动轮播计时器
    function resetAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // 鼠标悬停时暂停轮播
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        // 鼠标离开时恢复轮播
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // 初始化幻灯片位置
    setSlidePosition();
    updateActiveClass();
    
    // 导航栏滚动效果
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // 检测滚动位置并添加类
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // 设置当前页面活动链接
    const currentPage = window.location.pathname;
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPage === linkPath || (currentPage.includes(linkPath) && linkPath !== '#')) {
            link.classList.add('active');
        }
    });
    
    // 为所有导航链接添加平滑滚动效果
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}); 