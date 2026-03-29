# Pisarra Colaborativa en Temps Real

Projecte que permet a múltiples usuaris connectar-se a una pisarra compartida, veure els cursors dels altres en temps real i interactuar amb l’aplicació des del navegador.

---

## 🔗 Repositoris

- **Servidor (backend)**: [https://github.com/maartaag/AC7_sockets_cursores_api](servidor)
- **Client (frontend)**: [https://github.com/maartaag/AC7_sockets_cursores_astro](client)

> Reemplaça els enllaços amb els teus repositoris reals.

---

## Instruccions per executar el servidor

1. Clonar el repositori:

```bash
git clone https://github.com/maartaag/AC7_sockets_cursores_api.git
cd pisarra-backen
```

2. Instal·lar dependencies

```bash
npm install
```

3. Executar servidor

```bash
npm run dev
```

## Instruccions per executar el client

```bash
git clone https://github.com/maartaag/AC7_sockets_cursores_astro.git
cd pisarra-backen
```

2. Instal·lar dependencies

```bash
npm install
```

3. Executar servidor

```bash
npm run dev
```

## Problemes trobats i solcuions

1. Duplicació del cursor propi
   Al conectarse apareixa un cursor a dalt a l'esquerra i es mantenia allà. En canvi els altres clients si que podien veure el meu moviment en temps real.
   Solució: No crear un cursor per mi sino només pels altres
   El meu cursor del ratolí no es mostra, només es mostra per mi en local.

2. Problemes amb més d'un socket
   Normalment feia wl waitForSocket i funcionava. Des del component principal s'inicialitza window.socket i la resta esperen. UserList per algun motiu no s'esperava i no el trobava el socket i donava error.
   Solució: em afegit un window.addeventListener("socket-ready") perquè només comenci a executarse un cop haguem generat el socket ja que sino s'intenta executar molt dora.

3. Mostrar User List
   El backend envia una llista d'usuaris que son objectes i apareixi object Object en comptes del nom, això és perquè noa ccedies a un atribut del objecte.
   Solució: user.nombre ja que nombre és un atribut, així ja es mostra bé.
