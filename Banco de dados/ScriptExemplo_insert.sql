create database BlueCheeseSol;

use BlueCheeseSol;
create user 'usuario_insert '@'localhost' identified by 'QueijoAzul100';

grant insert on BlueCheeseSol.* to 'usuario_insert '@'localhost';

-- comando para salvar as mudanças de usuario
flush privileges;

-- verifica se a permissão foi salva
show grants for 'usuario_insert'@'localhost';

create table empresa (
idEmpresa int primary key auto_increment,
nomeFantasia varchar(50),
cnpj varchar(25),
responsavelLocal varchar(50),
pagamento decimal(10,2)
);

insert into empresa (nomeFantasia, cnpj, responsavelLocal, pagamento) values
('Laticínios Serra Azul', '12.345.678/0001-90', 'Marcos Almeida', 4500.00),
('Queijaria Veia Azul', '23.456.789/0001-01', 'Fernanda Souza', 3200.50),
('Maturação Gorgonzola Mineira', '34.567.890/0001-12', 'Ricardo Teixeira', 5800.00);

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

insert into endereco (logradouro, numero, bairro, cidade, estado, cep, fkEmpresa) values
('Rua das Acácias', '120', 'Centro', 'Serro', 'MG', '39150000', 1),
('Estrada do Queijo Artesanal', '51', 'Zona Rural', 'Araxá', 'MG', '38183000', 2),
('Avenida Tiradentes', '845', 'Vila Nova', 'Poços de Caldas', 'MG', '37701000', 3);

create table cliente (
idCliente int primary key auto_increment,
nome varchar(60),
cpf varchar(45),
email varchar(100),
	constraint chkEmail check (email like'%'),
numeroCelular char(11),
fkEmpresa int,
	constraint fkCliente_empresa foreign key (fkEmpresa) references empresa(idEmpresa),
fkSupervisor int,
	constraint fkCliente_supervisor foreign key (fkSupervisor) references cliente(idCliente),
fkUsuario int,
	constraint fkCliente_Usuario foreign key (fkUsuario) references usuario(idUsuario)
);

insert into cliente (nome, cpf, email, numeroCelular, fkEmpresa, fkSupervisor, fkUsuario) values
('Marcos Almeida', '123.456.789-01', 'marcos.almeida@serraazul.com.br', '31987654321', 1, null, null),
('Fernanda Souza', '234.567.890-12', 'fernanda.souza@veiaazul.com.br', '34991234567', 2, 1, null),
('Ricardo Teixeira', '345.678.901-23', 'ricardo.teixeira@gorgonzolamineira.com.br', '35998765432', 3, 1, null);

create table ambienteProcesso (
idAmbienteProcesso int primary key auto_increment,
nomePrincipal varchar(45),
nomeAuxiliar varchar(45),
descricao varchar(45),
fkEmpresa int,
	constraint fkAmbienteProcesso_empresa foreign key (fkEmpresa) references empresa(idEmpresa)
);

insert into ambienteProcesso (nomePrincipal, nomeAuxiliar, descricao, fkEmpresa) values
('Sala de Maturação 1', 'Câmara Fria A', 'Maturação de queijo azul, 10 a 12 °C', 1),
('Sala de Maturação 2', 'Câmara Úmida B', 'Alta umidade, cerca de 90% de UR', 2),
('Sala de Cura Gorgonzola', 'Adega Principal', 'Controle de temperatura e umidade da cura', 3);

create table usuario (
idUsuario int primary key auto_increment,
login varchar(45),
senha varchar(45)

);

insert into usuario (login, senha) values
('marcos.almeida', 'Marcos@2026'),
('fernanda.souza', 'Fernanda@2026'),
('ricardo.teixeira', 'Ricardo@2026');

create table sensor (
idSensor int primary key auto_increment,
nome varchar(45),
descricao varchar(100),
unidadeMedicao varchar(10)
);

insert into sensor (nome, descricao, unidadeMedicao) values
('DHT11', 'Sensor de temperatura da sala de maturação', '°C'),
('DHT11', 'Sensor de umidade relativa do ar da sala de maturação', 'UR%');

create table sensorAmbiente (
idSensorAmbiente int primary key auto_increment,
statuss tinyint,
	constraint chkStatuss check (statuss in ('1','0')),
fkAmbienteProcesso int,
	constraint fkSensorAmbiente_ambienteProcesso foreign key (fkAmbienteProcesso) references ambienteProcesso(idAmbienteProcesso),
fkSensor int,
	constraint fkSensorAmbiente_sensor foreign key (fkSensor) references sensor(idSensor)
);

insert into sensorAmbiente (statuss, fkAmbienteProcesso, fkSensor) values
(1, 1, 1),
(1, 1, 2),
(0, 2, 3);

create table leituraSensor (
idLeituraSensor int primary key auto_increment,
valor decimal(10,2),
dataHora datetime,
fkSensorAmbiente int,
	constraint fkLeituraSensor_SensorAmbiente foreign key (fkSensorAmbiente) references sensorAmbiente(idSensorAmbiente),
fkAmbienteProcesso int,
	constraint fkLeituraSensor_ambienteProcesso foreign key (fkAmbienteProcesso) references ambienteProcesso(idAmbienteProcesso)
);

insert into leituraSensor (valor, dataHora, fkSensorAmbiente, fkAmbienteProcesso) values
(11.50, '2026-10-02 08:00:00', 1, 1),
(88.00, '2026-10-02 08:00:00', 2, 1),
(12.20, '2026-10-02 08:05:00', 1, 1);