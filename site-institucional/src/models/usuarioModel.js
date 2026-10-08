var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
<<<<<<< Updated upstream
        SELECT usuario.idUsuario, usuario.nome, cliente.email, empresa.nomeFantasia as nomeEmpresa FROM usuario JOIN empresa ON usuario.fkEmpresa = empresa.idEmpresa WHERE usuario.email = '${email}' AND usuario.senha = '${senha}';
=======
        SELECT id, nome, email, fk_empresa as empresaId FROM usuario WHERE email = '${email}' AND senha = '${senha}';
>>>>>>> Stashed changes
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
<<<<<<< Updated upstream
function cadastrar(nome, email, senha, cpf, nomeEmpresa, cnpj, celular) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, cpf, nomeEmpresa, cnpj, celular);
=======
function cadastrar(nomeFantasia, numeroCelular, cnpj, nome, email, senha, fkEmpresa, cpf) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, cpf, fkEmpresa);
>>>>>>> Stashed changes

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
<<<<<<< Updated upstream
        INSERT INTO empresa (nomeFantasia, cnpj) VALUES ('${nomeEmpresa}', '${cnpj}');

        INSERT INTO cliente (nome, email, cpf, numeroCelular) VALUES ('${nome}', '${email}', '${cpf}', '${celular}');

        INSERT INTO usuario (login, senha) VALUES ('${email}', '${senha}');

=======

        INSERT INTO cliente (nome, cpf, email, numeroCelular) values ('${nome}', '${cpf}', '${email}', '${numeroCelular}');

        INSERT INTO empresa (nomeFantasia, cnpj) values ('${nomeFantasia}', '${cnpj}');

        INSERT INTO usuario (login, senha) VALUES ('${email}', '${senha}');

        
>>>>>>> Stashed changes
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};