import * as React from "react";

interface CursorPositionProps {
  x: number;
  y: number;
  angle: number;
}

export const useCursor = (): CursorPositionProps => {
  const [position, setPosition] = React.useState<CursorPositionProps>({
    x: 0,
    y: 0,
    angle: 0,
  });

  React.useEffect(() => {
    let frameId: number;
    let lastX = 0;
    let lastY = 0;
    let cumulativeAngle = 0;
    let lastAngle = 0;

    const normalizeAngle = (angle: number): number =>
      ((angle % 360) + 360) % 360;

    const getShortestRotation = (from: number, to: number): number => {
      const diff = normalizeAngle(to - from);
      return diff > 180 ? diff - 360 : diff;
    };

    const updatePosition = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (Math.abs(x - lastX) > 1 || Math.abs(y - lastY) > 1) {
        const deltaX = x - lastX;
        const deltaY = y - lastY;

        if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
          const currentAngle =
            Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 128;
          const normalizedCurrent = normalizeAngle(currentAngle);
          const normalizedLast = normalizeAngle(lastAngle);
          const deltaAngle = getShortestRotation(
            normalizedLast,
            normalizedCurrent,
          );

          cumulativeAngle += deltaAngle;
          lastAngle = currentAngle;
        }

        setPosition({ x, y, angle: cumulativeAngle });
        lastX = x;
        lastY = y;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => updatePosition(e));
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return position;
};
