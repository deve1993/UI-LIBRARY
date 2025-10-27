import { useEffect, useState, useRef, RefObject } from 'react';

export interface UseIntersectionOptions extends IntersectionObserverInit {
  /** Se true, disconnette l'observer dopo il primo trigger */
  freezeOnceVisible?: boolean;
}

/**
 * Hook per osservare l'intersezione di un elemento con il viewport
 * Utile per animazioni scroll-triggered
 *
 * @example
 * const ref = useRef(null);
 * const inView = useIntersection(ref, { threshold: 0.5 });
 *
 * return (
 *   <div ref={ref} className={inView ? 'fade-in' : 'opacity-0'}>
 *     Content
 *   </div>
 * );
 */
export function useIntersection<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T>,
  { threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false }: UseIntersectionOptions = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Se già visibile e freezeOnceVisible è true, non fare nulla
    if (freezeOnceVisible && isIntersecting) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);

        if (entry.isIntersecting && freezeOnceVisible && observerRef.current) {
          observerRef.current.disconnect();
        }
      },
      { threshold, root, rootMargin }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [elementRef, threshold, root, rootMargin, freezeOnceVisible, isIntersecting]);

  return isIntersecting;
}

export default useIntersection;
