# SOP MESTRE: INSTALAÇÃO COMPLETA DE INFRAESTRUTURA

**Objetivo:** Guia único para levantar o Servidor "A Nossa Casa" do zero até ao banco de dados pronto.
**Tempo Total:** ~30 minutos.

---

## FASE 0: SEGURANÇA & PREPARAÇÃO (Bitwarden) 🔐

**Regra de Ouro:** Nenhuma senha fica em texto plano.
1.  **Abrir Bitwarden da Agência.**
2.  **Criar Nova Pasta:** `Infraestrutura - A Nossa Casa`.
3.  **Criar Item de Login:** `VPS Hetzner Root`.
4.  **Criar Item de Login:** `Coolify Admin`.
5.  **Criar Nota Segura:** `Database Strings` (Para guardar URLs do Postgres/Redis).

---

## FASE 1: O SERVIDOR (Hetzner) 🏭

1.  **Aceder:** [console.hetzner.cloud](https://console.hetzner.cloud/).
2.  **Novo Servidor:**
    *   **Local:** Nuremberg (NBG1) ou Falkenstein.
    *   **Imagem:** Ubuntu 24.04.
    *   **Tipo:** **CPX21** (Recomendado) ou CX22.
    *   **Networking:** IPv4 Público (Essencial).
    *   **Nome:** `vps-moltbot-prod-01`.
3.  **Ação:** Criar e copiar o **IP Público**.

---

## FASE 2: O ENDEREÇO (Cloudflare) 🌐

1.  **Aceder:** Cloudflare Dashboard > DNS.
2.  **Criar Registos A (Proxy Laranja):**
    *   `painel` -> [IP do VPS]
    *   `api` -> [IP do VPS]
3.  **SSL:** Garantir modo "Full (Strict)".

---

## FASE 3: O SISTEMA (Coolify) ⚙️

1.  **Terminal (SSH):**
    ```bash
    ssh root@<SEU_IP_DO_VPS>
    ```
2.  **Instalar:**
    ```bash
    curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
    ```
3.  **Aceder:** `http://<IP>:8000` -> Criar Admin -> Configurar URL `https://painel.seu-dominio.com`.

---

## FASE 4: OS DADOS (Postgres + Redis) 🗄️

*Faça tudo dentro do painel visual do Coolify.*

1.  **Criar Projeto:** Nome "Internal-Lab", Env "Production".
2.  **PostgreSQL:**
    *   Add Resource > Databases > PostgreSQL.
    *   Versão: 16.
    *   **Ação:** Copiar `Internal Connection URL` (guardar como `DATABASE_URL`).
3.  **Redis:**
    *   Add Resource > Databases > Redis.
    *   **Ação:** Copiar `Internal Connection URL` (guardar como `REDIS_URL` no Bitwarden).

---

## FASE 5: GESTÃO DE EQUIPA (Quem Acessa O Quê?) 👥

O Moltbot roda "escondido" no servidor (Hetzner). A equipa interage assim:

1.  **Engenheiros (Tu):** Acedem ao **Coolify** (`painel.demo.com`) para ver logs e reiniciar serviços.
    *   *Como dar acesso:* No Coolify > Team > Invite Member (Via Email).
2.  **Equipa Geral:** Interage via **Interface Web** ou **Slac** (que configuraremos na Fase 3).
    *   *Eles NÃO precisam de acesso ao servidor/VPS.*
    *   Eles só precisam do link do Chat.

---

**🏁 FCHECKLIST FINAL:**
- [ ] VPS Criado (IP Pingando).
- [ ] Coolify Acessível via Domínio (HTTPS).
- [ ] Postgres Running (Verde).
- [ ] Redis Running (Verde).
- [ ] Strings de Conexão salvas no bloco de notas.

*Próximo Passo: Instalação do Moltbot.*
