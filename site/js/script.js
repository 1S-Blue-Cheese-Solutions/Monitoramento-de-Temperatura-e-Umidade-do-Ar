function queijoPerdido() {
  let quilos = Number(input_quilos.value);
  let precoPorKg = Number(select_queijo.value);
  let nomeQueijo = select_queijo.options[select_queijo.selectedIndex].text;

  let prejuizoTotal = quilos * precoPorKg;

  div_resultado.innerHTML = `
            <div>
                Tipo de queijo: ${nomeQueijo}<br>
                Quantidade perdida: ${quilos.toFixed(2)}kg<br>
                Prejuízo total: R$ ${prejuizoTotal.toFixed(2)}
            </div>
        `;
}

function escolher() {
  let pacote = select_pacote.value;
  let unidSensor = 11;

  if (pacote == "1") {
    let pacote10 = unidSensor * 10;
    let pacote10Format = pacote10.toFixed(2);

    div_exbCalc.innerHTML = `Você optou pelo sistema com 10 sensores, seu gasto com sensores será de R$${pacote10Format}`;
  }
  if (pacote == "2") {
    let pacote20 = unidSensor * 20;
    let pacote20Format = pacote20.toFixed(2);

    div_exbCalc.innerHTML = `Você optou pelo sistema com 20 sensores, seu gasto com sensores será de R$${pacote20Format}`;
  }
  if (pacote == "3") {
    let pacote30 = unidSensor * 30;
    let pacote30Format = pacote30.toFixed(2);

    div_exbCalc.innerHTML = `Você optou pelo sistema com 30 sensores, seu gasto com sensores será de R$${pacote30Format}`;
  }
}
