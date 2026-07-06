export function getUserId(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || 'unknown';
  return `anon_${ip}`;
}

export function getDateString(): string {
  return new Date().toISOString().slice(0, 10);
}
