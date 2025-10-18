document.addEventListener("DOMContentLoaded", () => {
    const servicoSelecionado = document.getElementById("servico-selecionado");
    const confirmarBtn = document.getElementById("confirmar-pagamento");
    const metodoCards = document.querySelectorAll(".metodo-card");

    // Lógica para obter o serviço da URL
    const urlParams = new URLSearchParams(window.location.search);
    const servico = urlParams.get('servico');

    if (servico) {
        servicoSelecionado.textContent = `Você selecionou: ${decodeURIComponent(servico)}`;
    } else {
        servicoSelecionado.textContent = "Erro: Serviço não especificado. Por favor, volte e selecione um plano.";
        confirmarBtn.disabled = true;
    }

    let metodoSelecionado = null;

    // 1. Lógica de Seleção de Métodos de Pagamento (Interação de "Card")
    metodoCards.forEach(card => {
        card.addEventListener("click", () => {
            // Remove a classe 'selected' de todos
            metodoCards.forEach(c => c.classList.remove("selected"));
            
            // Adiciona a classe 'selected' ao card clicado
            card.classList.add("selected");
            
            // Define o método selecionado
            metodoSelecionado = card.dataset.value;
            
            // Ativa o botão de confirmação
            confirmarBtn.disabled = false;
        });
    });

    // 2. Lógica de Redirecionamento
    confirmarBtn.addEventListener("click", () => {
        if (!metodoSelecionado) {
            alert("⚠️ Por favor, selecione um método de pagamento.");
            return;
        }

        let redirectUrl = "";
        
        // Redireciona para a página de detalhes específica
        if (metodoSelecionado === 'cartao') {
            redirectUrl = `detalhes_cartao.html?servico=${encodeURIComponent(servico)}`;
        } else if (metodoSelecionado === 'emola') {
            redirectUrl = `detalhes_emola.html?servico=${encodeURIComponent(servico)}`;
        } else if (metodoSelecionado === 'mpesa') {
            redirectUrl = `detalhes_mpesa.html?servico=${encodeURIComponent(servico)}`;
        } else {
            alert("Método de pagamento desconhecido.");
            return;
        }

        if (redirectUrl) {
            confirmarBtn.textContent = "A Redirecionar...";
            confirmarBtn.disabled = true;
            window.location.href = redirectUrl;
        }
    });
});