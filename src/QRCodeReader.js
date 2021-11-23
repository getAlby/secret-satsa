import jsQR from "jsqr";

class QRCodeReader {
  constructor() {
    this.canvasElem = null;
    this.gCtx = null;
    this.defaultOption = { inversionAttempts: "attemptBoth" };
  }

  async decodeFromImage(img, options = {}) {
    let imgDom = null;
    const opts = {
      ...this.defaultOption,
      ...options,
    };
    if (+img.nodeType > 0) {
      if (!img.src) {
        throw new Error("The ImageElement must contain a src");
      }
      imgDom = img;
    } else if (typeof img === "string") {
      imgDom = document.createElement("img");
      if (options.crossOrigin) {
        imgDom.crossOrigin = options.crossOrigin;
      }
      imgDom.src = img;
      const proms = () =>
        new Promise((resolve) => {
          imgDom.onload = () => resolve(true);
        });
      await proms();
    }

    let code = null;
    if (imgDom) {
      code = this._decodeFromImageElm(imgDom, opts);
    }
    return code;
  }

  _decodeFromImageElm(imgObj, options = {}) {
    const opts = {
      ...this.defaultOption,
      ...options,
    };
    const imageData = this._createImageData(
      imgObj,
      imgObj.width,
      imgObj.height
    );

    const code = jsQR(imageData.data, imageData.width, imageData.height, opts);

    if (code) {
      return code;
    }

    return false;
  }

  _createImageData(target, width, height) {
    if (!this.canvasElem) {
      this._prepareCanvas(width, height);
    }

    this.gCtx.clearRect(0, 0, width, height);
    this.gCtx.drawImage(target, 0, 0, width, height);

    const imageData = this.gCtx.getImageData(
      0,
      0,
      this.canvasElem.width,
      this.canvasElem.height
    );

    return imageData;
  }

  _prepareCanvas(width, height) {
    if (!this.canvasElem) {
      this.canvasElem = document.createElement("canvas");
      this.canvasElem.style.width = `${width}px`;
      this.canvasElem.style.height = `${height}px`;
      this.canvasElem.width = width;
      this.canvasElem.height = height;
    }

    this.gCtx = this.canvasElem.getContext("2d");
  }
}
export default QRCodeReader;
