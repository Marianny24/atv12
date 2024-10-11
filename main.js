// Função principal do jogo
function start() {
    // Criação do herói com suas características
    let nome = prompt("Digite o nome do herói ou heroína:");
    if (!nome) {
        alert("Nome inválido. O jogo será encerrado.");
        return;
    }

    let heroi = {
        nome: nome,
        vida: 100,
        forca: 50,
        magia: 30,
        moedas: 10,
    };

    let rodadas = 5;

    // Função para gerar um monstro
    function gerarMonstro() {
        return {
            vida: Math.floor(Math.random() * 50) + 20,
            forca: Math.floor(Math.random() * 30) + 10
        };
    }

    // Função para executar uma rodada
    function executarRodada() {
        let escolha = prompt(`Escolha uma ação:\n1 - Andar\n2 - Recuperar Vida\n3 - Ver Status\n4 - Descansar\n5 - Buscar Recursos`);
        
        if (escolha === "1") {
            // Chance de encontrar um monstro
            if (Math.random() > 0.5) {
                let monstro = gerarMonstro();
                alert("Você encontrou um monstro!");

                while (monstro.vida > 0 && heroi.vida > 0) {
                    let acao = prompt(`Você quer:\n1 - Atacar\n2 - Fugir`);
                    
                    if (acao === "1") {
                        // Ataque do herói
                        let danoHeroi = Math.floor(Math.random() * heroi.forca);
                        monstro.vida -= danoHeroi;
                        alert(`Você causou ${danoHeroi} de dano ao monstro! Vida do monstro: ${monstro.vida}`);

                        if (monstro.vida > 0) {
                            // Ataque do monstro
                            let danoMonstro = Math.floor(Math.random() * monstro.forca);
                            heroi.vida -= danoMonstro;
                            alert(`O monstro causou ${danoMonstro} de dano a você! Sua vida: ${heroi.vida}`);
                        }
                    } else if (acao === "2") {
                        alert("Você fugiu do monstro, mas perdeu 10 de vida!");
                        heroi.vida -= 10;
                        break;
                    }
                }

                if (heroi.vida <= 0) {
                    alert("Você perdeu a batalha! Jogo reiniciado.");
                    iniciarJogo();
                    return;
                }

                if (monstro.vida <= 0) {
                    alert("Você derrotou o monstro e continua sua jornada!");
                }

            } else {
                alert("Você seguiu em frente e não encontrou nada.");
            }

        } else if (escolha === "2") {
            let vidaRecuperada = Math.floor(Math.random() * 20) + 10;
            heroi.vida = Math.min(100, heroi.vida + vidaRecuperada);
            alert(`Você recuperou ${vidaRecuperada} de vida! Sua vida atual: ${heroi.vida}`);

        } else if (escolha === "3") {
            alert(`Status de ${heroi.nome}:\nVida: ${heroi.vida}\nForça: ${heroi.forca}\nMagia: ${heroi.magia}\nMoedas: ${heroi.moedas}`);

        } else if (escolha === "4") {
            // Descansar - Recupera um pouco de vida e magia
            let vidaRecuperada = Math.floor(Math.random() * 10) + 5;
            let magiaRecuperada = Math.floor(Math.random() * 10) + 5;
            heroi.vida = Math.min(100, heroi.vida + vidaRecuperada);
            heroi.magia = Math.min(100, heroi.magia + magiaRecuperada);
            alert(`Você descansou e recuperou ${vidaRecuperada} de vida e ${magiaRecuperada} de magia!`);

        } else if (escolha === "5") {
            // Buscar Recursos - chance de encontrar moedas ou itens
            let recursoEncontrado = Math.random();
            if (recursoEncontrado > 0.7) {
                let moedasEncontradas = Math.floor(Math.random() * 20) + 5;
                heroi.moedas += moedasEncontradas;
                alert(`Você encontrou ${moedasEncontradas} moedas! Agora você tem ${heroi.moedas} moedas.`);
            } else if (recursoEncontrado > 0.4) {
                let poção = Math.floor(Math.random() * 15) + 5;
                heroi.magia = Math.min(100, heroi.magia + poção);
                alert(`Você encontrou uma poção e recuperou ${poção} de magia!`);
            } else {
                alert("Você procurou, mas não encontrou nada útil.");
            }
        }

        if (heroi.vida <= 0) {
            alert("Você não sobreviveu à jornada. Fim de jogo.");
            return false;
        }

        return true;
    }

    // Início do jogo
    alert(`Herói/heroína: ${heroi.nome}\nIniciando a aventura...`);
    while (rodadas > 0) {
        if (!executarRodada()) {
            break;
        }
        rodadas--;
    }

    // Fim do jogo
    if (heroi.vida > 0) {
        alert("Parabéns! Você sobreviveu à aventura!");
    }
}

// Função para iniciar o jogo ao digitar "Start()" no console
window.Start = function() {
    iniciarJogo();
}

console.log("Digite 'Start' no console para iniciar o jogo!");

