# 🚀 Configuração Rápida: EmailJS para Feedback

## 📝 Passo a Passo (5 minutos)

### 1. Criar Conta EmailJS

1. Vai a <https://emailjs.com/>
2. Clica em **Sign Up** (gratuito)
3. Confirma o email

---

### 2. Adicionar Serviço de Email

1. No dashboard, vai a **Email Services**
2. Clica em **Add New Service**
3. Escolhe **Gmail** (recomendado)
4. Clica em **Connect Account**
5. Autoriza o EmailJS a aceder ao teu Gmail
6. **Copia o Service ID** (ex: `service_abc123`)

---

### 3. Criar Template de Email

1. Vai a **Email Templates**
2. Clica em **Create New Template**
3. **Copia e cola este template:**

```html
<h2>🎯 Novo Feedback Recebido</h2>

<p><strong>📅 Data/Hora:</strong> {{timestamp}}</p>
<p><strong>🌐 URL:</strong> {{url}}</p>
<p><strong>📧 Email:</strong> {{from_email}}</p>

<hr>

<h3>💬 Mensagem:</h3>
<p>{{message}}</p>

<hr>

<p><small><strong>🖥️ User Agent:</strong> {{user_agent}}</small></p>
```

1. **Configura:**
   - **To Email:** `julismoquinto@gmail.com`
   - **From Name:** `Feedback ROI Calculator`
   - **Subject:** `[Feedback] {{from_email}} - {{timestamp}}`

2. **Copia o Template ID** (ex: `template_xyz789`)

---

### 4. Obter Public Key

1. Vai a **Account** → **General**
2. Encontra **Public Key**
3. **Copia a chave** (ex: `AbCdEfGhIjKlMnOp`)

---

### 5. Configurar Variáveis de Ambiente

#### Localmente (`.env`)

Cria/edita o ficheiro `.env` na raiz do projeto:

```bash
# EmailJS Configuration
VITE_EMAILJS_PUBLIC_KEY=AbCdEfGhIjKlMnOp
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
```

#### Vercel (Produção)

1. Vai ao **Vercel Dashboard**
2. **Settings** → **Environment Variables**
3. Adiciona as 3 variáveis:
   - `VITE_EMAILJS_PUBLIC_KEY`
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
4. Aplica a **Production**, **Preview** e **Development**

---

### 6. Remover Configuração Antiga (Resend)

#### No Vercel

1. **Settings** → **Environment Variables**
2. **Apaga:**
   - `RESEND_API_KEY`
   - `FEEDBACK_EMAIL`

---

### 7. Testar Localmente

```bash
# Reinicia o servidor
npm run dev
```

1. Abre <http://localhost:5173>
2. Clica no botão **Feedback**
3. Envia um teste
4. Verifica o email em `julismoquinto@gmail.com`

---

### 8. Deploy para Produção

```bash
git add .
git commit -m "feat: replace Resend with EmailJS for community feedback"
git push origin main
```

O Vercel fará deploy automático! 🚀

---

## ✅ Checklist Final

- [ ] Conta EmailJS criada
- [ ] Serviço Gmail conectado (Service ID copiado)
- [ ] Template criado (Template ID copiado)
- [ ] Public Key copiada
- [ ] Variáveis adicionadas ao `.env` local
- [ ] Variáveis adicionadas ao Vercel
- [ ] Variáveis antigas (Resend) removidas do Vercel
- [ ] Testado localmente
- [ ] Deploy feito
- [ ] Testado em produção

---

## 🎉 Pronto

Agora **qualquer pessoa da tua comunidade** pode enviar feedback sem restrições!

**Limite gratuito:** 200 emails/mês  
**Upgrade (se necessário):** $15/mês = 1000 emails
