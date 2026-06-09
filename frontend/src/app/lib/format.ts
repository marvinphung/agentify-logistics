export function formatDateTime(value?: string | null): string {
  if (!value) {
    return '-';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(parsed);
}

export function formatDate(value?: string | null): string {
  if (!value) {
    return '-';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
  }).format(parsed);
}

export function formatRelativeCount(value: number, singular: string, plural?: string): string {
  if (value === 1) {
    return `1 ${singular}`;
  }

  return `${value} ${plural || singular}`;
}

export function toTitleCase(value: string): string {
  return value
    .replace(/[_-]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ');
}
