// Serviço para integração com o backend Node.js

export const API_URL = 'http://localhost:4000';

export async function getMessages() {
  const res = await fetch(`${API_URL}/messages`);
  return res.json();
}

export async function addMessage(message) {
  const res = await fetch(`${API_URL}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message)
  });
  return res.json();
}

export async function deleteMessage(id) {
  const res = await fetch(`${API_URL}/messages/${id}`, {
    method: 'DELETE'
  });
  return res.json();
}
