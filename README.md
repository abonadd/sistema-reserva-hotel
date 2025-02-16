# sistema-reserva-hotel

Documentação do Sistema de Gestão de Reservas de Hotéis

Introdução

Este documento descreve a implementação das APIs RESTful para o sistema de gestão de reservas de hotéis. O sistema foi desenvolvido utilizando o framework Express (Node.js) e o banco de dados MySQL. As APIs permitem a gestão de hotéis, clientes e reservas, conforme especificado no caso prático.


Serviços Implementados
1. Serviço de Hotéis
O serviço de hotéis permite a gestão das informações dos hotéis, incluindo criação, leitura, atualização e exclusão (CRUD).

Endpoints:
GET /hotels: Retorna todos os hotéis.

POST /hotels: Adiciona um novo hotel.

GET /hotels/{id}: Retorna um hotel específico.

PUT /hotels/{id}: Atualiza um hotel existente.

DELETE /hotels/{id}: Remove um hotel.

Exemplo de Requisição e Resposta:
POST /hotels (Criação de um hotel):

json
Copy
{
  "name": "Hotel Lisboa Center",
  "location": "Lisboa, Portugal",
  "capacity": 100
}
Resposta:

json
Copy
{
  "id": 1,
  "name": "Hotel Lisboa Center",
  "location": "Lisboa, Portugal",
  "capacity": 100
}
GET /hotels/1 (Consulta de um hotel):
Resposta:

json
Copy
{
  "id": 1,
  "name": "Hotel Lisboa Center",
  "location": "Lisboa, Portugal",
  "capacity": 100
}
2. Serviço de Clientes
O serviço de clientes permite a gestão dos dados dos clientes, incluindo criação, leitura, atualização e exclusão (CRUD).

Endpoints:
GET /customers: Retorna todos os clientes.

POST /customers: Adiciona um novo cliente.

GET /customers/{id}: Retorna um cliente específico.

PUT /customers/{id}: Atualiza um cliente existente.

DELETE /customers/{id}: Remove um cliente.

Exemplo de Requisição e Resposta:
POST /customers (Criação de um cliente):

json
Copy
{
  "name": "João Silva",
  "email": "joao.silva@example.com",
  "phone": "+351 912345678"
}
Resposta:

json
Copy
{
  "id": 1,
  "name": "João Silva",
  "email": "joao.silva@example.com",
  "phone": "+351 912345678"
}
GET /customers/1 (Consulta de um cliente):
Resposta:

json
Copy
{
  "id": 1,
  "name": "João Silva",
  "email": "joao.silva@example.com",
  "phone": "+351 912345678"
}
3. Serviço de Reservas
O serviço de reservas permite a criação e gestão das reservas, ligando clientes a hotéis em determinadas datas.

Endpoints:
GET /reservations: Retorna todas as reservas.

POST /reservations: Cria uma nova reserva.

GET /reservations/{id}: Retorna uma reserva específica.

DELETE /reservations/{id}: Cancela uma reserva.

Exemplo de Requisição e Resposta:
POST /reservations (Criação de uma reserva):

json
Copy
{
  "hotelId": 1,
  "customerId": 1,
  "checkInDate": "2025-02-01",
  "checkOutDate": "2025-02-05"
}
Resposta:

json
Copy
{
  "id": 1,
  "hotelId": 1,
  "customerId": 1,
  "checkInDate": "2025-02-01",
  "checkOutDate": "2025-02-05"
}
GET /reservations/1 (Consulta de uma reserva):
Resposta:

json
Copy
{
  "id": 1,
  "hotelId": 1,
  "customerId": 1,
  "checkInDate": "2025-02-01",
  "checkOutDate": "2025-02-05"
}
Banco de Dados
O sistema utiliza um banco de dados MySQL para armazenar as informações de hotéis, clientes e reservas. As tabelas foram criadas com as seguintes estruturas:

Tabela hotels
sql
Copy
CREATE TABLE hotels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  capacity INT NOT NULL
);
Tabela customers
sql
Copy
CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL
);
Tabela reservations
sql
Copy
CREATE TABLE reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  hotel_id INT,
  customer_id INT,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);
Testes das APIs
As APIs foram testadas utilizando o Insomnia, uma ferramenta para testar requisições HTTP. Todos os endpoints foram validados para garantir o correto funcionamento.

Exemplo de Teste:
Requisição POST para criar um hotel:

json
Copy
POST /hotels
{
  "name": "Hotel Lisboa Center",
  "location": "Lisboa, Portugal",
  "capacity": 100
}
Resposta:

json
Copy
{
  "id": 1,
  "name": "Hotel Lisboa Center",
  "location": "Lisboa, Portugal",
  "capacity": 100
}
