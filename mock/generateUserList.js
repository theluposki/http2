export function generateUserList() {
    const userList = [];
  
    for (let i = 1; i <= 100000; i++) {
      const user = {
        id: i,
        name: `Usuário ${i}`,
        email: `usuario${i}@exemplo.com`,
        password: `senha${i}`,
        createdAt: new Date().toISOString()
      };
      userList.push(user);
    }
  
    return userList;
  }
  