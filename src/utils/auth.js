import fs from 'fs/promises';
import path from 'path';

const dbPath = path.join(process.cwd(), 'src/data/db.json');

export async function loginUser(username, password) {
  const data = JSON.parse(await fs.readFile(dbPath, 'utf8'));
  const user = data.users.find(user => user.username === username && user.password === password);
  if (user) {
    return { success: true, userId: user.id };
  } else {
    return { success: false, message: 'Invalid username or password' };
  }
}

export async function registerUser(username, password) {
  const data = JSON.parse(await fs.readFile(dbPath, 'utf8'));
  if (data.users.some(user => user.username === username)) {
    return { success: false, message: 'Username already exists' };
  }
  const newUser = {
    id: data.users.length + 1,
    username,
    password
  };
  data.users.push(newUser);
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
  return { success: true, userId: newUser.id };
}
