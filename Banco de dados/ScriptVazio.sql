use pi;

create table empresa (
idEmpresa int primary key auto_increment,
nomeFantasia varchar(50),
cnpj varchar(25),
responsavelLocal varchar(50),
pagamento decimal(10,2)
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

create table ambienteProcesso (
idAmbienteProcesso int primary key auto_increment,
nomePrincipal varchar(45),
nomeAuxiliar varchar(45),
descricao varchar(45),
fkEmpresa int,
	constraint fkAmbienteProcesso_empresa foreign key (fkEmpresa) references empresa(idEmpresa)
);

create table usuario (
idUsuario int primary key auto_increment,
login varchar(45),
senha varchar(45)
);

create table sensor (
idSensor int primary key auto_increment,
nome varchar(45),
descricao varchar(100),
unidadeMedicao varchar(10)
);

create table sensorAmbiente (
idSensorAmbiente int primary key auto_increment,
statuss tinyint,
	constraint chkStatuss check (statuss in ('1','0')),
fkAmbienteProcesso int,
	constraint fkSensorAmbiente_ambienteProcesso foreign key (fkAmbienteProcesso) references ambienteProcesso(idAmbienteProcesso),
fkSensor int,
	constraint fkSensorAmbiente_sensor foreign key (fkSensor) references sensor(idSensor)
);

create table leituraSensor (
idLeituraSensor int primary key auto_increment,
valor decimal(10,2),
dataHora datetime,
fkSensorAmbiente int,
	constraint fkLeituraSensor_SensorAmbiente foreign key (fkSensorAmbiente) references sensorAmbiente(idSensorAmbiente),
fkAmbienteProcesso int,
	constraint fkLeituraSensor_ambienteProcesso foreign key (fkAmbienteProcesso) references ambienteProcesso(idAmbienteProcesso)
);