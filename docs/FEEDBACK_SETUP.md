# Sistema de Feedback - Guia de Configuração

## 🎯 O que foi implementado

Sistema completo de feedback com:

- ✅ Botão flutuante no canto inferior direito
- ✅ Captura automática de screenshot
- ✅ Upload manual de imagens (até 5MB)
- ✅ Envio por email com anexos
- ✅ Campos: Feedback (obrigatório), Email (opcional), Imagem (opcional)

## 📋 Setup para Vercel

### 1. Criar Conta Resend (Grátis)

1. Acede a [resend.com](https://resend.com)
2. Cria conta (100 emails/dia grátis)
3. Vai a **API Keys** → **Create API Key**
4. Copia a chave (começa com `re_...`)

### 2. Configurar Variáveis de Ambiente no Vercel

No dashboard do Vercel:

1. **Settings** → **Environment Variables**
2. Adiciona:

   ```
   RESEND_API_KEY = re_sua_chave_aqui
   FEEDBACK_EMAIL = teu-email@gmail.com
   ```

3. Aplica a **Production**, **Preview** e **Development**

### 3. Configurar Domínio no Resend (Opcional mas Recomendado)

Para emails profissionais (`feedback@teudominio.com`):

1. No Resend: **Domains** → **Add Domain**
2. Adiciona o teu domínio (ex: `teudominio.com`)
3. Copia os registos DNS (MX, TXT, CNAME)
4. Adiciona-os no teu provider de domínio (Vercel, Cloudflare, etc.)
5. Aguarda verificação (5-30 min)

**Sem domínio próprio:** Usa `onboarding@resend.dev` (limite de 1 email/dia)

### 4. Atualizar Email "From" (se tiveres domínio)

Em `src/pages/api/feedback.ts`, linha 42:

```typescript
from: 'Feedback ROI Calculator <feedback@teudominio.com>',
```

## 🧪 Testar Localmente

1. Cria ficheiro `.env` na raiz:

   ```bash
   RESEND_API_KEY=re_sua_chave
   FEEDBACK_EMAIL=teu-email@gmail.com
   ```

2. Reinicia o servidor:

   ```bash
   npm run dev
   ```

3. Clica no botão **Feedback** (canto inferior direito)
4. Envia um teste

## 📧 Formato do Email Recebido

```
Assunto: [Feedback] user@email.com - 04/02/2026

Novo Feedback Recebido
Data/Hora: 04/02/2026, 13:00:00
URL: https://teusite.vercel.app/
Email do Utilizador: user@email.com (se fornecido)

Feedback:
"A calculadora está ótima! Sugestão: adicionar mais nichos."

---
User Agent: Mozilla/5.0...
Screenshot: Anexado (se enviado)
```

## 🎨 Personalização

### Mudar Posição do Botão

Em `FeedbackButton.tsx`, linha 120:

```tsx
className="fixed bottom-6 right-6 ..." // Muda bottom/right/left/top
```

### Mudar Cor do Botão

```tsx
className="... bg-primary ..." // Muda para bg-blue-600, bg-green-500, etc.
```

### Desativar Screenshot Automático

Remove o botão "Capturar Ecrã" (linhas 164-169 de `FeedbackButton.tsx`)

## 🚀 Deploy no Vercel

```bash
# 1. Commit das alterações
git add .
git commit -m "feat: add feedback system"

# 2. Push para GitHub
git push origin main

# 3. No Vercel:
# - Conecta o repo
# - Adiciona as env vars (RESEND_API_KEY, FEEDBACK_EMAIL)
# - Deploy!
```

## 📊 Monitorizar Feedback

- **Resend Dashboard:** Ver emails enviados, taxa de entrega
- **Email:** Recebe notificações em tempo real
- **Logs Vercel:** Ver erros de API (se houver)

## ⚠️ Limites Gratuitos

- **Resend Free:** 100 emails/dia, 3000/mês
- **Anexos:** Até 40MB total por email
- **Upgrade:** $20/mês para 50k emails

## 🔒 Segurança

- ✅ Validação de tamanho de ficheiro (5MB)
- ✅ Rate limiting (implementar se necessário)
- ✅ Sanitização de inputs (HTML encoding)
- ✅ API keys em variáveis de ambiente

## 🐛 Troubleshooting

**Erro: "Email service not configured"**
→ Verifica se `RESEND_API_KEY` está nas env vars do Vercel

**Emails não chegam**
→ Verifica spam, confirma domínio verificado no Resend

**Screenshot não funciona**
→ Usa upload manual, ou verifica permissões do browser

---

**Pronto!** Agora tens um sistema de feedback profissional. 🎉
