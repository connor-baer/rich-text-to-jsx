export default function cx(...args) {
  return Array.prototype.slice
    .call(args)
    .filter(Boolean)
    .join(' ');
}
