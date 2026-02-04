// Teste de verificação dos novos custos dinâmicos
import { calculateUnifiedROI, UnifiedFormData } from '../../src/utils/roiCalculations';

// Standard inputs (barbearia média)
const inputData: UnifiedFormData = {
    callsPerWeek: 70, // ~301 calls/month = ~11/dia (6 dias)
    callDuration: 3,  // 3 min por chamada
    cutDuration: 45,
    averageTicket: 30,
    missedCallsPercent: 20,
    workingDays: "6dias",
    useSeasonality: true,
    calculationMode: "tempo",
    startMonth: "0"
};

console.log("=====================================================");
console.log("VERIFICAÇÃO DOS NOVOS CUSTOS DINÂMICOS (Fev 2026)");
console.log("=====================================================");
console.log(`Inputs: ${inputData.callsPerWeek} chamadas/semana, ${inputData.callDuration} min/chamada`);

const results = calculateUnifiedROI(inputData);

console.log("\n--- BREAKDOWN DE CUSTOS MENSAL ---");
console.log(`🖥️  Servidor:  €${results.costBreakdown.server.toFixed(2)} (${results.serverTier})`);
console.log(`📞 Twilio:    €${results.costBreakdown.twilioNumber.toFixed(2)}`);
console.log(`🤖 Retell AI: €${results.costBreakdown.retellAI.toFixed(2)}`);
console.log(`💬 SMS:       €${results.costBreakdown.sms.toFixed(2)}`);
console.log(`──────────────────────────────────────`);
console.log(`💰 TOTAL:     €${results.totalCostMonthly.toFixed(2)}/mês`);

console.log("\n--- RESULTADOS ANUAIS ---");
console.log(`Receita:      €${results.totalBenefitYearly.toFixed(2)}`);
console.log(`Custos:       €${results.totalCostYearly.toFixed(2)}`);
console.log(`Lucro:        €${results.netProfitYearly.toFixed(2)}`);
console.log(`ROI:          ${results.roiPercent.toFixed(0)}%`);
console.log(`Payback:      ${results.paybackMonths} meses`);

console.log("\n--- VALIDAÇÕES ---");

// Validar que servidor é escalado corretamente
const callsPerDay = (inputData.callsPerWeek * 4.3) / (6 * 4.3);
console.log(`Chamadas/dia: ~${callsPerDay.toFixed(1)}`);

// Teste com volume baixo
const lowVolumeData = { ...inputData, callsPerWeek: 20 };
const lowResults = calculateUnifiedROI(lowVolumeData);
console.log(`\n[Low Volume: 20/semana] Servidor: ${lowResults.serverTier}, €${lowResults.costBreakdown.server.toFixed(2)}`);

// Teste com volume alto
const highVolumeData = { ...inputData, callsPerWeek: 150 };
const highResults = calculateUnifiedROI(highVolumeData);
console.log(`[High Volume: 150/semana] Servidor: ${highResults.serverTier}, €${highResults.costBreakdown.server.toFixed(2)}`);

// Validações
const serverScalingOk = highResults.costBreakdown.server > lowResults.costBreakdown.server;
const retellOk = results.costBreakdown.retellAI > 0;
const smsOk = results.costBreakdown.sms > 0;
const twilioOk = results.costBreakdown.twilioNumber === 15.00;

console.log("\n--- CHECKS ---");
console.log(`Server Scaling:   ${serverScalingOk ? '✅ PASS' : '❌ FAIL'}`);
console.log(`Retell Cost > 0:  ${retellOk ? '✅ PASS' : '❌ FAIL'}`);
console.log(`SMS Cost > 0:     ${smsOk ? '✅ PASS' : '❌ FAIL'}`);
console.log(`Twilio = €15:     ${twilioOk ? '✅ PASS' : '❌ FAIL'}`);

const allPassed = serverScalingOk && retellOk && smsOk && twilioOk;
console.log(`\n==> RESULTADO FINAL: ${allPassed ? '✅ TODOS OS TESTES PASSARAM' : '❌ ALGUNS TESTES FALHARAM'}`);
