use pi;

-- Script de criação das tabelas
create table usuario (
id int primary key auto_increment,
nome varchar (60) not null,
cpf char(11) not null,
email varchar(100),
numero char(11),
cargo varchar(50),
fkEmpresa int,
	constraint fkUsuario_empresa foreign key (fkEmpresa) references empresa(idEmpresa)
);

create table empresa (
idEmpresa int primary key auto_increment,
nomeFantasia varchar(50),
filial char(3),
	constraint chkFilial check (filial in('não','sim')),
cnpj varchar(25),
responsavelLocal varchar(50),
pagamento varchar(20),
	constraint chkPagamento check (pagamento in ('Ativo','Inativo','Pendente'))
);

create table endereco (
idEndereco int primary key auto_increment,
logradouro varchar(80),
numero varchar(10),
bairro varchar(50),
cidade varchar(50),
estado char(2),
cep char(8),
fkEmpresa int not null unique,
	constraint fkEndereco_empresa foreign key (fkEmpresa) references empresa(idEmpresa)
);

create table sensor (
idSensor int primary key auto_increment,
tipoSensor varchar (50),
locall varchar(50),
statuss tinyint,
	constraint chkStatuss check (statuss in('1','0'))
);

create table leituraSensor (
idLeitura int primary key auto_increment,
valorTemperatura decimal (10,2),
valorUmidade decimal (10,2),
dataHora datetime default current_timestamp,
fkSensor int,
	constraint fkLeitura_sensor foreign key (fkSensor) references sensor(idSensor)
);

-- Script de insert nas tabelas
insert into empresa (nomeFantasia, filial, cnpj, responsavelLocal, pagamento) values
('Laticínios Serra Azul', 'não', '12345678000101', 'Carlos Mendes', 'Ativo'),
('Queijaria Vale Verde', 'sim', '23456789000102', 'Fernanda Lima', 'Pendente'),
('Fazenda Bom Queijo', 'não', '34567890000103', 'Roberto Alves', 'Ativo'),
('Laticínios Minas Gerais', 'sim', '45678901000104', 'Juliana Costa', 'Inativo'),
('Queijos Artesanais Sul', 'não', '56789012000105', 'Marcos Pereira', 'Ativo');

insert into usuario (nome, cpf, email, numero, cargo, fkEmpresa) values
('Ana Souza', '12345678901', 'ana.souza@serraazul.com.br', '11987654321', 'Técnica de Qualidade', 1),
('Bruno Tavares', '23456789012', 'bruno.tavares@valeverde.com.br', '11976543210', 'Supervisor de Produção', 2),
('Camila Rocha', '34567890123', 'camila.rocha@bomqueijo.com.br', '11965432109',null, 3),
('Diego Martins', '45678901234', null, '11954321098', 'Analista de TI', 4),
('Elaine Ferreira', '56789012345', 'elaine.ferreira@queijossul.com.br', '11943210987', 'Controladora de Qualidade', 5);

insert into endereco (logradouro, numero, bairro, cidade, estado, cep, fkEmpresa) values
('Rua das Serras', '120', 'Centro', 'Bento Gonçalves', 'RS', '95700000', 1),
('Avenida Vale Verde', '45', 'Industrial', 'Campinas', 'SP', '13020000', 2),
('Estrada do Queijo', '78', 'Zona Rural', 'Araxá', 'MG', '38180000', 3),
('Rua Minas Gerais', '300', 'São Pedro', 'Belo Horizonte', 'MG', '30130000', 4),
('Rua Artesanal', '15', 'Colonial', 'Nova Petrópolis', 'RS', '95150000', 5);

insert into sensor (tipoSensor, locall, statuss) values
('Umidade', 'Câmara de Maturação 1', 1),
('Temperatura', 'Câmara de Maturação 1', 1),
('Umidade', 'Câmara de Maturação 2', 1),
('Temperatura', 'Câmara de Maturação 2', 0),
('Umidade', 'Câmara de Maturação 3', 1);

insert into leituraSensor (valorTemperatura, valorUmidade, dataHora, fkSensor) values
(8.50, 85.30, '2026-09-20 08:00:00', 1),
(9.10, 88.70, '2026-09-20 12:00:00', 2),
(7.80, 82.40, '2026-09-21 08:00:00', 3),
(10.20, 90.10, '2026-09-21 12:00:00', 4),
(8.90, 86.60, '2026-09-22 08:00:00', 5);

-- Script de consulta de dados

-- Usuario
select nome as 'Funcionario', ifnull(cargo,'Não foi informado') as 'Cargo', ifnull(email,'Não possui email cadasatrado') as Email
from usuario;

select nome as 'Funcionario',
case
	when cargo like '%Gerente%' or cargo like '%Supervisor%' then 'Gestão'
	else 'Operario'
end as 'Area de atuação'
from usuario;

select u.nome as 'Funcionario', u.cargo as 'Cargo', e.nomeFantasia as 'Empresa'
from usuario as u join empresa e on fkEmpresa = idEmpresa;

-- Empresa
select nomeFantasia as 'Empresa', cnpj, pagamento as 'Status do pagamento'
from empresa;

select nomeFantasia,
case
	when filial = 'sim' then 'É uma filial'
	else 'Matriz'
end as 'É filial?'
from empresa;

select empresa.nomeFantasia as 'Empresa', en.cidade as 'Cidade', en.estado as 'UF'
from empresa join endereco en on idEmpresa = fkEmpresa;

-- Endereço
select logradouro, numero, bairro, cidade, estado as 'UF', cep
from endereco;

select cidade, estado as 'UF',
case
	when estado in ('RS','SC','PR') then 'Sul do Brasil'
	when estado in ('SP','RJ','MG','ES') then 'Sudeste do Brasil'
	else 'Outra região'
end as 'Região do Brasil'
from endereco;

select em.nomeFantasia as 'Empresa', en.logradouro as 'Rua', en.cidade as 'Cidade', en.estado as 'UF'
from endereco as en join empresa as em on fkEmpresa = idEmpresa;

-- Sensor
select idSensor, tipoSensor as 'Tipo do sensor', locall as 'Local de instalação',
case
	when statuss = 1 then 'Ativo'
	else 'Inativo'
end as 'Situacao'
from sensor;

select tipoSensor as 'Tipo do sensor', ifnull(locall,'Local não definido') as localizacao
from sensor;

select s.tipoSensor as 'Tipo do sensor', s.locall as 'Local de instalação', valorTemperatura as 'Temperatura', valorUmidade as 'Umidade'
from sensor as s join leituraSensor as l on idSensor = fkSensor;

-- Leitura do sensor
select valorTemperatura as 'Temperatura', valorUmidade as 'Umidade', dataHora as 'Data da coleta'
from leituraSensor;

select dataHora as 'Data da coleta', valorUmidade as 'Umidade',
case
	when valorUmidade > 100 then 'Risco de contaminação'
	else 'Dentro do esperado'
end as 'Limite de umidade'
from leituraSensor;

select s.tipoSensor as 'Tipo do sensor', s.locall as 'Local de instalação', l.valorTemperatura as 'Temperatura', l.valorUmidade as 'Umidade', l.dataHora as 'Data da coleta'
from leituraSensor as l join sensor as s on l.fkSensor = s.idSensor;