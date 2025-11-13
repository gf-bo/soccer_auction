import React, { useState, useEffect, useRef } from 'react';
import { Users, Trophy, Clock, MessageSquare, Settings, Play, UserPlus, Copy, Check } from 'lucide-react';

// Base de datos de jugadores por posición
const PLAYERS_DATABASE = {
  GK: [
    { name: "Lev Yashin", year: 1963, team: "Dynamo Moscow", basePrice: 45 },
    { name: "Dino Zoff", year: 1982, team: "Juventus", basePrice: 42 },
    { name: "Oliver Kahn", year: 2001, team: "Bayern Munich", basePrice: 48 },
    { name: "Gianluigi Buffon", year: 2006, team: "Juventus", basePrice: 50 },
    { name: "Iker Casillas", year: 2010, team: "Real Madrid", basePrice: 47 },
    { name: "Manuel Neuer", year: 2014, team: "Bayern Munich", basePrice: 52 },
    { name: "Jan Oblak", year: 2019, team: "Atlético Madrid", basePrice: 45 },
    { name: "Alisson Becker", year: 2019, team: "Liverpool", basePrice: 48 },
    { name: "Thibaut Courtois", year: 2022, team: "Real Madrid", basePrice: 46 },
    { name: "Ederson", year: 2023, team: "Manchester City", basePrice: 44 },
    { name: "Peter Schmeichel", year: 1999, team: "Manchester United", basePrice: 43 },
    { name: "Edwin van der Sar", year: 2008, team: "Manchester United", basePrice: 41 },
    { name: "Petr Čech", year: 2005, team: "Chelsea", basePrice: 42 },
    { name: "Victor Valdés", year: 2009, team: "Barcelona", basePrice: 38 },
    { name: "Marc-André ter Stegen", year: 2020, team: "Barcelona", basePrice: 43 },
    { name: "Emiliano Martínez", year: 2022, team: "Aston Villa", basePrice: 40 },
    { name: "Keylor Navas", year: 2017, team: "Real Madrid", basePrice: 39 },
    { name: "Hugo Lloris", year: 2018, team: "Tottenham", basePrice: 37 },
    { name: "David de Gea", year: 2018, team: "Manchester United", basePrice: 44 },
    { name: "Wojciech Szczęsny", year: 2021, team: "Juventus", basePrice: 36 }
  ],
  LB: [
    { name: "Roberto Carlos", year: 2002, team: "Real Madrid", basePrice: 55 },
    { name: "Paolo Maldini", year: 1994, team: "AC Milan", basePrice: 60 },
    { name: "Ashley Cole", year: 2008, team: "Chelsea", basePrice: 48 },
    { name: "Marcelo", year: 2017, team: "Real Madrid", basePrice: 52 },
    { name: "Jordi Alba", year: 2015, team: "Barcelona", basePrice: 50 },
    { name: "Andrew Robertson", year: 2020, team: "Liverpool", basePrice: 47 },
    { name: "Alphonso Davies", year: 2020, team: "Bayern Munich", basePrice: 49 },
    { name: "Philipp Lahm", year: 2013, team: "Bayern Munich", basePrice: 53 },
    { name: "Patrice Evra", year: 2009, team: "Manchester United", basePrice: 45 },
    { name: "Theo Hernández", year: 2023, team: "AC Milan", basePrice: 46 },
    { name: "Bixente Lizarazu", year: 1998, team: "Bayern Munich", basePrice: 44 },
    { name: "Denis Irwin", year: 1999, team: "Manchester United", basePrice: 42 },
    { name: "Giacinto Facchetti", year: 1970, team: "Inter Milan", basePrice: 51 },
    { name: "Nilton Santos", year: 1958, team: "Botafogo", basePrice: 48 },
    { name: "Leighton Baines", year: 2013, team: "Everton", basePrice: 40 },
    { name: "Marcos Alonso", year: 2017, team: "Chelsea", basePrice: 38 },
    { name: "Juan Bernat", year: 2019, team: "PSG", basePrice: 39 },
    { name: "Luke Shaw", year: 2021, team: "Manchester United", basePrice: 43 },
    { name: "Benjamin Mendy", year: 2018, team: "Manchester City", basePrice: 41 },
    { name: "Alex Sandro", year: 2017, team: "Juventus", basePrice: 44 }
  ],
  CB: [
    { name: "Franz Beckenbauer", year: 1974, team: "Bayern Munich", basePrice: 65 },
    { name: "Franco Baresi", year: 1989, team: "AC Milan", basePrice: 62 },
    { name: "Bobby Moore", year: 1966, team: "West Ham", basePrice: 58 },
    { name: "Fabio Cannavaro", year: 2006, team: "Real Madrid", basePrice: 60 },
    { name: "Sergio Ramos", year: 2017, team: "Real Madrid", basePrice: 63 },
    { name: "Virgil van Dijk", year: 2019, team: "Liverpool", basePrice: 68 },
    { name: "Gerard Piqué", year: 2011, team: "Barcelona", basePrice: 57 },
    { name: "John Terry", year: 2005, team: "Chelsea", basePrice: 56 },
    { name: "Rio Ferdinand", year: 2008, team: "Manchester United", basePrice: 55 },
    { name: "Carles Puyol", year: 2009, team: "Barcelona", basePrice: 59 },
    { name: "Alessandro Nesta", year: 2003, team: "AC Milan", basePrice: 58 },
    { name: "Javier Mascherano", year: 2015, team: "Barcelona", basePrice: 52 },
    { name: "Thiago Silva", year: 2013, team: "PSG", basePrice: 54 },
    { name: "Mats Hummels", year: 2014, team: "Borussia Dortmund", basePrice: 53 },
    { name: "Raphaël Varane", year: 2018, team: "Real Madrid", basePrice: 56 },
    { name: "Kalidou Koulibaly", year: 2019, team: "Napoli", basePrice: 51 },
    { name: "Rúben Dias", year: 2021, team: "Manchester City", basePrice: 57 },
    { name: "Marquinhos", year: 2020, team: "PSG", basePrice: 54 },
    { name: "Kim Min-jae", year: 2023, team: "Bayern Munich", basePrice: 50 },
    { name: "William Saliba", year: 2023, team: "Arsenal", basePrice: 49 },
    { name: "Ronald Koeman", year: 1992, team: "Barcelona", basePrice: 55 },
    { name: "Nemanja Vidić", year: 2009, team: "Manchester United", basePrice: 56 },
    { name: "Jaap Stam", year: 1999, team: "Manchester United", basePrice: 54 },
    { name: "Laurent Blanc", year: 1998, team: "Marseille", basePrice: 52 }
  ],
  RB: [
    { name: "Cafú", year: 2002, team: "Roma", basePrice: 57 },
    { name: "Dani Alves", year: 2015, team: "Barcelona", basePrice: 59 },
    { name: "Philipp Lahm", year: 2014, team: "Bayern Munich", basePrice: 60 },
    { name: "Javier Zanetti", year: 2010, team: "Inter Milan", basePrice: 56 },
    { name: "Trent Alexander-Arnold", year: 2020, team: "Liverpool", basePrice: 54 },
    { name: "Kyle Walker", year: 2019, team: "Manchester City", basePrice: 50 },
    { name: "Joshua Kimmich", year: 2020, team: "Bayern Munich", basePrice: 53 },
    { name: "Achraf Hakimi", year: 2023, team: "PSG", basePrice: 52 },
    { name: "Reece James", year: 2022, team: "Chelsea", basePrice: 51 },
    { name: "Kieran Trippier", year: 2019, team: "Atlético Madrid", basePrice: 47 },
    { name: "João Cancelo", year: 2021, team: "Manchester City", basePrice: 49 },
    { name: "Dani Carvajal", year: 2017, team: "Real Madrid", basePrice: 48 },
    { name: "Branislav Ivanović", year: 2013, team: "Chelsea", basePrice: 46 },
    { name: "Maicon", year: 2010, team: "Inter Milan", basePrice: 52 },
    { name: "Gary Neville", year: 1999, team: "Manchester United", basePrice: 45 },
    { name: "Lilian Thuram", year: 1998, team: "Parma", basePrice: 50 },
    { name: "Willy Sagnol", year: 2006, team: "Bayern Munich", basePrice: 44 },
    { name: "Bacary Sagna", year: 2011, team: "Arsenal", basePrice: 43 },
    { name: "Sergi Roberto", year: 2017, team: "Barcelona", basePrice: 42 },
    { name: "Héctor Bellerín", year: 2016, team: "Arsenal", basePrice: 44 }
  ],
  CDM: [
    { name: "Claude Makélélé", year: 2004, team: "Chelsea", basePrice: 52 },
    { name: "N'Golo Kanté", year: 2017, team: "Chelsea", basePrice: 62 },
    { name: "Sergio Busquets", year: 2011, team: "Barcelona", basePrice: 58 },
    { name: "Casemiro", year: 2017, team: "Real Madrid", basePrice: 56 },
    { name: "Rodri", year: 2023, team: "Manchester City", basePrice: 60 },
    { name: "Fabinho", year: 2019, team: "Liverpool", basePrice: 54 },
    { name: "Patrick Vieira", year: 2004, team: "Arsenal", basePrice: 59 },
    { name: "Roy Keane", year: 1999, team: "Manchester United", basePrice: 57 },
    { name: "Xabi Alonso", year: 2014, team: "Bayern Munich", basePrice: 55 },
    { name: "Javier Mascherano", year: 2010, team: "Barcelona", basePrice: 53 },
    { name: "Edgar Davids", year: 1996, team: "Ajax", basePrice: 51 },
    { name: "Declan Rice", year: 2023, team: "Arsenal", basePrice: 58 },
    { name: "Aurélien Tchouaméni", year: 2023, team: "Real Madrid", basePrice: 55 },
    { name: "Joshua Kimmich", year: 2021, team: "Bayern Munich", basePrice: 56 },
    { name: "Nemanja Matić", year: 2015, team: "Chelsea", basePrice: 48 },
    { name: "Fernandinho", year: 2019, team: "Manchester City", basePrice: 50 },
    { name: "Michael Essien", year: 2007, team: "Chelsea", basePrice: 52 },
    { name: "Fernando Redondo", year: 1995, team: "Real Madrid", basePrice: 54 },
    { name: "Daniele De Rossi", year: 2009, team: "Roma", basePrice: 49 },
    { name: "Wilfred Ndidi", year: 2020, team: "Leicester City", basePrice: 46 }
  ],
  CM: [
    { name: "Zinedine Zidane", year: 2002, team: "Real Madrid", basePrice: 75 },
    { name: "Xavi Hernández", year: 2011, team: "Barcelona", basePrice: 72 },
    { name: "Andrés Iniesta", year: 2010, team: "Barcelona", basePrice: 73 },
    { name: "Luka Modrić", year: 2018, team: "Real Madrid", basePrice: 70 },
    { name: "Kevin De Bruyne", year: 2023, team: "Manchester City", basePrice: 78 },
    { name: "Andrea Pirlo", year: 2012, team: "Juventus", basePrice: 68 },
    { name: "Paul Scholes", year: 2003, team: "Manchester United", basePrice: 66 },
    { name: "Frank Lampard", year: 2005, team: "Chelsea", basePrice: 67 },
    { name: "Steven Gerrard", year: 2005, team: "Liverpool", basePrice: 69 },
    { name: "Toni Kroos", year: 2017, team: "Real Madrid", basePrice: 65 },
    { name: "Jude Bellingham", year: 2024, team: "Real Madrid", basePrice: 74 },
    { name: "Bruno Fernandes", year: 2021, team: "Manchester United", basePrice: 64 },
    { name: "Frenkie de Jong", year: 2022, team: "Barcelona", basePrice: 63 },
    { name: "Pedri", year: 2023, team: "Barcelona", basePrice: 66 },
    { name: "Gavi", year: 2023, team: "Barcelona", basePrice: 62 },
    { name: "Martin Ødegaard", year: 2023, team: "Arsenal", basePrice: 65 },
    { name: "Ilkay Gündoğan", year: 2019, team: "Manchester City", basePrice: 61 },
    { name: "Thiago Alcântara", year: 2020, team: "Bayern Munich", basePrice: 64 },
    { name: "Arturo Vidal", year: 2015, team: "Juventus", basePrice: 60 },
    { name: "Bastian Schweinsteiger", year: 2013, team: "Bayern Munich", basePrice: 63 }
  ],
  CAM: [
    { name: "Diego Maradona", year: 1986, team: "Napoli", basePrice: 95 },
    { name: "Pelé", year: 1970, team: "Santos", basePrice: 98 },
    { name: "Johan Cruyff", year: 1974, team: "Ajax", basePrice: 92 },
    { name: "Ronaldinho", year: 2005, team: "Barcelona", basePrice: 85 },
    { name: "Kaká", year: 2007, team: "AC Milan", basePrice: 82 },
    { name: "Mesut Özil", year: 2013, team: "Real Madrid", basePrice: 68 },
    { name: "Juan Román Riquelme", year: 2005, team: "Villarreal", basePrice: 70 },
    { name: "Zinedine Zidane", year: 1998, team: "Juventus", basePrice: 80 },
    { name: "Michael Laudrup", year: 1992, team: "Barcelona", basePrice: 75 },
    { name: "Francesco Totti", year: 2007, team: "Roma", basePrice: 72 },
    { name: "James Rodríguez", year: 2014, team: "Real Madrid", basePrice: 69 },
    { name: "Philippe Coutinho", year: 2017, team: "Liverpool", basePrice: 66 },
    { name: "Christian Eriksen", year: 2017, team: "Tottenham", basePrice: 65 },
    { name: "David Silva", year: 2018, team: "Manchester City", basePrice: 71 },
    { name: "Kevin De Bruyne", year: 2020, team: "Manchester City", basePrice: 77 },
    { name: "Wesley Sneijder", year: 2010, team: "Inter Milan", basePrice: 68 },
    { name: "Pavel Nedvěd", year: 2003, team: "Juventus", basePrice: 73 },
    { name: "Deco", year: 2004, team: "Porto", basePrice: 67 },
    { name: "Rivaldo", year: 1999, team: "Barcelona", basePrice: 78 },
    { name: "Zico", year: 1981, team: "Flamengo", basePrice: 83 }
  ],
  LW: [
    { name: "Cristiano Ronaldo", year: 2008, team: "Manchester United", basePrice: 88 },
    { name: "Ronaldo Nazário", year: 1997, team: "Barcelona", basePrice: 90 },
    { name: "Thierry Henry", year: 2004, team: "Arsenal", basePrice: 82 },
    { name: "Neymar Jr", year: 2015, team: "Barcelona", basePrice: 85 },
    { name: "Eden Hazard", year: 2015, team: "Chelsea", basePrice: 78 },
    { name: "Raheem Sterling", year: 2019, team: "Manchester City", basePrice: 72 },
    { name: "Sadio Mané", year: 2019, team: "Liverpool", basePrice: 75 },
    { name: "Arjen Robben", year: 2013, team: "Bayern Munich", basePrice: 77 },
    { name: "Ryan Giggs", year: 1999, team: "Manchester United", basePrice: 70 },
    { name: "Rivaldo", year: 2002, team: "Barcelona", basePrice: 79 },
    { name: "Gareth Bale", year: 2013, team: "Tottenham", basePrice: 76 },
    { name: "Son Heung-min", year: 2022, team: "Tottenham", basePrice: 74 },
    { name: "Vinicius Jr", year: 2024, team: "Real Madrid", basePrice: 83 },
    { name: "Marcus Rashford", year: 2023, team: "Manchester United", basePrice: 71 },
    { name: "Leroy Sané", year: 2019, team: "Manchester City", basePrice: 69 },
    { name: "Franck Ribéry", year: 2013, team: "Bayern Munich", basePrice: 75 },
    { name: "Alexis Sánchez", year: 2015, team: "Arsenal", basePrice: 73 },
    { name: "David Villa", year: 2010, team: "Valencia", basePrice: 76 },
    { name: "Luis Figo", year: 2001, team: "Real Madrid", basePrice: 80 },
    { name: "George Best", year: 1968, team: "Manchester United", basePrice: 84 }
  ],
  RW: [
    { name: "Lionel Messi", year: 2012, team: "Barcelona", basePrice: 100 },
    { name: "Cristiano Ronaldo", year: 2014, team: "Real Madrid", basePrice: 95 },
    { name: "Mohamed Salah", year: 2018, team: "Liverpool", basePrice: 82 },
    { name: "Arjen Robben", year: 2010, team: "Bayern Munich", basePrice: 78 },
    { name: "Gareth Bale", year: 2016, team: "Real Madrid", basePrice: 80 },
    { name: "Bernardo Silva", year: 2023, team: "Manchester City", basePrice: 75 },
    { name: "Riyad Mahrez", year: 2019, team: "Manchester City", basePrice: 72 },
    { name: "Bukayo Saka", year: 2023, team: "Arsenal", basePrice: 76 },
    { name: "Phil Foden", year: 2023, team: "Manchester City", basePrice: 77 },
    { name: "Serge Gnabry", year: 2020, team: "Bayern Munich", basePrice: 70 },
    { name: "Ángel Di María", year: 2014, team: "Real Madrid", basePrice: 74 },
    { name: "David Beckham", year: 1999, team: "Manchester United", basePrice: 73 },
    { name: "Luís Figo", year: 2000, team: "Barcelona", basePrice: 81 },
    { name: "Andriy Shevchenko", year: 2004, team: "AC Milan", basePrice: 79 },
    { name: "Pavel Nedvěd", year: 2005, team: "Juventus", basePrice: 75 },
    { name: "Jadon Sancho", year: 2020, team: "Borussia Dortmund", basePrice: 71 },
    { name: "Ousmane Dembélé", year: 2023, team: "PSG", basePrice: 69 },
    { name: "Kingsley Coman", year: 2020, team: "Bayern Munich", basePrice: 68 },
    { name: "Rodrygo", year: 2024, team: "Real Madrid", basePrice: 72 },
    { name: "Raphinha", year: 2023, team: "Barcelona", basePrice: 67 }
  ],
  ST: [
    { name: "Ronaldo Nazário", year: 2002, team: "Real Madrid", basePrice: 92 },
    { name: "Lionel Messi", year: 2019, team: "Barcelona", basePrice: 98 },
    { name: "Cristiano Ronaldo", year: 2017, team: "Real Madrid", basePrice: 93 },
    { name: "Erling Haaland", year: 2023, team: "Manchester City", basePrice: 90 },
    { name: "Robert Lewandowski", year: 2020, team: "Bayern Munich", basePrice: 88 },
    { name: "Karim Benzema", year: 2022, team: "Real Madrid", basePrice: 86 },
    { name: "Luis Suárez", year: 2016, team: "Barcelona", basePrice: 85 },
    { name: "Zlatan Ibrahimović", year: 2012, team: "PSG", basePrice: 82 },
    { name: "Thierry Henry", year: 2003, team: "Arsenal", basePrice: 84 },
    { name: "Sergio Agüero", year: 2012, team: "Manchester City", basePrice: 80 },
    { name: "Harry Kane", year: 2018, team: "Tottenham", basePrice: 83 },
    { name: "Kylian Mbappé", year: 2023, team: "PSG", basePrice: 94 },
    { name: "Romário", year: 1994, team: "Barcelona", basePrice: 87 },
    { name: "Marco van Basten", year: 1989, team: "AC Milan", basePrice: 89 },
    { name: "Gerd Müller", year: 1972, team: "Bayern Munich", basePrice: 86 },
    { name: "Alan Shearer", year: 1995, team: "Blackburn", basePrice: 78 },
    { name: "Wayne Rooney", year: 2010, team: "Manchester United", basePrice: 81 },
    { name: "Didier Drogba", year: 2010, team: "Chelsea", basePrice: 79 },
    { name: "Samuel Eto'o", year: 2009, team: "Barcelona", basePrice: 80 },
    { name: "Raúl González", year: 2001, team: "Real Madrid", basePrice: 83 },
    { name: "Fernando Torres", year: 2008, team: "Liverpool", basePrice: 77 },
    { name: "Edinson Cavani", year: 2017, team: "PSG", basePrice: 76 },
    { name: "Diego Costa", year: 2014, team: "Atlético Madrid", basePrice: 75 },
    { name: "Robin van Persie", year: 2013, team: "Manchester United", basePrice: 78 }
  ]
};

