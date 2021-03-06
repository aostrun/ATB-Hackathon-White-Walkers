export const API_URL = 'http://'+window.location.hostname+':3000'
export const LOGIN_URL = API_URL + '/api/Clients/login'
export const USER_INFO_URL = API_URL + '/api/Account/UserInfo'
export const LOGOUT_URL = API_URL + '/Clients/logout'
export const UPDATE_URL = API_URL + '/api/ClientData/logout'


export const GET_ALL_RECEIVED_REQUESTS_URL = (userId) => API_URL + '/api/Clients/'+userId+'/receivedAccessTokens'
export const GET_ALL_ISSUED_REQUESTS_URL = (userId) => API_URL + '/api/Clients/'+userId+'/issuedAccessTokens'
export const GET_ALL_DATA_URL = API_URL + '/api/BlogPosts'
export const GET_ALL_USERS_URL = API_URL + '/api/Clients'
export const POST_APPROVAL = (tokenId) => API_URL + '/api/AccessRequests/' + tokenId + '/tokenIssued'
export const GET_USER_INFO = (userId) => API_URL + '/api/Clients/' + userId
export const UPDATE_QUIZ_URL = (quizId) => API_URL + '/api/Quizzes/' + quizId
export const QUESTION_ID_URL = (questionId) => API_URL + '/api/Questions/' + questionId
export const USER_RESULTS_URL = (playerId) => API_URL + '/api/QuizSessions?playerId=' + playerId
export const ADMIN_RESULTS_URL = (adminId) => API_URL + '/api/QuizSessions?creatorId=' + adminId

// Load your contract here!
var contract_artifacts = require('../blockchain/build/contracts/AccessToken.json');
const deployedAddress = contract_artifacts.networks[Object.keys(contract_artifacts.networks)[0]].address;

export const CONTRACT_ADDRESS = deployedAddress;
export const CONTRACT_ABI =  contract_artifacts.abi;