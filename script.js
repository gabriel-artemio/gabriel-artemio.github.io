const repo = "gabriel-artemio/gabriel-artemio.github.io"; // Exemplo: "gabrielhenrique/my-json-db"
const filePath = "data.json";
const token = "SEU_GITHUB_TOKEN"; // ⚠️ NÃO EXIBA ISSO PUBLICAMENTE

// Obtém o SHA do arquivo (necessário para atualizar o JSON)
async function getFileSha() {
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
        headers: { "Authorization": `token ${token}` }
    });
    const data = await response.json();
    return data.sha;
}

// Função para buscar o JSON do GitHub
async function fetchData() {
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
        headers: { "Authorization": `token ${token}` }
    });
    const data = await response.json();
    return JSON.parse(atob(data.content)); // Decodifica Base64 para JSON
}

// Função para atualizar o JSON no GitHub
async function updateData(newData) {
    const currentData = await fetchData();
    currentData.push(newData);

    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
        method: "PUT",
        headers: {
            "Authorization": `token ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "Atualizando JSON via API",
            content: btoa(JSON.stringify(currentData, null, 2)), // Codifica JSON para Base64
            sha: await getFileSha()
        })
    });

    if (response.ok) {
        alert("Dados salvos com sucesso!");
        renderData(); // Atualiza a exibição dos dados na tela
    } else {
        alert("Erro ao salvar os dados!");
    }
}

// Função para renderizar os dados na tela
async function renderData() {
    const dataList = document.getElementById("dataList");
    dataList.innerHTML = "";
    const data = await fetchData();

    data.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ${item.age} anos`;
        dataList.appendChild(li);
    });
}

// Evento do formulário para adicionar dados
document.getElementById("dataForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    await updateData({ name, age });
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
});

// Carregar os dados ao iniciar a página
renderData();
