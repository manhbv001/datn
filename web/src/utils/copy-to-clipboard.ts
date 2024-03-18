export function copyToClipboard(text: string): void {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand('copy');
    alert('Copied to clipboard');
  } catch (err) {
    alert('Could not copy');
  } finally {
    document.body.removeChild(textarea);
  }
}
