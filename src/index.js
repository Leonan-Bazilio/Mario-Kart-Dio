const player1 = {
  name: "Mario",
  speed: 3,
  maneuverability: 4,
  power: 3,
  points: 0
}
const player2 = {
  name: "Luigi",
  speed: 3,
  maneuverability: 4,
  power: 3,
  points: 0
}

async function rollDice() {
  return Math.ceil(Math.random() * 6)
}


async function getRandomBlock() {
  const random = Math.ceil(Math.random() * 3)
  let result
  switch (random) {
    case 1:
      result = "RETA"
      break;
    case 2:
      result = "CURVA"
      break;
    default:
      result = "CONFRONTO"
      break;
  }
  return result
}

async function logRollResult(playername, block, diceResult, attribute) {
  console.log(
    `${playername} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute
    }`
  );
}

async function playRaceEngine(player1, player2) {
  for (let i = 1; i <= 5; i++) {
    console.log(`🏁 Rodada ${i} `)

    let block = await getRandomBlock()
    console.log(`Bloco: ${block}`)


    const diceResult1 = await rollDice()
    const diceResult2 = await rollDice()

    let totalTestSkill1 = 0
    let totalTestSkill2 = 0
    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + player1.speed
      totalTestSkill2 = diceResult2 + player2.speed

      await logRollResult(player1.name, "velocidade", diceResult1, player1.speed
      );
      await logRollResult(player2.name, "velocidade", diceResult2, player2.speed
      );

    } else if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + player1.maneuverability
      totalTestSkill2 = diceResult2 + player2.maneuverability

      await logRollResult(player1.name, "manobrabilidade", diceResult1, player1.maneuverability
      );
      await logRollResult(player2.name, "manobrabilidade", diceResult2, player2.maneuverability
      );

    } else if (block === "CONFRONTO") {
      totalTestSkill2 = diceResult1 + player1.power
      totalTestSkill2 = diceResult2 + player2.power

      await logRollResult(player1.name, "poder", diceResult1, player1.power
      );
      await logRollResult(player2.name, "poder", diceResult2, player2.power
      );
      console.log(`${player1.name} confrontou com ${player2.name}! 🥊`);

      if (totalTestSkill1 > totalTestSkill2 && player2.points > 0) {
        console.log(
          `${player1.name} venceu o confronto! ${player2.name} perdeu 1 ponto 🐢`
        );
        player2.points--;
      }

      if (totalTestSkill2 > totalTestSkill1 && player1.points > 0) {
        console.log(
          `${player2.name} venceu o confronto! ${player1.name} perdeu 1 ponto 🐢`
        );
        player1.points--;
      }

      console.log(
        totalTestSkill2 === totalTestSkill1
          ? "Confronto empatado! Nenhum ponto foi perdido"
          : ""
      );
    }
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${player1.name} marcou um ponto!`);
      player1.points++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${player2.name} marcou um ponto!`);
      player2.points++;
    }

    console.log("-----------------------------");
  }
}
async function declareWinner(player1, player2) {
  console.log("Resultado final:");
  console.log(`${player1.name}: ${player1.points} ponto(s)`);
  console.log(`${player2.name}: ${player2.points} ponto(s)`);

  if (player1.points > player2.points)
    console.log(`\n${player1.name} venceu a corrida! Parabéns! 🏆`);
  else if (player2.points > player1.points)
    console.log(`\n${player2.name} venceu a corrida! Parabéns! 🏆`);
  else console.log("A corrida terminou em empate");
}

(async function Main() {
  console.log(`🏁🚨 Corrida entre ${player1.name} e ${player2.name} começando ...\n`)
  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})()