export default () => ({
  showNotification: false,
  notificationDetails: {},
  auth: '',
  userInfo: {
    email: null,
    name: null,
    score: null,
    type: null,
  },
  login: false,
  teams: {},
  users: {},
  gameInfo: {
    gameID: null,
    teams: {},
    status: null,
  },
  teamInfo: {
    teamID: null,
    teamMembers: {},
    teamScore: null,
    companyName: null,
    industry: null,
    targetUser: null,
    hotTrend: null,
    teamRank: null,
  },
})
