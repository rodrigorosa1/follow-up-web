const API_URL = `${process.env.REACT_APP_API_URL}` + 'avatars/';

export const getInstructorAvatarId = (id: string) => {
    return API_URL + 'user/' + id;
}

export const getStudentAvatarId = (id: string) => {
    return API_URL + 'student/' + id;
}