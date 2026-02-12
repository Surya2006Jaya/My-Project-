// Data storage using localStorage
let teams = JSON.parse(localStorage.getItem('teams')) || [];
let players = JSON.parse(localStorage.getItem('players')) || [];
let matches = JSON.parse(localStorage.getItem('matches')) || [];
let scores = JSON.parse(localStorage.getItem('scores')) || [];

// Utility functions
function saveData() {
    localStorage.setItem('teams', JSON.stringify(teams));
    localStorage.setItem('players', JSON.stringify(players));
    localStorage.setItem('matches', JSON.stringify(matches));
    localStorage.setItem('scores', JSON.stringify(scores));
}

function updateDashboard() {
    document.getElementById('total-teams').textContent = teams.length;
    document.getElementById('total-players').textContent = players.length;
    document.getElementById('total-matches').textContent = matches.length;
}

// Teams functionality
function renderTeams() {
    const teamList = document.getElementById('team-list');
    teamList.innerHTML = '';
    teams.forEach((team, index) => {
        const li = document.createElement('li');
        li.textContent = team.name;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => {
            teams.splice(index, 1);
            saveData();
            renderTeams();
            updateDashboard();
        };
        li.appendChild(deleteBtn);
        teamList.appendChild(li);
    });
}

function addTeam(event) {
    event.preventDefault();
    const teamName = document.getElementById('team-name').value;
    if (teamName) {
        teams.push({ name: teamName });
        saveData();
        document.getElementById('team-name').value = '';
        renderTeams();
        updateDashboard();
    }
}

// Players functionality
function renderPlayers() {
    const playerList = document.getElementById('player-list');
    playerList.innerHTML = '';
    players.forEach((player, index) => {
        const li = document.createElement('li');
        li.textContent = `${player.name} (${player.team})`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => {
            players.splice(index, 1);
            saveData();
            renderPlayers();
            updateDashboard();
        };
        li.appendChild(deleteBtn);
        playerList.appendChild(li);
    });
}

function populateTeamSelect() {
    const selects = document.querySelectorAll('#player-team, #team1, #team2');
    selects.forEach(select => {
        select.innerHTML = '<option value="">Select Team</option>';
        teams.forEach(team => {
            const option = document.createElement('option');
            option.value = team.name;
            option.textContent = team.name;
            select.appendChild(option);
        });
    });
}

function addPlayer(event) {
    event.preventDefault();
    const playerName = document.getElementById('player-name').value;
    const playerTeam = document.getElementById('player-team').value;
    if (playerName && playerTeam) {
        players.push({ name: playerName, team: playerTeam });
        saveData();
        document.getElementById('player-name').value = '';
        document.getElementById('player-team').value = '';
        renderPlayers();
        updateDashboard();
    }
}

// Matches functionality
function renderMatches() {
    const matchList = document.getElementById('match-list');
    matchList.innerHTML = '';
    matches.forEach((match, index) => {
        const li = document.createElement('li');
        li.textContent = `${match.team1} vs ${match.team2} on ${match.date}`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => {
            matches.splice(index, 1);
            saveData();
            renderMatches();
            updateDashboard();
        };
        li.appendChild(deleteBtn);
        matchList.appendChild(li);
    });
}

function addMatch(event) {
    event.preventDefault();
    const team1 = document.getElementById('team1').value;
    const team2 = document.getElementById('team2').value;
    const date = document.getElementById('match-date').value;
    if (team1 && team2 && date && team1 !== team2) {
        matches.push({ team1, team2, date });
        saveData();
        document.getElementById('team1').value = '';
        document.getElementById('team2').value = '';
        document.getElementById('match-date').value = '';
        renderMatches();
        updateDashboard();
    }
}

// Scores functionality
function renderScores() {
    const scoreList = document.getElementById('score-list');
    scoreList.innerHTML = '';
    scores.forEach((score, index) => {
        const li = document.createElement('li');
        li.textContent = `${score.match} - ${score.team1Score} : ${score.team2Score}`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => {
            scores.splice(index, 1);
            saveData();
            renderScores();
        };
        li.appendChild(deleteBtn);
        scoreList.appendChild(li);
    });
}

function populateMatchSelect() {
    const matchSelect = document.getElementById('match-select');
    matchSelect.innerHTML = '<option value="">Select Match</option>';
    matches.forEach((match, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${match.team1} vs ${match.team2} on ${match.date}`;
        matchSelect.appendChild(option);
    });
}

function addScore(event) {
    event.preventDefault();
    const matchIndex = document.getElementById('match-select').value;
    const team1Score = document.getElementById('team1-score').value;
    const team2Score = document.getElementById('team2-score').value;
    if (matchIndex !== '' && team1Score && team2Score) {
        const match = matches[matchIndex];
        scores.push({
            match: `${match.team1} vs ${match.team2}`,
            team1Score: parseInt(team1Score),
            team2Score: parseInt(team2Score)
        });
        saveData();
        document.getElementById('match-select').value = '';
        document.getElementById('team1-score').value = '';
        document.getElementById('team2-score').value = '';
        renderScores();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('team-form')) {
        document.getElementById('team-form').addEventListener('submit', addTeam);
        renderTeams();
    }
    if (document.getElementById('player-form')) {
        document.getElementById('player-form').addEventListener('submit', addPlayer);
        renderPlayers();
        populateTeamSelect();
    }
    if (document.getElementById('match-form')) {
        document.getElementById('match-form').addEventListener('submit', addMatch);
        renderMatches();
        populateTeamSelect();
    }
    if (document.getElementById('score-form')) {
        document.getElementById('score-form').addEventListener('submit', addScore);
        renderScores();
        populateMatchSelect();
    }
    updateDashboard();
});
