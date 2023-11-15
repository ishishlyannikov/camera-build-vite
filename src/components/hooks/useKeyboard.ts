import { useEffect, useState } from 'react';

export default function useKeyboard(targetKey: KeyboardEvent['key']) {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = ({ key }: { key: string }) => {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  };

  const upHandler = ({ key }: { key: string }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  });

  return keyPressed;
}

// import { useCallback, useEffect, useState } from 'react';
//
// type UseKeyPressProps = {
//   targetKey: KeyboardEvent['key'];
// };
//
// function useKeyboard({ targetKey }: UseKeyPressProps): boolean {
//   const [keyPressed, setKeyPressed] = useState(false);
//
//   const handlePressDown = useCallback(
//     ({ key }: { key: string }) => {
//       if (key === targetKey) {
//         setKeyPressed(true);
//       }
//     },
//     [targetKey],
//   );
//
//   const handlePressUp = useCallback(
//     ({ key }: { key: string }) => {
//       if (key === targetKey) {
//         setKeyPressed(false);
//       }
//     },
//     [targetKey],
//   );
//
//   useEffect(() => {
//     window.addEventListener('keydown', handlePressDown);
//     window.addEventListener('keyup', handlePressUp);
//
//     return () => {
//       window.removeEventListener('keydown', handlePressDown);
//       window.removeEventListener('keyup', handlePressUp);
//     };
//   }, [handlePressDown, handlePressUp]);
//
//   return keyPressed;
// }
//
// export default useKeyboard;
