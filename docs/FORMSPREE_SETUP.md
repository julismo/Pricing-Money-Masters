# 🚀 Configuração Formspree (2 minutos!)

## 📝 Passo a Passo Super Simples

### 1. Criar Conta Formspree

1. Vai a https://formspree.io/
2. Clica em **Get Started** (gratuito)
3. Regista-te com o teu email `julismoquinto@gmail.com`
4. Confirma o email

---

### 2. Criar Formulário

1. No dashboard, clica em **+ New Form**
2. **Nome do formulário:** "ROI Calculator Feedback"
3. **Email para receber:** `julismoquinto@gmail.com`
4. Clica em **Create Form**

---

### 3. Copiar Endpoint

Depois de criar o formulário, vais ver algo assim:

```
https://formspree.io/f/abc123xyz
```

**Copia esse URL completo!**

---

### 4. Adicionar ao `.env`

Edita o ficheiro `.env` e cola o endpoint:

```bash
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/abc123xyz
```

(Substitui `abc123xyz` pelo teu ID real)

---

### 5. Testar Localmente

```bash
npm run dev
```

1. Abre http://localhost:5173
2. Clica no botão **Feedback**
3. Envia um teste
4. Verifica o email em `julismoquinto@gmail.com`

---

### 6. Configurar Vercel (Produção)

1. **Vercel Dashboard** → **Settings** → **Environment Variables**
2. Adiciona:
   - **Key:** `VITE_FORMSPREE_ENDPOINT`
   - **Value:** `https://formspree.io/f/abc123xyz`
3. Aplica a **Production**, **Preview** e **Development**

---

### 7. Deploy

```bash
git add .
git commit -m "feat: implement Formspree for community feedback"
git push origin main
```

---

## ✅ Pronto!

**Isso é tudo!** Muito mais simples que EmailJS, certo? 😄

### Vantagens do Formspree:

✅ **Sem CAPTCHA chato**  
✅ **Sem templates complexos**  
✅ **Sem configuração de serviços**  
✅ **Funciona com anexos** (screenshots)  
✅ **50 submissions/mês grátis**  
✅ **Emails chegam direto na tua caixa**

---

## 🎯 Próximos Passos

1. Cria a conta Formspree
2. Cria o formulário
3. Copia o endpoint
4. Cola no `.env`
5. Testa localmente
6. Faz deploy!

**Qualquer dúvida, avisa!** 🚀