const FORMATIONS = {
  '4-3-3': { GK: 1, LB: 1, CB: 2, RB: 1, CDM: 1, CM: 2, LW: 1, RW: 1, ST: 1 },
  '4-4-2': { GK: 1, LB: 1, CB: 2, RB: 1, CDM: 2, CM: 2, LW: 0, RW: 0, ST: 2 },
  '4-2-3-1': { GK: 1, LB: 1, CB: 2, RB: 1, CDM: 2, CM: 0, CAM: 3, LW: 0, RW: 0, ST: 1 },
  '3-5-2': { GK: 1, LB: 1, CB: 3, RB: 1, CDM: 1, CM: 2, CAM: 1, LW: 0, RW: 0, ST: 2 },
  '4-1-4-1': { GK: 1, LB: 1, CB: 2, RB: 1, CDM: 1, CM: 2, LW: 1, RW: 1, ST: 1 }
};

const POSITION_ORDER = ['GK', 'LB', 'CB', 'RB', 'CDM', 'CM', 'CAM', 'LW', 'RW', 'ST'];

function App() {
  const [screen, setScreen] = useState('menu');
  const [roomCode, setRoomCode] = useState('');
  const [username, setUsername] = useState('');
  const [gameConfig, setGameConfig] = useState({
    maxPlayers: 4,
    budget: 1000,
    formation: '4-3-3',
    maxSkips: 2
  });
  
  // Estado del juego
  const [room, setRoom] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [currentAuction, setCurrentAuction] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [timer, setTimer] = useState(0);
  const [biddingTimer, setBiddingTimer] = useState(5);
  const [currentBidder, setCurrentBidder] = useState(null);
  const [votingResults, setVotingResults] = useState(null);
  const [copied, setCopied] = useState(false);
  
  const chatEndRef = useRef(null);
  const timerRef = useRef(null);
  const biddingTimerRef = useRef(null);

  // Cargar datos del storage al iniciar
  useEffect(() => {
    loadStorageData();
  }, []);

  const loadStorageData = async () => {
    try {
      const roomsResult = await window.storage.list('room:', true);
      if (roomsResult && roomsResult.keys.length > 0) {
        // Cargar la última sala activa
        const lastRoomKey = roomsResult.keys[roomsResult.keys.length - 1];
        const roomData = await window.storage.get(lastRoomKey, true);
        if (roomData) {
          const parsedRoom = JSON.parse(roomData.value);
          if (parsedRoom.status !== 'finished') {
            setRoom(parsedRoom);
          }
        }
      }
    } catch (error) {
      console.log('No hay datos previos en storage');
    }
  };

  const saveToStorage = async (key, data, shared = true) => {
    try {
      await window.storage.set(key, JSON.stringify(data), shared);
    } catch (error) {
      console.error('Error guardando en storage:', error);
    }
  };

  const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const createRoom = async () => {
    if (!username.trim()) {
      alert('Por favor ingresa tu nombre de usuario');
      return;
    }

    const code = generateRoomCode();
    const newRoom = {
      code,
      host: username,
      config: gameConfig,
      players: [{
        id: Date.now().toString(),
        name: username,
        budget: gameConfig.budget,
        skipsLeft: gameConfig.maxSkips,
        team: {},
        isReady: false
      }],
      status: 'waiting',
      currentPosition: null,
      currentPositionIndex: 0,
      availablePlayers: {},
      messages: []
    };

    await saveToStorage(`room:${code}`, newRoom, true);
    setRoom(newRoom);
    setRoomCode(code);
    setCurrentPlayer(newRoom.players[0]);
    setPlayers(newRoom.players);
    setScreen('lobby');
  };

  const joinRoom = async () => {
    if (!username.trim() || !roomCode.trim()) {
      alert('Por favor ingresa tu nombre y el código de sala');
      return;
    }

    try {
      const roomData = await window.storage.get(`room:${roomCode.toUpperCase()}`, true);
      if (!roomData) {
        alert('Sala no encontrada');
        return;
      }

      const existingRoom = JSON.parse(roomData.value);

      if (existingRoom.players.length >= existingRoom.config.maxPlayers) {
        alert('La sala está llena');
        return;
      }

      if (existingRoom.status !== 'waiting') {
        alert('La partida ya comenzó');
        return;
      }

      const newPlayer = {
        id: Date.now().toString(),
        name: username,
        budget: existingRoom.config.budget,
        skipsLeft: existingRoom.config.maxSkips,
        team: {},
        isReady: false
      };

      existingRoom.players.push(newPlayer);
      await saveToStorage(`room:${roomCode.toUpperCase()}`, existingRoom, true);

      setRoom(existingRoom);
      setCurrentPlayer(newPlayer);
      setPlayers(existingRoom.players);
      setScreen('lobby');
    } catch (error) {
      alert('Error al unirse a la sala');
      console.error(error);
    }
  };

  const toggleReady = async () => {
    if (!room || !currentPlayer) return;

    const updatedPlayers = room.players.map(p => 
      p.id === currentPlayer.id ? { ...p, isReady: !p.isReady } : p
    );

    const updatedRoom = { ...room, players: updatedPlayers };
    await saveToStorage(`room:${room.code}`, updatedRoom, true);

    setRoom(updatedRoom);
    setPlayers(updatedPlayers);
    setCurrentPlayer({ ...currentPlayer, isReady: !currentPlayer.isReady });
  };

  const startGame = async () => {
    if (room.host !== currentPlayer.name) {
      alert('Solo el host puede iniciar la partida');
      return;
    }

    const allReady = room.players.every(p => p.isReady);
    if (!allReady) {
      alert('Todos los jugadores deben estar listos');
      return;
    }

    // Generar orden de posiciones según la formación
    const positionsNeeded = [];
    const formation = FORMATIONS[room.config.formation];
    
    POSITION_ORDER.forEach(pos => {
      if (formation[pos]) {
        for (let i = 0; i < formation[pos]; i++) {
          positionsNeeded.push(pos);
        }
      }
    });

    // Preparar jugadores disponibles para cada posición
    const availablePlayers = {};
    positionsNeeded.forEach(pos => {
      if (!availablePlayers[pos]) {
        const allPlayersInPosition = [...PLAYERS_DATABASE[pos]];
        // Mezclar aleatoriamente
        for (let i = allPlayersInPosition.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [allPlayersInPosition[i], allPlayersInPosition[j]] = [allPlayersInPosition[j], allPlayersInPosition[i]];
        }
        availablePlayers[pos] = allPlayersInPosition;
      }
    });

    const updatedRoom = {
      ...room,
      status: 'playing',
      positionsNeeded,
      currentPositionIndex: 0,
      currentPosition: positionsNeeded[0],
      availablePlayers
    };

    await saveToStorage(`room:${room.code}`, updatedRoom, true);
    setRoom(updatedRoom);
    setScreen('game');
    startNewAuction(updatedRoom);
  };

  const startNewAuction = (gameRoom) => {
    const pos = gameRoom.currentPosition;
    const availableForPos = gameRoom.availablePlayers[pos];
    
    if (!availableForPos || availableForPos.length === 0) return;

    const player = availableForPos[0];
    const adjustedPrice = Math.round(player.basePrice * (gameRoom.config.budget / 1000));

    const auction = {
      player,
      position: pos,
      currentPrice: adjustedPrice,
      highestBidder: null,
      skips: 0
    };

    setCurrentAuction(auction);
    setCurrentBidder(null);
    setBiddingTimer(5);
  };

  const placeBid = async () => {
    if (!currentAuction || !currentPlayer || !room) return;

    const newPrice = currentAuction.currentPrice + 5;

    if (currentPlayer.budget < newPrice) {
      alert('No tienes suficiente presupuesto');
      return;
    }

    setCurrentAuction({
      ...currentAuction,
      currentPrice: newPrice,
      highestBidder: currentPlayer.name
    });

    setCurrentBidder(currentPlayer.name);
    setBiddingTimer(5);

    addChatMessage(`💰 ${currentPlayer.name} oferta ${newPrice}M`);
  };

  const skipPlayer = async () => {
    if (!currentPlayer || !room) return;

    if (currentPlayer.skipsLeft <= 0) {
      alert('No te quedan skips');
      return;
    }

    const updatedAuction = {
      ...currentAuction,
      skips: currentAuction.skips + 1
    };

    setCurrentAuction(updatedAuction);

    const updatedCurrentPlayer = {
      ...currentPlayer,
      skipsLeft: currentPlayer.skipsLeft - 1
    };
    setCurrentPlayer(updatedCurrentPlayer);

    addChatMessage(`⏭️ ${currentPlayer.name} vota skip (${updatedAuction.skips}/${room.players.length})`);

    if (updatedAuction.skips >= room.players.length) {
      nextPlayerInAuction();
    }
  };

  useEffect(() => {
    if (currentAuction && currentBidder && biddingTimer > 0) {
      biddingTimerRef.current = setTimeout(() => {
        setBiddingTimer(prev => prev - 1);
      }, 1000);
    } else if (currentAuction && currentBidder && biddingTimer === 0) {
      assignPlayerToWinner();
    }

    return () => {
      if (biddingTimerRef.current) clearTimeout(biddingTimerRef.current);
    };
  }, [biddingTimer, currentBidder]);

  const assignPlayerToWinner = async () => {
    if (!currentAuction || !currentBidder || !room) return;

    const winnerPlayer = room.players.find(p => p.name === currentBidder);
    if (!winnerPlayer) return;

    const posKey = `${currentAuction.position}_${Object.keys(winnerPlayer.team).filter(k => k.startsWith(currentAuction.position)).length}`;
    
    winnerPlayer.team[posKey] = {
      ...currentAuction.player,
      pricePaid: currentAuction.currentPrice
    };
    winnerPlayer.budget -= currentAuction.currentPrice;

    addChatMessage(`✅ ${currentBidder} consigue ${currentAuction.player.name} (${currentAuction.player.year}) por ${currentAuction.currentPrice}M`);

    // Actualizar jugadores
    const updatedPlayers = room.players.map(p => 
      p.id === winnerPlayer.id ? winnerPlayer : p
    );

    if (currentPlayer.id === winnerPlayer.id) {
      setCurrentPlayer(winnerPlayer);
    }

    const updatedRoom = { ...room, players: updatedPlayers };
    setRoom(updatedRoom);
    setPlayers(updatedPlayers);

    await saveToStorage(`room:${room.code}`, updatedRoom, true);

    setTimeout(() => {
      nextPlayerInAuction();
    }, 2000);
  };

  const nextPlayerInAuction = async () => {
    if (!room) return;

    // Remover jugador usado
    const updatedAvailable = { ...room.availablePlayers };
    updatedAvailable[room.currentPosition] = updatedAvailable[room.currentPosition].slice(1);

    // Verificar si todos completaron esta posición
    const allComplete = room.players.every(p => {
      const keysForPos = Object.keys(p.team).filter(k => k.startsWith(room.currentPosition));
      const formation = FORMATIONS[room.config.formation];
      return keysForPos.length >= (formation[room.currentPosition] || 0);
    });

    if (allComplete) {
      // Pasar a la siguiente posición
      const nextIndex = room.currentPositionIndex + 1;
      
      if (nextIndex >= room.positionsNeeded.length) {
        // Juego terminado
        const updatedRoom = {
          ...room,
          status: 'voting',
          availablePlayers: updatedAvailable
        };
        
        await saveToStorage(`room:${room.code}`, updatedRoom, true);
        setRoom(updatedRoom);
        setScreen('voting');
        setTimer(300); // 5 minutos para debatir
        return;
      }

      const updatedRoom = {
        ...room,
        currentPositionIndex: nextIndex,
        currentPosition: room.positionsNeeded[nextIndex],
        availablePlayers: updatedAvailable
      };

      await saveToStorage(`room:${room.code}`, updatedRoom, true);
      setRoom(updatedRoom);
      startNewAuction(updatedRoom);
    } else {
      // Continuar con el siguiente jugador en esta posición
      const updatedRoom = {
        ...room,
        availablePlayers: updatedAvailable
      };

      await saveToStorage(`room:${room.code}`, updatedRoom, true);
      setRoom(updatedRoom);
      startNewAuction(updatedRoom);
    }
  };

  const addChatMessage = (message) => {
    const newMessage = {
      id: Date.now(),
      sender: typeof message === 'string' ? 'Sistema' : currentPlayer?.name || 'Anónimo',
      text: typeof message === 'string' ? message : message,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages(prev => [...prev, newMessage]);
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;

    addChatMessage({
      sender: currentPlayer.name,
      text: chatInput
    });

    setChatInput('');
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  useEffect(() => {
    if (screen === 'voting' && timer > 0) {
      timerRef.current = setTimeout(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (screen === 'voting' && timer === 0) {
      setScreen('finalVoting');
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timer, screen]);

  const voteForPlayer = async (position, playerName) => {
    if (!room || !currentPlayer) return;

    const voteKey = `vote:${room.code}:${currentPlayer.id}:${position}`;
    await saveToStorage(voteKey, { player: playerName, position }, true);

    alert(`Votaste por ${playerName} en ${position}`);
  };

  const finishVoting = async () => {
    if (!room) return;

    try {
      const votesResult = await window.storage.list(`vote:${room.code}:`, true);
      const scores = {};
      
      room.players.forEach(p => {
        scores[p.name] = 0;
      });

      if (votesResult && votesResult.keys) {
        for (const key of votesResult.keys) {
          const voteData = await window.storage.get(key, true);
          if (voteData) {
            const vote = JSON.parse(voteData.value);
            if (scores.hasOwnProperty(vote.player)) {
              scores[vote.player]++;
            }
          }
        }
      }

      const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      setVotingResults(sortedScores);
      setScreen('results');

      const updatedRoom = { ...room, status: 'finished', finalScores: sortedScores };
      await saveToStorage(`room:${room.code}`, updatedRoom, true);
    } catch (error) {
      console.error('Error calculando votos:', error);
    }
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // PANTALLA MENÚ
  if (screen === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Subasta Futbolera</h1>
            <p className="text-gray-600">Crea el mejor equipo de la historia</p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Tu nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            />

            <button
              onClick={() => setScreen('create')}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <Settings className="w-5 h-5" />
              Crear Partida
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">o</span>
              </div>
            </div>

            <input
              type="text"
              placeholder="Código de sala"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none uppercase"
              maxLength={6}
            />

            <button
              onClick={joinRoom}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Unirse a Partida
            </button>
          </div>
        </div>
      </div>
    );
  }

  // PANTALLA CREAR PARTIDA
  if (screen === 'create') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Configurar Partida</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Número de Jugadores</label>
              <select
                value={gameConfig.maxPlayers}
                onChange={(e) => setGameConfig({ ...gameConfig, maxPlayers: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              >
                {[2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map(n => (
                  <option key={n} value={n}>{n} jugadores</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Presupuesto (Millones)</label>
              <select
                value={gameConfig.budget}
                onChange={(e) => setGameConfig({ ...gameConfig, budget: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              >
                {[500, 750, 1000, 1500, 2000, 3000].map(b => (
                  <option key={b} value={b}>${b}M</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Formación</label>
              <select
                value={gameConfig.formation}
                onChange={(e) => setGameConfig({ ...gameConfig, formation: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              >
                {Object.keys(FORMATIONS).map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skips por Jugador</label>
              <select
                value={gameConfig.maxSkips}
                onChange={(e) => setGameConfig({ ...gameConfig, maxSkips: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              >
                {[1, 2, 3, 4, 5].map(s => (
                  <option key={s} value={s}>{s} skips</option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 pt-4">
              <button
                onClick={() => setScreen('menu')}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
              >
                Volver
              </button>
              <button
                onClick={createRoom}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
              >
                Crear Sala
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // PANTALLA LOBBY
  if (screen === 'lobby') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Sala de Espera</h2>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-gray-600">Código:</span>
                <code className="text-2xl font-mono font-bold text-green-600">{room?.code}</code>
                <button
                  onClick={copyRoomCode}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  title="Copiar código"
                >
                  {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-gray-600" />}
                </button>
              </div>
              <p className="text-sm text-gray-500">Comparte este código con tus amigos</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Configuración
                </h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Jugadores:</span> {players.length}/{room?.config.maxPlayers}</p>
                  <p><span className="font-medium">Presupuesto:</span> ${room?.config.budget}M</p>
                  <p><span className="font-medium">Formación:</span> {room?.config.formation}</p>
                  <p><span className="font-medium">Skips:</span> {room?.config.maxSkips}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Jugadores
                </h3>
                <div className="space-y-2">
                  {players.map(player => (
                    <div key={player.id} className="flex items-center justify-between">
                      <span className="text-sm">
                        {player.name}
                        {player.name === room?.host && ' 👑'}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${player.isReady ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                        {player.isReady ? 'Listo' : 'Esperando'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={toggleReady}
                className={`flex-1 font-bold py-3 rounded-lg transition ${
                  currentPlayer?.isReady
                    ? 'bg-gray-500 hover:bg-gray-600 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {currentPlayer?.isReady ? 'No Estoy Listo' : 'Estoy Listo'}
              </button>

              {room?.host === currentPlayer?.name && (
                <button
                  onClick={startGame}
                  disabled={!players.every(p => p.isReady)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Iniciar Partida
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // PANTALLA DE JUEGO
  if (screen === 'game') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 p-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-4">
          {/* Panel Principal */}
          <div className="lg:col-span-2 space-y-4">
            {/* Header */}
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Posición: {currentAuction?.position}</h3>
                  <p className="text-sm text-gray-600">Sala: {room?.code}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Tu presupuesto</p>
                  <p className="text-2xl font-bold text-green-600">${currentPlayer?.budget}M</p>
                  <p className="text-xs text-gray-500">Skips: {currentPlayer?.skipsLeft}</p>
                </div>
              </div>
            </div>

            {/* Carta del Jugador */}
            {currentAuction && (
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <div className="text-center mb-6">
                  <div className="inline-block bg-gradient-to-br from-yellow-400 to-yellow-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
                    {currentAuction.position}
                  </div>
                  <h2 className="text-4xl font-bold text-gray-800 mb-2">{currentAuction.player.name}</h2>
                  <p className="text-xl text-gray-600">{currentAuction.player.team} • {currentAuction.player.year}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Precio Actual</p>
                    <p className="text-5xl font-bold text-green-600">${currentAuction.currentPrice}M</p>
                    {currentBidder && (
                      <>
                        <p className="text-sm text-gray-600 mt-4">Oferta de: {currentBidder}</p>
                        <p className="text-3xl font-bold text-red-600 mt-2">{biddingTimer}s</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={placeBid}
                    disabled={currentPlayer?.budget < currentAuction.currentPrice + 5}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-lg transition text-lg"
                  >
                    Ofertar ${currentAuction.currentPrice + 5}M
                  </button>
                  <button
                    onClick={skipPlayer}
                    disabled={currentPlayer?.skipsLeft === 0}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-lg transition text-lg"
                  >
                    Skip ({currentAuction.skips}/{room?.players.length})
                  </button>
                </div>
              </div>
            )}

            {/* Tu Equipo */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Tu Equipo Actual</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(currentPlayer?.team || {}).map(([key, player]) => (
                  <div key={key} className="bg-gray-50 p-3 rounded-lg border-2 border-gray-200">
                    <p className="text-xs text-gray-600 font-medium">{key.split('_')[0]}</p>
                    <p className="font-bold text-sm text-gray-800">{player.name}</p>
                    <p className="text-xs text-gray-500">{player.year}</p>
                    <p className="text-xs text-green-600 font-bold">${player.pricePaid}M</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Panel Lateral */}
          <div className="space-y-4">
            {/* Otros Jugadores */}
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Jugadores
              </h3>
              <div className="space-y-2">
                {players.map(player => (
                  <div key={player.id} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-sm">{player.name}</p>
                        <p className="text-xs text-gray-600">${player.budget}M</p>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {Object.keys(player.team).length} jugadores
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat */}
            <div className="bg-white rounded-lg p-4 shadow-lg h-96 flex flex-col">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Chat
              </h3>
              <div className="flex-1 overflow-y-auto mb-3 space-y-2">
                {chatMessages.map(msg => (
                  <div key={msg.id} className="text-sm">
                    <span className="font-bold text-gray-700">{msg.sender}:</span>
                    <span className="text-gray-600 ml-1">{msg.text}</span>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500"
                />
                <button
                  onClick={sendMessage}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // PANTALLA DE VOTACIÓN (DEBATE)
  if (screen === 'voting') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
            <div className="text-center mb-8">
              <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
              <h2 className="text-4xl font-bold text-gray-800 mb-2">¡Debate Final!</h2>
              <div className="flex items-center justify-center gap-2 text-2xl font-bold text-red-600">
                <Clock className="w-6 h-6" />
                {formatTime(timer)}
              </div>
              <p className="text-gray-600 mt-2">Tiempo para debatir quién tiene el mejor equipo</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {players.map(player => (
                <div key={player.id} className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{player.name}</h3>
                  <div className="space-y-2">
                    {Object.entries(player.team).map(([key, p]) => (
                      <div key={key} className="bg-white p-3 rounded-lg shadow-sm">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xs text-gray-600 font-medium">{key.split('_')[0]}</p>
                            <p className="font-bold text-sm">{p.name}</p>
                            <p className="text-xs text-gray-500">{p.team} ({p.year})</p>
                          </div>
                          <p className="text-xs text-green-600 font-bold">${p.pricePaid}M</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <p className="text-sm text-gray-600">Gastado: ${room?.config.budget - player.budget}M</p>
                    <p className="text-sm text-gray-600">Restante: ${player.budget}M</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat para debate */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Chat de Debate
            </h3>
            <div className="h-64 overflow-y-auto mb-4 bg-gray-50 rounded-lg p-4 space-y-2">
              {chatMessages.map(msg => (
                <div key={msg.id} className="text-sm">
                  <span className="font-bold text-gray-700">{msg.sender}:</span>
                  <span className="text-gray-600 ml-1">{msg.text}</span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Debate sobre los equipos..."
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              />
              <button
                onClick={sendMessage}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition"
              >
                Enviar
              </button>
            </div>

            {timer === 0 && (
              <button
                onClick={() => setScreen('finalVoting')}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
              >
                Continuar a Votación
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // PANTALLA DE VOTACIÓN FINAL
  if (screen === 'finalVoting') {
    const positions = [...new Set(Object.keys(players[0]?.team || {}).map(k => k.split('_')[0]))];

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Votación Final</h2>
              <p className="text-gray-600">Vota por el mejor jugador en cada posición</p>
            </div>

            <div className="space-y-6">
              {positions.map(position => (
                <div key={position} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{position}</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {players.map(player => {
                      const playerInPosition = Object.entries(player.team).find(([k]) => k.startsWith(position));
                      if (!playerInPosition) return null;
                      const [, p] = playerInPosition;

                      return (
                        <button
                          key={player.id}
                          onClick={() => voteForPlayer(position, player.name)}
                          className="bg-white hover:bg-green-50 border-2 border-gray-200 hover:border-green-500 rounded-lg p-4 text-left transition"
                        >
                          <p className="text-xs text-gray-600 mb-1">{player.name}</p>
                          <p className="font-bold text-gray-800">{p.name}</p>
                          <p className="text-sm text-gray-500">{p.team} ({p.year})</p>
                          <p className="text-sm text-green-600 font-bold mt-2">${p.pricePaid}M</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={finishVoting}
              className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition text-lg"
            >
              Finalizar y Ver Resultados
            </button>
          </div>
        </div>
      </div>
    );
  }

  // PANTALLA DE RESULTADOS
  if (screen === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <Trophy className="w-20 h-20 mx-auto text-yellow-500 mb-4" />
              <h2 className="text-5xl font-bold text-gray-800 mb-4">¡Resultados Finales!</h2>
            </div>

            <div className="space-y-4 mb-8">
              {votingResults?.map(([name, score], index) => (
                <div
                  key={name}
                  className={`flex items-center justify-between p-6 rounded-lg ${
                    index === 0
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white'
                      : index === 1
                      ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800'
                      : index === 2
                      ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold">#{index + 1}</span>
                    <div>
                      <p className="text-2xl font-bold">{name}</p>
                      <p className={index < 3 ? 'text-white/80' : 'text-gray-600'}>
                        {score} votos
                      </p>
                    </div>
                  </div>
                  {index === 0 && <Trophy className="w-12 h-12" />}
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setScreen('menu');
                  setRoom(null);
                  setPlayers([]);
                  setCurrentPlayer(null);
                  setVotingResults(null);
                  setChatMessages([]);
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 rounded-lg transition"
              >
                Volver al Menú
              </button>
              <button
                onClick={() => {
                  const winnerName = votingResults[0][0];
                  const winner = players.find(p => p.name === winnerName);
                  if (winner) {
                    alert(`¡Felicidades ${winnerName}! Tu equipo:\n\n${Object.entries(winner.team).map(([k, p]) => `${k}: ${p.name} (${p.year})`).join('\n')}`);
                  }
                }}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition"
              >
                Ver Equipo Ganador
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;
