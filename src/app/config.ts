// export const url = 'http://localhost:8000/';
export const url = 'https://api.indianpolice.in/';

// export const registerApi = url + 'bgmi/register';
export const registerApi = url + 'player/register/team';
export const getTeam = url + 'player/get_team/';
export const verify_enrollment = url + 'player/verifyEnrollment/';
export const register_player = url + 'player/register/player';
export const final_add_team = url + 'player/final_add/';
export const get_player = url + 'player/get_player/';
export const update_player = url + 'player/update/player/';
export const get_teams = url + 'player/get_all_team';
export const get_team_by_code = url + 'player/get_team/';
export const toggleVerification_player = url + 'player/toggleVerification/';

export const GetTeamScoreNew = url + 'player/getTeamsRanking';
export const getMatchNew = url + 'player/get_all_match';
export const GetTeamsByMatchNew = url + 'player/getTeams/';
export const toggleIsDeadNew = url + 'player/match/toggleIsDead';
export const updateKillNew = url + 'player/match_kill/';
export const getTeamsLastRanking = url + 'player/getTeamsRankingForLast';
export const autoCalculateRAnk = url + 'player/updateTeamsRankingByKills';
export const updateRank = url + 'player/match/updateRank';

export const createTournament = url + 'bgmi/create/tournament';
export const getTournamentList = url + 'bgmi/getTournaments';
export const createMatch = url + 'bgmi/create/match';
export const getMatchList = url + 'bgmi/getMatches';
export const getTeamList = url + 'bgmi/getTeams';
export const toggleVerification = url + 'bgmi/toggleVerification';
export const togglePaymentReceived = url + 'bgmi/togglePaymentReceived';
export const toggleIsDead = url + 'bgmi/toggleIsDead';
export const updateKill = url + 'bgmi/updateKill';
export const verifyEnrollment = url + 'bgmi/verifyEnrollment/';
export const logoUrl = url + 'player/logo/';
export const AddTeamInMatch = url + 'bgmi/addTeamInMatch/';
export const GetMatchPlayers = url + 'bgmi/getMatchPlayers/';
export const GetTeamsByMatch = url + 'bgmi/getTeams/';
export const GetPlayersScore = url + 'bgmi/getPlayers';
export const GetTeamScore = url + 'bgmi/getTeamsRanking';
