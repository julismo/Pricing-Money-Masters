# Configuração Rápida - Feedback System

## ✅ Email Configurado

O teu email **<Julismoquinto@gmail.com>** já está configurado no ficheiro `.env`.

## 🚀 Próximo Passo: Criar Conta Resend

### 1. Criar Conta (2 minutos)

1. Acede a [resend.com](https://resend.com)
2. Clica em **Sign Up**
3. Usa o teu email: **<Julismoquinto@gmail.com>**
4. Confirma o email

### 2. Gerar API Key

1. Após login, vai a **API Keys** (menu lateral)
2. Clica em **Create API Key**
3. Nome: `ROI Calculator Feedback`
4. **Copia a chave** (começa com `re_...`)

### 3. Adicionar ao .env

1. Abre o ficheiro `.env` na raiz do projeto
2. Substitui `your_resend_api_key_here` pela chave que copiaste
3. Exemplo:

   ```
   RESEND_API_KEY=re_abc123def456...
   FEEDBACK_EMAIL=Julismoquinto@gmail.com
   ```

### 4. Testar Localmente

```bash
# Reinicia o servidor (Ctrl+C e depois)
npm run dev

# Abre http://localhost:5173
# Clica no botão "Feedback" (canto inferior direito)
# Envia um teste
```

### 5. Configurar no Vercel (para produção)

Quando fizeres deploy:

1. Dashboard do Vercel → **Settings** → **Environment Variables**
2. Adiciona:
   - **Name:** `RESEND_API_KEY`  
     **Value:** `re_abc123...` (a tua chave)
   - **Name:** `FEEDBACK_EMAIL`  
     **Value:** `Julismoquinto@gmail.com`
3. Aplica a **Production**, **Preview** e **Development**
4. Redeploy

---

## 📧 O que vais receber

Quando alguém enviar feedback, receberás um email em **<Julismoquinto@gmail.com>** com:

- Texto do feedback
- Email do utilizador (se fornecido)
- Screenshot (se anexado)
- URL da página
- Data/Hora
- User Agent (browser/dispositivo)

---

**Plano Gratuito Resend:**

- ✅ 100 emails/dia
- ✅ 3.000 emails/mês
- ✅ Sem cartão de crédito necessário

**Está quase pronto!** Só falta criar a conta no Resend e copiar a API Key. 🚀
