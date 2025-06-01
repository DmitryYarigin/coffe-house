document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".favorite__list");
    const slides = document.querySelectorAll(".favorite__item");
    const indicators = document.querySelectorAll(".favorite__indicator-item");
    const prevArrow = document.querySelector(".favorite__arrow.left");
    const nextArrow = document.querySelector(".favorite__arrow.right");
  
    let currentIndex = 0;
    let autoSlideInterval;
  
    // Функция для обновления позиции слайдера
    
    if (slider) {

      const updateSlider = () => {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        indicators.forEach((indicator, index) => {
          const fill = indicator.querySelector('.fill');
          
          // сбрасываем состояние всех индикаторов
          fill.style.transition = "none";
          fill.style.width = "0%";

          indicator.classList.remove("active");
          
          // Устанавливаем заполнение только для текущего индикатора
          if (index === currentIndex) {
            indicator.classList.add("active");
            // Добавляем плавный переход только для текущего индикатора
            setTimeout(() => {
              fill.style.transition = "width 3s linear";
              fill.style.width = "100%";
            }, 0)
          }
        });
      };

    // Переход на следующий слайд
    
    const goToNextSlide = () => {
      currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
      updateSlider();
    }

    // Переход на предыдущий слайд

    const goToPrevSlide = () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
    } 
  
    // Обработчик клика на левую стрелку
    prevArrow.addEventListener("click", () => {
      goToPrevSlide();
      resetAutoSlide(); // сбрасываем автопрокутку
    });
  
    // Обработчик клика на правую стрелку
    nextArrow.addEventListener("click", () => {
      goToNextSlide();
      resetAutoSlide();
    });

    //Автопрокрутка
    const startAutoSlide = () => {
      autoSlideInterval = setInterval(() => {
        goToNextSlide();
      }, 3000);
    };

    const stopAutoSlide = () => {
      clearInterval(autoSlideInterval);
    }

   // Обработчик кликов на индикаторы
    // indicators.forEach((indicator, index) => {
    //   indicator.addEventListener("click", () => {
    //     currentIndex = index;
    //     updateSlider();
    //   });
    // });
  
    // сброс автопрокрутки при ручном перелистывании
    const resetAutoSlide = () => {
      stopAutoSlide();
      startAutoSlide();
    }

    // Инициализация позиции слайдера
    startAutoSlide()
    updateSlider();
    
    slider.addEventListener("mouseenter", stopAutoSlide);
    slider.addEventListener("mouseleave", startAutoSlide);
    }
  });

