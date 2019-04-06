export const API_URL = 'http://'+window.location.hostname+':3000'
export const LOGIN_URL = API_URL + '/api/Clients/login'
export const USER_INFO_URL = API_URL + '/api/Account/UserInfo'
export const LOGOUT_URL = API_URL + '/Clients/logout'
export const UPDATE_URL = API_URL + '/api/ClientData/logout'


export const GET_ALL_REQUESTS_URL = API_URL + '/api/Requests'
export const GET_ALL_DATA_URL = API_URL + '/api/Data'
export const UPDATE_QUIZ_URL = (quizId) => API_URL + '/api/Quizzes/' + quizId
export const QUESTION_ID_URL = (questionId) => API_URL + '/api/Questions/' + questionId
export const USER_RESULTS_URL = (playerId) => API_URL + '/api/QuizSessions?playerId=' + playerId
export const ADMIN_RESULTS_URL = (adminId) => API_URL + '/api/QuizSessions?creatorId=' + adminId

export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS | '';
export const CONTRACT_ABI = process.env.CONTRACT_ABI | '';