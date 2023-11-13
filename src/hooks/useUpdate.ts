import {
  type DependencyList,
  type EffectCallback,
  useEffect,
  useRef,
} from 'react';

function useUpdate(
  effect: EffectCallback,
  deps: DependencyList,
  applyChange = true
) {
  const initialMount = useRef(true);

  useEffect(
    initialMount.current || !applyChange
      ? () => {
          initialMount.current = false;
        }
      : effect,
    deps
  );
}

export default useUpdate;
