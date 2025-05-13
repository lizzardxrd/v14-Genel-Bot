module.exports = (client) => {
  console.log(`${client.user.tag} hazır!`);
  
  let statusIndex = 0;
  
  const updateStatus = () => {
    if (!client.config.status || client.config.status.length === 0) return;
    
    let status = client.config.status[statusIndex];
    
    status = status
      .replace('{prefix}', client.config.prefix)
      .replace('{serverCount}', client.guilds.cache.size)
      .replace('{memberCount}', client.guilds.cache.reduce((a, g) => a + g.memberCount, 0))
      .replace('{version}', client.config.version);
    
    client.user.setActivity(status);
    
    statusIndex = (statusIndex + 1) % client.config.status.length;
  };
  
  updateStatus();
  setInterval(updateStatus, client.config.statusInterval || 30000);
};
