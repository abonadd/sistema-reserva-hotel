Documentação do Sistema de Gestão de Reservas de Hotéis

Introdução

Este documento descreve a implementação das APIs RESTful para o sistema de gestão de reservas de hotéis, desenvolvido utilizando o framework Express (Node.js) e o banco de dados MySQL. Além disso, foi realizada a orquestração das APIs utilizando o WSO2 Micro Integrator para combinar informações de clientes, hotéis e reservas em uma única resposta.


Funcionalidades
1. Serviço de Hotéis
Permite a gestão das informações dos hotéis, incluindo criação, leitura, atualização e exclusão (CRUD).

Endpoints:
GET /hotels: Retorna todos os hotéis.

POST /hotels: Adiciona um novo hotel.

GET /hotels/{id}: Retorna um hotel específico.

PUT /hotels/{id}: Atualiza um hotel existente.

DELETE /hotels/{id}: Remove um hotel.

2. Serviço de Clientes
Permite a gestão dos dados dos clientes, incluindo criação, leitura, atualização e exclusão (CRUD).

Endpoints:
GET /customers: Retorna todos os clientes.

POST /customers: Adiciona um novo cliente.

GET /customers/{id}: Retorna um cliente específico.

PUT /customers/{id}: Atualiza um cliente existente.

DELETE /customers/{id}: Remove um cliente.

3. Serviço de Reservas
Permite a criação e gestão das reservas, ligando clientes a hotéis em determinadas datas.

Endpoints:
GET /reservations: Retorna todas as reservas.

POST /reservations: Cria uma nova reserva.

GET /reservations/{id}: Retorna uma reserva específica.

DELETE /reservations/{id}: Cancela uma reserva.

Orquestração com WSO2 Micro Integrator
Objetivo
O objetivo da orquestração é combinar as informações de clientes, hotéis e reservas em uma única resposta, utilizando o WSO2 Micro Integrator.

Fluxo do Processo
Entrada: Requisição HTTP para o endpoint /reservation/full/{id} do WSO2 Micro Integrator.

Passo 1: Chamar a API do Reservation Service para obter os dados da reserva.

Passo 2: Chamar a API do Customer Service para obter os dados do cliente associado.

Passo 3: Chamar a API do Hotel Service para obter as informações do hotel associado.

Resposta Consolidada: O WSO2 Micro Integrator devolve uma resposta única com todas as informações combinadas.

Configuração no WSO2 Integration Studio
Criação do Projeto:

No WSO2 Integration Studio, crie um novo projeto de integração.

Adicione um Proxy Service para orquestrar as chamadas às APIs.

Implementação da Orquestração:

Use Sequences, Call Mediators e Log Mediators para criar o fluxo de orquestração.

Configure os seguintes passos no fluxo:

Receber a requisição no endpoint /reservation/full/{id}.

Chamar a API do Reservation Service para obter os dados da reserva.

Chamar a API do Customer Service para obter os dados do cliente.

Chamar a API do Hotel Service para obter os dados do hotel.

Combinar as respostas e retornar uma resposta consolidada.

Exemplo de Configuração:

Call Mediator para chamar o Reservation Service:

xml
Copy
<call>
  <endpoint>
    <http method="get" uri-template="http://localhost:3000/reservations/{uri.var.reservationId}"/>
  </endpoint>
</call>
Run HTML
Call Mediator para chamar o Customer Service:

xml
Copy
<call>
  <endpoint>
    <http method="get" uri-template="http://localhost:3000/customers/{uri.var.customerId}"/>
  </endpoint>
</call>
Run HTML
Call Mediator para chamar o Hotel Service:

xml
Copy
<call>
  <endpoint>
    <http method="get" uri-template="http://localhost:3000/hotels/{uri.var.hotelId}"/>
  </endpoint>
</call>
Run HTML
Resposta Consolidada:

Use o PayloadFactory Mediator para criar a resposta consolidada:

xml
Copy
<payloadFactory media-type="json">
  <format>
    {
      "reservationId": $1,
      "checkInDate": "$2",
      "checkOutDate": "$3",
      "customerId": $4,
      "customerName": "$5",
      "customerEmail": "$6",
      "customerPhone": "$7",
      "hotelId": $8,
      "hotelName": "$9",
      "hotelLocation": "$10",
      "hotelCapacity": $11
    }
  </format>
  <args>
    <arg evaluator="json" expression="$.reservationData.id"/>
    <arg evaluator="json" expression="$.reservationData.checkInDate"/>
    <arg evaluator="json" expression="$.reservationData.checkOutDate"/>
    <arg evaluator="json" expression="$.customerData.id"/>
    <arg evaluator="json" expression="$.customerData.name"/>
    <arg evaluator="json" expression="$.customerData.email"/>
    <arg evaluator="json" expression="$.customerData.phone"/>
    <arg evaluator="json" expression="$.hotelData.id"/>
    <arg evaluator="json" expression="$.hotelData.name"/>
    <arg evaluator="json" expression="$.hotelData.location"/>
    <arg evaluator="json" expression="$.hotelData.capacity"/>
  </args>
</payloadFactory>
Run HTML
Testes
Teste da Orquestração
Requisição:

Método: GET

URL: http://localhost:8290/reservation/full/1

Onde 1 é o ID da reserva.

Resposta Esperada:

json
Copy
{
  "reservationId": 1,
  "checkInDate": "2025-02-01",
  "checkOutDate": "2025-02-05",
  "customerId": 1,
  "customerName": "João Silva",
  "customerEmail": "joao.silva@example.com",
  "customerPhone": "+351 912345678",
  "hotelId": 1,
  "hotelName": "Hotel Lisboa Center",
  "hotelLocation": "Lisboa, Portugal",
  "hotelCapacity": 100
}
Nota: Durante a implementação, não foi possível realizar o teste final da orquestração devido a problemas de configuração no ambiente de execução do WSO2 Micro Integrator. A configuração do fluxo de orquestração foi concluída conforme descrito, mas o teste prático não pôde ser executado com sucesso.
