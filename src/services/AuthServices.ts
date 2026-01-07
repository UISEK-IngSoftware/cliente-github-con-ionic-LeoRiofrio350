const TOKEN_KEY = "github_token";
const USERNAME_KEY = "github_auth_username";


class AuthServices {
    login(username: string, token: string){
        if (username && token) {
            this.logout();
            localStorage.setItem(USERNAME_KEY, username);
            localStorage.setItem(TOKEN_KEY, token);
            return true;
        }
        return false;
    }
    logout(){
        localStorage.removeItem(USERNAME_KEY);
        localStorage.removeItem(TOKEN_KEY);
    }
    isAuthenticated(): boolean {
        return localStorage.getItem(TOKEN_KEY) !== null
            && localStorage.getItem(USERNAME_KEY) !== null;
    }

    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    }
    getUsername(): string | null {
        return localStorage.getItem(USERNAME_KEY);
    }
    getAuthHeaders() {
        const token = this.getToken();
        const username = this.getUsername();
        if (token && username) {
            return 'Basic ' + btoa(username + ':' + token);
        }
        return null;
    }
}
export default new AuthServices();