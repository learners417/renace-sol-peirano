"use client";
// Achica una foto a ~360px para guardarla local sin reventar el storage.
export function achicarFoto(file, cb) {
  const r = new FileReader();
  r.onload = () => {
    const img = new Image();
    img.onload = () => {
      const max = 360, k = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = img.width * k; c.height = img.height * k;
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      cb(c.toDataURL("image/jpeg", 0.7));
    };
    img.src = r.result;
  };
  r.readAsDataURL(file);
}
