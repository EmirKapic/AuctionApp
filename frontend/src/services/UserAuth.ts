export function getAuthorizationHeaders(): Headers | undefined {
  const token = localStorage.getItem("token");
  if (!token) return;
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  return headers;
}
