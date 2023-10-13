export function generateRoomID(length: number): string {
  let id = '';
  const chars = 
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const numChars = chars.length;

  for (let i = 0; i < length; i++)
    id += chars.charAt(Math.floor(Math.random() * numChars));

  return id;
}