export function authHeader() {
    const token = localStorage.getItem("FollowUpAccessToken");
    if (token) {
      return { 
        Authorization: 'Bearer ' + token
      };
    }
    else {
      return { Authorization: '' };
    }
  }
  
  
  export function authHeaderFormData() {
    const token = localStorage.getItem("FollowUpAccessToken");
    if (token) {
      return { 
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        Authorization: 'Bearer ' + token,
      };
    }
    else {
      return { Authorization: '' };
    }
  }