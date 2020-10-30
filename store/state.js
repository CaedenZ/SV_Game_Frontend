export default () => ({
  showNotification: false,
  notificationDetails: {},
  auth: '',
  userInfo: {
    email: null,
    userName: null,
    score: null,
    userType: null,
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
