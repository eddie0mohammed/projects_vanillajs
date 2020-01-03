

class Github {
    constructor(){
        this.client_id = '6b598fb2cf1f0cd24d9d';
        this.client_secret = 'b36e599432df56f150c5261f2c11a4875860aaf3';
        this.repos_count = 5;
        this.repos_sort = 'created: asc'
    }

    async getUser(user){
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const profileData = await profileResponse.json();
        
        const reposData = await reposResponse.json();

        return {
            profile: profileData,

            repos: reposData
        }
    }
}