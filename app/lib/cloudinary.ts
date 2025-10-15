// src/lib/cloudinary.ts
export function esUrlCloudinaryValida(url: string): boolean {
  try {
    const u = new URL(url);
    const dominioOk = u.hostname.endsWith("res.cloudinary.com");
    const pathOk = decodeURIComponent(u.pathname).includes("/primordial_comprobantes/");
    return dominioOk && pathOk;
  } catch {
    return false;
  }
}

export function extraerPublicId(secureUrl: string): string {
  const p = decodeURIComponent(new URL(secureUrl).pathname);
  const afterUpload = p.split("/upload/")[1];
  if (!afterUpload) throw new Error("URL de Cloudinary inválida (sin /upload/)");
  const idx = afterUpload.indexOf("/");
  const rest = afterUpload.substring(idx + 1);
  return rest.replace(/^\/+/, "");
}
