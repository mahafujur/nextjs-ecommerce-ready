const tokenKey = "token";
const className = "classes";
const groupName = "group";
const subjectNameIs = "subject";
const subjectId= "subjectkey";

export function getUserToken() {
    return localStorage.getItem(tokenKey);
}

export function loginSuccess(token) {
    localStorage.setItem(tokenKey, token);
}

export const isLogin = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem(tokenKey)) {
      return true;
    }

    return false;
  }
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(tokenKey);
  }
}
export function UserInfo() {
    return  JSON.parse(localStorage.getItem("profile"))
}

export function isLoggedIn() {
    return localStorage.getItem(tokenKey) === null;
}

export function getLoginStatus() {
    return localStorage.getItem('token');
}

export function getClassName() {
    return localStorage.getItem('classes');
}
export function setClassName(classes) {
    localStorage.setItem(className, classes);
}

function removeClassName() {
    localStorage.removeItem(className);
}


export function getGroupName() {
    return localStorage.getItem('group');
}
export function setGroupName(group) {
    localStorage.setItem(groupName,group);
}

export function removeGroupName() {
    localStorage.removeItem(groupName);
}


export function getSubjectNameIs() {
    return localStorage.getItem('subject');
}
export function setSubjectNameIs(subject) {
    localStorage.setItem(subjectNameIs, subject);
}

function removeSubjectNameIs() {
    localStorage.removeItem(subjectNameIs);
}

export function getSubjectKey() {
    return localStorage.getItem('subjectkey');
}
export function setSubjectKey(subjectkey) {
    localStorage.setItem(subjectId, subjectkey);
}

function removeSubjectKey() {
    localStorage.removeItem(subjectId);
}

//
// "body": {
//     "profile": {
//         "_key": "288580",
//             "id": "288580",
//             "type": "user",
//             "phone": "01760000000",
//             "email": "admin@gmail.com",
//             "first_name": "Shikho Admin",
//             "dob": "k",
//             "last_login_date": "2020-07-21T22:56:59Z",
//             "role": "admin"
//     },
