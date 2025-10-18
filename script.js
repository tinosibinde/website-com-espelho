const botoes = document.querySelectorAll(".btn-comprar");

// Removemos as referências a secPagamento, servicoSelecionado e confirmarBtn
// pois a lógica de pagamento foi movida para pagamento.html e pagamento.js

botoes.forEach(btn => {
  btn.addEventListener("click", () => {
    const servico = btn.dataset.servico;
    
    // Redireciona para a nova página de pagamento, passando o serviço na URL
    window.location.href = `pagamento.html?servico=${encodeURIComponent(servico)}`;
  });
});

// A lógica de confirmação de pagamento foi REMOVIDA.