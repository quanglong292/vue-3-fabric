import { fabric } from "fabric";

const use2DTools = () => {
  let canvas: fabric.Canvas;

  // Functions
  const initial = (canvasRef: fabric.Canvas) => {
    canvas = canvasRef;
    const { innerHeight, innerWidth } = window;
    canvas.setHeight(innerHeight);
    canvas.setWidth(innerWidth);
    canvas.setBackgroundColor("#f5f5f5", canvas.renderAll.bind(canvas));
    canvas.selection = true;
    canvas.defaultCursor = "crosshair";
    addGrid(canvas);
  };

  const addCircle = () => {
    const circle = new fabric.Circle({
      left: 100, // X-coordinate of the center of the circle
      top: 100, // Y-coordinate of the center of the circle
      radius: 50, // Radius of the circle
      fill: "white", // Fill color of the circle
      stroke: "black", // Stroke color (outline)
      strokeWidth: 1, // Stroke width (outline thickness)
    });

    canvas.add(circle);
  };

  function addGrid(canvas: any, gridSize = 20) {
    const width = canvas.width;
    const height = canvas.height;
    const gridOptions = {
      stroke: "#ccc", // grid line color
      selectable: false, // prevent selection of gridlines
      evented: false, // don't trigger events on gridlines
    };

    // Horizontal lines
    for (let i = 0; i <= height; i += gridSize) {
      canvas.add(new fabric.Line([0, i, width, i], gridOptions));
    }

    // Vertical lines
    for (let i = 0; i <= width; i += gridSize) {
      canvas.add(new fabric.Line([i, 0, i, height], gridOptions));
    }

    canvas.renderAll();
  }

  return {
    addCircle,
    initial,
  };
};

export default use2DTools;
