document.getElementById('searchBtn').addEventListener('click', () => {
    const repoUrl = document.getElementById('repository').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    getCommits(repoUrl, startDate, endDate);
  });
  
  function extractAuthorAndRepo(repoUrl) {
    const matches = repoUrl.match(/https:\/\/github\.com\/([^/]+)\/([^/]+)/);
    if (matches) {
      return [matches[1], matches[2]];
    }
    return [null, null];
  }
  
  async function getCommits(repoUrl, startDate, endDate) {
    if (!repoUrl || !startDate || !endDate) {
      alert('Preencha todos os campos!');
      return;
    }
  
    const [author, repo] = extractAuthorAndRepo(repoUrl);
    if (!author || !repo) {
      alert('Link do repositório inválido');
      return;
    }
    
    const apiCommitsUrl = `https://api.github.com/repos/${author}/${repo}/commits?since=${startDate}&until=${endDate}`;
    const apiRepoUrl = `https://api.github.com/repos/${author}/${repo}`;
  
    try {
      const commitsResponse = await fetch(apiCommitsUrl);
      const repoResponse = await fetch(apiRepoUrl);
  
      if (!commitsResponse.ok || !repoResponse.ok) {
        throw new Error('Erro ao buscar dados do GitHub');
      }
  
      const commits = await commitsResponse.json();
      const repoData = await repoResponse.json();
  
      populateTable(commits, repoData);
    } catch (error) {
      console.error(error);
      alert('Erro ao buscar dados do GitHub');
    }
  }
  
  function formatDate(date) {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
  }
  
  function populateTable(commits, repoData) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
  
    commits.forEach((commit) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${commit.commit.author.name}</td>
        <td>${repoData.name}</td>
        <td>${formatDate(commit.commit.author.date)}</td>
        <td>${commit.commit.message}</td>
        <td>${repoData.stargazers_count}</td>
        <td>${repoData.forks_count}</td>
      `;
      tableBody.appendChild(row);
    });
  }