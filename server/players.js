
const players = [];

const addPlayer = ({ id, name, role, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  role = role.trim().toLowerCase();

  const existingPlayer = players.find((player) => player.room === room && player.name === name);
  if(!name || !room) return { error: 'name and room required.' };
  if(existingPlayer) return { error: 'name is taken.' };
  const player = { id, name, role, room };
  players.push(player);
  return { player };
}

const getPlayer = (id) => players.find((player) => player.id === id);

module.exports = { addPlayer, getPlayer };