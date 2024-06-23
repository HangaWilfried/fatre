import { onMounted } from "vue";
import { uuid } from "@/utils/method";

export function useIntersectionObserver(callBack: () => void) {
  let target: Element | null;
  let observer: IntersectionObserver;

  const uniqueId = uuid();

  onMounted(async () => {
    const options = {
      threshold: 0.7,
    };
    observer = new IntersectionObserver((element) => {
      if (element[0].isIntersecting) {
        callBack();
        observer.unobserve(target as Element);
      }
    }, options);
    target = document.querySelector(`[data-id="${uniqueId}"]`);
    observer.observe(target as Element);
  });

  return {
    uniqueId,
  };
}
