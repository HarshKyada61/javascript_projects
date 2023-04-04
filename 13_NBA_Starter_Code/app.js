const warriorsGames = [{
    awayTeam: {
      team: 'Golden State',
      points: 119,
      isWinner: true
    },
    homeTeam: {
      team: 'Houston',
      points: 106,
      isWinner: false
    }
  },
  {
    awayTeam: {
      team: 'Golden State',
      points: 105,
      isWinner: false
    },
    homeTeam: {
      team: 'Houston',
      points: 127,
      isWinner: true
    }
  },
  {
    homeTeam: {
      team: 'Golden State',
      points: 126,
      isWinner: true
    },
    awayTeam: {
      team: 'Houston',
      points: 85,
      isWinner: false
    }
  },
  {
    homeTeam: {
      team: 'Golden State',
      points: 92,
      isWinner: false
    },
    awayTeam: {
      team: 'Houston',
      points: 95,
      isWinner: true
    }
  },
  {
    awayTeam: {
      team: 'Golden State',
      points: 94,
      isWinner: false
    },
    homeTeam: {
      team: 'Houston',
      points: 98,
      isWinner: true
    }
  },
  {
    homeTeam: {
      team: 'Golden State',
      points: 115,
      isWinner: true
    },
    awayTeam: {
      team: 'Houston',
      points: 86,
      isWinner: false
    }
  },
  {
    awayTeam: {
      team: 'Golden State',
      points: 101,
      isWinner: true
    },
    homeTeam: {
      team: 'Houston',
      points: 92,
      isWinner: false
    }
  }
]

const makeChart = (games, targetTeam) => {
  const parentUl = document.createElement('ul');
  for(let game of games){
    const gameLi = document.createElement('li');
    gameLi.innerHTML = gameScore(game);
    gameLi.classList.add(isWinner(game, targetTeam) ? 'win' : 'loss');
    parentUl.append(gameLi);
  }
  return parentUl;
}

const isWinner = ({homeTeam, awayTeam}, targetTeam) => {
  const target = homeTeam.team === targetTeam ? homeTeam : awayTeam;
  return target.isWinner;
}

const gameScore = ({homeTeam,awayTeam}) => {
    const {team:hTeam, points:hPoints} = homeTeam;
    const {team:aTeam, points:aPoints} = awayTeam;
    const teamNames = `${aTeam} @ ${hTeam}`;
    let score;
    if (aPoints > hPoints){
    score = `<b>${aPoints}</b>-${hPoints}`;
    }
    else{
      score = `${aPoints}-<b>${hPoints}</b>`;
    };
    return  `${teamNames} ${score}`;
}


const gsSection = document.querySelector('#gs');
const hrSection = document.querySelector('#hr');
const gsChart = makeChart(warriorsGames, 'Golden State');
const hrCharts = makeChart(warriorsGames, 'Houston');

gsSection.append(gsChart);
hrSection.append(hrCharts);