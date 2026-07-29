// Red de seguridad contra traductores del navegador (Google Translate en Chrome móvil, etc.)
// que reescriben los nodos de React y causan "NotFoundError: removeChild/insertBefore" — un
// crash que tumba toda la app. Si el nodo ya fue movido por el traductor, no-op en vez de throw.
export function installDomGuard() {
  if (typeof Node === "undefined" || !Node.prototype || Node.prototype.__renaceGuard) return;
  Node.prototype.__renaceGuard = true;
  const rm = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) return child;
    return rm.call(this, child);
  };
  const ib = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (n, ref) {
    if (ref && ref.parentNode !== this) return this.appendChild(n);
    return ib.call(this, n, ref);
  };
}
