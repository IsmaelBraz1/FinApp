const axios = require("axios");
require("dotenv").config();

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

// Dados de teste
const TEST_USER = {
  email: `testuser${Date.now()}@example.com`,
  password: "testpassword123",
  nome: "Test User",
};

let authToken = "";
let userId = "";
let transactionId = "";
let goalId = "";

async function testRoute(method, endpoint, data = null, headers = {}) {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers,
      data,
    };

    const response = await axios(config);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      error: error.response?.data?.error || error.message,
    };
  }
}

async function runTests() {
  console.log("Iniciando testes das rotas da API FinApp...\n");

  // 1. Teste de Cadastro
  console.log("1. Testando cadastro de usuário...");
  const signupResponse = await testRoute("post", "/auth/signup", {
    email: TEST_USER.email,
    password: TEST_USER.password,
    nome: TEST_USER.nome,
  });

  if (signupResponse.status === 201) {
    console.log("✅ Cadastro bem-sucedido");
    userId = signupResponse.data.user.id;
  } else {
    console.log("❌ Falha no cadastro:", signupResponse.error);
    return;
  }

  // 2. Teste de Login
  console.log("\n2. Testando login...");
  const loginResponse = await testRoute("post", "/auth/signin", {
    email: TEST_USER.email,
    password: TEST_USER.password,
  });

  if (loginResponse.status === 200) {
    console.log("✅ Login bem-sucedido");
    authToken = loginResponse.data.access_token;
  } else {
    console.log("❌ Falha no login:", loginResponse.error);
    return;
  }

  // Configurar headers para autenticação
  const authHeaders = {
    Authorization: `Bearer ${authToken}`,
  };

  // 3. Teste de Obter Perfil
  console.log("\n3. Testando obtenção de perfil...");
  const profileResponse = await testRoute("get", "/profile", null, authHeaders);

  if (profileResponse.status === 200) {
    console.log("✅ Perfil obtido com sucesso");
    console.log("   Dados do usuário:", {
      id: profileResponse.data.id,
      email: profileResponse.data.email,
      nome: profileResponse.data.nome,
    });
  } else {
    console.log("❌ Falha ao obter perfil:", profileResponse.error);
  }

  // 4. Teste de Criação de Transação
  console.log("\n4. Testando criação de transação...");
  const transactionData = {
    amount: 150.75,
    type: "expense",
    category: "Alimentação",
    description: "Supermercado",
    date: new Date().toISOString(),
  };

  const createTransactionResponse = await testRoute(
    "post",
    "/transactions",
    transactionData,
    authHeaders
  );

  if (createTransactionResponse.status === 201) {
    console.log("✅ Transação criada com sucesso");
    transactionId = createTransactionResponse.data.id;
    console.log("   ID da transação:", transactionId);
  } else {
    console.log(
      "❌ Falha ao criar transação:",
      createTransactionResponse.error
    );
  }

  // 5. Teste de Listagem de Transações
  console.log("\n5. Testando listagem de transações...");
  const transactionsResponse = await testRoute(
    "get",
    "/transactions",
    null,
    authHeaders
  );

  if (transactionsResponse.status === 200) {
    console.log("✅ Transações listadas com sucesso");
    console.log(`   Total de transações: ${transactionsResponse.data.length}`);
  } else {
    console.log("❌ Falha ao listar transações:", transactionsResponse.error);
  }

  // 6. Teste de Resumo de Transações
  console.log("\n6. Testando resumo de transações...");
  const summaryResponse = await testRoute(
    "get",
    "/transactions/summary?period=month",
    null,
    authHeaders
  );

  if (summaryResponse.status === 200) {
    console.log("✅ Resumo obtido com sucesso");
    console.log("   Resumo:", {
      totalIncome: summaryResponse.data.totalIncome,
      totalExpenses: summaryResponse.data.totalExpenses,
      netBalance: summaryResponse.data.netBalance,
    });
  } else {
    console.log("❌ Falha ao obter resumo:", summaryResponse.error);
  }

  // 7. Teste de Criação de Meta
  console.log("\n7. Testando criação de meta...");
  const goalData = {
    name: "Viagem",
    targetAmount: 5000,
    targetDate: "2024-12-01",
    category: "Viagem",
  };

  const createGoalResponse = await testRoute(
    "post",
    "/goals",
    goalData,
    authHeaders
  );

  if (createGoalResponse.status === 201) {
    console.log("✅ Meta criada com sucesso");
    goalId = createGoalResponse.data.id;
    console.log("   ID da meta:", goalId);
  } else {
    console.log("❌ Falha ao criar meta:", createGoalResponse.error);
  }

  // 8. Teste de Listagem de Metas
  console.log("\n8. Testando listagem de metas...");
  const goalsResponse = await testRoute("get", "/goals", null, authHeaders);

  if (goalsResponse.status === 200) {
    console.log("✅ Metas listadas com sucesso");
    console.log(`   Total de metas: ${goalsResponse.data.length}`);
  } else {
    console.log("❌ Falha ao listar metas:", goalsResponse.error);
  }

  // 9. Teste de Geração de Relatório
  console.log("\n9. Testando geração de relatório...");
  const reportResponse = await testRoute(
    "get",
    "/reports/financial?period=month",
    null,
    authHeaders
  );

  if (reportResponse.status === 200) {
    console.log("✅ Relatório gerado com sucesso");
    console.log("   Dados do relatório:", {
      summary: reportResponse.data.summary,
      goals: reportResponse.data.goals.length,
    });
  } else {
    console.log("❌ Falha ao gerar relatório:", reportResponse.error);
  }

  // 10. Teste de Logout
  console.log("\n10. Testando logout...");
  const logoutResponse = await testRoute(
    "post",
    "/auth/signout",
    null,
    authHeaders
  );

  if (logoutResponse.status === 200) {
    console.log("✅ Logout bem-sucedido");
  } else {
    console.log("❌ Falha no logout:", logoutResponse.error);
  }

  console.log("\nTestes concluídos!");
}

runTests();
