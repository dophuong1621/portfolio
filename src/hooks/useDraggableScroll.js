import { useEffect, useRef } from 'react';

export default function useDraggableScroll() {
  const ref = useRef(null);

  useEffect(() => {
    const slider = ref.current;
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const beginHandle = (e) => {
      isDown = true;
      slider.style.cursor = 'grabbing';
      slider.style.userSelect = 'none'; // Prevent text selection
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const stopHandle = () => {
      isDown = false;
      slider.style.cursor = 'grab';
      slider.style.removeProperty('user-select');
    };

    const moveHandle = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    };

    const disableDrag = (e) => e.preventDefault();

    slider.addEventListener('mousedown', beginHandle);
    slider.addEventListener('mouseleave', stopHandle);
    window.addEventListener('mouseup', stopHandle); // catch mouseup globally!
    slider.addEventListener('mousemove', moveHandle);
    slider.addEventListener('dragstart', disableDrag);

    return () => {
      slider.removeEventListener('mousedown', beginHandle);
      slider.removeEventListener('mouseleave', stopHandle);
      window.removeEventListener('mouseup', stopHandle);
      slider.removeEventListener('mousemove', moveHandle);
      slider.removeEventListener('dragstart', disableDrag);
    };
  }, []);

  return ref;
}
