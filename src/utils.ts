function stringFormatUnicorn(
  str: string | number | object,
  kv: {[key: string | number]: string | number}
): string {
  let formatted = str.toString()

  if (kv.length === 0) {
    return formatted
  }

  for (const [key, value] of Object.entries(kv)) {
    formatted = formatted.replace(
      new RegExp(`\\{${key}\\}`, 'gi'),
      value.toString()
    )
  }

  return formatted
}

export {stringFormatUnicorn}
